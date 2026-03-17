// src/services/advisorService.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('Amica_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers,
    credentials: 'include',
    ...options,
  });
  
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = res.status;
    throw error;
  }
  return data;
}

export const advisorService = {
  getAdvice: (location) => 
    request(`/advisor/advice?location=${encodeURIComponent(location || '')}`, { method: 'GET' }),
  getAdviceFromRealTime: (data) =>
    request('/advisor/advice', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getWeather: (location) => 
    request(`/advisor/weather?location=${encodeURIComponent(location || '')}`, { method: 'GET' }),
};
