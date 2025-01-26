import axios from 'axios'

const BASE_URL = 'https://i12c204.p.ssafy.io/api/v1'
axios.defaults.withCredentials = true

export const publicRequest = axios.create({
  baseURL: BASE_URL
})
