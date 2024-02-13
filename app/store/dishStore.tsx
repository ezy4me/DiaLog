import { create } from "zustand";
import convertToISODate from "@/utils/convertToISODate";
import { DishAPI } from "../api/dishApi";

interface DishState {
  dishesData: any;
}

interface DishActions {
  getDishes: () => Promise<any>;
}

type DishStore = DishState & DishActions;

const useDishStore = create<DishStore>((set) => ({
    dishesData: [],
  getDishes: async () => {
    try {
      const data = await DishAPI.getDishes();
      set({ dishesData: data });
    } catch (error) {
      console.error("Error fetching dish data:", error);
    }
  },
}));

export default useDishStore;
