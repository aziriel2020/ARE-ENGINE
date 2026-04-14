// Sentry client-side configuration
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const IS_TEST_MODE = process.env.ARE_E_TEST_MODE === 'true';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  enabled: !IS_TEST_MODE && !!process.env.SENTRY_DSN,

  environment: IS_TEST_MODE ? 'test' : 'production',

  // 10% of transactions traced in production
  tracesSampleRate: IS_TEST_MODE ? 0 : 0.1,

  // Capture 10% of replay sessions + 100% on error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
  ],
});
