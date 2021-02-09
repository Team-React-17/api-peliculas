import { FC, createContext, useState, useEffect } from 'react';

const initialState = {
  auth: JSON.parse(localStorage.getItem('auth') as string) || {},
  setAuth: (userInfo: { isLogged: boolean; user: any }) => {}
}

export const AuthContext = createContext(initialState);

export const AuthProvider: FC = ({ children }) => {

  const [auth, setAuth] = useState(initialState.auth);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

