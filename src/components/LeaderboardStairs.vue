<template>
  <div class="flex flex-col items-end mt-24">
    <div class="flex items-center">
      <h1 class="text-xl">Peringkat 1</h1>
      <img :alt="IconTangga1" :src="IconTangga1" class="h-[50px] w-auto" />
    </div>
    <div class="flex items-center">
      <h1 class="text-xl">Peringkat 2</h1>
      <img :alt="IconTangga2" :src="IconTangga2" class="h-[50px] w-auto" />
    </div>
    <div class="flex items-center">
      <h1 class="text-xl">Peringkat 3</h1>
      <img :alt="IconTangga3" :src="IconTangga3" class="h-[50px] w-auto" />
    </div>
    <div class="flex items-center">
      <h1 class="text-xl">Peringkat 4</h1>
      <img :alt="IconTangga4" :src="IconTangga4" class="h-[50px] w-auto" />
    </div>
    <div class="flex items-center">
      <h1 class="text-xl">Peringkat 5</h1>
      <img :alt="IconTangga5" :src="IconTangga5" class="h-[50px] w-auto" />
    </div>
  </div>
</template>

<script setup>
import IconTangga1 from '@/assets/icons/dashboard/IconTangga1.svg'
import IconTangga2 from '@/assets/icons/dashboard/IconTangga2.svg'
import IconTangga3 from '@/assets/icons/dashboard/IconTangga3.svg'
import IconTangga4 from '@/assets/icons/dashboard/IconTangga4.svg'
import IconTangga5 from '@/assets/icons/dashboard/IconTangga5.svg'
</script>
