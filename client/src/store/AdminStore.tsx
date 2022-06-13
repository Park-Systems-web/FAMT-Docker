import create from "zustand";

interface AdminState {
  darkMode: boolean;
  setDarkMode: () => void;
  disableDarkMode: () => void;
  toggleDarkMode: () => void;
  isSponsorPreview: boolean;
  setIsSponsorPreview: (newState: boolean) => void;
}

const useAdminStore = create<AdminState>((set) => ({
  darkMode: false,
  setDarkMode: () => set((state) => ({ ...state, darkMode: true })),
  disableDarkMode: () => set((state) => ({ ...state, darkMode: false })),
  toggleDarkMode: () =>
    set((state) => ({ ...state, darkMode: !state.darkMode })),

  isSponsorPreview: false,
  setIsSponsorPreview: (newState) =>
    set((state) => ({ ...state, isSponsorPreview: newState })),
}));

export default useAdminStore;
