import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore"; 

export const useChatStore = create((set, get) => ({

    //* Initial state
    messages: [],          // Stores chat messages with selected user
    users: [],             // Stores list of chat users
    selectedUser: null,    // Currently selected user for chat
    isUsersLoading: false, // Loading flag for fetching users
    isMessagesLoading: false, // Loading flag for fetching messages

    //* Fetch list of chat users
    getUsers: async () => {
        set({ isUsersLoading: true }); // Start loading
        try {
            const res = await axiosInstance.get("/messages/users"); // API call
            set({ users: res.data }); // Set users in state
        } catch (err) {
            // Show error toast
            toast.error(err.response.data.message);
        } finally {
            set({ isUsersLoading: false }); // Stop loading
        }
    },

    //* Fetch chat messages with a specific user
    getMessages: async (userId) => {
        set({ isMessagesLoading: true }); // Start loading
        try {
            const res = await axiosInstance.get(`/messages/${userId}`); // API call
            set({ messages: res.data }); // Set messages in state
        } catch (err) {
            toast.error(err.response.data.message); // Show error
        } finally {
            set({ isMessagesLoading: false }); // Stop loading
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (err) {
            toast.error(err.response.data.message);
        }
    },

    //* Subscribe to incoming messages via socket
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return; // Silent fail if socket isn't ready

        socket.on("newMessage", (newMessage) => {
            // Only append if message is from the selected user
            if (newMessage.senderId !== selectedUser._id) return;

            set((state) => ({
                messages: [...state.messages, newMessage],
            }));
        });
    },

    //* Unsubscribe from incoming messages
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return; // Silent fail if socket isn't ready
        socket.off("newMessage");
    },

    //* Set selected user for chat
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
