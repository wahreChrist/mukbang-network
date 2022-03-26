import { Component } from "react";
import { Link } from "react-router-dom";

type State = {
    error: boolean;
    email: string;
    password: string;
};
export default class Login extends Component {
    state: State = {
        error: false,
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
        fetch("/user/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                //login logic
                console.log("response from login", data);
                data.success
                    ? location.reload()
                    : this.setState({ error: true });
            })
            .catch((err) => {
                console.log("error in login fetch request", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        return (
            <>
                {this.state.error && (
                    <div className="text-red-600">*There was an error</div>
                )}
                <form method="POST" className="flex flex-col space-y-4">
                    <input
                        className="p-1.5"
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        className="p-1.5"
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button
                        className="font-bold bg-[#1d3557] text-white p-2 hover:border-2 hover:border-[#1d3557] hover:text-[#1d3557] hover:bg-white"
                        onClick={(e) => this.handleSubmit(e)}
                    >
                        Login
                    </button>
                    <Link
                        className="font-semibold hover:text-red-700"
                        to="/reset-password"
                    >
                        Reset you password
                    </Link>
                </form>
            </>
        );
    }
}
