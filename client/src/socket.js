import {
    latestMessagesReceived,
    chatMessageReceived,
} from "./redux/messages/slice";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("latestMessages", (msgs) =>
            store.dispatch(latestMessagesReceived(msgs))
        );

        socket.on("chatMessage", (msg) =>
            store.dispatch(chatMessageReceived(msg))
        );
    }
};
