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

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key == "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", { userInput });
            setUserInput("");
        }
    };

    return (
        <div className="flex">
            <div className="mr-3">
                <h1 className="text-xl text-center font-bold">Chat</h1>
                <div className="overflow-y-auto my-2 flex flex-col-reverse rounded-t w-[410px] h-[600px] bg-[#F1FAEE] border border-slate-900 text-[#1d3557]">
                    {messages.map((msg) => (
                        <div key={msg.id} className="flex p-2">
                            <img
                                src={
                                    msg.profile_pic || "/defaultProfilePic.jpg"
                                }
                                className="w-[50px] rounded-full h-[50px] object-cover self-center"
                            />
                            <div>
                                <p className="ml-1">
                                    <span className="font-semibold text-sm">
                                        {msg.first} {msg.last}
                                    </span>
                                    <span className="text-xs">
                                        {" "}
                                        {msg.timestamp}
                                    </span>
                                </p>
                                <p className="text-xs ml-1">
                                    {msg.message_text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={(e) => handleSend(e)} className="flex">
                    <textarea
                        className="w-[350px] text-stone-900 p-1 rounded"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                        onKeyDown={(e) => handleEnter(e)}
                    ></textarea>
                    <button className="text-sm p-2 rounded-full bg-stone-100 text-[#1d3557] ml-2 font-bold self-center">
                        Send
                    </button>
                </form>
            </div>
            <div>
                <a
                    href="https://www.fbi.gov"
                    target="_blank"
                    className="grid w-auto gap-2 grid-cols-2 auto-rows-min self-center"
                >
                    <img
                        className="col-span-2"
                        src="https://neolurk.org/w/images/e/ef/Speed-7.jpg"
                        alt="ads"
                    />

                    <img
                        src="https://neolurk.org/w/images/d/df/Speed-10.jpg"
                        alt="ads"
                    />

                    <img
                        src="https://neolurk.org/w/images/5/58/Speed-3.jpg"
                        alt="ads"
                    />

                    <img
                        className="col-span-2"
                        src="https://neolurk.org/w/images/3/3c/Speed-8.jpg"
                        alt="ads"
                    />
                </a>
            </div>
        </div>
    );
}
