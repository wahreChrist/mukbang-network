import { Component } from "react";
import { Link } from "react-router-dom";

type State = {
    error: boolean;
    first: string;
    last: string;
    email: string;
    password: string;
};

export default class Registration extends Component {
    state: State = {
        error: false,
        first: "",
        last: "",
        email: "",
        password: "",
    };

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        fetch("/user/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                data.success == false
                    ? this.setState({ error: true })
                    : location.reload();
            })
            .catch((err) => {
                console.log("error in fetch for adding a user", err);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <div>
                <h1 className="font-bold mb-4 text-lg">Registration:</h1>
                {this.state.error && (
                    <div className="text-red-600 ">There was an error</div>
                )}
                <form className="flex flex-col space-y-4">
                    <input
                        className="p-1.5"
                        name="first"
                        type="text"
                        placeholder="first"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        className="p-2"
                        name="last"
                        type="text"
                        placeholder="last"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        className="p-2"
                        name="email"
                        type="text"
                        placeholder="email"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        className="p-2"
                        name="password"
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button
                        onClick={(e) => this.handleSubmit(e)}
                        className="font-bold bg-[#1d3557] text-white p-2 hover:border-2 hover:border-[#1d3557] hover:text-[#1d3557] hover:bg-white"
                    >
                        Register
                    </button>
                    <p className="p-2">
                        Already a member?{" "}
                        <Link
                            to="/login"
                            className="font-semibold hover:text-red-700"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        );
    }
}
