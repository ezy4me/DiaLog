import { authInstance, apiInstance } from ".";

export const AuthAPI = {
  async login(email: string, password: string) {
    try {
      const response = await authInstance.post("login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error("Failed to login. Please check your credentials.");
    }
  },

  async register(username: string, email: string, password: string) {
    try {
      const response = await apiInstance.post("reg", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to register. Please try again later.");
    }
  },

  async logout() {
    try {
      const response = await apiInstance.get("logout");
      return response.data;
    } catch (error) {
      throw new Error("Failed to logout. Please try again later.");
    }
  },
};
