// TEMP docs: https://support.churnzero.com/hc/en-us/articles/360004683552-Integrate-ChurnZero-using-Javascript
import {
  ChurnZeroAttributePayload,
  ChurnZeroPushPayload,
  ChurnZeroRegisterEventPayload,
  ChurnZeroSetContactPayload,
  ChurnZeroTrackEventPayload,
} from './ChurnZero.types';

export type ChurnZeroPayload = {
  // Setup & Management
  injectSnippet: (node?: HTMLDivElement) => void;
  setAppKey: (appKey: string) => void;
  setModule: (moduleName: string) => void;
  verify: () => void;
  stop: () => void;
  toggleUrlTracking: (value: boolean) => void;
  toggleSilentMode: (value: boolean) => void;
  toggleSuccessPanel: (value: boolean) => void;
  debug: () => void;

  // Interaction
  setContact: (payload: ChurnZeroSetContactPayload) => void;
  setAttribute: (payload: ChurnZeroAttributePayload) => void;
  trackEvent: (payload: ChurnZeroTrackEventPayload) => void;
  registerEvent: (payload: ChurnZeroRegisterEventPayload) => void;
  deregisterEvent: (eventName: string) => void;
  push: (payload: ChurnZeroPushPayload) => void; // should we allow direct access as a fallback for complex cases?
}


export function ChurnZero(): string {
  return 'ChurnZero';
}
