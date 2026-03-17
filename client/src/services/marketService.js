const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('Amica_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${endpoint}`, { headers, credentials: 'include', ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const marketService = {
  getPrices: () => request('/market/prices'),
  getInsights: (location) => request(`/market/insights?location=${location || ''}`),
  createPrice: (data) => request('/market/prices', { method: 'POST', body: JSON.stringify(data) }),
  updatePrice: (id, data) => request(`/market/prices/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deletePrice: (id) => request(`/market/prices/${id}`, { method: 'DELETE' }),
};
