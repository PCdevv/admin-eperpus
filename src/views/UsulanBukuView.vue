<script setup>
import { useBookRequestStore } from '@/stores/bookRequest'

const { state, loadItems } = useBookRequestStore()

const headers = [
  { title: '#', align: 'start', key: 'id_buku_usulan' },
  { title: 'Judul Buku', align: 'start', key: 'judul_buku' },
  { title: 'Pengarang', align: 'start', key: 'pengarang' },
  { title: 'Kategori', align: 'start', key: 'kategori' },
  { title: 'Alasan Usulan', align: 'start', key: 'alasan_usulan' },
  { title: 'Ringkasan', align: 'start', key: 'ringkasan' },
  { title: 'TanggalRilis', align: 'start', key: 'tahun_rilis' }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Usulan Buku</h1>
    <v-data-table-server
      v-model:items-per-page="state.itemsPerPage"
      :search="state.search"
      :headers="headers"
      :items-length="state.totalItems"
      :items="state.serverItems"
      :loading="state.loading"
      item-value="judul_buku"
      @update:options="loadItems"
      class="bg-transparent my-8"
    >
      <template v-slot:top>
        <div class="flex justify-between items-center">
          <v-text-field
            v-model="state.search"
            hide-details
            placeholder="Cari"
            class="ma-2 w-50"
            variant="outlined"
            color="primary"
            density="compact"
            bg-color="white"
          ></v-text-field>
          <div class="lg:w-[600px] md:w-[300px]"></div>
        </div>
      </template>
      <template v-slot:item.id_buku_usulan="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
    </v-data-table-server>
  </div>
</template>
