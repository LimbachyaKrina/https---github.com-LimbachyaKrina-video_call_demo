import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom"

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  // Function to handle form submission and emit room:join event
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  // Function to handle room join event
  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`)
  }, []);

  // useEffect to listen to room:join event and clean up
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div>
        <h1>Lobby</h1>
      </div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </>
  );
};

export default LobbyScreen;
