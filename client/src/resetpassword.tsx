import { Component } from "react";
import { Link } from "react-router-dom";

type State = {
    view: number;
    error: boolean;
    email: string;
    code: string;
    newPass: string;
};

export default class ResetPassword extends Component {
    state: State = {
        view: 1,
        error: false,
        email: "",
        code: "",
        newPass: "",
    };

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    reqCode(e: React.SyntheticEvent) {
        e.preventDefault();
        fetch("/password/reset/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("succesfull request for code", data);
                data.success &&
                    this.setState({
                        view: 2,
                        error: false,
                    });
            })
            .catch((err) => {
                console.log("error in changing password", err);
                this.setState({
                    error: true,
                });
            });
    }

    sendCode(e: React.SyntheticEvent) {
        e.preventDefault();
        fetch("/password/reset/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("succesfull verification of a code", data);
                data.success &&
                    this.setState({
                        view: 3,
                        error: false,
                    });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    view: 2,
                    error: true,
                });
            });
    }

    determiner(): JSX.Element {
        if (this.state.view == 1) {
            return (
                <form>
                    {this.state.error && (
                        <p style={{ color: "red" }}>
                            something went wrong, please try again
                        </p>
                    )}
                    <p>
                        enter your e-mail where you will recieve a verification
                        code:
                    </p>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        key={1}
                    ></input>
                    <button onClick={(e) => this.reqCode(e)}>Submit</button>
                </form>
            );
        } else if (this.state.view == 2) {
            return (
                <form>
                    {this.state.error && (
                        <p style={{ color: "red" }}>
                            something went wrong, please try again
                        </p>
                    )}
                    <input
                        type="text"
                        name="code"
                        onChange={(e) => this.handleChange(e)}
                        key={2}
                    ></input>
                    <input
                        type="text"
                        name="newPass"
                        onChange={(e) => this.handleChange(e)}
                        key={3}
                    ></input>
                    <button onClick={(e) => this.sendCode(e)}>Submit</button>
                </form>
            );
        } else if (this.state.view == 3) {
            return (
                <>
                    <h3>Password has been successully changed</h3>
                    <Link to="/login">go back to login page</Link>
                </>
            );
        }
    }

    render() {
        return <div style={{ padding: "1em" }}>{this.determiner()}</div>;
    }
}
