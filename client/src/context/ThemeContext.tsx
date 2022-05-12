import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  darkMode: boolean;
};

type Action = { type: "LIGHTMODE" } | { type: "DARKMODE" };

type ThemeDispatch = Dispatch<Action>;

const ThemeStateContext = createContext<State | null>({ darkMode: true });
const ThemeDispatchContext = createContext<ThemeDispatch | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };

    default:
      throw new Error("reducer: Unhandled Action");
  }
}

// Provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    darkMode: true,
  });

  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useThemeState(): State {
  const state = useContext(ThemeStateContext);
  if (!state) throw new Error("Cannot find ThemeProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useThemeDispatch() {
  const dispatch = useContext(ThemeDispatchContext);
  if (!dispatch) throw new Error("Cannot find ThemeProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
