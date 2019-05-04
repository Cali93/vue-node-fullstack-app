<template>
  <v-card hover class="card">
    <v-layout justify-center wrap align-center>
      <v-flex xs12>
          <div class="imageContainer">
            <v-img
              contain
              gradient="to top left, rgba(63, 81, 181, .1), rgba(255, 255, 255,.3)"
              :src="require(`../../assets/products/product-${course.id}.jpg`)"
              :alt="course.name"
              aspect-ratio="3"
            ></v-img>
          </div>
      </v-flex>
      <v-flex xs10>
        <div class="productContent">
          <div class="headline">{{ course.name }}</div>
          <p class="subheading">{{ course.programme }}</p>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <div class="text-xs-right">
              <v-btn v-on="on" color="indigo" round outline light large>
                <v-icon color="indigo">remove_red_eye</v-icon>
              </v-btn>
            </div>
          </template>
          <ProductModal v-bind:course="course" :show="true"/>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import ProductModal from "./ProductModal";
export default {
  components: {
    ProductModal
  },
  props: ["course"],
  data: () => ({
    dialog: false
  })
};
</script>

<style lang='scss' scoped>
.card {
  margin: 10px;
  .productContent {
    padding: 20px 0 0 7px;
  }
  .imageContainer {
    width: 100%;
  }
  .secondActionBtn {
    float: right;
  }
}
</style>