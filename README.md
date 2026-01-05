
## End-to-end testing with Cypress ✅

To run the E2E tests locally:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server in one terminal:

   ```bash
   npm run dev
   ```

3. Open Cypress UI (interactive):

   ```bash
   npm run cypress:open
   ```

4. Run headless (CI / local):

   ```bash
   npm run e2e:ci
   ```

Notes:

- `e2e:ci` uses `start-server-and-test` to start the dev server and then run Cypress in headless mode.
- If your Vite server runs on a different port, update `baseUrl` in `cypress.config.ts` or the URL in the `e2e:ci` script.
