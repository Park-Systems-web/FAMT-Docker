import create from "zustand";

interface AdminState {
  darkMode: boolean;
  setDarkMode: () => void;
  disableDarkMode: () => void;
  toggleDarkMode: () => void;
}

const useAdminStore = create<AdminState>((set) => ({
  darkMode: false,
  setDarkMode: () => set(() => ({ darkMode: true })),
  disableDarkMode: () => set(() => ({ darkMode: false })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export default useAdminStore;
