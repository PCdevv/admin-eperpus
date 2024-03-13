<script setup>
import AnggotaCreateModal from '@/components/AnggotaCreateModal.vue'
import KonfirmasiDialog from '@/components/KonfirmasiDialog.vue'
import SnackbarToast from '@/components/SnackbarToast.vue'
import { useMemberStore } from '@/stores/member'

const { state, loadItems, deleteItem, resetModal } = useMemberStore()

const headers = [
  { title: '#', align: 'start', key: 'id_anggota' },
  { title: 'Nama Lengkap', align: 'start', key: 'nama_lengkap' },
  { title: 'Telp', align: 'start', key: 'no_telp' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Kategori Anggota', align: 'start', key: 'kategori_anggota' },
  { title: 'Password', align: 'start', key: 'password' },
  { title: 'Verified', align: 'center', key: 'verified', sortable: false },
  { title: 'Aksi', align: 'center', key: 'aksi', sortable: false }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <SnackbarToast v-model="state.toaster" @close-toast="state.toaster = false">
      <h1>{{ state.toasterMessage }}</h1>
    </SnackbarToast>
    <h1 class="text-4xl font-medium">Anggota</h1>
    <v-data-table-server
      v-model:items-per-page="state.itemsPerPage"
      :search="state.search"
      :headers="headers"
      :items-length="state.totalItems"
      :items="state.serverItems"
      :loading="state.loading"
      item-value="judul_anggota"
      @update:options="loadItems"
      class="bg-transparent my-8"
    >
      <template v-slot:top>
        <div class="flex justify-between items-center">
          <v-text-field
            v-model="state.search"
            hide-details
            placeholder="Cari nama anggota..."
            class="ma-2 w-50"
            variant="outlined"
            color="primary"
            density="compact"
            bg-color="white"
          ></v-text-field>
          <div class="lg:w-[600px] md:w-[300px]"></div>
          <AnggotaCreateModal v-model="state.dialogModalCreate">
            <template v-slot:btn-activator>
              <v-btn variant="flat" color="primary" @click="resetModal">Tambah</v-btn>
            </template>
            <template v-slot:modal-title>
              <span class="text-h5">Tambah Anggota</span>
            </template>
          </AnggotaCreateModal>
        </div>
      </template>
      <template v-slot:item.id_anggota="{ index }">
        <div>{{ index + 1 }}</div>
      </template>
      <template v-slot:item.password>
        <div>Encrypted</div>
      </template>
      <template v-slot:item.verified="{ item }">
        <div class="flex justify-center">
          <v-btn
            v-if="item.verified"
            color="transparent"
            variant="flat"
            icon="mdi-check-circle-outline"
          ></v-btn>
          <v-btn v-else color="transparent" variant="flat" icon="mdi-close"></v-btn>
        </div>
      </template>
      <template v-slot:item.aksi="{ item }">
        <div class="flex justify-center">
          <!-- <v-btn
            color="transparent"
            variant="flat"
            icon="mdi-pencil"
            @click="getAnggotaDetail(item.id_anggota)"
          ></v-btn> -->
          <v-btn
            color="transparent"
            variant="flat"
            icon="mdi-delete"
            @click="
              (state.dialogConfirm = true),
                (state.dialogConfirm = true),
                (state.id_anggota = item.id_anggota)
            "
          ></v-btn>
        </div>
      </template>
    </v-data-table-server>
    <KonfirmasiDialog
      v-model="state.dialogConfirm"
      @close-action="state.dialogConfirm = false"
      @confirm-action="deleteItem(state.id_anggota)"
    >
      <template #title> Konfirmasi hapus </template>
      <template #text> Apakah Anda yakin ingin menghapus data? </template>
      <template #action> Hapus </template>
    </KonfirmasiDialog>
  </div>
</template>
