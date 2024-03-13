<script setup>
import { RouterView, useRouter } from 'vue-router'
import SidebarHover from '@/components/SidebarHover.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { token } = useAuthStore()
if (!token) {
  router.push('/login-pustakawan')
}
</script>

<template>
  <div>
    <SidebarHover />
    <RouterView />
  </div>
</template>
