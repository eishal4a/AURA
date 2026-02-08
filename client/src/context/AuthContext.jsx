import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user on startup if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Load current user
  const loadUser = async () => {
    try {
      const { data } = await API.get("/users/me");
      setUser(data.user);
      setPosts(data.posts);
    } catch (err) {
      console.error("Error loading user:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    await loadUser();
  };

  // Register
  const register = async (userData) => {
    const { data } = await API.post("/auth/register", userData);

    localStorage.setItem("token", data.token);
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    await loadUser();
  };

  // Update user state (for profile updates)
  const updateUserState = (newUser) => {
    setUser(newUser);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    setPosts([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        posts,
        loading,
        login,
        register,
        logout,
        updateUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
