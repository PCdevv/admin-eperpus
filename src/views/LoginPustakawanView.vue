<script setup>
import bannerAuth from '@/assets/bannerAuth.png'
import Logo from '@/assets/icons/Logo.svg'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const visible = ref(false)
const { payload, loginPustakawan, validation } = useAuthStore()

const windowHeight = window.innerHeight
</script>

<template>
  <div class="bg-white">
    <div class="grid grid-cols-2">
      <div class="flex flex-col items-start p-8">
        <img class="w-[50px] h-auto" :alt="Logo" :src="Logo" />
        <div class="w-full h-full my-8 flex flex-col justify-between">
          <div class="flex flex-col">
            <h1 class="text-4xl font-weight-medium text-primary my-4">Login</h1>
            <div class="">
              <div class="text-subtitle-1">Email</div>
              <v-text-field
                v-model="payload.email"
                :error-messages="validation.value?.email"
                @input="validation.value.email = ''"
                density="compact"
                placeholder="Masukkan email"
                variant="outlined"
                color="primary"
                bg-color="white"
              ></v-text-field>
            </div>
            <div class="">
              <div class="text-subtitle-1">Password</div>
              <v-text-field
                v-model="payload.password"
                :error-messages="validation.value?.password"
                @input="validation.value.password = ''"
                density="compact"
                placeholder="Masukkan password"
                variant="outlined"
                color="primary"
                bg-color="white"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible"
              ></v-text-field>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <v-btn
              @click="loginPustakawan"
              variant="flat"
              color="primary"
              class="w-100 rounded-pill mt-16 mb-4"
              >Login</v-btn
            >
            <!-- <p>Belum punya akun? <a class="text-primary" href="">Register</a></p> -->
          </div>
        </div>
      </div>
      <v-img :alt="bannerAuth" :src="bannerAuth" :max-height="windowHeight" cover>
        <h1 class="flex items-center justify-center fill-height text-justify text-white mx-36">
          "Kamu calon konglomerat ya? kamu harus rajin belajar dan membaca, tapi jangan ditelan
          sendiri. Berbagilah dengan teman-teman yang tak dapat pendidikan." - Wiji Thukul
        </h1>
      </v-img>
    </div>
  </div>
</template>
