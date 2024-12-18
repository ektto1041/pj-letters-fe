import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const authAxios = axios.create({
  baseURL: serverUrl,
});

authAxios.interceptors.request.use((config) => {
  const sessionValue = sessionStorage.getItem("user-storage");

  if (sessionValue) {
    const sessionObj = JSON.parse(sessionValue);

    const token = sessionObj?.state?.user?.token;

    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
    }
  }

  return config;
});

const noAuthAxios = axios.create({
  baseURL: serverUrl,
});

export { authAxios, noAuthAxios };
