import React, { createContext, useMemo, useContext, useEffect, useCallback } from "react";
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:8000"), []);

  const handleUserJoined = useCallback((data) => {
    console.log(`User joined: ${data.email}`);
    // You can add any additional logic here
  }, []);

  const handleIncomingCall = useCallback((data) => {
    console.log(`Incoming call from: ${data.from}`);
    // You can add any additional logic here
  }, []);

  const handleCallAccepted = useCallback((data) => {
    console.log(`Call accepted by: ${data.from}`);
    // You can add any additional logic here
  }, []);

  const handlePeerNegoNeeded = useCallback((data) => {
    console.log(`Peer negotiation needed from: ${data.from}`);
    // You can add any additional logic here
  }, []);

  const handlePeerNegoFinal = useCallback((data) => {
    console.log(`Peer negotiation final from: ${data.from}`);
    // You can add any additional logic here
  }, []);

  const handleChatMessage = useCallback((data) => {
    console.log(`Chat message received in room ${data.room}: ${data.message}`);
    // You can add any additional logic here, such as updating a messages state
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handlePeerNegoNeeded);
    socket.on("peer:nego:final", handlePeerNegoFinal);
    socket.on("chat:message", handleChatMessage);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handlePeerNegoNeeded);
      socket.off("peer:nego:final", handlePeerNegoFinal);
      socket.off("chat:message", handleChatMessage);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handlePeerNegoNeeded, handlePeerNegoFinal, handleChatMessage]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};