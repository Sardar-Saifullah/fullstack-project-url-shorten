import axios from 'axios';

const API_BASE_URL = 'https://localhost:7086/api/url'; // Adjust port as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createShortUrl = (originalUrl) => {
  return api.post('/shorten', { url: originalUrl });
};

export const getAllUrls = () => {
  return api.get('/');
};

export const getUrlByShortCode = (shortCode) => {
  return api.get(`/${shortCode}`);
};

export const updateUrl = (shortCode, originalUrl) => {
  return api.put(`/${shortCode}`, { url: originalUrl });
};

export const deleteUrl = (shortCode) => {
  return api.delete(`/${shortCode}`);
};

export const getOriginalUrl = (shortCode) => {
  return api.get(`/${shortCode}/redirect`, {
    // Prevent axios from following redirects
    maxRedirects: 0,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
    }
  });
};