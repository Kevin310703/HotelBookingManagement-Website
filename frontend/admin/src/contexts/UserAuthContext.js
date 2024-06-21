import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logIn = async (email, password) => {
    try {
      const response = await axios.post("http://213.136.80.48:8889/api/auth/login", {
        email,
        password
      });
  
      const { token, refreshToken, email: userEmail } = response.data;
  
      // Store token and user information in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userEmail", userEmail);
  
      // Update user state
      setUser({ email: userEmail });
  
      navigate("/rooms");
    } catch (error) {
      throw new Error("Login failed. Please check your email and password.");
    }
  };  

  const logOut = () => {
    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");

    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUser({ email: storedEmail });
    }
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}