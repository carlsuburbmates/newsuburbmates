import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });

Sentry.captureException(new Error("VSCode automated Sentry test"));
console.log("Sent Sentry test error. Check your Sentry dashboard.");
