import { create, SetState } from "zustand";

interface ErrorState {
  error: any;
}

interface ErrorActions {
  catchError: (error: unknown) => Promise<any>;
}

type ErrorStore = ErrorState & ErrorActions;

const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  catchError: async (error) => {
    set({ error });
  },
}));

export default useErrorStore;
