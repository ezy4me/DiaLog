import { create } from "zustand";
import { BloodSugarAPI } from "../api/bloodSugarApi";

interface BloodSugarState {
  bloodSugarData: any;
}

interface BloodSugarActions {
  getBloodSugar: (userId: number) => Promise<any>;
  addBloodSugar: (
    userId: number,
    value: number,
    date: Date,
    time: Date
  ) => Promise<any>;
  updateBloodSugar: (
    userId: number,
    value: number,
    date: Date,
    time: Date
  ) => Promise<any>;
}

type BloodSugarStore = BloodSugarState & BloodSugarActions;

const useBloodSugarStore = create<BloodSugarStore>((set) => ({
  bloodSugarData: [],
  getBloodSugar: async (userId) => {
    try {
      const data = await BloodSugarAPI.getBloodSugar(userId);
      set({ bloodSugarData: data });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  },
  addBloodSugar: async (userId, value, date, time) => {
    try {
      await BloodSugarAPI.addBloodSugar(userId, value, date, time);
      set({});
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  },
  updateBloodSugar: async (userId, value, date, time) => {
    try {
      await BloodSugarAPI.updateBloodSugar(userId, value, date, time);
      set({});
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  },
}));

export default useBloodSugarStore;
