<template>
  <div>
    <v-container fluid>
        <v-card>
      <v-layout row wrap justify-center>
        <v-flex xs10>
        <v-list subheader>
          <v-subheader>Welcome to your cart !</v-subheader>
          <v-list-tile
            v-for="course in courses"
            :key="course.id"
            avatar
            @click=""
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="course.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action v-on:click="() => removeProductFromCart(course.id)">
              <v-icon v-if="productRemoved" color="green">delete</v-icon>
              <v-icon v-else color="red">delete_forever</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        </v-flex>
      </v-layout>
        </v-card>
    </v-container>
  </div>  
</template>

<script>
export default {
  data: () => ({
    courses: []
  }),
  computed: {
    currentUser () {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    removeProductFromCart: async function (courseId) {
      const basketId = this.currentUser.basketId;
      const products = await this.$http
        .delete(`http://localhost:5000/basket/${basketId}`, { data: { courseId, basketId } }, this.$httpOptions)
        .then(res => {
          this.productRemoved = res.data.success;
        });
      return products
    }
  },
  mounted() {
    const userBasketId = this.$store.getters.currentUser.basketId
    return this.$http.get(`http://localhost:5000/basket/${userBasketId}`).then(
      res => {
        this.courses = res.data.courses;
      }
    )
  }
}
</script>

<style lang="scss">

</style>
