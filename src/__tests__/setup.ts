// Global test setup — runs before all test files
// Set required env vars before any module is imported
process.env.ARE_E_TEST_MODE = 'true';
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_placeholder';
process.env.CLERK_SECRET_KEY = 'sk_test_placeholder';
