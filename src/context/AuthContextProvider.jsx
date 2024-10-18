import React, { createContext, useEffect } from "react";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
