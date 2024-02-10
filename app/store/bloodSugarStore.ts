import { create } from "zustand";
import { BloodSugarAPI } from "../api/bloodSugarApi";

interface BloodSugarState {
  bloodSugarData: any;
}

interface BloodSugarActions {
  getBloodSugar: (userId: number, date?: string) => Promise<any>;
  addBloodSugar: (
    userId: number,
    value: number,
    date: string,
    time: string
  ) => Promise<any>;
  updateBloodSugar: (
    userId: number,
    value: number,
    date: string,
    time: string
  ) => Promise<any>;
}

type BloodSugarStore = BloodSugarState & BloodSugarActions;

const useBloodSugarStore = create<BloodSugarStore>((set) => ({
  bloodSugarData: [],
  getBloodSugar: async (userId, date) => {
    try {
      const data = await BloodSugarAPI.getBloodSugar(userId, date);
      set({ bloodSugarData: data });
    } catch (error) {
      console.error("Error fetching blood sugar data:", error);
    }
  },
  addBloodSugar: async (userId, value, date, time) => {
    try {
      const data = await BloodSugarAPI.addBloodSugar(userId, value, date, time);
      console.log(data);

      set((state) => ({
        bloodSugarData: state.bloodSugarData ? state.bloodSugarData.concat(data) : [data],
      }));
    } catch (error) {
      console.error("Error add blood sugar data:", error);
    }
  },

  updateBloodSugar: async (userId, value, date, time) => {
    try {
      await BloodSugarAPI.updateBloodSugar(userId, value, date, time);
      set({});
    } catch (error) {
      console.error("Error updating blood sugar data:", error);
    }
  },
}));

export default useBloodSugarStore;
