import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.NODE_ENV === "production") {
    const isProd = window.location.host === 'app.adeo.no';
    Sentry.init({
        dsn: "https://b07212ac0fce4245b88145ad95706ce7@sentry.gc.nav.no/145",
        integrations: [new BrowserTracing()],
        environment: isProd ? 'prod' : 'preprod',
        release: "$env{APP_VERSION}",
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 0.1,
    });
}