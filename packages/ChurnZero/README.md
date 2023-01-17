<h1>ChurnZero</h1>

A framework-agnostic library for interacting with the ChurnZero API.

![Main][github-badge-release]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
    - [Inject the ChurnZero snippet](#inject-the-churnzero-snippet)
    - [Settings](#settings)
      - [Initialize: Set app key and contact](#initialize-set-app-key-and-contact)
      - [Stop URL tracking](#stop-url-tracking)
      - [Silent mode](#silent-mode)
    - [Stop](#stop)
    - [Debug](#debug)
  - [Interactions](#interactions)
    - [Set attribute](#set-attribute)
    - [Set module](#set-module)
    - [Track event](#track-event)
    - [Register events](#register-events)
    - [Push: The escape hatch](#push-the-escape-hatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

# Usage

## Configuration

### Inject the ChurnZero snippet

The first step is to inject the ChurnZero snippet into your application. This is done by adding the following script
tag to your application's HTML.

You can add the snippet directly to your HTML, or you can inject it via the `injectSnippet` method.

**HTML snippet**

```html
<script>
  var ChurnZero = ChurnZero || [];
  (function () {
    var cz = document.createElement('script');
    cz.type = 'text/javascript';
    cz.async = true;
    cz.src = 'https://yourvanitydomain.churnzero.net/churnzero.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(cz, s);
  })();
</script>
```

**Inject via method**

Calling `injectSnippet` will look for a div with the ID of `ChurnZero` to inject the snippet into.

````typescript

```tsx
const ChurnZero = ChurnZero();
ChurnZero.injectSnippet();
````

Alternatively, you can pass a custom ID to the `injectSnippet` method and the snippet will be injected into that div.

```typescript
const ChurnZero = ChurnZero();
ChurnZero.injectSnippet('MyCustomId');
```

### Settings

#### Initialize: Set app key and contact

The `initialize` method is used to configure the ChurnZero instance. It should be initialized as soon as the user is
identified (usually as part of the log in process).

It accepts a single object with the following properties:

| Property     | Type                         | Description                                     |
| ------------ | ---------------------------- | ----------------------------------------------- |
| `setAppKey`  | `string`                     | The application ID for your ChurnZero instance. |
| `setContact` | `ChurnZeroSetContactPayload` | The user details for current user.              |

```typescript
ChurnZero.setAppKey('your-app-key');
ChurnZero.setContact({ accountExternalId: '12345', contactExternalId: '67890' });
```

#### Toggle URL tracking

URL tracking can be enabled/disabled at any time:

```typescript
ChurnZero.toggleUrlTracking(boolean);
```

#### Toggle Silent mode

Silent mode is to continue tracking but hide all visible elements. The silent mode can be enabled/disabled.

```typescript
ChurnZero.toggleSilentMode(boolean);
```

### Stop

You can stop the ChurnZero instance by calling the `stop` method at any time. This is often used in conjunction with
tracking the user's session.

```typescript
ChurnZero.trackEvent('Logout');
ChurnZero.stop();
```

### Debug

For troubleshooting purposes, you can enable debug mode by calling the `debug` method. Calling it a second time will disable debug mode.

```typescript
ChurnZero.debug();
```

## Interactions

### Set attribute

The entity must be either `contact` or `account` and any number of attributes can be set at once:

```typescript
ChurnZero.setAttribute({
  entity: 'account', // 'contact | 'account'
  attributes: [{
    'name': 'Email Enabled',
    'value': true,
  }, {
    'name': 'Max users',
    'value': 100,
  }]
});
```

### Set module

As the user moves through the application it can be useful to track when they move between modules:

```typescript
ChurnZero.setModule('Module Name');
```

### Track event

Any number of events can be tracked via this method:

```typescript
ChurnZero.trackEvent({ eventName: 'My cool event' });
```

Optionally you can pass a payload with additional information:

```typescript
ChurnZero.trackEvent({
  eventName: 'My cool event',
  description: 'This is a description of the custom event.',
  quantity: 12,
  customFields: {
    'Custom Field 1': 'Custom Field 1 Value',
    'Custom Field 2': 'Custom Field 2 Value',
  },
});
```

### Push: The escape hatch

If for any reason you need to access the underlying ChurnZero instance, you can do so by calling the `push` method.

```typescript
ChurnZero.push(['trackEvent', eventName, description, quantity, customFields]);
```

[//]: # 'LINKS'
[github-badge-release]: https://github.com/GetFlowPath/open-source/workflows/main/badge.svg
