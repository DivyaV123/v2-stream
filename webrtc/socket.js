import { io } from "socket.io-client";

const URL = "https://ss2.qspiders.com";
const socket = io(URL, { transports: ["websocket"], autoConnect: false });

export default socket;