<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  created () {
    this.setServiceWorker()
  },
  methods: {
    setServiceWorker () {
      // Listen for our custom event from the SW registration
      document.addEventListener('swUpdated', this.updateAvailable, { once: true })

      if (navigator && navigator.serviceWorker) {
        // Prevent multiple refreshes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (this.refreshing) return
          this.refreshing = true
          // Here the actual reload of the page occurs
          // window.location.reload()
        })
      }
    },
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    }
  }
})
</script>

