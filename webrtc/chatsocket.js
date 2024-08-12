import { io } from "socket.io-client";

const URL = "https://socketserver.qspiders.com";
const socket1 = io(URL, { transports: ["websocket"], autoConnect: false });

export default socket1;