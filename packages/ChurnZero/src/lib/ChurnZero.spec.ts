import { ChurnZero, ChurnZeroPublicAPI } from './ChurnZero';

const mockFn = jest.fn(() => {});

function fakeConfig() {
  return {
    url: 'https://yourdomain-dev.us2app.churnzero.net/',
    applicationKey: '1!4p97SbYcIcmXdAGduasdddvviZ97ycbazSFQLP8AQZztG4t11DC',
  };
}
function fakeCZApi() {
  const api = window as Partial<ChurnZeroPublicAPI>;
  return (api.ChurnZero = {
    injectSnippet: mockFn,
    setAppKey: mockFn,
    setModule: mockFn,
    verify: mockFn,
    stop: mockFn,
    open: mockFn,
    close: mockFn,
    incrementAttribute: mockFn,
    silent: mockFn,
    urltracking: mockFn,
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

it('should initiate connection', async() => {
  jest.useFakeTimers()
  const config = fakeConfig();
  const czscript = document.createElement('script');
  document.body.appendChild(czscript);

  const insertBefore = jest.spyOn(document.body, 'insertBefore');
  await ChurnZero.connect(config);
  const script = insertBefore.mock.calls[0][0] as HTMLScriptElement;
  const api = fakeCZApi();
  script.onload!(undefined as any);

  await new Promise(process.nextTick);
  jest.advanceTimersByTime(1000)
  await expect(api.push).nthCalledWith(1, ['setAppKey', config.applicationKey]);
  expect(api.push).toBeCalledTimes(2);
});
