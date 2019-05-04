<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="valid">
            <v-container>
              <v-layout class="authContainer" align-center justify-center>
                <!-- <v-card class='authCard elevation-12'> -->
                <v-layout justify-center align-items="center" wrap>
                  <v-flex xs10 class="textFieldGroup">
                    <v-text-field
                      required
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      color="indigo"
                      outline
                    ></v-text-field>
                  </v-flex>

                  <v-flex class="textFieldGroup" xs10>
                    <v-text-field
                      required
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      type="password"
                      :counter="25"
                      outline
                      color="indigo"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs10>
                    <div class="authActions">
                      <v-btn
                        outline
                        round
                        color="indigo"
                        v-on:click="() => loginUser(email, password)"
                      >Login</v-btn>
                      <div>
                        <span class="body-2">OR</span>
                        <v-btn outline round color="dark" to="/register">Register</v-btn>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {},
    valid: false,
    email: localStorage.getItem("email"),
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Username must be at least 6 characters",
      v => v.length <= 25 || "Username must be less than 25 characters"
    ]
  }),
  methods: {
    loginUser: async function(email, password) {
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"));
    }
  }
};
</script>

<style lang='scss'>
.authActions {
  display: flex;
  justify-content: space-between;
}
.textFieldGroup {
  padding: 10px;
}
</style>
