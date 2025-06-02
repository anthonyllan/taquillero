import axios from 'axios';

const REST_API_BASE_URL = import.meta.env.VITE_EVENTO_API_URL 
  ? `${import.meta.env.VITE_EVENTO_API_URL}/api/eventos`
  : "/evento-api/api/eventos";

export const listEventos = () => axios.get(REST_API_BASE_URL);

export const getEventoById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const guardarEvento = (evento) => axios.post(REST_API_BASE_URL, evento);

export const actualizarEvento = (id, evento) => axios.put(`${REST_API_BASE_URL}/${id}`, evento);

export const eliminarEvento = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);