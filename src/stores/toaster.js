import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usetoasterStore = defineStore('toaster', () => {
  const toaster = ref(false)

  const toggleToaster = () => {
    toaster.value = !toaster.value
  }

  return {
    toaster,
    toggleToaster
  }
})
