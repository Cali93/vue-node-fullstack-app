<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    <v-btn outline round color="indigo" to='/'>Home</v-btn>

    <v-btn v-if='isAuthenticated' outline round color="indigo" v-on:click='logoutUser'>Logout</v-btn>
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
    return {
      isAuthenticated: false,
      user: {}
    }
  },
  methods: {
    getCurrentUser: async function () {
      const user = await this.$http
        .get(`http://localhost:5000/user/current`, this.$httpOptions)
        .then(res => {
          if (res.data.success){
            this.isAuthenticated = true;
            this.user = res.data.user;
          }
        });
      return user;
    },
    logoutUser: async function () {
      const user = await this.$http
        .get(`http://localhost:5000/user/logout`, this.$httpOptions)
        .then(res => {
          if (res.data.success){
            this.isAuthenticated = false;
            this.user = {};
          }
        });
      return user;
    }
  },
  mounted(){
    this.getCurrentUser();
  },
  updated(){
    this.getCurrentUser();
  }
}
</script>
