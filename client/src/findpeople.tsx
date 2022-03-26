import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="mx-auto w-1/2">
            <h2 className="font-bold mb-4">Find people</h2>
            <input
                className="w-full rounded mb-4 p-1.5 text-stone-900"
                type={"text"}
                name="search"
                placeholder="Enter name"
                onChange={(e) => handleChange(e)}
            ></input>

            {search.length == 0 ? (
                <p className="mb-4">Check out who just joined!</p>
            ) : (
                <p className="mb-4">Search results:</p>
            )}

            {users.map((user) => (
                <div key={user.id} className="flex p-2 hover:bg-indigo-400">
                    <img
                        className="w-14 h-14 object-cover rounded-full"
                        src={user.profile_pic || "/defaultProfilePic.jpg"}
                        alt="photo preview"
                    />
                    <Link to={`/api/user/${user.id}`} className="p-4">
                        {user.first} {user.last}
                    </Link>
                </div>
            ))}
        </div>
    );
}
