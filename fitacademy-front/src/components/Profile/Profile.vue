
<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-text-field color="indigo" v-model="form.username" label="Username"></v-text-field>
          <v-text-field color="indigo" v-model="form.email" label="Email Address"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="indigo" round outline :loading="loading" v-on:click="editProfile">
            <v-icon left dark>check</v-icon>Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  pageTitle: "My Profile",
  data() {
    return {
      loading: false,
      form: {
        username: this.$store.getters.currentUser.username,
        email: this.$store.getters.currentUser.email
      },
      showAvatarPicker: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    editProfile: async function() {
      const profilePayload = {
        userId: this.currentUser.id,
        newData: {
          email: this.form.email,
          username: this.form.username
        }
      }
      const successSnackbarPayload = {
        message: 'Your informations have been saved',
        status: 'success'
      };
      this.$store.dispatch('editProfile', profilePayload)
        .then(() => 
          this.$store.dispatch('toggleSnackbar', successSnackbarPayload)
        );
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>
