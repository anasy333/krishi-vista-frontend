import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'krishisat_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  login: (data) => api.post('/api/login/', data),
  logout: () => api.post('/api/logout/'),
  sendOTP: (data) => api.post('/api/send-otp/', data),
  verifyOTP: (data) => api.post('/api/verify-otp/', data),
  
  // Registration
  registerFarmer: (data) => api.post('/api/register/farmer/', data),
  registerStaff: (data) => api.post('/api/register/staff/', data),
  registerGovtOfficial: (data) => api.post('/api/register/create-govtofficial/', data),
};

// Profile endpoints
export const profileAPI = {
  getFarmerProfile: () => api.get('/api/farmerprofile/'),
  updateFarmerProfile: (data) => api.put('/api/farmerprofile/', data),
  getStaffProfile: () => api.get('/api/staffprofile/'),
  updateStaffProfile: (data) => api.put('/api/staffprofile/', data),
};

// Data helpers
export const dataAPI = {
  getUserTypes: () => api.get('/api/user-types/'),
  getStates: () => api.get('/api/states/'),
  getDistricts: () => api.get('/api/districts/'),
};

// Farm management endpoints
export const farmAPI = {
  getFarms: (farmerId) => api.get(`/analyze/farms/${farmerId}/`),
  updateFarm: (farmerId, farmId, data) => api.put(`/analyze/update/farmers/${farmerId}/farm/${farmId}/`, data),
  startNewSeason: (farmId) => api.post(`/analyze/start-new-season/${farmId}/`),
  getFarmerFarmIds: () => api.get('/analyze/farmer-farm-ids/'),
};

// Analysis endpoints
export const analysisAPI = {
  analyzeField: (farmerId, farmId, data) => api.post(`/analyze/farmers/${farmerId}/farm/${farmId}/`, data),
  getAnalysisResults: (farmerId, farmId) => api.get(`/analyze/farmerresult/${farmerId}/farm/${farmId}/`),
  getCropDashboard: (farmerId, farmId) => api.get(`/analyze/crop-dash/${farmerId}/farm/${farmId}/`),
  downloadPDF: (farmerId, farmId) => api.get(`/analyze/generatepdf/farmer/${farmerId}/farm/${farmId}/`, {
    responseType: 'blob'
  }),
};

// Geospatial endpoints
export const geoAPI = {
  getFarmMap: (farmId, farmerId) => api.get(`/analyze/api/farms/${farmId}/farmers/${farmerId}/draw-map/`),
};

// Notification endpoints
export const notificationAPI = {
  notifyAnalysisResults: (farmId, farmerId) => api.post(`/analyze/notify_analysis_results/farm/${farmId}/farmer/${farmerId}/`),
  sendSMS: (farmId, farmerId, data) => api.post(`/analyze/sms/send/farm/${farmId}/farmer/${farmerId}/`, data),
};

// Sentinel endpoints
export const sentinelAPI = {
  checkSentinelPass: (farmId) => api.get(`/analyze/check-sentinel-pass/${farmId}/`),
};

export default api;