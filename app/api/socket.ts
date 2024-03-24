import { io, Socket } from "socket.io-client";

const url = process.env.EXPO_PUBLIC_API_URL;
const socket: Socket = io(`${url}`);

export default socket;
