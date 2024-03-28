import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { useAuthStore } from './auth'
import { axiosClient } from '@/plugins/axiosClient'

export const useConfigurationStore = defineStore('Configuration', () => {
  const { tokenType, token } = useAuthStore()
  const state = reactive({
    dialogModalCreate: false,
    dialogModalEdit: false,
    dialogConfirm: false,
    filter: {
      title: 'Rak',
      value: 'rak'
    },
    toaster: false,
    toasterMessage: '',
    itemsPerPage: 10,
    search: '',
    serverItems: [],
    loading: false,
    totalItems: 0
  })
  const kategoriItems = reactive([])
  const loadItems = async ({ page, itemsPerPage }) => {
    state.loading = true
    let items = []
    try {
      const response = await axiosClient.get(`/konfigurasi`, {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      })
      const resRak = response.data.data.rak
      const resPenerbit = response.data.data.penerbit
      const resPengarang = response.data.data.pengarang
      const resKategori = response.data.data.kategori
      const resSubkategori = response.data.data.subkategori

      if (state.filter.title == 'Rak') {
        items = []
        items = resRak
      }
      if (state.filter.title == 'Penerbit') {
        items = []
        items = resPenerbit
      }
      if (state.filter.title == 'Pengarang') {
        items = []
        items = resPengarang
      }
      if (state.filter.title == 'Kategori') {
        items = []
        items = resKategori
      }
      if (state.filter.title == 'Subkategori') {
        items = []
        items = resSubkategori
      }

      if (state.search) {
        const searchRegex = new RegExp(state.search.toLowerCase(), 'i')
        items = items.filter((item) => searchRegex.test(item.judul_buku.toLowerCase()))
      }

      //   if (sortBy && sortBy.length) {
      //     const { key, order } = sortBy[0]
      //     items.sort((a, b) => (order === 'desc' ? b[key] - a[key] : a[key] - b[key]))
      //   }

      const start = (page - 1) * itemsPerPage
      state.serverItems = items.slice(start, start + itemsPerPage)
      state.totalItems = items.length
      state.loading = false
    } catch (error) {
      console.error(error)
    }
  }

  const resetModal = () => {}

  const getDataKategori = async () => {
    try {
      const response = await axiosClient.get(`/buku-create`)
      kategoriItems.value = response.data.data.kategori.map((k) => ({
        value: k.id_kategori,
        title: k.nama_kategori
      }))
      console.log(kategoriItems.value)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return {
    state,
    loadItems,
    resetModal,
    kategoriItems,
    getDataKategori
  }
})
