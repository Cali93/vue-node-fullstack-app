<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>DRESSINGS:</span>
        <span class="font-weight-light"> Your e-wardrobes</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn outline round color="light" to='/'>Home</v-btn>
    <div v-if='isLoggedIn'>
      <v-btn outline round color="light" to='/cart'>Cart</v-btn>
      <v-btn outline round color="light" to='/dressings'>Dressings</v-btn>
      <v-btn outline round color="light" to='/profile'>Profile</v-btn>
      <v-btn outline round color="light" v-on:click='logoutUser'>Logout</v-btn>
    </div>
    <v-btn v-else outline round color="light" to='/login'>Login</v-btn>
    </v-toolbar>

    <v-content>
      <Snackbar />
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Snackbar from './components/common/Snackbar'
export default {
  name: 'App',
  components: {
    Snackbar
  },
  data () {
    return {}
  },
  // components lifecycles: https://alligator.io/vuejs/component-lifecycle/
  created() {
    return this.$store.dispatch('getCurrentUser');
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logoutUser: async function () {
      this.$store.dispatch('logout')
        .then(() => {
          const successSnackbarPayload = {
            message: 'You have been logged out',
            status: 'info'
          };
          this.$store.dispatch('toggleSnackbar', successSnackbarPayload);
          this.$router.push('/login')
        })
    }
  }
}
</script>
