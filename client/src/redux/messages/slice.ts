interface Msg {
    id: number;
    first: string;
    last: string;
    sender_id: number;
    message_text: string;
    timestamp: Date;
    profile_pic: string;
}

interface ActionLatest {
    type: "get-latest-messages";
    payload: { msgs: Msg[] };
}
interface ActionPost {
    type: "post-message";
    payload: { msg: Msg };
}

type Action = ActionPost | ActionLatest;

export default function ChatReducer(messages: Msg[] = [], action: Action) {
    if (action.type === "get-latest-messages") {
        messages = action.payload.msgs;
    } else if (action.type === "post-message") {
        messages = [action.payload.msg, ...messages];
    }
    return messages;
}

export function latestMessagesReceived(msgs: Msg[]) {
    return {
        type: "get-latest-messages",
        payload: { msgs },
    };
}
export function chatMessageReceived(msg: Msg) {
    return {
        type: "post-message",
        payload: { msg },
    };
}
