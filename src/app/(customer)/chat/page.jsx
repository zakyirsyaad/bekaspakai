import { cookies } from "next/headers";
import ChatBox from "./ChatBox";

export default function Page() {
    const accessToken = cookies().get('accessToken')?.value
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Chat App</h1>
            <ChatBox accessToken={accessToken} />
        </div>
    );
}
