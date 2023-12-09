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
  incrementAttribute: (payload: ChurnZeroAttributePayload) => void;
  setAppKey: (appKey: string) => void;
  setModule: (moduleName: string) => void;
  verify: () => void;
  stop: () => void;
  open: () => void;
  close: () => void;
  silent: () => void;
  urltracking: () => void;
  toggleUrlTracking: (value: boolean) => void;
  toggleSilentMode: (value: boolean) => void;
  toggleSuccessPanel: (value: boolean) => void;
  debug: () => void;
  // eslint-disable-next-line max-len
  push<
    Args extends { [P in keyof ChurnZeroEvents]: [P, ...Parameters<any[P]>] }[keyof ChurnZeroEvents]
  >(
    args: Args
  ): void;

  // Interaction
  setContact: (payload: ChurnZeroSetContactPayload) => void;
  setAttribute: (payload: ChurnZeroAttributePayload) => void;
  trackEvent: (payload: ChurnZeroTrackEventPayload) => void;
  registerEvent: (payload: ChurnZeroRegisterEventPayload) => void;
  deregisterEvent: (eventName: string) => void;
}

export interface Config {
  url: string;
  applicationKey: string;
  accountId?: string;
  contactId?: string;
}

export interface ChurnZeroPublicAPI {
  ChurnZero: ChurnZeroEvents;
}

const churnZeroPublicAPI: Partial<ChurnZeroPublicAPI> = window as any;

export class ChurnZero {
  constructor(private events: ChurnZeroEvents) {}

  static connect(config: Config) {
    return initiateConnection(config.url).then((i) => {
      const churnzero = churnZeroPublicAPI.ChurnZero;
      if (churnzero) {
        churnzero.push(['setAppKey', config.applicationKey]);
        churnzero.push(['setContact', config.accountId, config.contactId]);
        return new ChurnZero(churnzero);
      } else return null;
    }).catch((e) => {throw new Error(e)});
  }

  trackEvent(args: ChurnZeroTrackEventPayload) {
    const unpackedArgs = [args.eventName, args.description, args.quantity, args.customFields]
    this.events.push(['trackEvent', ...unpackedArgs]);
  }
  debug() {
    this.events.push(['debug']);
  }
  incrementAttribute(args: ChurnZeroAttributePayload) {
    const unpackArgs = [args.entity, args.attributes[0].name, args.attributes[0].value];
    this.events.push(['incrementAttribute', ...unpackArgs]);
  }
  setAttribute(args: ChurnZeroAttributePayload) {
    const unpackArgs = args.attributes.reduce((acc:any, curr) => {acc[curr['name']] = curr['value']; return acc;}, {});
    this.events.push(['setAttribute', args.entity, unpackArgs]);
  }
  stop() {
    this.events.push(['stop'])
  }
  setModule(args: string) {
    this.events.push(['setModule', args])
  }
  toggleSuccessPanel(args: boolean) {
    args ? this.events.push(['open']) : this.events.push(['close']);
  }
  toggleSilentMode(args: boolean) {
    this.events.push(['silent', args]);
  }
  toggleUrlTracking(args: boolean) {
    this.events.push(['urltracking', args]);
  }
  openSuccessCenter() {
    this.events.push(['open']);
  }
  closeSuccessCenter() {
    this.events.push(['close']);
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
