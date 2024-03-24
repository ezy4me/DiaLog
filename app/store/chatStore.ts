import { create } from "zustand";
import { ChatAPI } from "../api/chatApi";

interface ChatState {
  messages: any;
  chat: any;
}

interface ChatActions {
  getMessages: (doctorId: number, patientId: number) => Promise<any>;
  getUserChat: (doctorId: number, patientId: number) => Promise<any>;
}

type ChatStore = ChatState & ChatActions;

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  chat: [],
  getMessages: async (doctorId, patientId) => {
    try {
      const data = await ChatAPI.getMessages(doctorId, patientId);
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  getUserChat: async (doctorId, patientId) => {
    try {
      const data = await ChatAPI.getUserChat(doctorId, patientId);
      set({ chat: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
}));

export default useChatStore;
