import * as Sentry from '@sentry/vue'
import { boot } from 'quasar/wrappers'

const sentryDsn = process.env.SENTRY_DSN
const tracesSampleRate = process.env.SENTRY_TRACES_SAMPLE_RATE
const replaysSessionSampleRate = process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE
const replaysOnErrorSampleRate = process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE

export default boot(({ app, router }) => {
  Sentry.init({
    app,
    dsn: sentryDsn,
    telemetry: false,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router)
      }),
      new Sentry.Replay()
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: parseFloat(tracesSampleRate),

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/alaatv\.com\/api/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: parseFloat(replaysSessionSampleRate),
    replaysOnErrorSampleRate: parseFloat(replaysOnErrorSampleRate)
  })
})
