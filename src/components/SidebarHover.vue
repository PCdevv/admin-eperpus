<template>
  <aside class="z-100">
    <v-card style="z-index: 1">
      <v-layout>
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item title="E-Perpus" subtitle="Perpustakaan Digital">
              <template v-slot:prepend>
                <v-avatar class="rounded-0">
                  <v-img alt="Logo" :src="Logo"></v-img>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>

          <div class="w-full outline outline-1 outline-slate-400" />

          <v-list density="compact" nav>
            <router-link v-for="menu in menuList" :key="menu" :to="menu.value">
              <v-list-item
                v-if="menu.title !== 'Riwayat'"
                :key="menu.title"
                :value="menu.value"
                active-class="bg-secondary text-primary"
                class="my-1"
              >
                <template v-slot:prepend>
                  <img
                    :alt="'Icon ' + menu.title"
                    :src="menu.icon"
                    class="mr-6 w-[20px] h-auto"
                    :style="{ fill: '#695497' }"
                  />
                </template>
                <template v-slot:title>
                  <h3 class="font-semibold">{{ menu.title }}</h3>
                </template>
              </v-list-item>

              <v-list-group v-else :key="menu.value" :value="menu.title">
                <!-- <v-menu open-on-hover> -->
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <template v-slot:prepend>
                      <img
                        alt="Riwayat"
                        :src="riwayat"
                        class="mr-6 w-[20px] h-auto"
                        :style="{ fill: '#695497' }"
                      />
                    </template>
                    <template v-slot:title>
                      <h3 class="font-semibold">Riwayat</h3>
                    </template>
                  </v-list-item>
                </template>
                <!-- </v-menu> -->
                <v-list-item value="Peminjaman" title="Peminjaman" to="/riwayat-peminjaman">
                </v-list-item>
                <v-list-item value="Denda" title="Denda" to="/riwayat-denda"> </v-list-item>
              </v-list-group>
            </router-link>
            <v-list-item
              @click="logout"
              title="Logout"
              prepend-icon="mdi-logout"
              active-class="bg-secondary text-primary"
              class="my-1 text-red"
            >
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </aside>
</template>

<script setup>
import Logo from '@/assets/icons/Logo.svg'

import dashboard from '@/assets/icons/sidebar/dashboard.svg'
import anggota from '@/assets/icons/sidebar/anggota.svg'
import katalog from '@/assets/icons/sidebar/katalog.svg'
import laporanMasalah from '@/assets/icons/sidebar/laporan_masalah.svg'
import pinjamKembali from '@/assets/icons/sidebar/pinjam_kembali.svg'
import riwayat from '@/assets/icons/sidebar/riwayat.svg'
import umpanBalik from '@/assets/icons/sidebar/umpan_balik.svg'
import usulanBuku from '@/assets/icons/sidebar/usulan_buku.svg'
import config from '@/assets/icons/sidebar/config.svg'
import news from '@/assets/icons/sidebar/news.svg'
import { useAuthStore } from '@/stores/auth'

const { ability, logout } = useAuthStore()

let menuList = []
if (ability == 'ADMIN') {
  menuList = [
    {
      title: 'Dashboard',
      value: '/dashboard',
      icon: dashboard
    },
    {
      title: 'Peminjaman',
      value: '/pinjam',
      icon: pinjamKembali
    },
    {
      title: 'Katalog',
      value: '/katalog',
      icon: katalog
    },
    {
      title: 'Anggota',
      value: '/anggota',
      icon: anggota
    },
    {
      title: 'Riwayat',
      value: '/riwayat-peminjaman',
      icon: riwayat
    },
    {
      title: 'Usulan Buku',
      value: '/usulan-buku',
      icon: usulanBuku
    },
    {
      title: 'Umpan Balik',
      value: '/umpan-balik',
      icon: umpanBalik
    },
    {
      title: 'Laporan Masalah',
      value: '/laporan-masalah',
      icon: laporanMasalah
    },
    {
      title: 'Konfigurasi',
      value: '/konfigurasi',
      icon: config
    },
    {
      title: 'Pengumuman',
      value: '/pengumuman',
      icon: news
    }
  ]
}
if (ability == 'PUSTAKAWAN') {
  menuList = [
    {
      title: 'Dashboard',
      value: '/dashboard',
      icon: dashboard
    },
    {
      title: 'Peminjaman',
      value: '/pinjam',
      icon: pinjamKembali
    },
    {
      title: 'Katalog',
      value: '/katalog',
      icon: katalog
    },
    {
      title: 'Anggota',
      value: '/anggota',
      icon: anggota
    },
    {
      title: 'Riwayat',
      value: '/riwayat-peminjaman',
      icon: riwayat
    },
    {
      title: 'Usulan Buku',
      value: '/usulan-buku',
      icon: usulanBuku
    },
    {
      title: 'Umpan Balik',
      value: '/umpan-balik',
      icon: umpanBalik
    },
    {
      title: 'Laporan Masalah',
      value: '/laporan-masalah',
      icon: laporanMasalah
    }
  ]
}
</script>
