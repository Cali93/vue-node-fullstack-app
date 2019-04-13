<template>
  <div>
    <v-layout>
    <v-flex xs12 sm12>
      <v-card class="card">
        <!-- <v-card-title primary-title> -->
              <v-layout align-center>
    <v-flex xs3 sm1 class="goBackBtn">
    <v-btn outline round color="indigo" to="/">
          <v-icon>arrow_back</v-icon>
    </v-btn>
                </v-flex>
    <v-flex xs9 sm11>
            <!-- <v-card-title primary-title>  -->
            <h3 class="headline mb-0" >Category {{ $route.params.categoryName }}</h3>
        <!-- </v-card-title> -->
                </v-flex>

  </v-layout>
        <!-- </v-card-title> -->
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>

.goBackBtn {
  margin: 0 24px;
}
.card {
  padding: 10px 0px;
  margin: 0px;
}

</style>