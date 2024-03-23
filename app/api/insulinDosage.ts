import convertToISODate from "@/utils/convertToISODate";
import { authInstance } from ".";

export const InsulinDosageAPI = {
  async getInsulinDosage(userId: number, date: string) {
    try {
      let url = `insulin-dosage/${userId}` + `?date=${date}`;
      const response = await authInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addInsulinDosage(
    userId: number,
    value: number,
    date: string,
    time: string,
    insulinTypeId: number
  ) {
    try {
      const response = await authInstance.post(`insulin-dosage`, {
        value,
        date: convertToISODate(date, time),
        time: convertToISODate(date, time),
        userId,
        insulinTypeId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateInsulinDosage(
    id: number,
    userId: number,
    value: number,
    date: string,
    time: string,
    insulinTypeId: number
  ) {
    try {
      const response = await authInstance.patch(`insulin-dosage/${id}`, {
        value,
        date: convertToISODate(date, time),
        time: convertToISODate(date, time),
        userId,
        insulinTypeId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async deleteInsulinDosage(id: number) {
    try {
      const response = await authInstance.delete(`insulin-dosage/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
