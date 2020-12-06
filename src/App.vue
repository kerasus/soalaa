<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="img/logo.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    </v-app-bar>
      <v-navigation-drawer
              v-model="drawer"
              absolute
              bottom
              temporary
      >
          <v-list
                  nav
                  dense
          >
              <v-list-item-group
                      v-model="group"
                      active-class="deep-purple--text text--accent-4"
              >
                  <router-link class="text-decoration-none" :to="{ name: 'tree.edit' }">
                      <v-list-item>
                          <v-list-item-title>ویرایش درخت دانش</v-list-item-title>
                      </v-list-item>
                  </router-link>

                  <router-link class="text-decoration-none" :to="{ name: 'quest.create' }">
                      <v-list-item>
                          <v-list-item-title>ساخت سوال</v-list-item-title>
                      </v-list-item>
                  </router-link>

              </v-list-item-group>
          </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
    data: () => ({
        drawer: false,
        group: null,
    }),
    watch: {
        group () {
            this.drawer = false
        },
    },
};
</script>
