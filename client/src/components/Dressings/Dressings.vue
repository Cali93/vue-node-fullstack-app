<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs10>
        <v-card>
          <v-card-text>
            <h3>Add a new dressing</h3>
            <v-text-field color="indigo" v-model="form.name" label="Dressing name"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="indigo" round outline :loading="loading" v-on:click="addDressing">
              <v-icon left dark>add</v-icon>Add dressing
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs10 sm8 md4 v-for="dressing in dressings" :key="dressing.id" class="dressingCard">
        <v-card>
          <v-card-text>
            <h3>{{ dressing.name }}</h3>
            <div class="dressingActions">
            <v-btn color="indigo" round outline :loading="loading"
              :to="{ name: 'dressing', params: { basketId: dressing.id }}">
              <v-icon dark>remove_red_eye</v-icon>
            </v-btn>
            <!-- <v-btn color="amber" round outline :loading="loading" v-on:click="() => editDressing(dressing.id)">
              <v-icon dark>edit</v-icon>
            </v-btn> -->
            <v-btn color="red" round outline :loading="loading" v-on:click="() => deleteDressing(dressing.id)">
              <v-icon dark>delete</v-icon>
            </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  pageTitle: "My Dressings",
  data() {
    return {
      loading: false,
      form: {
        name: ""
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    dressings() {
      return this.$store.getters.dressings;
    }
  },
  methods: {
    addDressing: async function() {
      const dressingName = this.form.name;
      const userId = this.currentUser.id;
      this.$store.dispatch("addDressing", { dressingName, userId });
    },
    deleteDressing: async function(dressingId) {
      this.$store.dispatch("deleteDressing", dressingId);
    }
  }
};
</script>

<style lang="scss">
.dressingCard {
  margin: 30px;
  .dressingActions {
    display: flex;
    justify-content: space-between;
  }
}
</style>