export type ChurnZeroAction =
  | 'setAttribute'
  | 'incrementAttribute'
  | 'trackEvent'
  | 'setContact';

export type ChurnZeroPushPayload = [
  ChurnZeroAction,
  string,
  string,
  Record<string, unknown>
];

export type ChurnZeroRegisterEventPayload = {
  eventName: string;
  callback: (data: unknown) => void;
};

export type ChurnZeroSetContactPayload = {
  accountExternalId: string;
  contactExternalId: string;
};

export type ChurnZeroAttributeEntity = 'contact' | 'account';

export type ChurnZeroAttributePayload = {
  attributes: { name: string; value: unknown }[];
  entity: ChurnZeroAttributeEntity;
};

export type ChurnZeroTrackEventPayload = {
  eventName: string;
  description?: string;
  quantity?: number;
  customFields?: Record<string, unknown>;
};
