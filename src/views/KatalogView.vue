<script setup>
import KatalogCreateModal from '@/components/KatalogCreateModal.vue'
import KatalogEditModal from '@/components/KatalogEditModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useBookStore } from '@/stores/book'

const { state, loadItems, deleteItem, getBukuDetail, resetModal } = useBookStore()

const headers = [
  { title: '#', align: 'start', key: 'id_buku' },
  { title: 'Judul Buku', align: 'start', key: 'judul_buku' },
  { title: 'ISBN', align: 'start', key: 'isbn' },
  { title: 'Tahun Terbit', align: 'start', key: 'tahun_terbit' },
  { title: 'Jumlah Halaman', align: 'start', key: 'jumlah_halaman' },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Katalog Buku</h1>
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
            placeholder="Cari judul buku..."
            class="ma-2 w-50"
            variant="outlined"
            color="primary"
            density="compact"
            bg-color="white"
          ></v-text-field>
          <div class="lg:w-[600px] md:w-[300px]"></div>
          <KatalogCreateModal v-model="state.dialogModalCreate">
            <template v-slot:btn-activator>
              <v-btn variant="flat" color="primary" @click="resetModal">Tambah</v-btn>
            </template>
            <template v-slot:modal-title>
              <span class="text-h5">Tambah Buku</span>
            </template>
          </KatalogCreateModal>
        </div>
      </template>
      <template v-slot:item.aksi="{ item }">
        <div class="flex justify-center">
          <v-btn
            color="transparent"
            variant="flat"
            icon="mdi-pencil"
            @click="getBukuDetail(item.id_buku)"
          ></v-btn>
          <v-btn
            color="transparent"
            variant="flat"
            icon="mdi-delete"
            @click="
              (state.dialogConfirm = true),
                (state.dialogConfirm = true),
                (state.id_buku = item.id_buku)
            "
          ></v-btn>
        </div>
      </template>
      <template v-slot:item.id_buku="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
    </v-data-table-server>
    <SnackbarToast v-model="state.toaster" @close-toast="state.toaster = false">
      <h1>{{ state.toasterMessage }}</h1>
    </SnackbarToast>
    <KatalogEditModal>
      <template v-slot:modal-title>
        <span class="text-h5">Edit Buku</span>
      </template>
    </KatalogEditModal>
    <KonfirmasiDialog
      v-model="state.dialogConfirm"
      @close-action="state.dialogConfirm = false"
      @confirm-action="deleteItem(state.id_buku)"
    >
      <template #title> Konfirmasi hapus </template>
      <template #text> Apakah Anda yakin ingin menghapus data? </template>
      <template #action> Hapus </template>
    </KonfirmasiDialog>
  </div>
</template>
