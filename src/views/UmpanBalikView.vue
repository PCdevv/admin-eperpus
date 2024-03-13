<script setup>
import { useFeedbackStore } from '@/stores/feedback'

const { state, loadItems } = useFeedbackStore()

const headers = [
  { title: '#', align: 'start', key: 'id_umpan_balik' },
  { title: 'Subjek', align: 'start', key: 'subjek' },
  { title: 'Isi', align: 'start', key: 'isi' },
  { title: 'Lampiran', align: 'start', key: 'lampiran' },
  { title: 'Nama', align: 'start', key: 'nama' },
  { title: 'Email', align: 'start', key: 'email' }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Umpan Balik</h1>
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
      <template v-slot:item.id_umpan_balik="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
    </v-data-table-server>
  </div>
</template>
