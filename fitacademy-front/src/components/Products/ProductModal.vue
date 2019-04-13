<template>
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
    <v-btn outline ripple large light v-on:click="() => addProductToCart(course.id)">
      <v-icon color="indigo">add_shopping_cart</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ['course'],
  addProductToCart: async function (courseId) {
  const products = await this.$http
    .post(`http://localhost:5000/basket/1/`, {
      courseId,
      basketId: 1
    }, this.$httpOptions)
    .then(res => {
      this.productAdded = res.data.success;
    });
  setTimeout(() => {
    this.productAdded = false
  }, 2000)
  return products;
},
}
</script>

