<script setup>
import KonfigurasiCreateModal from '@/components/KonfigurasiCreateModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useConfigurationStore } from '@/stores/configuration'

const { state, loadItems } = useConfigurationStore()

const headersPenerbit = [
  { title: '#', align: 'start', key: 'id_penerbit' },
  { title: 'Nama Penerbit', align: 'start', key: `nama_penerbit` },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
const headersPengarang = [
  { title: '#', align: 'start', key: 'id_pengarang' },
  { title: 'Nama Pengarang', align: 'start', key: `nama_pengarang` },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
const headersKategori = [
  { title: '#', align: 'start', key: 'id_kategori' },
  { title: 'Nama Kategori', align: 'start', key: `nama_kategori` },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
const headersSubkategori = [
  { title: '#', align: 'start', key: 'id_subkategori' },
  { title: 'Nama Subkategori', align: 'start', key: `nama_subkategori` },
  { title: 'Kategori', align: 'start', key: `kategori.nama_kategori` },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
const headersRak = [
  { title: '#', align: 'start', key: 'id_rak' },
  { title: 'Nama Rak', align: 'start', key: `nama_rak` },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <h1 class="text-4xl font-medium">Konfigurasi</h1>
    <v-data-table-server
      v-model:items-per-page="state.itemsPerPage"
      :search="state.search"
      :headers="
        state.filter.title == 'Penerbit'
          ? headersPenerbit
          : state.filter.title == 'Pengarang'
            ? headersPengarang
            : state.filter.title == 'Kategori'
              ? headersKategori
              : state.filter.title == 'Subkategori'
                ? headersSubkategori
                : state.filter.title == 'Rak'
                  ? headersRak
                  : headersRak
      "
      :items-length="state.totalItems"
      :items="state.serverItems"
      :loading="state.loading"
      item-value="nama"
      @update:options="loadItems({ page: 1, itemsPerPage: 10 })"
      class="bg-transparent my-8"
    >
      <template v-slot:top>
        <div class="flex justify-between items-center">
          <v-select
            :items="[
              {
                title: 'Penerbit',
                value: 'penerbit'
              },
              {
                title: 'Pengarang',
                value: 'pengarang'
              },
              {
                title: 'Kategori',
                value: 'kategori'
              },
              {
                title: 'Subkategori',
                value: 'subkategori'
              },
              {
                title: 'Rak',
                value: 'rak'
              }
            ]"
            item-title="title"
            item-value="value"
            density="compact"
            placeholder="Filter"
            variant="outlined"
            color="primary"
            bg-color="white"
            class="ma-2 w-50"
            return-object
            v-model="state.filter"
            @update:model-value="loadItems({ page: 1, itemsPerPage: 10 })"
          ></v-select>
          <div class="lg:w-[600px] md:w-[300px]"></div>
          <KonfigurasiCreateModal v-model="state.dialogModalCreate">
            <template v-slot:btn-activator>
              <v-btn variant="flat" color="primary">Tambah</v-btn>
            </template>
            <template v-slot:modal-title>
              <span class="text-h5">Tambah {{ state.filter.title }}</span>
            </template>
            <template v-slot:modal-nama>
              <div class="text-subtitle-1">Nama {{ state.filter.title }}*</div>
            </template>
          </KonfigurasiCreateModal>
        </div>
      </template>
      <template v-slot:item.aksi="{ item }">
        <div class="flex justify-center">
          <KonfigurasiCreateModal v-model="state.dialogModalEdit">
            <template v-slot:btn-activator>
              <v-btn
                color="transparent"
                variant="flat"
                icon="mdi-pencil"
                @click="getBukuDetail(item.id_buku)"
              ></v-btn>
            </template>
            <template v-slot:modal-title>
              <span class="text-h5">Edit {{ state.filter.title }}</span>
            </template>
            <template v-slot:modal-nama>
              <div class="text-subtitle-1">Nama {{ state.filter.title }}*</div>
            </template>
          </KonfigurasiCreateModal>
          <KonfirmasiDialog v-model="state.dialogConfirm" @click-action="deleteItem(item.id_buku)">
            <template v-slot:btn-activator>
              <v-btn color="transparent" variant="flat" icon="mdi-delete"></v-btn>
            </template>
            <template #title> Konfirmasi hapus </template>
            <template #text> Apakah Anda yakin ingin menghapus data? </template>
            <template #action> Hapus </template>
          </KonfirmasiDialog>
        </div>
      </template>
      <template v-slot:item.id_buku="{ item, index }">
        <div>{{ index + 1 }}</div>
      </template>
    </v-data-table-server>
    <SnackbarToast v-model="state.toaster" @close-toast="state.toaster = false">
      <h1>{{ state.toasterMessage }}</h1>
    </SnackbarToast>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
