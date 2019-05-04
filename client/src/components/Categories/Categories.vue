<template>
  <v-container fluid>
    <h3>Categories</h3>
    <v-layout row wrap justify-space-between align-center>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Category 1</h3>
              <div>Une description de la category 1</div>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round color="indigo" :to="{ name: 'category', params: { categoryName: 'individuel' }}">See Category</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Category 2</h3>
              <div>Une description de la category 2</div>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round :to="{ name: 'category', params: { categoryName: 'collectif' }}" color="indigo">See Category</v-btn>
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
