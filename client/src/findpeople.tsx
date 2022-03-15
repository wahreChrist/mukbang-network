import { useState, useEffect } from "react";

type User = {
    id: number;
    first: string;
    last: string;
    profile_pic: string | null;
};

export default function FindPeople(): JSX.Element {
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        search.length == 0
            ? fetch("/getAllUsers")
                  .then((resp) => resp.json())
                  .then((data) => {
                      setUsers(data);
                  })
                  .catch((err) => {
                      console.log("error in pulling users", err);
                  })
            : fetch(`/searchUsers/${search}`)
                  .then((res) => res.json())
                  .then((data) => {
                      setUsers(data);
                  })
                  .catch((err) => {
                      console.log("error in searching users", err);
                  });
    }, [search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <h3>Find people</h3>
            <input
                type={"text"}
                name="search"
                placeholder="Enter name"
                onChange={(e) => handleChange(e)}
            ></input>

            {search.length == 0 ? (
                <p>Check out who just joined!</p>
            ) : (
                <p>Search results:</p>
            )}

            {users.map((user) => (
                <div key={user.id} className="userElement">
                    <img
                        className="userElement--photo"
                        src={user.profile_pic || "defaultProfilePic.jpg"}
                        alt="photo preview"
                    />
                    <p className="searchResult">
                        {user.first} {user.last}
                    </p>
                </div>
            ))}
        </div>
    );
}
