import nodemailer from 'npm:nodemailer';

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
}

let transporter: nodemailer.Transporter | null = null;

function createTransporter(config: MailConfig): nodemailer.Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export function getMailConfig(): MailConfig {
  const host = Deno.env.get('SMTP_HOST');
  const port = Deno.env.get('SMTP_PORT');
  const user = Deno.env.get('SMTP_USER');
  const pass = Deno.env.get('SMTP_PASS');
  const from = Deno.env.get('FROM_EMAIL');

  if (!host || !port || !user || !pass || !from) {
    throw new Error(
      'Missing SMTP configuration. Ensure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and FROM_EMAIL secrets are set.'
    );
  }

  return {
    host,
    port: parseInt(port, 10),
    user,
    pass,
    from,
  };
}

export async function sendEmail(
  input: SendMailInput,
  config: MailConfig
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!transporter) {
      transporter = createTransporter(config);
    }

    const info = await transporter.sendMail({
      from: config.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown SMTP error';
    console.error('SMTP send failed:', message);
    return { success: false, error: message };
  }
}
