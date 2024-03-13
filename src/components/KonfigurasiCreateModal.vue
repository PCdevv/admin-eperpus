<template>
  <div>
    <v-dialog v-model="dialogModal" width="512" transition="dialog-top-transition">
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          @click="(nama = null), (kode_rak = null), (kategori = null), getDataKategori()"
        >
          <slot name="btn-activator" />
        </div>
      </template>
      <form enctype="multipart/form-data">
        <v-card>
          <v-card-title>
            <slot name="modal-title" />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <slot name="modal-nama" />
                  <v-text-field
                    type="text"
                    density="compact"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    v-model="nama"
                    :error-messages="validation"
                  ></v-text-field>
                </v-col>
                <v-col v-if="state.filter.title == 'Subkategori'" cols="12">
                  <div class="text-subtitle-1">Kategori</div>
                  <v-autocomplete
                    :items="kategoriItems.value"
                    item-text="title"
                    item-value="value"
                    density="compact"
                    placeholder="Pilih Kategori"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation"
                    v-model="kategori"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col v-if="state.filter.title == 'Rak'" cols="12">
                  <div class="text-subtitle-1">Kode Rak</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    v-model="kode_rak"
                    :error-messages="validation"
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="h-[10px]"></div>
              <small>*wajib diisi</small>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="state.dialogModalCreate = false">
                  Tutup
                </v-btn>
                <v-btn
                  v-if="state.filter.title == 'Penerbit'"
                  color="primary"
                  variant="flat"
                  @click.prevent="tambahPenerbit"
                >
                  Konfirmasi
                </v-btn>
                <v-btn
                  v-else-if="state.filter.title == 'Pengarang'"
                  color="primary"
                  variant="flat"
                  @click.prevent="tambahPengarang"
                >
                  Konfirmasi
                </v-btn>
                <v-btn
                  v-else-if="state.filter.title == 'Kategori'"
                  color="primary"
                  variant="flat"
                  @click.prevent="tambahKategori"
                >
                  Konfirmasi
                </v-btn>
                <v-btn
                  v-else-if="state.filter.title == 'Subkategori'"
                  color="primary"
                  variant="flat"
                  @click.prevent="tambahSubkategori"
                >
                  Konfirmasi
                </v-btn>
                <v-btn
                  v-else-if="state.filter.title == 'Rak'"
                  color="primary"
                  variant="flat"
                  @click.prevent="tambahRak"
                >
                  Konfirmasi
                </v-btn>
                <v-btn v-else disabled color="primary" variant="flat"> Konfirmasi </v-btn>
              </v-card-actions>
            </v-container>
          </v-card-text>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useConfigurationStore } from '@/stores/configuration'
import { useAuthStore } from '@/stores/auth'
const { tokenType, token } = useAuthStore()

const dialogModal = defineModel({
  type: Boolean,
  default: false
})

const { state, loadItems, kategoriItems, getDataKategori } = useConfigurationStore()
const nama = ref('')
const kode_rak = ref('')
const kategori = ref('')
const validation = ref('')

const tambahPenerbit = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/konfigurasi/${state.filter.value}`,
      {
        nama_penerbit: nama.value
      },
      {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      }
    )
    if (response.data.success) {
      state.toasterMessage = 'Data penerbit berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    }
  } catch (error) {
    console.log(error)
  }
}
const tambahPengarang = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/konfigurasi/${state.filter.value}`,
      {
        nama_pengarang: nama.value
      },
      {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      }
    )
    if (response.data.success) {
      state.toasterMessage = 'Data pengarang berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    }
  } catch (error) {
    console.log(error)
  }
}
const tambahRak = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/konfigurasi/${state.filter.value}`,
      {
        nama_rak: nama.value,
        kode_rak: kode_rak.value
      },
      {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      }
    )
    if (response.data.success) {
      state.toasterMessage = 'Data rak berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    }
  } catch (error) {
    console.log(error)
  }
}
const tambahKategori = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/konfigurasi/${state.filter.value}`,
      {
        nama_kategori: nama.value
      },
      {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      }
    )
    if (response.data.success) {
      state.toasterMessage = 'Data kategori berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    } else if (response.data.nama_kategori) {
      validation.value = response.data.nama_kategori[0]
    }
  } catch (error) {
    console.log(error)
  }
}
const tambahSubkategori = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/konfigurasi/${state.filter.value}`,
      {
        nama_subkategori: nama.value,
        id_kategori: kategori.value.value
      },
      {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      }
    )
    if (response.data.success) {
      state.toasterMessage = 'Data subkategori berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.v-col {
  padding: 0px 12px;
}
</style>
