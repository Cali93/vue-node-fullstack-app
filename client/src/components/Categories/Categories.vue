<template>
  <v-container fluid>
    <h3>Categories</h3>
    <v-layout row wrap justify-space-between align-center>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Individual courses</h3>
              <p>
                Looking for a specific individual course ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round color="indigo" :to="{ name: 'category', params: { categoryName: 'individual' }}">
              Browse courses
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Collective courses</h3>
              <p>
                Looking for courses with other people ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round :to="{ name: 'category', params: { categoryName: 'collective' }}" color="indigo">
              Browse courses
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
};
</script>

<style lang='scss'>
  .card {
    margin: 10px;
  }
  .cardActions {
    display: flex;
    justify-content: flex-end;
  }
</style>
