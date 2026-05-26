import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const chatWithDocument = async (sessionId, question, history) => {
  const response = await api.post('/api/chat', {
    session_id: sessionId,
    question,
    history,
  });
  return response.data;
};

export const getSessions = async () => {
  const response = await api.get('/api/sessions');
  return response.data;
};

export const getSessionById = async (sessionId) => {
  const response = await api.get(`/api/sessions/${sessionId}`);
  return response.data;
};

export const deleteSession = async (sessionId) => {
  const response = await api.delete(`/api/sessions/${sessionId}`);
  return response.data;
};
