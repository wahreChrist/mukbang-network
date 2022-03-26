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
            <div className="flex justify-center">
                {frens.length != 0 ? (
                    frens.map((fren: WannabeeAndFren, index: number) => (
                        <div
                            key={index}
                            className="mx-2 flex flex-col justify-center"
                        >
                            <img
                                src={
                                    fren.profile_pic || "/defaultProfilePic.jpg"
                                }
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
                                className="text-xs bg-[#e63946] py-1 px-3 mt-2 rounded-full text-white self-center hover:text-[#1d3557] hover:bg-[#A8DADC]"
                            >
                                Unfriend
                            </button>
                        </div>
                    ))
                ) : (
                    <h3>You dont have any friends yet!</h3>
                )}
            </div>

            <h2 className="text-center font-semibold my-3">Wannabees</h2>
            <div className="flex justify-center">
                {wannabees.length != 0 ? (
                    wannabees.map(
                        (wannabee: WannabeeAndFren, index: number) => (
                            <div
                                key={index}
                                className="mx-2 flex flex-col justify-center"
                            >
                                <img
                                    src={
                                        wannabee.profile_pic ||
                                        "/defaultProfilePic.jpg"
                                    }
                                    className="w-[135px] object-cover h-[180px]"
                                    alt="profile_pic"
                                />
                                <p className="text-sm text-center">
                                    {wannabee.first} {wannabee.last}
                                </p>
                                <button
                                    onClick={() => handleAccept(wannabee.id)}
                                    className="text-xs bg-[#f1faee] py-1 px-2 mt-2 rounded-full text-[#1d3557] hover:text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50"
                                >
                                    Accept friend request
                                </button>
                            </div>
                        )
                    )
                ) : (
                    <h3>There are no pending friend requests</h3>
                )}
            </div>
        </section>
    );
}
