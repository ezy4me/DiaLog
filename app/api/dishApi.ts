import { authInstance } from ".";

export const DishAPI = {
  async getDishes() {
    try {
      const response = await authInstance.get("dish");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
