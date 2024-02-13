import { create } from "zustand";
import { BloodSugarAPI } from "../api/bloodSugarApi";
import convertToISODate from "@/utils/convertToISODate";

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
    id: number,
    userId: number,
    value: number,
    date: string,
    time: string
  ) => Promise<any>;
  deleteBloodSugar: (id: number) => Promise<any>;
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

      set((state) => ({
        bloodSugarData: state.bloodSugarData
          ? state.bloodSugarData.concat(data)
          : [data],
      }));
    } catch (error) {
      console.error("Error add blood sugar data:", error);
    }
  },

  updateBloodSugar: async (id, userId, value, date, time) => {
    try {
      await BloodSugarAPI.updateBloodSugar(id, userId, value, date, time);

      set((state) => ({
        bloodSugarData: state.bloodSugarData.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              value: value,
              date: convertToISODate(date, time),
              time: time,
            };
          } else {
            return item;
          }
        }),
      }));
    } catch (error) {
      console.error("Error updating blood sugar data:", error);
    }
  },

  deleteBloodSugar: async (id) => {
    try {
      await BloodSugarAPI.deleteBloodSugar(id);

      set((state) => ({
        bloodSugarData: state.bloodSugarData.filter(
          (item: any) => item.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting blood sugar data:", error);
    }
  },
}));

export default useBloodSugarStore;
