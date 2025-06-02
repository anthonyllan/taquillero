import axios from 'axios';

const REST_API_BASE_URL = import.meta.env.VITE_BOLETO_API_URL 
  ? `${import.meta.env.VITE_BOLETO_API_URL}/api/boletos`
  : "/boleto-api/api/boletos";

export const listBoletos = () => axios.get(REST_API_BASE_URL);

export const getBoletoById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const guardarBoleto = (boleto) => axios.post(REST_API_BASE_URL, boleto);

export const actualizarBoleto = (id, boleto) => axios.put(`${REST_API_BASE_URL}/${id}`, boleto);

export const eliminarBoleto = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);