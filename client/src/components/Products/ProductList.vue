<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="course in courses" :key="course.id">
        <ProductItem v-bind:course="course" />
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
    // Initialize the state of the component, by setting the courses to an empty array
    data: () => ({
      courses: []
    }),
    // Define the component's different methods
    methods: {
      // Function that will fetch the courses by their category name
      getAllProductsByCategory: async function (categoryName) {
        const courses = await this.$http
          .get(`http://localhost:5000/course/category/${categoryName}`, this.$httpOptions)
          .then(res => {
            this.courses = res.data.courses;
          });
        return courses;
      }
    },
    // When the component is ready, execute the http call to have all the data that we will display
    mounted () {
        // Get the url param (categoryName)
        const categoryName = this.$route.params.categoryName
        // Get all the courses to display
        this.getAllProductsByCategory(categoryName);
    }
  }
</script>

<style scoped>

</style>