import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Secure storage keys
const USER_KEY = "user";
const IS_LOGGED_KEY = "isLogged";

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from SecureStore on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync(USER_KEY);
        const storedIsLogged = await SecureStore.getItemAsync(IS_LOGGED_KEY);

        if (storedUser && storedIsLogged === "true") {
          setUser(JSON.parse(storedUser));
          setIsLogged(true);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
      setIsLoading(false);
    };

    loadAuthData();
  }, []);

  // Function to log in and store user details
  const login = async (userData) => {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      await SecureStore.setItemAsync(IS_LOGGED_KEY, "true");
      setUser(userData);
      setIsLogged(true);
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  // Function to log out and remove user details
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(IS_LOGGED_KEY);
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.error("Error removing auth data:", error);
    }
  };

  const value = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    isLoading,
    setIsLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
