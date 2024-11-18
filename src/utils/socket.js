import Cookies from "js-cookie";
import { io } from "socket.io-client";

const accessToken = Cookies.get('accessToken');
const socket = io(`${process.env.NEXT_PUBLIC_BASE_API_URL}`, {
    auth: {
        token: accessToken, // Ganti dengan token yang valid
    },
});

export default socket;
