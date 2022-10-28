import axios from "axios";

// toma la misma url del servidor localhost:3000/api
const entriesApi = axios.create( {
  baseURL: '/api'
} );

export default entriesApi