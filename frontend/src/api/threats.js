import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/threats';

export const fetchThreats = (params) => axios.get(API_BASE, { params });
export const fetchThreatById = (id) => axios.get(`${API_BASE}/${id}`);
export const fetchStats = () => axios.get(`${API_BASE}/stats`);
export const analyzeThreat = (description) =>
  axios.post(`${API_BASE}/analyze`, { description });
