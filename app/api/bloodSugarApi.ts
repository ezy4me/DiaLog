import { authInstance } from ".";

export const BloodSugarAPI = {
  async getBloodSugar(userId: number) {
    try {
      console.log("userID: ", userId);

      const response = await authInstance.get(`blood-sugar/${userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addBloodSugar(userId: number, value: number, date: Date, time: Date) {
    try {
      console.log("userID: ", userId);

      const response = await authInstance.post(`blood-sugar`, {
        value,
        date,
        time,
        userId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateBloodSugar(
    userId: number,
    value: number,
    date: Date,
    time: Date
  ) {
    try {
      console.log("userID: ", userId);

      const response = await authInstance.patch(`blood-sugar`, {
        value,
        date,
        time,
        userId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
