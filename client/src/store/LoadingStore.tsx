import create from "zustand";

interface LoadingState {
  landingLoading: boolean;
  setLandingLoading: (newState: boolean) => void;
  bannerLoading: boolean;
  setBannerLoading: (newState: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  landingLoading: false,
  setLandingLoading: (newState: boolean) =>
    set((state) => ({
      bannerLoading: newState,
      ...state,
    })),
  bannerLoading: false,
  setBannerLoading: (newState: boolean) =>
    set((state) => ({
      bannerLoading: newState,
      ...state,
    })),
}));

export default useLoadingStore;
