<template>
    <v-snackbar
      v-model="snackbarInfos.isOpen"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :color="snackbarInfos.status"
      :vertical="mode === 'vertical'"
    >
      <h3>{{ snackbarInfos.message }}</h3>
    </v-snackbar>
</template>

<script>
  export default {
    computed: {
      snackbarInfos(){ return this.$store.getters.snackbar }
    },
    data () {
      return {
      y: 'top',
      x: 'left',
      mode: 'multi-line',
      timeout: 3000,
      text: "Product added"
      }
    },
  }
</script>