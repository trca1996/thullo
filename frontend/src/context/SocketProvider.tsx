import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
