<template>
  <v-container fluid>
    <h3>Categories</h3>
    <v-layout row wrap justify-space-between align-center>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Jeans</h3>
              <p>
                Looking for a specific jeans ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round color="indigo" :to="{ name: 'category', params: { categoryName: 'jeans' }}">
              Browse jeans
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Shirts</h3>
              <p>
                Looking for a specific shirt ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round color="indigo" :to="{ name: 'category', params: { categoryName: 'shirts' }}">
              Browse shirts
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/1030946/pexels-photo-1030946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Sweaters</h3>
              <p>
                Looking for a specific sweater ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round color="indigo" :to="{ name: 'category', params: { categoryName: 'sweater' }}">
              Browse sweaters
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card class="card">
          <v-img src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Accessories</h3>
              <p>
                Looking for a watch, a hat or anything looking nice ? You'll find exactly what you need by clicking the button below.
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="cardActions">
            <v-btn outline round :to="{ name: 'category', params: { categoryName: 'accessories' }}" color="indigo">
              Browse accessories
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
