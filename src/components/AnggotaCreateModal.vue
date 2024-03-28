<template>
  <div>
    <v-dialog v-model="dialogModal" width="512" transition="dialog-top-transition">
      <template v-slot:activator="{ props }">
        <div v-bind="props">
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
                  <div class="text-subtitle-1">Nama Lengkap</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Masukkan nama lengkap"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.nama_lengkap"
                    v-model="payload.nama_lengkap"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Email</div>
                  <v-text-field
                    type="text"
                    density="compact"
                    placeholder="Masukkan email"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :rules="[
                      (v) =>
                        !v ||
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        'Email must be valid'
                    ]"
                    :error-messages="validation.value?.email"
                    v-model="payload.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Password</div>
                  <v-text-field
                    density="compact"
                    placeholder="Masukkan password"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    :error-messages="validation.value?.password"
                    v-model="payload.password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="visible = !visible"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="text-subtitle-1">Kategori Anggota</div>
                  <v-autocomplete
                    :items="['Pelajar', 'Guru', 'Umum']"
                    density="compact"
                    placeholder="Pilih kategori anggota"
                    variant="outlined"
                    color="primary"
                    bg-color="white"
                    return-object
                    :error-messages="validation.value?.kategori_anggota"
                    v-model="payload.kategori_anggota"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="state.dialogModalCreate = false">
                  Tutup
                </v-btn>
                <v-btn color="primary" variant="flat" @click.prevent="tambahAnggota">
                  Konfirmasi
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card-text>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMemberStore } from '@/stores/member'
import { useAuthStore } from '@/stores/auth'
import { axiosClient } from '@/plugins/axiosClient'

const validation = reactive({})
const visible = ref(false)

const dialogModal = defineModel({
  type: Boolean,
  default: false
})

const { state, loadItems, payload } = useMemberStore()
const { tokenType, token } = useAuthStore()

const tambahAnggota = async () => {
  console.log(payload)
  try {
    const response = await axiosClient.post(`/kelola/anggota`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${token}`
      }
    })
    if (response.data.success) {
      state.toasterMessage = 'Data anggota berhasil ditambahkan'
      state.toaster = true
      loadItems({ page: 1, itemsPerPage: 10 })
      state.dialogModalCreate = false
    } else if (response.data) {
      validation.value = response.data
      if (payload.kategori_anggota == '') {
        validation.value.pengarang = 'This kategori anggota field is required'
      }
      console.log(response.data)
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
