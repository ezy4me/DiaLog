import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthAPI } from "../api/authApi";

interface AuthState {
  accessToken: string;
  user: any;
  role: string;
}

interface AuthActions {
  onLogin: (email: string, password: string) => Promise<any>;
  onRegistration: (
    email: string,
    password: string,
    role: string
  ) => Promise<any>;
  onLogout: () => Promise<any>;
  getUser: () => Promise<any>;
  getAccessToken: () => Promise<any>;
}

type AuthStore = AuthState & AuthActions;

const getAsyncStorageValue = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: "",
  user: {},
  role: "",
  onLogin: async (email, password) => {
    try {
      const data = await AuthAPI.login(email, password);

      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(data?.access_token)
      );

      await AsyncStorage.setItem("user", JSON.stringify(data?.user));

      set({
        accessToken: data?.access_token,
        user: data?.user,
        role: data?.user.role,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  onRegistration: async (email, password, role) => {
    try {
      const data = await AuthAPI.register(email, password, role);

      await AsyncStorage.setItem(
        "accessToken",
        JSON.stringify(data?.access_token)
      );

      await AsyncStorage.setItem("user", JSON.stringify(data?.user));

      set({
        accessToken: data?.access_token,
        user: data?.user,
        role: data?.user.role,
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

  getUser: async () => {
    const user = await getAsyncStorageValue("user");
    set({
      user,
    });
  },

  getAccessToken: async () => {
    const accessToken = await getAsyncStorageValue("accessToken");
    set({
      accessToken,
    });
  },

  onLogout: async () => {
    set({
      accessToken: "",
      user: {},
      role: "",
    });
  },
}));

export default useAuthStore;
