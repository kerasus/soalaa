import { register } from 'register-service-worker'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: './' },

  ready (/* registration */) {
    console.log('Service worker is active.')
    // console.log('##### \n' +
    //   'App is being served from cache by a service worker.\n' +
    //   'For more details, visit https://goo.gl/AFskqB'
    // )

    // const app = initializeApp(firebaseConfig)
    // const messaging = getMessaging(app)

    // messaging.useServiceWorker(registration) // Your sw (service-worker,js -> custom-service-worker.js)  instead   firebase-messaging-sw.js
  },

  registered (/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound (/* registration */) {
    // console.log('New content is downloading.')
  },

  updated (registration) {
    // console.log('New content is available; please refresh.')
    console.log('##### New content is available; please refresh.')
    document.dispatchEvent(
      new CustomEvent('swUpdated', { detail: registration })
    )
    caches.keys()
      .then(function (names) {
        for (const name of names) {
          caches.delete(name)
        }
      })
  },

  offline () {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error (/* err */) {
    // console.error('Error during service worker registration:', err)
  }
})

register('firebase-messaging-sw.js')
