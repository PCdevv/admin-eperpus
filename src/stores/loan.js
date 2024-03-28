import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { useAuthStore } from './auth'
import { axiosClient } from '@/plugins/axiosClient'

export const useLoanStore = defineStore('loan', () => {
  const { tokenType, token } = useAuthStore()
  const state = reactive({
    anggotaData: [],
    itemsPerPage: 10,
    serverItems: [],
    loading: true,
    totalItems: 0,
    toaster: false,
    toasterMessage: ''
  })
  const dataAnggota = reactive({
    // alamat: ''
    id_anggota: '',
    nama_lengkap: '',
    no_anggota: '',
    telp: ''
  })
  const dataBuku = reactive({
    id_buku: '',
    judul_buku: '',
    isbn: '',
    stok_tersedia: '',
    stok_total: ''
  })

  const loadItems = async ({ page, itemsPerPage, no_anggota }) => {
    // state.loading = true
    state.serverItems = []
    // dataAnggota.alamat = ''
    dataAnggota.id_anggota = ''
    dataAnggota.nama_lengkap = ''
    dataAnggota.no_anggota = ''
    dataAnggota.telp = ''
    try {
      if (no_anggota.length > 0) {
        const response = await axiosClient.get(`/search-no-anggota/${no_anggota}`)

        let items = response.data.data.dipinjam
        // dataAnggota.alamat = response.data.data.alamat
        dataAnggota.id_anggota = response.data.data.id_anggota
        dataAnggota.nama_lengkap = response.data.data.nama_lengkap
        dataAnggota.no_anggota = response.data.data.no_anggota
        dataAnggota.telp = response.data.data.no_telp

        // Bug
        const start = (page - 1) * itemsPerPage
        state.serverItems = items.slice(start, start + itemsPerPage)
        state.totalItems = items.length
        // console.log(state.serverItems)
      }
      return
    } catch (error) {
      console.error(error)
    } finally {
      state.loading = false
    }
  }
  const getBukuDetail = async (kode_buku) => {
    dataBuku.id_buku = ''
    dataBuku.judul_buku = ''
    dataBuku.isbn = ''
    dataBuku.stok_tersedia = ''
    dataBuku.stok_total = ''
    try {
      const response = await axiosClient.get(`/search-kode-buku/${kode_buku}`)
      console.log(response.data.data.id_buku)
      state.dialogModal = true
      dataBuku.id_buku = response.data.data.id_buku
      dataBuku.judul_buku = response.data.data.judul_buku
      dataBuku.isbn = response.data.data.isbn
      dataBuku.stok_tersedia = response.data.data.stok_tersedia
      dataBuku.stok_total = response.data.data.stok_total
      // console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const peminjaman = async (id_buku, id_anggota) => {
    console.log({ id_buku, id_anggota })
    try {
      const response = await axiosClient.post(
        `/pinjam`,
        {
          id_buku: id_buku,
          id_anggota: id_anggota
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`
          }
        }
      )
      console.log(response)
      if (response.data.success) {
        state.toasterMessage = 'Buku berhasil dipinjam'
        state.toaster = true
        await loadItems({ page: 1, itemsPerPage: 10, no_anggota: dataAnggota.no_anggota })
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const pengembalian = async (id_history) => {
    console.log(id_history)
    try {
      const response = await axiosClient.post(
        `/kembali`,
        {
          id_history: id_history
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`
          }
        }
      )
      console.log(response)
      if (response.data.success) {
        state.toasterMessage = 'Buku berhasil dikembalikan'
        state.toaster = true
        await loadItems({ page: 1, itemsPerPage: 10, no_anggota: dataAnggota.no_anggota })
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  return { state, loadItems, dataAnggota, getBukuDetail, dataBuku, peminjaman, pengembalian }
})
