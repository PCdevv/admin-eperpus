<template>
  <div>
    <v-dialog v-model="state.dialogModalEdit" width="1024" transition="dialog-top-transition">
      <!-- <template v-slot:activator="{ props }">
        <div v-bind="props">
          <slot name="btn-activator" />
        </div>
      </template> -->
      <form enctype="multipart/form-data">
        <v-card>
          <v-card-title>
            <slot name="modal-title" />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div class="text-subtitle-1">Foto Cover</div>
                  <div v-if="previewImage" class="flex justify-center">
                    <img class="my-2 h-[250px] w-auto" :src="previewImage" />
                  </div>
                  <div v-if="payload.foto_cover" class="flex justify-center">
                    <img
                      class="my-2 h-[250px] w-auto"
                      :src="'http://localhost:8000' + payload.foto_cover"
                    />
                  </div>
                  <v-file-input
                    show-size
                    accept="image/png,image/jpg,image/jpeg"
                    label="Input Gambar"
                    density="compact"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.foto_cover"
                    v-model:file="payload.foto_cover"
                    @change="handleFotoChange"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Judul Buku</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Masukkan judul buku"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.judul_buku"
                    v-model="payload.judul_buku"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">ISBN</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Masukkan isbn"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.isbn"
                    v-model="payload.isbn"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Tahun Terbit</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Masukkan tahun terbit"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.tahun_terbit"
                    v-model="payload.tahun_terbit"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <div class="text-subtitle-1">Pengarang</div>
                  <v-autocomplete
                    :items="pengarangItems.value"
                    density="compact"
                    placeholder="Pilih Pengarang"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation.value?.pengarang"
                    v-model="payload.pengarang"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <div class="text-subtitle-1">Penerbit</div>
                  <v-autocomplete
                    :items="penerbitItems.value"
                    density="compact"
                    placeholder="Pilih Penerbit"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation.value?.penerbit"
                    v-model="payload.penerbit"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Sinopsis</div>
                  <v-textarea
                    type="text"
                    counter
                    density="compact"
                    placeholder="Masukkan sinopsis"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.sinopsis"
                    v-model="payload.sinopsis"
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
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
                    :error-messages="validation.value?.kategori"
                    v-model="payload.kategori"
                    @change="updateKategori"
                    @click="console.log(payload.kategori)"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <div class="text-subtitle-1">Subkategori</div>
                  <v-autocomplete
                    v-if="payload.kategori.subkategori != ''"
                    :items="payload.kategori.subkategori"
                    item-text="title"
                    item-value="value"
                    density="compact"
                    placeholder="Pilih Subkategori"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation.value?.subkategori"
                    v-model="payload.subkategori"
                  ></v-autocomplete>
                  <v-autocomplete
                    v-else
                    disabled
                    density="compact"
                    placeholder="Pilih Subkategori"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">File Buku</div>
                  <v-file-input
                    :messages="
                      payload.file_buku
                        ? payload.file_buku.replace(/^\/storage\/file-buku\//, '')
                        : ''
                    "
                    accept="application/pdf,.pdf"
                    label="Input File"
                    density="compact"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.file_buku"
                    v-model:file="payload.file_buku"
                    @change="handleFileChange"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Jumlah Halaman</div>
                  <v-text-field
                    type="number"
                    density="compact"
                    placeholder="Masukkan jumlah halaman"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.jumlah_halaman"
                    v-model="payload.jumlah_halaman"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Stok Tersedia</div>
                  <v-text-field
                    type="number"
                    density="compact"
                    placeholder="Masukkan stok tersedia"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    v-model="payload.stok_tersedia"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Stok Total</div>
                  <v-text-field
                    type="number"
                    density="compact"
                    placeholder="Masukkan stok total"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    v-model="payload.stok_total"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Rak</div>
                  <v-autocomplete
                    :items="rakItems.value"
                    density="compact"
                    placeholder="Pilih Rak"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation.value?.rak"
                    v-model="payload.rak"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <small>*wajib diisi</small>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="state.dialogModalEdit = false">
                  Tutup
                </v-btn>
                <v-btn color="primary" variant="flat" @click.prevent="editBuku"> Konfirmasi </v-btn>
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
import { useBookStore } from '@/stores/book'
import { onMounted } from 'vue'

// onMounted(() => {
//   getDataCreate()
// })

const previewImage = ref('')

const {
  state,
  loadItems,
  payload,
  getDataCreate,
  kategoriItems,
  pengarangItems,
  penerbitItems,
  rakItems,
  validation
} = useBookStore()

const updateKategori = () => {
  payload.subkategori = null
  // if (payload.kategori != '') {
  //   subkategoriItems.value = kategoriItems.find((k) => (k.value = payload.kategori)).subkategori
  //   console.log(subkategoriItems)
  // } else {
  //   subkategoriItems.value = []
  // }
}

const handleFotoChange = (event) => {
  if (event.target.files.length > 0) {
    payload.foto_cover = event.target.files[0]
    previewImage.value = URL.createObjectURL(payload.foto_cover)
    console.log(previewImage.value)
  } else {
    payload.foto_cover = null
  }
}
const handleFileChange = (event) => {
  if (event.target.files.length > 0) {
    payload.file_buku = event.target.files[0]
  } else {
    payload.file_buku = null
  }
}

const editBuku = async () => {
  const formData = new FormData()
  formData.append('foto_cover', payload.foto_cover)
  formData.append('judul_buku', payload.judul_buku)
  formData.append('isbn', payload.isbn)
  formData.append('tahun_terbit', payload.tahun_terbit)
  formData.append('id_pengarang', payload.pengarang.value)
  formData.append('id_penerbit', payload.penerbit.value)
  formData.append('sinopsis', payload.sinopsis)
  formData.append('id_kategori', payload.kategori.value)
  if (payload.subkategori) {
    formData.append('id_subkategori', payload.subkategori.value)
  }
  formData.append('file_buku', payload.file_buku)
  formData.append('jumlah_halaman', payload.jumlah_halaman)
  formData.append('stok_tersedia', payload.stok_tersedia)
  formData.append('stok_total', payload.stok_total)
  formData.append('id_rak', payload.rak.value)

  console.log([...formData.entries()])
  console.log(payload.pengarang)

  // Bug formData tdh terdetect
  // try {
  //   const response = await axios.patch(
  //     `${import.meta.env.VITE_BASE_URL}/buku/${state.id_buku}`,
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }
  //   )
  //   if (response.data.success) {
  //     state.toasterMessage = 'Data buku berhasil diedit'
  //     state.toaster = true
  //     loadItems({ page: 1, itemsPerPage: 10 })
  //     state.dialogModalCreate = false
  //   }
  //   console.log(response)
  //   // else if (response.data) {
  //   //   validation.value = response.data
  //   //   console.log(validation.value)
  //   //   if (payload.pengarang == '') {
  //   //     validation.value.pengarang = 'This pengarang field is required'
  //   //   }
  //   //   if (payload.penerbit == '') {
  //   //     validation.value.penerbit = 'This penerbit field is required'
  //   //   }
  //   //   if (payload.kategori == '') {
  //   //     validation.value.kategori = 'This kategori field is required'
  //   //   }
  //   //   if (payload.rak == '') {
  //   //     validation.value.rak = 'This rak field is required'
  //   //   }
  //   //   console.log(response.data)
  //   // }
  // } catch (error) {
  //   console.log(error)
  // }
}
</script>

<style scoped>
.v-col {
  padding: 0px 12px;
}
</style>
