const { useContext, createContext, useEffect, useState } = require('react');

const Context = createContext();

export const useAuthContext = () => useContext(Context);

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setAuthUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const value = {
    authUser,
    setAuthUser,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
