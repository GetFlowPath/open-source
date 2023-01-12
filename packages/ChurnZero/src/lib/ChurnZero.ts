// TEMP docs: https://support.churnzero.com/hc/en-us/articles/360004683552-Integrate-ChurnZero-using-Javascript
import {
  ChurnZeroAttributePayload,
  ChurnZeroRegisterEventPayload,
  ChurnZeroSetContactPayload,
  ChurnZeroTrackEventPayload,
} from './ChurnZero.types';

export interface ChurnZeroEvents {
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
  // eslint-disable-next-line max-len
  push<
    Args extends { [P in keyof ChurnZeroEvents]: [P, ...Parameters<any[P]>] }[keyof ChurnZeroEvents]
  >(
    args: Args
  ): void; // should we allow direct access as a fallback for complex cases?

  // Interaction
  setContact: (payload: ChurnZeroSetContactPayload) => void;
  setAttribute: (payload: ChurnZeroAttributePayload) => void;
  trackEvent: (payload: ChurnZeroTrackEventPayload) => void;
  registerEvent: (payload: ChurnZeroRegisterEventPayload) => void;
  deregisterEvent: (eventName: string) => void;
}

export interface Config {
  url: string;
  apiKey: string;
  accountId?: string;
  contactId?: string;
}

export interface ChurnZeroPublicAPI {
  ChurnZero: ChurnZeroEvents;
}

const churnZeroPublicAPI: Partial<ChurnZeroPublicAPI> = window as any;

export class ChurnZero {
  constructor(private methods: ChurnZeroEvents) {}

  static connect(config: Config) {
    initiateConnection(config.url).then((i) => {
      const churnzero = churnZeroPublicAPI.ChurnZero;
      if (!churnzero) {
        throw new Error(`ChurnZero isn't defined`);
      }
      churnzero.push(['setAppKey', config.apiKey]);
      churnzero.push(['setContact', config.accountId, config.contactId]);
      return new ChurnZero(churnzero);
    });
  }
  trackEvent(args: Parameters<ChurnZeroEvents['trackEvent']>) {
    this.methods.push(['trackEvent', ...args]);
  }
}

function initiateConnection(url: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    const e = document.getElementsByTagName('script')[0];
    script.async = true;
    script.src = url;
    e.parentNode!.insertBefore(script, e);

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to connect to ChurnZero`));
  });
}
