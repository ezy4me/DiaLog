import { authInstance, apiInstance } from ".";

export const FoodAPI = {
  async getFood() {
    try {
      return apiInstance.get("food");
    } catch (error) {
      console.log(error);
    }
  },
};
