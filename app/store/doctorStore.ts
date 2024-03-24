import { create } from "zustand";
import { DoctorAPI } from "../api/doctorApi";

interface DoctorState {
  patients: any;
  patientInfo: any;
  patient: any;
}

interface DoctorActions {
  getPatients: (doctorId: number) => Promise<any>;
  getPatientInfo: (patientId: number, date: any) => Promise<any>;
  setPatient: (patient: any) => Promise<any>;
}

type DoctorStore = DoctorState & DoctorActions;

const useDoctorStore = create<DoctorStore>((set) => ({
  patients: [],
  patientInfo: [],
  patient: {},
  getPatients: async (doctorId) => {
    try {
      const data = await DoctorAPI.getPatients(doctorId);
      set({ patients: data });
    } catch (error) {
      console.error("Error fetching doctor patients data:", error);
    }
  },

  getPatientInfo: async (patientId, date) => {
    try {
      const data = await DoctorAPI.getPatientInfo(patientId, date);
      set({ patientInfo: data });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  },

  setPatient: async (patient) => {
    try {
        console.log(patient);
        
      set({ patient });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  },
}));

export default useDoctorStore;
