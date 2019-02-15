import axios from 'axios'

const instance = axios.create({
    baseURL : "http://localhost:8081/api/invitation/"
    // baseURL : "https://fe5ff427.ngrok.io/api/invitation/"
})

export default instance;