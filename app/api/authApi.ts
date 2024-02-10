import { authInstance, apiInstance } from ".";

export const AuthAPI = {
  async login(email: string, password: string) {
    try {
      const response = await apiInstance.post("auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to login. Please check your credentials.");
    }
  },

  async register(email: string, password: string, role: string) {
    try {
      const response = await apiInstance.post("auth/reg", {
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to register. Please try again later.");
    }
  },

  async logout() {
    try {
      const response = await apiInstance.get("auth/logout");
      return response.data;
    } catch (error) {
      throw new Error("Failed to logout. Please try again later.");
    }
  },
};
