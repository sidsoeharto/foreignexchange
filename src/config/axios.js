import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/api'
})

export default instance