<template>
  <div>
  <v-card>
    <v-card-title
      class="headline grey lighten-2"
      primary-title
    >
      {{ course.name }}
    </v-card-title>

    <v-card-text>
      {{ course.programme }}
    </v-card-text>

    <v-divider></v-divider>
    <v-btn v-if="isLoggedIn" outline round ripple large light v-on:click="() => addProductToCart(course.id)">
      <v-icon v-if="!productAdded" color="indigo">shopping_cart</v-icon>
      <v-icon v-else color="green">add_shopping_cart</v-icon>
    </v-btn>
    <v-btn v-else outline ripple large light to="/login">
      <v-icon color="indigo">add_shopping_cart</v-icon>
    </v-btn>
  </v-card>
  </div>
</template>

<script>
import Snackbar from '../common/Snackbar';
export default {
  components: {
    Snackbar
  },
  props: ['course'],
  data: () => ({
    productAdded: false
  }),
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    currentUser () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    addProductToCart: async function (courseId) {
      const currentUser = await this.currentUser;
      const { basketId } = currentUser;

      const products = await this.$http
        .post(`http://localhost:5000/basket/${basketId}`, {
          courseId,
          basketId
        }, this.$httpOptions)
        .then(res => {
          this.productAdded = res.data.success;
        });
        setTimeout(() => {
          this.productAdded = false
        }, 4000)
      return products;
    },
  }
}
</script>

