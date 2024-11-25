import { cookies } from "next/headers";
import Chatbox from "../containers/chat/Chatbox";

export default async function Page() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value
    return (
        <div className="container mx-auto p-4">
            <Chatbox accessToken={accessToken} />
        </div>
    );
}
