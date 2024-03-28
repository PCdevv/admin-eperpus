<template>
  <div class="bg-white relative">
    <div
      class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-1/2"
    >
      <h1 class="text-4xl font-bold text-white mb-2">Daftar Kunjungan</h1>
      <div class="grid grid-cols-12">
        <v-text-field
          v-model="no_anggota"
          @keyup.enter="kunjungan"
          class="col-span-10"
          density="compact"
          placeholder="Nomor Anggota"
          variant="outlined"
          color="primary"
          bg-color="white"
        ></v-text-field>
        <v-btn
          @click="kunjungan"
          variant="flat"
          color="primary"
          class="w-100 rounded-pill col-span-2 ml-2"
          icon="mdi-arrow-left-bottom"
        ></v-btn>
      </div>
      <h1 v-if="message" class="text-subtitle text-white">{{ message }} telah berkunjung</h1>
    </div>
    <div class="grid grid-cols-2">
      <v-img
        style="transform: scaleX(-1)"
        :alt="bannerAuth"
        :src="bannerAuth"
        :max-height="windowHeight"
        cover
      >
        <div class="flex flex-col items-end p-8">
          <img style="transform: scaleX(-1)" class="w-[50px] h-auto" :alt="Logo" :src="Logo" />
        </div>
      </v-img>
      <v-img :alt="bannerAuth" :src="bannerAuth" :max-height="windowHeight" cover />
    </div>
  </div>
</template>

<script setup>
import bannerAuth from '@/assets/bannerAuth.png'
import Logo from '@/assets/icons/Logo.svg'
import { axiosClient } from '@/plugins/axiosClient'
import { ref } from 'vue'

const windowHeight = window.innerHeight
const message = ref('')
const no_anggota = ref('')

const kunjungan = async () => {
  try {
    const response = await axiosClient.post(`/kunjungan`, {
      no_anggota: no_anggota.value
    })
    console.log(response)
    if (response.data.success) {
      message.value = response.data.data.anggota.nama_lengkap
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
