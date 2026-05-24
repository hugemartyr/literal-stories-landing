export interface InvitationRecord {
  id: string;
  name: string;
  email: string;
  book: string | null;
  email_sent: boolean;
}

export interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: InvitationRecord | null;
  schema: string;
  old_record: InvitationRecord | null;
}

export function parseWebhookPayload(body: unknown): WebhookPayload {
  if (typeof body !== 'object' || body === null) {
    throw new Error('Invalid payload: expected an object');
  }

  const payload = body as Record<string, unknown>;

  if (payload.type !== 'INSERT') {
    throw new Error(`Unsupported event type: ${String(payload.type)}`);
  }

  if (payload.table !== 'InvitationRequest') {
    throw new Error(`Unexpected table: ${String(payload.table)}`);
  }

  if (!payload.record || typeof payload.record !== 'object') {
    throw new Error('Missing or invalid record in payload');
  }

  return payload as unknown as WebhookPayload;
}
