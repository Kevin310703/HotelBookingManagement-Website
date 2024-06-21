import { createContext, useState } from 'react';

export const UserContext = createContext({
  users: [],
  setUsers: () => {},
});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};