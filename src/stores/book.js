import { defineStore } from 'pinia'
import { reactive } from 'vue'
import axios from 'axios'

export const useBookStore = defineStore('Book', () => {
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

  const payload = reactive({
    foto_cover: null,
    judul_buku: null,
    isbn: null,
    tahun_terbit: null,
    pengarang: null,
    penerbit: null,
    // Bug
    sinopsis: null,
    kategori: null,
    subkategori: null,
    file_buku: null,
    jumlah_halaman: null,
    stok: null,
    stok_tersedia: null,
    stok_total: null,
    rak: null
  })
  const validation = reactive({})

  const kategoriItems = reactive([])
  const pengarangItems = reactive([])
  const penerbitItems = reactive([])
  const rakItems = reactive([])
  // const subkategoriItems = reactive([])

  const loadItems = async ({ page, itemsPerPage, sortBy }) => {
    state.loading = true
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/bukus`)
      let items = response.data.data
      // console.log({ page, itemsPerPage, sortBy })

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

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/buku/${id}`)
      state.dialogConfirm = false
      state.toasterMessage = 'Data buku berhasil dihapus'
      state.toaster = true
      await loadItems({ page: 1, itemsPerPage: state.itemsPerPage })
    } catch (error) {
      console.error(error)
    }
  }

  const getBukuDetail = async (id) => {
    validation.value = {}
    getDataCreate()
    state.dialogModalEdit = true
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/buku/${id}`)
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

  const getDataCreate = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/buku-create`)
      kategoriItems.value = response.data.data.kategori.map((k, index) => ({
        i: index,
        value: k.id_kategori,
        title: k.nama_kategori,
        subkategori: k.subkategori.map((s) => ({
          value: s.id_subkategori,
          title: s.nama_subkategori
        }))
      }))
      penerbitItems.value = response.data.data.penerbit.map((p) => ({
        value: p.id_penerbit,
        title: p.nama_penerbit
      }))
      pengarangItems.value = response.data.data.pengarang.map((p) => ({
        value: p.id_pengarang,
        title: p.nama_pengarang
      }))
      rakItems.value = response.data.data.rak.map((r) => ({
        value: r.id_rak,
        title: r.nama_rak
      }))
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const resetModal = () => {
    payload.foto_cover = null
    payload.judul_buku = null
    payload.isbn = null
    payload.tahun_terbit = null
    payload.pengarang = null
    payload.penerbit = null
    payload.sinopsis = null
    payload.kategori = ''
    payload.subkategori = ''
    payload.file_buku = null
    payload.jumlah_halaman = null
    payload.stok = null
    payload.rak = null
  }

  return {
    state,
    loadItems,
    deleteItem,
    payload,
    getBukuDetail,
    getDataCreate,
    kategoriItems,
    pengarangItems,
    penerbitItems,
    rakItems,
    resetModal,
    validation
  }
})
