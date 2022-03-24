export default function ChatReducer(messages = [], action) {
    if (action.type === "get-latest-messages") {
        messages = action.payload.msgs;
    } else if (action.type === "post-message") {
        messages = [action.payload.msg, ...messages];
    }
    return messages;
}

export function latestMessagesReceived(msgs) {
    return {
        type: "get-latest-messages",
        payload: { msgs },
    };
}
export function chatMessageReceived(msg) {
    return {
        type: "post-message",
        payload: { msg },
    };
}
