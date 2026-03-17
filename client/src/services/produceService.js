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

export const produceService = {
  getProduce: () => request('/produce'),
  addProduce: (data) => request('/produce', { method: 'POST', body: JSON.stringify(data) }),
  getPendingVerification: () => request('/produce/verification-queue'),
  verify: (id, status) => request(`/produce/${id}/verify`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getMarketListings: () => request('/produce/market'),
};
