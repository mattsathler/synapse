# Synapse

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running tests

Run Jasmine tests interactively with Karma:

```bash
npm test
```

Run the suite once in headless Chrome, or generate coverage reports:

```bash
npm run test:ci
npm run test:coverage
```

Chrome or Chromium must be installed. If Karma cannot locate it, set `CHROME_BIN`
to the browser executable. The headless launcher supports Linux/WSL and containers.

Coverage reports are generated in `coverage/synapse/`: `index.html` for browsing,
`coverage-final.json` for tooling, and `lcov.info` for CI integrations. Coverage runs
fail below 95% statements, 90% branches, 95% functions, or 95% lines.

The suite covers components, services, forms, validators, pipes, directives,
interceptors, authentication, protected routes, caches, and success/error flows.
HTTP requests and navigation redirects are isolated from real APIs and page reloads;
delays are controlled by fake clocks. Coverage measures imported application code,
not TypeScript interfaces or the browser bootstrap in `main.ts`.

No end-to-end test runner is configured in this repository.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
