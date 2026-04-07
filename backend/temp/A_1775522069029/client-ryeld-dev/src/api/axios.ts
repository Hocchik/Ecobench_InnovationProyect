import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v2",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor: agregar token JWT a todas las peticiones
instance.interceptors.request.use(
    (config) => {
        const raw = localStorage.getItem("user");
        if (raw) {
            try {
                const user = JSON.parse(raw);
                if (user?.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            } catch {
                // Si falla el parse, no agregar token
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: manejar respuestas 401 (token expirado/inválido)
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;