import { create, SetState } from "zustand";
import { FoodAPI } from "../api/foodApi";
import { ProfileAPI } from "../api/profileApi";

interface ProfileState {
  profile: any;
}

interface ProfileActions {
  getProfile: (userId: number) => Promise<any>;
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
}));

export default useProfileStore;
