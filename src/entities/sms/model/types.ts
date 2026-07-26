export interface SmsIntegration {
  provider?: string;
  api_key?: string;
  sender_id?: string;
  enabled: boolean;
}
