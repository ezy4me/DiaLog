import { authInstance } from ".";

export const NutritionAPI = {
  async getNutrition(id: number) {
    try {
      return authInstance.get(`nutrition/user/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  async addNutrition(dto: any) {
    try {
      return authInstance.post("nutrition", {
        ...dto,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async deleteNutrition(id: number) {
    try {
      return authInstance.delete(`nutrition/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};
