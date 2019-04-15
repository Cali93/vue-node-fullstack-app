<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ course.name }}</v-card-title>

      <v-card-text>{{ course.programme }}</v-card-text>
      <div v-if="isLoggedIn" class="text-xs-center">
      <v-btn
        outline
        round
        ripple
        large
        light
        color="indigo"
        v-on:click="() => addProductToCart(course.id)"
      >
        <v-icon v-if="!productAdded" color="indigo">shopping_cart</v-icon>
        <v-icon v-else color="green">add_shopping_cart</v-icon>
        Add to cart
      </v-btn>
      </div>
      <v-btn v-else color="indigo" round outline ripple large light to="/login">
        <v-icon color="indigo">add_shopping_cart</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["course"],
  data: () => ({
    productAdded: false
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    addProductToCart: async function(courseId) {
      const currentUser = await this.currentUser;
      const { basketId } = currentUser;

      const products = await this.$http
        .post(
          `http://localhost:5000/basket/${basketId}`,
          {
            courseId,
            basketId
          },
          this.$httpOptions
        )
        .then(res => {
          if (res.data.success) {
            const successSnackbarPayload = {
              message: "The product has been added to your cart !",
              status: "success"
            };
            this.$store.dispatch("toggleSnackbar", successSnackbarPayload);
          } else {
            const errorSnackbarPayload = {
              message: "The product already exists in your cart !",
              status: "error"
            };
            this.$store.dispatch("toggleSnackbar", errorSnackbarPayload);
          }
        });
      setTimeout(() => {
        this.productAdded = false;
      }, 4000);
      return products;
    }
  }
};
</script>

