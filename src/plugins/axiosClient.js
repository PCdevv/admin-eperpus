import axios from 'axios'
const baseURL = import.meta.env.VITE_BASE_URL

export const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'ngrok-skip-browser-warning': 'any value'
  }
})

// axiosClient.interceptors.response.use(
//   (response) => {
//     // Check if the response content type is JSON
//     if (
//       response.headers['Content-Type'] &&
//       response.headers['Content-Type'].includes('application/json')
//     ) {
//       return response.data // Return the JSON data
//     } else {
//       return response // Reject if response is not JSON
//     }
//   },
//   (error) => {
//     return Promise.reject(error) // Forward the error
//   }
// )
