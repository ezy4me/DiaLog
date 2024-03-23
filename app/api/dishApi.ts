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

  async addDish(dto: any) {
    try {
      const response = await authInstance.post("dish", {
        ...dto,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateDish(id: number, dto: any) {
    try {
      const response = await authInstance.patch(`dish/${id}`, {
        ...dto,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteDish(id: number) {
    try {
      const response = await authInstance.delete(`dish/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
