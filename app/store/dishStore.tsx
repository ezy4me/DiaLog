import { create } from "zustand";
import { DishAPI } from "../api/dishApi";

interface DishState {
  dishesData: any;
}

type CreateDishDto = {
  name: string;
  status: boolean;
  userId: number;
  food: any[];
};

interface DishActions {
  getDishes: () => Promise<any>;
  addDish: (dto: CreateDishDto) => Promise<any>;
  updateDish: (id: number, dto: CreateDishDto) => Promise<any>;
  deleteDish: (id: number) => Promise<any>;
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
  addDish: async (dto) => {
    try {
      await DishAPI.addDish(dto);
      const data = await DishAPI.getDishes();
      set({ dishesData: data });
    } catch (error) {
      console.error("Error add dish data:", error);
    }
  },

  updateDish: async (id, dto) => {
    try {
      await DishAPI.updateDish(id, dto);
      const data = await DishAPI.getDishes();
      set({ dishesData: data });
    } catch (error) {
      console.error("Error update dish data:", error);
    }
  },

  deleteDish: async (id) => {
    try {
      await DishAPI.deleteDish(id);
      const data = await DishAPI.getDishes();
      set({ dishesData: data });
    } catch (error) {
      console.error("Error update dish data:", error);
    }
  },
}));

export default useDishStore;
