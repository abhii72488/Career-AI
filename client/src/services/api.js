const API_BASE = '/api';

export const fetchAPI = async (endpoint, method = 'GET', body = null, isFormData = false) => {
  const token = localStorage.getItem('career_ai_token');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!isFormData && body) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : null
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Request failed');
    }

    return data;
  } catch (error) {
    console.error(`[API Call Error: ${endpoint}]:`, error.message);
    throw error;
  }
};
