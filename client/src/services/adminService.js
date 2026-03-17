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

export const adminService = {
  getStats: () => request('/admin/stats'),
  getActivities: () => request('/admin/activities'),
  getUsers: () => request('/admin/users'),
  createUser: (data) => request('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
  getSaccos: () => request('/admin/saccos'),
  createSacco: (data) => request('/admin/saccos', { method: 'POST', body: JSON.stringify(data) }),
  getSacco: (id) => request(`/admin/saccos/${id}`),
  updateSacco: (id, data) => request(`/admin/saccos/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  getProduce: () => request('/admin/produce'),
  getLoans: () => request('/admin/loans'),
  getCharts: () => request('/admin/charts'),
};

