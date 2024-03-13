<script setup>
import KatalogCreateModal from '@/components/KatalogCreateModal.vue'
import KatalogEditModal from '@/components/KatalogEditModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useHistoryFineStore } from '@/stores/historyFine'

const { state, loadItems } = useHistoryFineStore()

const headers = [
  { title: '#', align: 'start', key: 'id_denda' },
  { title: 'No. Anggota', align: 'start', key: 'anggota.no_anggota' },
  { title: 'Nama Peminjam', align: 'start', key: 'anggota.nama_lengkap' },
  { title: 'Denda', align: 'start', key: 'jumlah_denda' },
  { title: 'Status', align: 'start', key: 'status' },
  { title: 'Konfirmasi Pembayaran', align: 'center', key: 'konfirmasi_pembayaran', sortable: false }
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
      <template v-slot:item.id_denda="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:item.konfirmasi_pembayaran="{ item }">
        <div class="flex justify-center">
          <v-btn
            v-if="item.status == 'Lunas'"
            color="transparent"
            variant="flat"
            icon="mdi-check-circle-outline"
          ></v-btn>
          <v-btn
            v-else
            color="transparent"
            variant="flat"
            icon="mdi-check"
            @click="getBukuDetail(item.id_buku)"
          ></v-btn>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>
