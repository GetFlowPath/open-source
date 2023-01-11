import { ChurnZero, ChurnZeroPublicAPI } from './ChurnZero';

const mockFn = jest.fn(() => {});

function generateConfig() {
  return {
    url: 'https://getflowpath-dev.us2app.churnzero.net/',
    apiKey: '1!4p97ShbYcIcmXdAGdudvviZ97ycbazSFQLP8AQZztG4t11DC',
  };
}
function fakeChurnZeroApi() {
  const api = window as Partial<ChurnZeroPublicAPI>;
  return (api.ChurnZero = {
    injectSnippet: mockFn,
    setAppKey: mockFn,
    setModule: mockFn,
    verify: mockFn,
    stop: mockFn,
    toggleUrlTracking: mockFn,
    toggleSilentMode: mockFn,
    toggleSuccessPanel: mockFn,
    debug: mockFn,
    push: mockFn,
    setContact: mockFn,
    setAttribute: mockFn,
    trackEvent: mockFn,
    registerEvent: mockFn,
    deregisterEvent: mockFn,
  });
}
it('should initiate connection', async () => {
  const config = generateConfig();
  const czscript = document.createElement('script');
  document.body.appendChild(czscript);

  const insertBefore = jest.spyOn(document.body, 'insertBefore');
  const cz = ChurnZero.connect(config);
  const script = insertBefore.mock.calls[0][0] as HTMLScriptElement;
  const api = fakeChurnZeroApi();
  script.onload!(undefined as any);

  // await expect(cz).resolves.toBeDefined();
  await new Promise(process.nextTick);
  expect(api.push).nthCalledWith(1, ['setAppKey', config.apiKey]);
  expect(api.push).toBeCalledTimes(2);
});
