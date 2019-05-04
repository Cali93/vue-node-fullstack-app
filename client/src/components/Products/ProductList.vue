<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="product in products" :key="product.id">
        <ProductItem v-bind:product="product" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ProductItem from './ProductItem';
  export default {
    components: {
      ProductItem
    },
    // Initialize the state of the component, by setting the products to an empty array
    data: () => ({
      products: []
    }),
    // Define the component's different methods
    methods: {
      // Function that will fetch the products by their category name
      getAllProductsByCategory: async function (categoryName) {
        const products = await this.$http
          .get(`http://localhost:5000/product/category/${categoryName}`, this.$httpOptions)
          .then(res => {
            this.products = res.data.products;
          });
        return products;
      }
    },
    // When the component is ready, execute the http call to have all the data that we will display
    mounted () {
        // Get the url param (categoryName)
        const categoryName = this.$route.params.categoryName
        // Get all the products to display
        this.getAllProductsByCategory(categoryName);
    }
  }
</script>

<style scoped>

</style>