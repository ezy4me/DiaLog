import { authInstance } from ".";

export const NutritionAPI = {
  async getNutrition(id: number, date: string) {
    try {
      let url = `nutrition/user/${id}` + `?date=${date}`;
      return authInstance.get(url);
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
