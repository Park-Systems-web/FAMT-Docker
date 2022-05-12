import create from "zustand";

interface MenuState {
  menuList: Common.menuType[];
  currentMenu: Common.menuType;
  setMenuList: (menuList: Common.menuType[]) => void;
  setCurrentMenuState: (subpath: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menuList: [],
  currentMenu: null,
  setMenuList: (menuList: Common.menuType[]) => set(() => ({ menuList })),
  setCurrentMenuState: (subpath: string) =>
    set((state) => {
      return {
        menuList: state.menuList,
        currentMenu: state.menuList.filter(
          (e) => subpath.indexOf(e.path) !== -1,
        )[0],
      };
    }),
}));

export default useMenuStore;
