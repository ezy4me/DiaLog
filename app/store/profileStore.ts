import { create, SetState } from "zustand";
import { FoodAPI } from "../api/foodApi";
import { ProfileAPI } from "../api/profileApi";
import useErrorStore from "./errorStore";

interface ProfileState {
  profile: any;
}

interface ProfileActions {
  getProfile: (userId: number) => Promise<any>;
  updateProfile: (
    userId: number,
    name: string,
    gender: string,
    height: number,
    weight: number,
    diabetesTypeId: number
  ) => Promise<any>;
}

type ProfileStore = ProfileState & ProfileActions;

const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  getProfile: async (userId) => {
    try {
      const data = await ProfileAPI.getProfile(userId);
      set({ profile: data });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  },
  updateProfile: async (
    userId,
    name,
    gender,
    height,
    weight,
    diabetesTypeId
  ) => {
    try {
      const data = await ProfileAPI.updateProfile(
        userId,
        name,
        gender,
        height,
        weight,
        diabetesTypeId
      );
      set({ profile: data });
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  },
}));

export default useProfileStore;
