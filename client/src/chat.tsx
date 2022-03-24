import { socket } from "./socket";
import { useSelector } from "react-redux";
import { useState } from "react";

interface Msg {
    id: number;
    first: string;
    last: string;
    sender_id: number;
    message_text: string;
    timestamp: Date;
    profile_pic: string;
}

interface State {
    messages: Msg[];
}

export default function Chat() {
    const [userInput, setUserInput] = useState<string>("");
    const messages = useSelector((state: State) => state.messages);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("chatMessage", { userInput });
        setUserInput("");
    };

    return (
        <div>
            <h1>Chat</h1>
            <div className="overflow-y-auto flex flex-col-reverse rounded-t w-[300px] h-[400px] bg-[#F1FAEE] border border-slate-900">
                {messages.map((msg) => (
                    <div key={msg.id} className="flex">
                        <img
                            src={msg.profile_pic || "/defaultProfilePic.jpg"}
                            className="w-[50px] rounded-full h-[50px] object-cover self-center"
                        />
                        <div>
                            <p>
                                <span className="font-semibold text-sm">
                                    {msg.first} {msg.last}
                                </span>
                                <span className="text-xs">
                                    {" "}
                                    {msg.timestamp}
                                </span>
                            </p>
                            <p className="text-xs">{msg.message_text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={(e) => handleSend(e)}>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                ></textarea>
                <button>Send Message</button>
            </form>
        </div>
    );
}
