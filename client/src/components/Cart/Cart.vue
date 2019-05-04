<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-container fluid>
          <v-card>
            <v-layout row wrap justify-center>
              <v-flex xs10>
                <v-list subheader>
                  <v-subheader>Welcome to your cart {{ currentUser.username }} !</v-subheader>
                  <v-list-tile v-for="product in products" :key="product.id" avatar v-on="on" v-on:click="() => setProduct(product)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="product.name"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-on:click="(e) => removeProductFromCart(e, product.id)">
                      <v-icon color="red">delete_forever</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </template>
      <ProductModal
        :show="false"
        v-bind:product="product"
      />
    </v-dialog>
  </div>
</template>

<script>
import ProductModal from "../Products/ProductModal";
export default {
  components: {
    ProductModal
  },
  data: () => ({
    products: [],
    product: {},
    dialog: false
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    removeProductFromCart: async function(e, productId) {
      // stopPropagation allows us to not open the product modal when clicking on the delete btn
      e.stopPropagation();
      const basketId = this.currentUser.basketId;
      const products = await this.$http
        .delete(
          `http://localhost:5000/basket/${basketId}`,
          { data: { productId, basketId } },
          this.$httpOptions
        )
        .then(res => {
          if (res.data.success) {
            // remove the product from the local state
            this.products = this.products.filter(
              product => product.id !== productId
            );
            const successSnackbarPayload = {
              message: "The product has been deleted from your cart !",
              status: "success"
            };
            this.$store.dispatch("toggleSnackbar", successSnackbarPayload);
          } else {
            const errorSnackbarPayload = {
              message: res.data.error,
              status: "error"
            };
            this.$store.dispatch("toggleSnackbar", errorSnackbarPayload);
          }
        });
      return products;
    },
    // set the product to show in the modal
    setProduct: function(product) {
      this.product = product;
    }
  },
  mounted() {
    // Once the component is mounted, fetch user's products
    const userBasketId = this.$store.getters.currentUser.basketId;
    return this.$http
      .get(`http://localhost:5000/basket/${userBasketId}`)
      .then(res => {
        this.products = res.data.products;
      });
  }
};
</script>

<style lang="scss">
</style>
