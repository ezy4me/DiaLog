import { create } from "zustand";
import { FoodAPI } from "../api/foodApi";
import { AnyAaaaRecord } from "dns";
import { NutritionAPI } from "../api/nutritionApi";

interface NutritionState {
  food: any[];
  nutrition: any[];
}

interface NutritionActions {
  getFood: () => Promise<any>;
  getNutrition: (id: number, date: string) => Promise<any>;
  addNutrition: (userId: number, dto: any) => Promise<any>;
  deleteNutrition: (userId: number, id: number) => Promise<any>;
}

type NutritionStore = NutritionState & NutritionActions;

const useNutritionStore = create<NutritionStore>((set) => ({
  food: [],
  nutrition: [],
  getFood: async () => {
    try {
      const res = await FoodAPI.getFood();
      set({ food: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },

  getNutrition: async (id, date) => {
    try {
      const res = await NutritionAPI.getNutrition(id, date);
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },

  addNutrition: async (userId, dto) => {
    try {
      let date = new Date();
      await NutritionAPI.addNutrition(dto);
      const res = await NutritionAPI.getNutrition(userId, date.toISOString());
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },

  deleteNutrition: async (userId, id) => {
    try {
      let date = new Date();

      await NutritionAPI.deleteNutrition(id);
      const res = await NutritionAPI.getNutrition(userId, date.toISOString());
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },
}));

export default useNutritionStore;
