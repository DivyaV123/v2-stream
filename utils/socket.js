import { io } from "socket.io-client";

const URL = "https://ss1.qspiders.com";
const socket = io(URL, {  transports: ["websocket"], autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;