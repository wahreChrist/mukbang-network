export default function FriendsWannabeesReducer(friends = [], action) {
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

export function getList(friends) {
    return {
        type: "friends-and-wannabees/received",
        payload: { friends },
    };
}

export function makeFriend(id) {
    return {
        type: "friends-and-wannabees/accept",
        payload: { id },
    };
}

export function unFriend(id) {
    return {
        type: "friends-and-wannabees/unfriend",
        payload: { id },
    };
}
