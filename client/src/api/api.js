import axios from "axios";

const TOKEN_KEY = "trivin_token";
const USER_KEY = "trivin_user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

const storedToken = localStorage.getItem(TOKEN_KEY);
if (storedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setAuthToken(null);

      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        const isAdminPath = window.location.pathname.startsWith("/admin");
        if (isAdminPath || window.location.pathname.startsWith("/profile")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
