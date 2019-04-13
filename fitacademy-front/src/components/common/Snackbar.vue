<template>
  <v-card>
    <v-snackbar
      v-model="snackbar"
      :color="status"
      :left="left"
      :right="right"
      :value="isOpen"
      :top="top"
      :bottom="bottom"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="isOpen = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props: ['isOpen', 'message', 'status'],
    data: () => ({
      isOpen: this.isOpen,
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right,
      color: this.status,
      mode: 'multi-line',
      timeout: 6000,
      text: this.message
    })
  }
</script>