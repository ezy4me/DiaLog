import { authInstance, apiInstance } from ".";

export const ProfileAPI = {
  async getProfile(userId: number) {
    try {
      console.log('userID: ',userId);
      
      const response = await authInstance.get(`profile/${userId}`)

      return response.data;
    } catch (error) {
      console.log(error);
      
    }
  },
};
