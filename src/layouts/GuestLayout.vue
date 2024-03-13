<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { token } = useAuthStore()
if (token) {
  router.push('/dashboard')
}
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
