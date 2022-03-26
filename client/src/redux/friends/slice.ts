interface Friend {
    id: number;
    first: number;
    last: number;
    profile_pic: number;
    accepted: boolean;
}

interface ActionList {
    type: "friends-and-wannabees/received";
    payload: { friends: Friend[] };
}

interface ActionFriend {
    type: "friends-and-wannabees/accept";

    payload: { id: number };
}

interface ActionUnfriend {
    type: "friends-and-wannabees/unfriend";

    payload: { id: number };
}

type Action = ActionFriend | ActionList | ActionUnfriend;

export default function FriendsWannabeesReducer(
    friends: Friend[] = [],
    action: Action
) {
    if (action.type === "friends-and-wannabees/received") {
        friends = action.payload.friends;
    } else if (action.type === "friends-and-wannabees/accept") {
        friends = friends.map((fren) => {
            if (fren.id === action.payload.id) {
                return {
                    ...fren,
                    accepted: true,
                };
            }
            return fren;
        });
    } else if (action.type === "friends-and-wannabees/unfriend") {
        return friends.filter((fren) => fren.id !== action.payload.id);
    }
    return friends;
}

export function getList(friends: Friend[]) {
    return {
        type: "friends-and-wannabees/received",
        payload: { friends },
    };
}

export function makeFriend(id: number) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function unFriend(id: number) {
    return {
        type: "friends-and-wannabees/unfriend",
        payload: { id },
    };
}
