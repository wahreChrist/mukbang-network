import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeFriend, getList, unFriend } from "./redux/friends/slice";

interface WannabeeAndFren {
    id: number;
    first: string;
    last: string;
    profile_pic: string;
    accepted: boolean;
}

interface State {
    friends: WannabeeAndFren[];
}

export default function FriendsAndWannabees(): JSX.Element {
    const dispatch = useDispatch();

    const wannabees = useSelector((state: State) =>
        state.friends.filter((frenship: WannabeeAndFren) => !frenship.accepted)
    );

    const frens = useSelector(
        (state: State) =>
            state.friends &&
            state.friends.filter(
                (frenship: WannabeeAndFren) => frenship.accepted
            )
    );

    useEffect(() => {
        (async () => {
            const res = await fetch("/friends-wannabees");
            const data = await res.json();
            // console.table(data);
            dispatch(getList(data));
        })();
    }, []);

    const handleAccept = async (otherUserId: number) => {
        const res = await fetch("/friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId,
                action: "Accept fren request",
            }),
        });
        const data = await res.json();
        dispatch(makeFriend(otherUserId));
    };

    const handleUnfren = async (otherUserId: number) => {
        const res = await fetch("/friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId,
                action: "Unfren",
            }),
        });
        // const data = await res.json();
        dispatch(unFriend(otherUserId));
    };

    return (
        <section className="mx-auto">
            <h1 className="text-center font-semibold my-3">Friends</h1>
            <div className="flex">
                {frens.map((fren: WannabeeAndFren, index: number) => (
                    <div
                        key={index}
                        className="mx-2 flex flex-col justify-center"
                    >
                        <img
                            src={fren.profile_pic || "/defaultProfilePic.jpg"}
                            className="w-[135px] object-cover h-[180px]"
                            alt="profile_pic"
                        />
                        <p className="text-sm text-center">
                            {fren.first} {fren.last}
                        </p>
                        <button
                            onClick={() => {
                                handleUnfren(fren.id);
                            }}
                            className="text-xs bg-[#e63946] py-1 px-3 mt-2 rounded-full text-white self-center"
                        >
                            Unfriend
                        </button>
                    </div>
                ))}
            </div>

            <h2 className="text-center font-semibold my-3">Wannabees</h2>
            <div className="flex">
                {wannabees.map((wannabee: WannabeeAndFren, index: number) => (
                    <div
                        key={index}
                        className="mx-2 flex flex-col justify-center"
                    >
                        <img
                            src={
                                wannabee.profile_pic || "/defaultProfilePic.jpg"
                            }
                            className="w-[135px] object-cover h-[180px]"
                            alt="profile_pic"
                        />
                        <p className="text-sm text-center">
                            {wannabee.first} {wannabee.last}
                        </p>
                        <button
                            onClick={() => handleAccept(wannabee.id)}
                            className="text-xs bg-[#1d3557] py-1 px-2 mt-2 rounded-full text-white"
                        >
                            Accept friend request
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
