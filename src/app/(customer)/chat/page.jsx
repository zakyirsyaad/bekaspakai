import { cookies } from "next/headers";
import ChatBox from "./chatBox";

export default function Page() {
    const accessToken = cookies().get('accessToken')?.value
    return (
        <div className="container mx-auto p-4">
            <ChatBox accessToken={accessToken} />
        </div>
    );
}
