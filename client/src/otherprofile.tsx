import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import FriendButton from "./friendbutton";

interface UserInfo {
    id: number;
    first: string;
    last: string;
    email: string;
    profile_pic: string;
    bio: string;
}

export default function OtherProfile(): JSX.Element {
    const [userData, setUserData] = useState<UserInfo>({} as UserInfo);
    const [errState, setErrState] = useState<boolean>(false);
    const { otherUserId }: { otherUserId: string } = useParams();
    const history = useHistory();

    useEffect(() => {
        let abort = false;

        (async (): Promise<void> => {
            setErrState(false);
            if (!abort) {
                try {
                    const response = await fetch(`/fetchUser/${otherUserId}`);
                    const data = await response.json();
                    // console.log("data obj:", data);
                    const [userInfo, myId] = data;
                    myId == parseInt(otherUserId)
                        ? history.push("/")
                        : setUserData(userInfo);
                } catch (err) {
                    console.log("error in getting user info", err);
                    setErrState(true);
                }
            }
        })();

        return (): void => {
            abort = true;
        };
    }, [otherUserId]);

    const centerText: React.CSSProperties = {
        textAlign: "center",
        width: "100%",
    };

    return (
        <>
            {errState ? (
                <h2 style={centerText}> 404 User with such id doesnt exists</h2>
            ) : (
                <>
                    <div className="flex flex-col">
                        <img
                            className="min-w-[200px] h-[250px] object-cover mb-2"
                            src={
                                userData.profile_pic || "/defaultProfilePic.jpg"
                            }
                            alt="profilepic"
                        />
                        <FriendButton otherUserId={parseInt(otherUserId)} />
                    </div>
                    <div className="px-4">
                        <h4 className="font-semibold text-lg">
                            {userData.first} {userData.last}
                        </h4>
                        <p>E-mail: {userData.email}</p>
                        <p className="text-sm py-1">{userData.bio}</p>
                    </div>
                </>
            )}
        </>
    );
}
