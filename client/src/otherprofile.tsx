import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

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
                    console.log("data obj:", data);
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
                    <img
                        className="profilePicBig"
                        src={userData.profile_pic || "defaultProfilePic.jpg"}
                        alt="profilepic"
                    />
                    <div className="userInfo">
                        <h4>
                            {userData.first} {userData.last}
                        </h4>
                        <p>{userData.email}</p>
                        <p>{userData.bio}</p>
                    </div>
                </>
            )}
        </>
    );
}
