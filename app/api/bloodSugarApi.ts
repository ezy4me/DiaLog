import convertToISODate from "@/utils/convertToISODate";
import { authInstance } from ".";

export const BloodSugarAPI = {
  async getBloodSugar(userId: number, date?: string) {
    try {
      let url = `blood-sugar/${userId}`;

      if (date) {
        url += `?date=${date}`;
      }

      const response = await authInstance.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addBloodSugar(
    userId: number,
    value: number,
    date: string,
    time: string
  ) {
    try {
      const response = await authInstance.post(`blood-sugar`, {
        value,
        date: convertToISODate(date, time),
        time: convertToISODate(date, time),
        userId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateBloodSugar(
    id: number,
    userId: number,
    value: number,
    date: string,
    time: string
  ) {
    try {
      const response = await authInstance.patch(`blood-sugar/${id}`, {
        value,
        date: convertToISODate(date, time),
        time: convertToISODate(date, time),
        userId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteBloodSugar(id: number) {
    try {
        const response = await authInstance.delete(`blood-sugar/${id}`)
  
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
};
