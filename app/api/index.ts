import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getToken = async () => {
  const value = await AsyncStorage.getItem("accessToken");
  console.log("getToken: ", value ? JSON.parse(value) : false);

  return value ? JSON.parse(value) : false;
};

const commonConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
};

const apiInstance = axios.create({
  ...commonConfig,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }

  console.log(config.headers.authorization);

  return config;
});

const authInstance = axios.create({
  ...commonConfig,
  headers: {
    "Content-Type": "application/json",
  },
});

const formDataInstance = axios.create({
  ...commonConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

authInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }
  console.log("token", config.headers.authorization);

  return config;
});

export { apiInstance, authInstance, formDataInstance };
