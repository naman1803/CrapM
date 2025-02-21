import '@testing-library/jest-dom'; // This imports the custom matchers
import { setupServer } from 'msw/node';
import handlers from './test-utils/handlers';

// Setup requests interception using the given handlers.
const server = setupServer(...handlers);

beforeAll(() => {
  if ((process.env.VITE_NODE_ENV ?? 'development') == 'integration') {
    server.listen();
  }

  // Enable mocking.
});

afterAll(() => {
  if ((process.env.VITE_NODE_ENV ?? 'development') == 'integration') {
    server.close();
  }
  // Clean up once the tests are done.
});
