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
            <>
                <h1>Registration:</h1>
                {this.state.error && (
                    <div style={{ color: "red" }}>There was an error</div>
                )}
                <form className="regForm">
                    <input
                        name="first"
                        type="text"
                        placeholder="first"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="last"
                        type="text"
                        placeholder="last"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="email"
                        type="text"
                        placeholder="email"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        name="password"
                        type="text"
                        placeholder="password"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </form>
                <Link to="/login">Already a member? Login</Link>
            </>
        );
    }
}
