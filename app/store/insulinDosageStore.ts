import { create } from "zustand";
import convertToISODate from "@/utils/convertToISODate";
import { InsulinDosageAPI } from "../api/insulinDosage";

interface InsulinDosageState {
  insulinDosageData: any;
}

interface InsulinDosageActions {
  getInsulinDosage: (userId: number, date: string) => Promise<any>;
  addInsulinDosage: (
    userId: number,
    value: number,
    date: string,
    time: string,
    insulinTypeId: number
  ) => Promise<any>;
  updateInsulinDosage: (
    id: number,
    userId: number,
    value: number,
    date: string,
    time: string,
    insulinTypeId: number
  ) => Promise<any>;
  deleteInsulinDosage: (id: number) => Promise<any>;
}

type InsulinDosageStore = InsulinDosageState & InsulinDosageActions;

const useInsulinDosageStore = create<InsulinDosageStore>((set) => ({
  insulinDosageData: [],
  getInsulinDosage: async (userId, date) => {
    try {
      const data = await InsulinDosageAPI.getInsulinDosage(userId, date);
      set({ insulinDosageData: data });
    } catch (error) {
      console.error("Error fetching insulin dosage data:", error);
    }
  },
  addInsulinDosage: async (userId, value, date, time, insulinTypeId) => {
    try {
      const data = await InsulinDosageAPI.addInsulinDosage(
        userId,
        value,
        date,
        time,
        insulinTypeId
      );

      set((state) => ({
        insulinDosageData: state.insulinDosageData
          ? state.insulinDosageData.concat(data)
          : [data],
      }));
    } catch (error) {
      console.error("Error add insulin dosage data:", error);
    }
  },

  updateInsulinDosage: async (id, userId, value, date, time, insulinTypeId) => {
    try {
      await InsulinDosageAPI.updateInsulinDosage(
        id,
        userId,
        value,
        date,
        time,
        insulinTypeId
      );

      set((state) => ({
        insulinDosageData: state.insulinDosageData.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              value: value,
              date: convertToISODate(date, time),
              time: time,
              insulinTypeId: insulinTypeId,
            };
          } else {
            return item;
          }
        }),
      }));
    } catch (error) {
      console.error("Error updating insulin dosage data:", error);
    }
  },

  deleteInsulinDosage: async (id) => {
    try {
      await InsulinDosageAPI.deleteInsulinDosage(id);

      set((state) => ({
        insulinDosageData: state.insulinDosageData.filter(
          (item: any) => item.id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting insulin dosage data:", error);
    }
  },
}));

export default useInsulinDosageStore;
