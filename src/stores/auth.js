import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const tokenType = ref(localStorage.getItem('TOKEN_TYPE'))
  const token = ref(localStorage.getItem('ACCESS_TOKEN'))
  const ability = ref(localStorage.getItem('ABILITY'))
  const payload = reactive({
    device_type: 'web',
    email: null,
    password: null
  })
  const validation = reactive({})

  const setToken = (_token) => {
    token.value = localStorage.setItem('ACCESS_TOKEN', _token)
  }
  const setTokenType = (token_type) => {
    tokenType.value = localStorage.setItem('TOKEN_TYPE', token_type)
  }
  const setAbility = (role) => {
    ability.value = localStorage.setItem('ABILITY', role)
  }

  const loginAdmin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login/admin`,
        payload
      )
      console.log()
      if (response.data.success) {
        setToken(response.data.data.access_token)
        setTokenType(response.data.data.token_type)
        setAbility('ADMIN')
        window.location.replace(`${import.meta.env.VITE_URL}/dashboard`)
      } else if (response.data) {
        validation.value = response.data
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const loginPustakawan = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login/pustakawan`,
        payload
      )
      if (response.data.success) {
        setToken(response.data.data.access_token)
        setTokenType(response.data.data.token_type)
        setAbility('PUSTAKAWAN')
        window.location.replace(`${import.meta.env.VITE_URL}/dashboard`)
      } else if (response.data) {
        validation.value = response.data
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const logout = () => {
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('ABILITY')
    window.location.replace(`${import.meta.env.VITE_URL}/login-pustakawan`)
  }
  return {
    token,
    tokenType,
    setToken,
    loginAdmin,
    loginPustakawan,
    ability,
    payload,
    validation,
    logout
  }
})
