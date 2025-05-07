import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

//! Auth Store using Zustand
export const useAuthStore = create((set) => ({
    //* State variables
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    //! Action: Check if user is authenticated
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            //* Set authUser if authenticated
            set({ authUser: res.data })
        } catch (err) {
            console.log("Error in CheckAuth..!", err.message);
            //* If error, set authUser to null
            set({ authUser: null });
        } finally {
            //* Stop checking
            set({ isCheckingAuth: false })
        }
    },

    //! Action: Sign up user
    signup: async (data) => {
        set({ isSigningUp: true }); // Start loading state
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            //* On success, set authUser
            set({ authUser: res.data });

            toast.success("Account Created Successfully");

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);  // Display backend error message
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            set({ isSigningUp: false }); // Stop loading
        }
    },

    //! Action: Log in user
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in Successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    //! Action: Log out user
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged Out Successfully");
        } catch (err) {
            toast.error(err.response.data.message);
        }
    },

    //! Action: Update Profile
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (err) {
            console.log("error in update profile:", err);
            toast.error(err.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}))