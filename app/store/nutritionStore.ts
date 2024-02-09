import { create } from "zustand";
import { FoodAPI } from "../api/foodApi";

interface NutritionState {
  food: any[]; 
}

interface NutritionActions {
    getFood: () => Promise<any>;
}

type NutritionStore = NutritionState & NutritionActions;

const useNutritionStore = create<NutritionStore>((set) => ({
  food: [],
  getFood: async () => {
    try {
      const res = await FoodAPI.getFood();
      set({ food: res?.data }); 
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  },
}));

export default useNutritionStore;
