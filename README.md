# Mazadat

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

This app requires a backend API. You can either run the backend locally or proxy to a remote environment.

### Using QA Backend (Recommended)

If you don't have the backend running locally, use the QA profile:

```bash
npm run start:qa
```

### Using Local Backend

If you have the backend running locally on port 8080:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Base Path Configuration

This app is deployed at `/portal-v2/` path in production (OCP), to work with conjection with mazadat-frontend (v1).

| Environment | URL | Base Path |
|-------------|-----|-----------|
| **Dev** (`npm start`) | `http://localhost:4200/` | `/` |
| **Prod** (SSR) | `https://<host>/portal-v2/` | `/portal-v2/` |

The path switching is handled by:

- **`angular.json`** - `configurations.production.baseHref` set to `/portal-v2/`
- **`src/server.ts`** - Dynamically sets `basePath` based on dev/prod mode
- **`src/index.html`** - Uses `<base href="/">` (overridden by production build)

To test the production SSR build locally:

```bash
npm run build && NG_APP_API_BASE_URL=https://mazadat-api-qa.apps.qaocp4.elm.sa npm run serve:ssr:mazadat
```

Then access `http://localhost:4000/portal-v2/`

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

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
