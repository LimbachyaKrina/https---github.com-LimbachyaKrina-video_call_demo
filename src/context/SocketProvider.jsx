import React, { createContext, useMemo, useContext } from "react"
import { io } from 'socket.io-client'
// Yeh provider mere pure appication ko socket ka access dega
const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}
// this is the hook that we have define and now wherever i want to use the socket in my program i can use it after calling this function
export const SocketProvider = (props) => {

    const socket = useMemo(() => io("localhost:8000"), [])
    return(
        <SocketContext.Provider value={socket} >
            {props.children}
        </SocketContext.Provider>
    )
} 