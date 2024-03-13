<template>
  <div class="pl-24 pr-10 py-14">
    <div>
      <h1 class="text-4xl font-weight-medium">Dashboard</h1>
      <div class="grid grid-cols-3 gap-8 my-8">
        <DashboardCard />
      </div>
    </div>
    <div class="grid grid-cols-2 mt-24">
      <div>
        <h1 class="text-2xl">Anggota yang sering berkunjung</h1>
        <LeaderboardStairs />
      </div>
      <div>
        <h1 class="text-2xl">Anggota yang sering meminjam</h1>
        <LeaderboardStairs />
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardCard from '../components/DashboardCard.vue'
import LeaderboardStairs from '../components/LeaderboardStairs.vue'
</script>
