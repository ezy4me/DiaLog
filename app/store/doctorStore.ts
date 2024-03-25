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
  addPatient: (doctorId: number, token: string) => Promise<any>;
  deletePatient: (doctorId: number, patientId: number,) => Promise<any>;
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

  addPatient: async (doctorId, token) => {
    try {
      await DoctorAPI.addPatient(doctorId, token);
    } catch (error) {
      console.error("Error add patient:", error);
    }
  },

  deletePatient: async (doctorId, patientId) => {
    try {
      await DoctorAPI.deletePatient(doctorId, patientId);
      const data = await DoctorAPI.getPatients(doctorId);
      set({ patients: data });

    } catch (error) {
      console.error("Error delete patient:", error);
    }
  },

  setPatient: async (patient) => {
    try {
      set({ patient });
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  },
}));

export default useDoctorStore;
