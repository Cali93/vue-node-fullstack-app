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
                  <v-list-tile v-for="course in courses" :key="course.id" avatar v-on="on" v-on:click="() => setCourse(course)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="course.name"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-on:click="(e) => removeProductFromCart(e, course.id)">
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
        v-bind:course="course"
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
    courses: [],
    course: {},
    dialog: false
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    removeProductFromCart: async function(e, courseId) {
      e.stopPropagation();
      const basketId = this.currentUser.basketId;
      const products = await this.$http
        .delete(
          `http://localhost:5000/basket/${basketId}`,
          { data: { courseId, basketId } },
          this.$httpOptions
        )
        .then(res => {
          if (res.data.success) {
            this.courses = this.courses.filter(
              course => course.id !== courseId
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
    setCourse: function(course) {
      this.course = course;
    }
  },
  mounted() {
    const userBasketId = this.$store.getters.currentUser.basketId;
    return this.$http
      .get(`http://localhost:5000/basket/${userBasketId}`)
      .then(res => {
        this.courses = res.data.courses;
      });
  }
};
</script>

<style lang="scss">
</style>
