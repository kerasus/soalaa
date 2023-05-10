import { boot } from 'quasar/wrappers'
import { APIGateway } from 'src/api/APIGateway'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  app.config.globalProperties.$apiGateway = APIGateway
  app.$apiGateway = APIGateway
  router.$apiGateway = APIGateway
  store.$apiGateway = APIGateway
})
