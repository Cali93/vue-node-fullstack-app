<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout class='loginContainer'>
      <v-card class='loginCard'>
      <v-layout justify-center align-items='center' wrap>
        <v-flex
          xs12
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="25"
            label="Username"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
        >
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            :counter="25"
            required
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-card-actions>
            <v-btn outline round color="orange" v-on:click="() => registerUser(email, username, password)">
              Register
            </v-btn>
          </v-card-actions>
        </v-flex>

      </v-layout>
        </v-card>
      </v-layout>

    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      user: {},
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 25 || 'Username must be less than 25 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Username must be at least 6 characters',
        v => v.length <= 25 || 'Username must be less than 25 characters'
      ]
    }),
    methods: {
      registerUser: async function (email, username, password) {
        const user = await this.$http
          .post(`http://localhost:5000/user/register`, {
              email,
              username,
              password
          } , this.$httpOptions)
          .then(res => {
            this.user = res.data.user;
          });
        return user;
      }
    }
  }
</script>

<style lang='scss'>
  .loginContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
  }
  .loginCard {
    height: 400px;
    padding: 20px;
  }
</style>
