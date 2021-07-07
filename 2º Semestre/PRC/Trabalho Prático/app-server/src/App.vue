<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/">
        <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://marcas-logos.net/wp-content/uploads/2020/03/OLYMPICS-LOGO.png"
          transition="scale-transition"
          width="100"
        />

        <h1 style="color:white">Tokyo 2021</h1>
        </div>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if="this.token" to="/" plain>Schedule</v-btn>
      <v-btn v-if="this.token" to="/posts" plain>Posts</v-btn>
      <div v-if="this.token" class="dropdown">
        <Dropdown></Dropdown>
      </div>
      <div v-else>
          <Login></Login>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Login from '@/views/Login.vue';
import Dropdown from '@/components/Dropdown.vue'


export default {
  name: 'App',

  data: () => ({
    token:localStorage.getItem('jwt')
  }),
  components: {
    Login,
    Dropdown
  },
};
</script>
