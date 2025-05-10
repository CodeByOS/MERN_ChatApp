import { create } from "zustand";

const useThemeStore = create((set) => ({
    //* Initialize the theme state with the value from localStorage or default to 'halloween'
    theme: localStorage.getItem('theme') || 'halloween',

    //* Setter function to update the theme state and sync with localStorage
    setTheme: (newTheme) => {
        // Update the theme state
        set({ theme: newTheme });

        // Persist the theme in localStorage
        localStorage.setItem('theme', newTheme);

        // Apply the theme by setting the `data-theme` attribute on the <html> tag
        document.documentElement.setAttribute('data-theme', newTheme);
    },
}));

export default useThemeStore;