<template>
  <v-dialog v-model="dialogConfirm" persistent width="auto" transition="dialog-top-transition">
    <!-- <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot name="btn-activator" />
      </div>
    </template> -->
    <v-card>
      <v-card-title class="text-h5"> <slot name="title"></slot> </v-card-title>
      <v-card-text> <slot name="text"></slot> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="$emit('close-action')"> Batal </v-btn>
        <v-btn color="primary" variant="flat" @click="$emit('confirm-action')">
          <slot name="action"></slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const dialogConfirm = defineModel({
  type: Boolean,
  default: false
})
defineProps({})
defineEmits(['confirm-action', 'close-action'])
</script>
