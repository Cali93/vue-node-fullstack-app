<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-form v-model="valid">
            <v-container>
              <v-layout class="authContainer" align-center justify-center>
                <v-layout justify-center align-items="center" wrap>
                  <v-flex class="textFieldGroup" xs10>
                    <v-text-field
                      outline
                      color="indigo"
                      v-model="username"
                      :rules="usernameRules"
                      :counter="25"
                      label="Username"
                      required
                      class="textFieldGroup"
                    ></v-text-field>
                  </v-flex>

                  <v-flex class="textFieldGroup" xs10>
                    <v-text-field
                      outline
                      color="indigo"
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex class="textFieldGroup" xs10>
                    <v-text-field
                      outline
                      color="indigo"
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      type="password"
                      :counter="25"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs10>
                    <div class="authActions">
                      <v-btn
                        outline
                        round
                        color="indigo"
                        v-on:click="() => registerUser(email, username, password)"
                      >Register</v-btn>
                      <div>
                        <span class="body-2">OR</span>
                        <v-btn outline round color="dark" to="/login">Login</v-btn>
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
    valid: false,
    user: {},
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => v.length <= 25 || "Username must be less than 25 characters"
    ],
    email: "",
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
    registerUser: async function(email, username, password) {
      return this.$http
        .post(
          `http://localhost:5000/user/register`,
          {
            email,
            username,
            password
          },
          this.$httpOptions
        )
        .then(() => {
          this.$router.push('/login')
        });
    }
  }
};
</script>

<style lang='scss'>
</style>
