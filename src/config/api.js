const API_BASE_URL = "https://oxytrack-api.onrender.com/api";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
  },
  facilities: {
    base: `${API_BASE_URL}/facilities`,
    getActive: `${API_BASE_URL}/facilities?status=active`,
    getInactive: `${API_BASE_URL}/facilities?status=inactive`,
    getById: (id) => `${API_BASE_URL}/facilities/${id}`,
    deactivate: (id) => `${API_BASE_URL}/facilities/${id}/deactivate`,
    reactivate: (id) => `${API_BASE_URL}/facilities/${id}/reactivate`,
  },
  cylinders: {
    base: `${API_BASE_URL}/cylinders`,
    inventory: `${API_BASE_URL}/entries`,
    getById: (id) => `${API_BASE_URL}/cylinders/${id}`,
    history: (Id) => `${API_BASE_URL}/entries/history/${Id}`,
  },
};
