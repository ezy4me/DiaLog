import { authInstance, apiInstance } from ".";

export const ProfileAPI = {
  async getProfile(userId: number) {
    try {
      console.log("userID: ", userId);

      const response = await authInstance.get(`profile/${userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateProfile(
    userId: number,
    name: string,
    gender: string,
    height: number,
    weight: number,
    diabetesTypeId: number
  ) {
    try {
      console.log("userID: ", userId);

      const response = await authInstance.patch(`profile/${userId}`, {
        name,
        gender,
        height,
        weight,
        diabetesTypeId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
