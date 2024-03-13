<script setup>
import KatalogCreateModal from '@/components/KatalogCreateModal.vue'
import KatalogEditModal from '@/components/KatalogEditModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useHistoryBookStore } from '@/stores/historyBook'

const { state, loadItems } = useHistoryBookStore()

const headers = [
  { title: '#', align: 'start', key: 'id_buku' },
  { title: 'Judul Buku', align: 'start', key: 'buku.judul_buku' },
  { title: 'ISBN', align: 'start', key: 'buku.isbn' },
  { title: 'No. Anggota', align: 'start', key: 'anggota.no_anggota' },
  { title: 'Nama Peminjam', align: 'start', key: 'anggota.nama_lengkap' },
  { title: 'Dipinjam Pada', align: 'start', key: 'waktu_peminjaman' },
  { title: 'Dikembalikan Pada', align: 'start', key: 'waktu_pengembalian' }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Riwayat Peminjaman</h1>
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
      <template v-slot:item.id_buku="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
    </v-data-table-server>
  </div>
</template>
