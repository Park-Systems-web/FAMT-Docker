import React, { useReducer, useContext, createContext, Dispatch } from "react";

type State = {
  isLogin: boolean;
  email: string;
  role: string;
  name: string;
  isOnline: boolean;
  accessToken: string;
  isPasswordSet: boolean;
  isLoading: boolean;
};

type Action =
  | { type: "LOGIN"; authState: State }
  | { type: "LOGOUT"; authState: State }
  | { type: "FINISHLOADING"; authState: State };

type AuthDispatch = Dispatch<Action>;

const AuthStateContext = createContext<State | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

// reducer

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        role: action.authState.role,
        email: action.authState.email,
        name: action.authState.name,
        isOnline: action.authState.isOnline,
        accessToken: action.authState.accessToken,
        isPasswordSet: action.authState.isPasswordSet,
        isLoading: action.authState.isLoading,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        email: "",
        name: "",
        role: "guest",
        accessToken: "",
        isLoading: false,
      };

    case "FINISHLOADING":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error("reducer: Unhandled Action");
  }
}

// Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    email: "",
    name: "",
    role: "guest",
    accessToken: "",
    isOnline: false,
    isPasswordSet: false,
    isLoading: true,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useAuthState(): State {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error("Cannot find AuthProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error("Cannot find AuthProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
