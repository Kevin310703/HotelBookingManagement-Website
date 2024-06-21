import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { useEffect, useContext } from 'react';
import router from "./Routes/Routes/Route";
import { UserContext, UserProvider } from './components/contexts/UserContext';
import "./custom.css";

function App() {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (!users.length) {
      fetchUsers();
    }
  }, [setUsers, users.length]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </UserProvider>
  );
}

export default App;