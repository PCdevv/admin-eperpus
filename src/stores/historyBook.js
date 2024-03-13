import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from './auth'
import axios from 'axios'

export const useHistoryBookStore = defineStore('HistoryBook', () => {
  const { tokenType, token } = useAuthStore()
  const state = reactive({
    // dialog: false,
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
  const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    state.loading = true
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/history`, {
        headers: {
          Authorization: `${tokenType} ${token}`
        }
      })
      let items = response.data.data
      console.log(response)

      if (state.search) {
        const searchRegex = new RegExp(state.search.toLowerCase(), 'i')
        items = items.filter((item) => searchRegex.test(item.judul_buku.toLowerCase()))
      }

      if (sortBy && sortBy.length) {
        const { key, order } = sortBy[0]
        items.sort((a, b) => (order === 'desc' ? b[key] - a[key] : a[key] - b[key]))
      }

      const start = (page - 1) * itemsPerPage
      state.serverItems = items.slice(start, start + itemsPerPage)
      state.totalItems = items.length
      // console.log(state.serverItems)
    } catch (error) {
      console.error(error)
    } finally {
      state.loading = false
    }
  }
  return { state, loadItems }
})
