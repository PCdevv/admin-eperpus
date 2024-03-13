<script setup>
import KatalogCreateModal from '@/components/KatalogCreateModal.vue'
import KatalogEditModal from '@/components/KatalogEditModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useBookStore } from '@/stores/book'

const { state, loadItems, deleteItem, getBukuDetail, resetModal } = useBookStore()

const headers = [
  { title: '#', align: 'start', key: 'id_buku' },
  { title: 'Banner', align: 'start', key: 'judul_buku' },
  { title: 'Judul Pengumuman', align: 'start', key: 'isbn' },
  { title: 'Isi Pengumuman', align: 'start', key: 'tahun_terbit' },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Pengumuman</h1>
    <v-data-table-server
      v-model:items-per-page="state.itemsPerPage"
      :search="state.search"
      :headers="headers"
      :items-length="state.totalItems"
      :items="[]"
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
            placeholder="Cari judul pengumuman..."
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
    <h1 class="text-2xl">Pengumuman Terbaru</h1>
    <v-card
      variant="flat"
      class="d-flex justify-center align-center pa-4 my-4"
      color="black"
      height="200px"
    >
      Banner Pengumuman
    </v-card>
    <v-card variant="outlined" class="d-flex justify-start align-center pa-4 my-2">
      <div>
        <v-card-title class="text-h5 font-weight-bold text-black">Lorem Ipsum</v-card-title>
        <v-card-subtitle class="text-subtitle text-black text-wrap text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio placeat, aspernatur
          natus ad perspiciatis delectus velit ut aliquid maiores alias qui hic ipsam enim mollitia
          pariatur dicta. Consequuntur, omnis repellendus. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Distinctio placeat, aspernatur natus ad perspiciatis delectus velit ut
          aliquid maiores alias qui hic ipsam enim mollitia pariatur dicta. Consequuntur, omnis
          repellendus.
        </v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>
