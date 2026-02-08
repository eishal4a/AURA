import { createContext, useState, useEffect, useContext } from "react";
import API from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // 🔥 keep user posts here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

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

  const login = async (email, password) => {
   const { data } = await API.post("/auth/login", { email, password });


    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    await loadUser();
  };

  const register = async (userData) => {
    const { data } = await API.post("/auth/register", userData);


    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

    await loadUser();
  };

  // 🔥 THIS makes profile image update instantly
  const updateUserState = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
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
        updateUserState, // 🔥 expose this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
