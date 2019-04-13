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
          <v-btn outline round color="orange" v-on:click="() => loginUser(email, password)">Login</v-btn>
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
      user: {},
      valid: false,
      email: localStorage.getItem('email'),
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
      loginUser: async function (email, password) {
        this.$store.dispatch('login', { email, password }).then(() => this.$router.push('/'))
        // const user = await this.$http
        //   .post(`http://localhost:5000/user/login`, {
        //     email,
        //     password
        //   }, this.$httpOptions)
        //   .then(res => {
        //     if (res.data.success){
        //       // localStorage.setItem('email', res.data.user.email);
        //       // this.user = res.data.user;
        //       this.$router.push('/');
        //     }
        //   });
        // return user;
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
    height: 350px;
    padding: 20px;
  }
</style>
