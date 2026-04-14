// Sentry edge runtime configuration
import * as Sentry from '@sentry/nextjs';

const IS_TEST_MODE = process.env.ARE_E_TEST_MODE === 'true';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: !IS_TEST_MODE && !!process.env.SENTRY_DSN,
  environment: IS_TEST_MODE ? 'test' : 'production',
  tracesSampleRate: IS_TEST_MODE ? 0 : 0.1,
});
