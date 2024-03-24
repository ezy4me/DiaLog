import { authInstance } from ".";

export const ChatAPI = {
  async getMessages(doctorId: number, patientId: number) {
    try {
      const response = await authInstance.get(
        `chat?doctorId=${doctorId}&patientId=${patientId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch chat messages.");
    }
  },

  async getUserChat(doctorId: number, patientId: number) {
    try {
      const response = await authInstance.get(
        `chat/user?doctorId=${doctorId}&patientId=${patientId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch chat messages.");
    }
  },
};
