import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.id,
        user: action.payload.username,
        pass: action.payload.password,
      };

    default:
      return { ...state };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    id: null,
    user: null,
    pass: null,
  });

  // const logOut = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
