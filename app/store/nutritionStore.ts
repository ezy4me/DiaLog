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
  getNutrition: (id: number) => Promise<any>;
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

  getNutrition: async (id) => {
    try {
      const res = await NutritionAPI.getNutrition(id);
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },

  addNutrition: async (userId, dto) => {
    try {
      await NutritionAPI.addNutrition(dto);
      const res = await NutritionAPI.getNutrition(userId);
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },

  deleteNutrition: async (userId, id) => {
    try {
      await NutritionAPI.deleteNutrition(id);
      const res = await NutritionAPI.getNutrition(userId);
      set({ nutrition: res?.data });
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },
}));

export default useNutritionStore;
