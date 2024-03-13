<script setup>
import { useLoanStore } from '@/stores/loan'
import { ref } from 'vue'
import pinjam from '@/assets/icons/pinjam.svg'
import kembali from '@/assets/icons/kembali.svg'
import anggota from '@/assets/icons/dashboard/anggota.svg'
import buku from '@/assets/icons/dashboard/buku.svg'
import SnackbarToast from '@/components/SnackbarToast.vue'

const { state, loadItems, dataAnggota, getBukuDetail, dataBuku, peminjaman, pengembalian } =
  useLoanStore()

const anggotaQuery = ref('')

const headers = [
  { title: '#', align: 'start', sortable: false, key: 'id_buku' },
  { title: 'Kode Buku', align: 'start', sortable: false, key: 'buku.kode_buku' },
  { title: 'Judul Buku', align: 'start', sortable: false, key: 'buku.judul_buku' },
  { title: 'ISBN', align: 'start', sortable: false, key: 'buku.isbn' },
  { title: 'Tanggal Pinjam', align: 'start', sortable: false, key: 'waktu_peminjaman' },
  { title: 'Tenggat Kembali', align: 'start', sortable: false, key: 'batas_pengembalian' },
  // { title: 'Denda', align: 'start', key: 'denda' },
  { title: 'Aksi', align: 'center', sortable: false, key: 'aksi' }
]
</script>

<template>
  <div class="pl-24 pr-10 py-14">
    <div>
      <h1 class="text-4xl font-weight-medium">Peminjaman & Pengembalian Buku</h1>
      <div class="grid grid-cols-2 gap-4 my-8">
        <div class="drop-shadow-xl">
          <v-card variant="flat" class="d-flex justify-start align-center rounded-xl pa-4">
            <div class="h-[100px] w-auto d-flex align-center">
              <!-- <div class="w-[100px] h-[100px] bg-black"></div> -->
              <img alt="Anggota" :src="anggota" class="h-[100px] w-auto" />
            </div>
            <div v-if="dataAnggota.nama_lengkap.length > 0">
              <v-card-title class="text-h5 font-weight-bold text-primary">
                {{ dataAnggota.nama_lengkap }}
              </v-card-title>
              <v-card-subtitle class="font-weight-bold">
                {{ dataAnggota.no_anggota }}
              </v-card-subtitle>
              <v-card-subtitle class="font-weight-bold">
                {{ dataAnggota.telp }}
              </v-card-subtitle>
              <v-card-subtitle v-if="dataAnggota.alamat" class="font-weight-bold">
                {{ dataAnggota.alamat }}
              </v-card-subtitle>
              <v-card-subtitle v-else class="font-weight-bold"> - </v-card-subtitle>
            </div>
            <div v-else>
              <v-card-title class="text-h5 font-weight-bold text-primary">
                Nama Anggota
              </v-card-title>
              <v-card-subtitle class="font-weight-bold"> No. Anggota </v-card-subtitle>
              <v-card-subtitle class="font-weight-bold"> Telp </v-card-subtitle>
              <v-card-subtitle class="font-weight-bold"> Alamat </v-card-subtitle>
            </div>
          </v-card>
        </div>
        <div class="drop-shadow-xl">
          <v-card variant="flat" class="d-flex justify-start align-center rounded-xl pa-4">
            <div class="h-[100px] w-auto d-flex align-center">
              <!-- <div class="w-[100px] h-[100px] bg-black"></div> -->
              <img alt="Buku" :src="buku" class="h-[100px] w-auto" />
            </div>
            <div v-if="dataBuku.judul_buku.length > 0" class="me-auto">
              <v-card-title class="text-h5 font-weight-bold text-primary">
                {{ dataBuku.judul_buku }}
              </v-card-title>
              <v-card-subtitle class="font-weight-bold">{{ dataBuku.isbn }}</v-card-subtitle>
              <v-card-subtitle class="font-weight-bold">
                {{ dataBuku.stok_tersedia }}</v-card-subtitle
              >
              <v-card-subtitle class="font-weight-bold"> {{ dataBuku.stok_total }}</v-card-subtitle>
            </div>
            <div v-else class="me-auto">
              <v-card-title class="text-h5 font-weight-bold text-primary">
                Judul Buku
              </v-card-title>
              <v-card-subtitle class="font-weight-bold"> Kode Buku </v-card-subtitle>
              <v-card-subtitle class="font-weight-bold"> Stok Tersedia </v-card-subtitle>
              <v-card-subtitle class="font-weight-bold"> Stok Total </v-card-subtitle>
            </div>
            <div class="align-self-end">
              <v-btn
                @click="peminjaman(dataBuku.id_buku, dataAnggota.id_anggota)"
                v-if="dataBuku.judul_buku.length > 0"
                variant="flat"
                color="primary"
                class="rounded-pill"
              >
                <img alt="Pinjam" :src="pinjam" class="w-[20px] h-auto" />
              </v-btn>
              <v-btn v-else disabled variant="flat" color="primary" class="rounded-pill">
                <img alt="Pinjam" :src="pinjam" class="w-[20px] h-auto" />
              </v-btn>
            </div>
          </v-card>
        </div>
        <div>
          <div class="text-subtitle-1">Peminjam</div>
          <v-text-field
            v-model="anggotaQuery"
            @input.prevent="loadItems({ page: 1, itemsPerPage: 10, no_anggota: anggotaQuery })"
            density="compact"
            placeholder="No. Anggota"
            variant="outlined"
            color="primary"
            bg-color="white"
          ></v-text-field>
        </div>
        <div>
          <div class="text-subtitle-1">Buku</div>
          <v-text-field
            v-if="dataAnggota.nama_lengkap.length > 0"
            @input.prevent="(event) => getBukuDetail(event.target.value)"
            density="compact"
            placeholder="Kode Buku"
            variant="outlined"
            color="primary"
            bg-color="white"
          ></v-text-field>
          <v-text-field
            v-else
            disabled
            density="compact"
            placeholder="Kode Buku"
            variant="outlined"
            color="primary"
            bg-color="white"
          ></v-text-field>
        </div>
        <div class="col-span-2">
          <h1 class="text-2xl">Buku yang sedang dipinjam</h1>
        </div>
        <div class="col-span-2">
          <v-data-table-server
            v-model:items-per-page="state.itemsPerPage"
            :search="state.search"
            :headers="headers"
            :items-length="state.totalItems"
            :items="state.serverItems"
            :loading="state.loading"
            item-value="judul_buku"
            @update:options="loadItems"
            class="bg-transparent mb-8"
          >
            <template v-slot:item.id_buku="{ item, index }">
              <div>{{ index + 1 }}</div>
            </template>
            <template v-slot:item.waktu_peminjaman="{ item }">
              <div>{{ item.waktu_peminjaman.slice(0, 10) }}</div>
            </template>
            <template v-slot:item.batas_pengembalian="{ item }">
              <div>{{ item.batas_pengembalian.slice(0, 10) }}</div>
            </template>
            <template v-slot:item.aksi="{ item }">
              <v-btn
                @click="pengembalian(item.id_history)"
                variant="flat"
                color="primary"
                class="rounded-pill"
              >
                <img alt="Kembali" :src="kembali" class="w-[20px] h-auto" />
              </v-btn>
            </template>
          </v-data-table-server>
        </div>
      </div>
    </div>
    <SnackbarToast v-model="state.toaster" @close-toast="state.toaster = false">
      <h1>{{ state.toasterMessage }}</h1>
    </SnackbarToast>
  </div>
</template>
