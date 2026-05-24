import { createClient } from 'npm:@supabase/supabase-js@2';
import { parseWebhookPayload } from './utils/parser.ts';
import { validateEmailInput } from './utils/validator.ts';
import { sendEmail, getMailConfig, MailConfig } from './utils/mailer.ts';
import { getWelcomeEmailHtml } from './utils/template.ts';

interface InvitationRecord {
  id: string;
  name: string;
  email: string;
  book: string | null;
  email_sent: boolean;
}

Deno.serve(async (req) => {
  const requestId = crypto.randomUUID();

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();

    console.log(`[${requestId}] Received webhook payload`);

    let record: InvitationRecord;
    try {
      const payload = parseWebhookPayload(body);
      record = payload.record!;
    } catch (parseError) {
      const message = parseError instanceof Error ? parseError.message : 'Parse failed';
      console.log(`[${requestId}] Skipping — ${message}`);
      return new Response(JSON.stringify({ skipped: true, reason: message }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Idempotency check: skip if email already sent
    if (record.email_sent) {
      console.log(`[${requestId}] Skipping — email already sent for ${record.email}`);
      return new Response(JSON.stringify({ skipped: true, reason: 'Email already sent' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    const validation = validateEmailInput({ email: record.email, name: record.name });
    if (!validation.valid) {
      console.error(`[${requestId}] Validation failed:`, validation.errors);
      return new Response(JSON.stringify({ error: 'Validation failed', details: validation.errors }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Render email template
    const html = getWelcomeEmailHtml(record.name, record.book ?? undefined);

    // Get SMTP config and send email
    let mailConfig: MailConfig;
    try {
      mailConfig = getMailConfig();
    } catch (configError) {
      const message = configError instanceof Error ? configError.message : 'Config error';
      console.error(`[${requestId}] SMTP config error:`, message);
      return new Response(JSON.stringify({ error: 'SMTP not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailResult = await sendEmail(
      {
        to: record.email,
        subject: 'Your card is reserved — Asterix Editions',
        html,
      },
      mailConfig
    );

    if (!emailResult.success) {
      console.error(`[${requestId}] Failed to send email to ${record.email}:`, emailResult.error);
      return new Response(JSON.stringify({ error: 'Email send failed', detail: emailResult.error }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`[${requestId}] Email sent successfully to ${record.email}:`, emailResult.messageId);

    // Update email_sent flag in database
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error: updateError } = await supabase
          .from('InvitationRequest')
          .update({ email_sent: true })
          .eq('id', record.id);

        if (updateError) {
          console.error(`[${requestId}] Failed to update email_sent flag:`, updateError.message);
        } else {
          console.log(`[${requestId}] email_sent flag updated for ${record.email}`);
        }
      } else {
        console.warn(`[${requestId}] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set, skipping email_sent update`);
      }
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : 'Update failed';
      console.error(`[${requestId}] Database update error:`, message);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        email: record.email, 
        messageId: emailResult.messageId,
        debug: {
          smtp_host: mailConfig.host,
          smtp_port: mailConfig.port,
          smtp_user: mailConfig.user,
          smtp_pass_prefix: mailConfig.pass.substring(0, 8) + '...',
          from_email: mailConfig.from
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${requestId}] Unhandled error:`, message);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
