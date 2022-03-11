import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    componentDidMount() {
        console.log("login component");
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
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
                data.success == false
                    ? this.setState({ error: true })
                    : location.reload();
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
                <h1>Login</h1>
                <p>Social network for a hambeasts</p>
                {this.state.error && (
                    <div style={{ color: "red" }}>*There was an error</div>
                )}
                <form method="POST" className="loginForm">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        required
                        onChange={(e) => this.handleChange(e)}
                    ></input>
                    <button onClick={(e) => this.handleSubmit(e)}>Login</button>
                </form>
                <Link to="/reset-password">Reset you password</Link>
            </>
        );
    }
}
