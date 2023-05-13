// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js')
// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyBMSKsBzEFtfBHkudjHuLr9brCuRUJQYX4',
  authDomain: 'alaa-office.firebaseapp.com',
  databaseURL: 'https://alaa-office.firebaseio.com',
  projectId: 'alaa-office',
  storageBucket: 'alaa-office.appspot.com',
  messagingSenderId: '300754869233',
  appId: '1:300754869233:web:c730b68385257132ed8250',
  measurementId: 'G-V614DM1FRK'
}

self.addEventListener('install', () => {
})
// eslint-disable-next-line
firebase.initializeApp(firebaseConfig)
// eslint-disable-next-line
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  // eslint-disable-next-line
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i]
        windowClient.postMessage(payload)
      }
    })

  return promiseChain
})

self.addEventListener('notificationclick', function (event) {
  event.waitUntil(self.clients.openWindow(event.currentTarget.dataEventJson.click_action))
})

messaging.getToken({ vapidKey: 'BKJlaTO0dnXtHHFho3i53VF_mGMkyxSv0dnC7ldF1wTZ8sRgXQIzYu2P4O3l2n0yKQ0H8BYcq86VOjbHAKAIFZY' })
  .then((currentToken) => {
    if (currentToken) {
      // console.log('Send the token to your server and update the UI if necessary')
      // eslint-disable-next-line
      console.warn('client token', currentToken)
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      // eslint-disable-next-line
      console.warn('No registration token available. Request permission to generate one.')
      // ...
    }
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.warn('An error occurred while retrieving token. ', err)
    // ...
  })

// // Initialize Firebase
// import { initializeApp } from 'firebase/app'
// import { onBackgroundMessage } from 'firebase/messaging/sw'
// import { getMessaging, getToken, onMessage } from 'firebase/messaging'
//
// const firebaseConfig = {
//   apiKey: 'AIzaSyBMSKsBzEFtfBHkudjHuLr9brCuRUJQYX4',
//   authDomain: 'alaa-office.firebaseapp.com',
//   databaseURL: 'https://alaa-office.firebaseio.com',
//   projectId: 'alaa-office',
//   storageBucket: 'alaa-office.appspot.com',
//   messagingSenderId: '300754869233',
//   appId: '1:300754869233:web:c730b68385257132ed8250',
//   measurementId: 'G-V614DM1FRK'
// }
//
// const app = initializeApp(firebaseConfig)
// const messaging = getMessaging(app)
//
// console.log('firebase-messaging-sw.js')
//
// getToken(messaging, { vapidKey: 'BKJlaTO0dnXtHHFho3i53VF_mGMkyxSv0dnC7ldF1wTZ8sRgXQIzYu2P4O3l2n0yKQ0H8BYcq86VOjbHAKAIFZY' })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('Send the token to your server and update the UI if necessary')
//       console.log('currentToken: ', currentToken)
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.')
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log('An error occurred while retrieving token. ', err)
//     // ...
//   })
//
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload)
//   // ...
// })
//
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }
//
//   self.registration.showNotification(notificationTitle,
//     notificationOptions)
// })
