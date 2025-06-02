import axios from 'axios';

// Usar variable de entorno o fallback a producción
const REST_API_BASE_URL = import.meta.env.VITE_EVENTO_API_URL 
  ? `${import.meta.env.VITE_EVENTO_API_URL}/api/plazas`
  : "/evento-api/api/plazas";

export const listplazas = () => axios.get(REST_API_BASE_URL);

export const getPlazasById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const guardarPlaza = (plaza) => axios.post(REST_API_BASE_URL, plaza);

export const actualizarPlaza = (id, plaza) => axios.put(`${REST_API_BASE_URL}/${id}`, plaza);

export const eliminarPlaza = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);