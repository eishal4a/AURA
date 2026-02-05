// client/src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // 👇 Don't force websocket, allow polling fallback
    const newSocket = io("http://localhost:5000", {
      autoConnect: false,
      reconnection: false,
      timeout: 2000,
    });

    // Try to connect silently
    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("✅ Socket connected");
      newSocket.emit("user_connected", user._id);
      setSocket(newSocket);
    });

    newSocket.on("connect_error", () => {
      // 👇 Silently ignore if server has no socket
      console.log("⚠️ Socket server not active (safe to ignore)");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
