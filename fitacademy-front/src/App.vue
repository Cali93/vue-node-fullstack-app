<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn outline round color="indigo" to='/'>Home</v-btn>
    <v-btn v-if='isLoggedIn' outline round color="indigo" to='/cart'>Cart</v-btn>

    <v-btn v-if='isLoggedIn' outline round color="indigo" v-on:click='logoutUser'>Logout</v-btn>
    <v-btn v-else outline round color="indigo" to='/login'>Login</v-btn>

    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {}
  },
  created() {
    this.$store.dispatch('getCurrentUser')
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
          this.$router.push('/login')
        })
    }
  }
}
</script>
