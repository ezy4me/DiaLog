import { authInstance } from ".";

export const DoctorAPI = {
  async getPatients(doctorId: number) {
    try {
      const response = await authInstance.get(`doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getPatientInfo(patientId: number, date: any) {
    try {
      const response = await authInstance.get(
        `doctor/patient/${patientId}` + `?date=${date}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async addPatient(doctorId: number, token: string) {
    try {
      const response = await authInstance.post(
        `doctor/${doctorId}` + `?token=${token}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
