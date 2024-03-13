<template>
  <v-snackbar v-model="toaster" :timeout="5000" location="top right" color="secondary">
    <slot />
    <template v-slot:actions>
      <v-btn color="primary" variant="text" @click="$emit('close-toast')"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
defineEmits(['close-toast'])
const toaster = defineModel({
  type: Boolean,
  default: false
})
</script>
