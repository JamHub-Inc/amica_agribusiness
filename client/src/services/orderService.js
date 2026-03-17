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

export const orderService = {
  createOrder: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getVendorOrders: () => request('/orders/vendor'),
  getFarmerOrders: () => request('/orders/farmer'),
  updateStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};
