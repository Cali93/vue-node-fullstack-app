<template>
  <v-card hover color="amber lighten-2" class="card">
    <v-layout row justify-space-between wrap align-center>
      <v-flex xs12 sm12 md8>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ course.name }}</div>
            <span class="subheading">{{ course.programme }}</span>
          </div>
        </v-card-title>
      </v-flex>

      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">

          <template v-slot:activator="{ on }">
            <v-flex xs6 sm6 md2>
              <v-btn v-on="on" fab light large>
                <v-icon color="indigo">remove_red_eye</v-icon>
              </v-btn>
            </v-flex>
          </template>
          <ProductModal v-bind:course="course" />
        </v-dialog>
      </div>

    </v-layout>
  </v-card>
</template>

<script>
  import ProductModal from './ProductModal'
  export default {
    components: {
      ProductModal
    },
    props: ['course'],
    data: () => ({
      productAdded: false,
      productRemoved: false,
      dialog: false
    }),
    methods: {
      removeProductFromCart: async function (courseId) {
        const products = await this.$http
          .delete(`http://localhost:5000/basket/1/`, {
            data: {
              courseId,
              basketId: 1
            }
          }, this.$httpOptions)
          .then(res => {
            this.productRemoved = res.data.success;
          });
        this.productAdded = false
        setTimeout(() => {
          this.productRemoved = false
        }, 2000)
        return products
      }
    }
  }
</script>

<style lang='scss' scoped>
  .card {
    padding: 10px;
    margin: 10px;

    .secondActionBtn {
      float: right;
    }
  }
</style>