import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { useAuthStore } from './auth'
import { axiosClient } from '@/plugins/axiosClient'

export const useMemberStore = defineStore('Member', () => {
  const { tokenType, token } = useAuthStore()
  const state = reactive({
    dialogModalCreate: false,
    dialogModalEdit: false,
    id_buku: null,
    dialogConfirm: false,
    toaster: false,
    toasterMessage: '',
    itemsPerPage: 10,
    search: '',
    serverItems: [],
    loading: false,
    totalItems: 0
  })

  const payload = reactive({
    no_telp: null,
    nik: null,
    nama_lengkap: null,
    email: null,
    password: null,
    kategori_anggota: null
  })
  const validation = reactive({})

  const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    state.loading = true
    try {
      const response = await axiosClient.get(`/kelola/anggota`, {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      })
      let items = response.data.data

      if (state.search) {
        const searchRegex = new RegExp(state.search.toLowerCase(), 'i')
        items = items.filter((item) => searchRegex.test(item.nama_lengkap.toLowerCase()))
      }

      if (sortBy && sortBy.length) {
        const { key, order } = sortBy[0]
        items.sort((a, b) => (order === 'desc' ? b[key] - a[key] : a[key] - b[key]))
      }

      const start = (page - 1) * itemsPerPage
      state.serverItems = items.slice(start, start + itemsPerPage)
      state.totalItems = items.length
    } catch (error) {
      console.error(error)
    } finally {
      state.loading = false
    }
  }

  const getBukuDetail = async (id) => {
    validation.value = {}
    state.dialogModalEdit = true
    try {
      const response = await axiosClient.get(`/buku/${id}`)
      state.dialogModal = true
      state.id_buku = response.data.data.id_buku
      payload.foto_cover = response.data.data.foto_cover
      payload.judul_buku = response.data.data.judul_buku
      payload.isbn = response.data.data.isbn
      payload.tahun_terbit = response.data.data.tahun_terbit
      payload.pengarang = response.data.data.pengarang.nama_pengarang
      payload.penerbit = response.data.data.penerbit.nama_penerbit
      payload.sinopsis = response.data.data.sinopsis
      payload.kategori = response.data.data.kategori.nama_kategori
      if (response.data.data.subkategori) {
        payload.subkategori = response.data.data.subkategori.nama_subkategori
      }
      payload.file_buku = response.data.data.file_buku
      payload.jumlah_halaman = response.data.data.jumlah_halaman
      payload.stok = response.data.data.stok_tersedia
      payload.stok_tersedia = response.data.data.stok_tersedia
      payload.stok_total = response.data.data.stok_total
      payload.rak = response.data.data.rak.nama_rak
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteItem = async (id) => {
    try {
      await axiosClient.delete(`/kelola/anggota/${id}`, {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      })
      state.dialogConfirm = false
      state.toasterMessage = 'Data anggota berhasil dihapus'
      state.toaster = true
      await loadItems({ page: 1, itemsPerPage: state.itemsPerPage })
    } catch (error) {
      console.error(error)
    }
  }

  const resetModal = () => {
    ;(payload.no_telp = null),
      (payload.nik = null),
      (payload.nama_lengkap = null),
      (payload.email = null),
      (payload.password = null),
      (payload.kategori_anggota = null)
  }

  return {
    state,
    loadItems,
    payload,
    deleteItem,
    getBukuDetail,
    resetModal
  }
})
