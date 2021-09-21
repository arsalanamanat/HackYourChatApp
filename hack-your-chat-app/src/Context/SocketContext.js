import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
   return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
   const socket = io('http://localhost:5000', {
      autoConnect: false,
      reconnection: false,
   });

   const value = {
      socket,
   };
   return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
