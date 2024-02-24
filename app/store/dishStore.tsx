import { create } from "zustand";
import { DishAPI } from "../api/dishApi";

interface DishState {
  dishesData: any;
}

type CreateDishDto = {
  name: string,
  status: boolean,
  userId: number,
  food: {}
}

interface DishActions {
  getDishes: () => Promise<any>;
  addDish: () => Promise<any>;
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
  addDish: async () => {
    try {
      const data = await DishAPI.getDishes();
      set({ dishesData: data });
    } catch (error) {
      console.error("Error fetching dish data:", error);
    }
  },
}));

export default useDishStore;
