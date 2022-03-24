import { useState, useEffect } from "react";

interface Status {
    id: number;
    recipient_id: number;
    sender_id: number;
    accepted: boolean;
}

export default function FriendButton({
    otherUserId,
}: {
    otherUserId: number;
}): JSX.Element {
    const [status, setStatus] = useState<Status | undefined>();

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const fetchedStatus = await fetch(`/friendship/${otherUserId}`);
                const data = await fetchedStatus.json();
                console.log(data);
                data.status
                    ? console.log("no data in the db for this pair yet")
                    : setStatus(data);
            } catch (err) {
                console.log("error in fetching status", err);
            }
        })();
    }, []);

    const buttonContext = (): string => {
        if (status === undefined) {
            return "Send fren request";
        } else if (
            status.accepted == false &&
            otherUserId === status.recipient_id
        ) {
            return "Cancel fren request";
        } else if (status.accepted) {
            return "Unfren";
        } else {
            return "Accept fren request";
        }
    };

    const requestHandler = () => {
        fetch("/friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                otherUserId,
                action: buttonContext(),
            }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("status object: ", data);
                if (data.status === "inviteSent") {
                    setStatus((prevStatus) => ({
                        ...prevStatus,
                        accepted: false,
                    }));
                } else if (data.status === "unfriended/canceled") {
                    setStatus(undefined);
                } else if (data.status === "accepted") {
                    setStatus((prevStatus) => ({
                        ...prevStatus,
                        accepted: true,
                    }));
                }
            })
            .catch((err) => {
                console.log("error in sending fren request", err);
            });
    };

    return (
        <>
            <button
                onClick={() => requestHandler()}
                className="self-center bg-[#457b9d] text-white rounded py-2 px-4 hover:bg-[#1d3557] shadow-lg shadow-stone-500/40"
            >
                {buttonContext()}
            </button>
        </>
    );
}
