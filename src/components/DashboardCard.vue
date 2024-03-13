<template>
  <div class="drop-shadow-xl" v-for="stat in statList" :key="stat">
    <v-card variant="flat" class="d-flex justify-start align-center rounded-xl pa-4">
      <div class="h-[100px] w-auto d-flex align-center">
        <img :alt="'Icon ' + stat.subtitle" :src="stat.icon" class="w-[50px] h-auto" />
      </div>
      <div>
        <v-card-title class="text-h4 font-weight-bold text-primary">{{ stat.title }}</v-card-title>
        <v-card-subtitle class="text-h6 font-weight-bold text-black">{{
          stat.subtitle
        }}</v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import buku_dikembalikan from '@/assets/icons/dashboard/buku_dikembalikan.svg'
import denda from '@/assets/icons/dashboard/denda.svg'
import buku_dipinjam from '@/assets/icons/dashboard/buku_dipinjam.svg'
import anggota from '@/assets/icons/dashboard/anggota.svg'
import pengunjung from '@/assets/icons/dashboard/pengunjung.svg'
import buku from '@/assets/icons/dashboard/buku.svg'

const statList = [
  {
    title: '23',
    subtitle: 'Buku',
    icon: buku
  },
  {
    title: '450',
    subtitle: 'Anggota',
    icon: anggota
  },
  {
    title: '100000',
    subtitle: 'Denda',
    icon: denda
  },
  {
    title: '12',
    subtitle: 'Pengunjung Hari Ini',
    icon: pengunjung
  },
  {
    title: '20',
    subtitle: 'Buku Dipinjam',
    icon: buku_dipinjam
  },
  {
    title: '20',
    subtitle: 'Buku Dikembalikan',
    icon: buku_dikembalikan
  }
]
</script>
