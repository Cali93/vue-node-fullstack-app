<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ product.name }}</v-card-title>

      <v-card-text>{{ product.programme }}</v-card-text>
      <div v-if="isLoggedIn" class="text-xs-center">
        <div v-if="show">
          <v-overflow-btn
            :items="dropdown_dressings"
            color="indigo"
            label="Add product to cart"
            @change="selectBasket"
          ></v-overflow-btn>
          <v-btn
            outline
            round
            ripple
            large
            light
            color="indigo"
            v-on:click="() => addProductToCart(product.id, cartId)"
          >
            <v-icon v-if="!productAdded" color="indigo">shopping_cart</v-icon>
            <v-icon v-else color="green">add_shopping_cart</v-icon>Add to cart
          </v-btn>
      </div>
      </div>
      <div v-else class="text-xs-center">
      <v-btn color="indigo" round outline ripple large light to="/login">
        <v-icon color="indigo">add_shopping_cart</v-icon>
        Add to cart
      </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["product", "show"],
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    dropdown_dressings(){
      return this.$store.getters.dressings.map(dressing => ({
          text: `${dressing.name} - REF${dressing.id}`
        }));
    }
  },
  data() {
    return {
      productAdded: false,
      cartId: null,
      selectedBasket: null
    };
  },
  created(){
    const currentUserId = this.$store.getters.currentUser.id;
    return this.$store.dispatch('getDressings', currentUserId);
  },
  methods: {
    selectBasket: function(val) {
      function subStrAfterChars(str, char, pos) {
        if (pos === "REF") {
          return str.substring(str.indexOf(char) + 1);
        }
      }
      this.selectedBasket = Number(subStrAfterChars(val, 'F', 'REF'));
    },
    addProductToCart: async function(productId) {
      const basketId = this.selectedBasket;
      const products = await this.$http
        .post(
          `http://localhost:5000/basket/${basketId}`,
          {
            productId,
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
      return products;
    }
  }
};
</script>