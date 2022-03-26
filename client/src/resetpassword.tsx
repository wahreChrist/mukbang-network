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
                        <p className="text-red-600">
                            something went wrong, please try again
                        </p>
                    )}
                    <p className="mb-4">
                        Please, enter your e-mail on which you will recieve a
                        verification code:
                    </p>
                    <input
                        className="p-1"
                        type="text"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        key={1}
                    ></input>
                    <button
                        onClick={(e) => this.reqCode(e)}
                        className="py-1.5 px-3 bg-[#1d3557] mx-4 text-white rounded-full"
                    >
                        Submit
                    </button>
                </form>
            );
        } else if (this.state.view == 2) {
            return (
                <form>
                    {this.state.error && (
                        <p className="text-red-600">
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
        return (
            <div className="w-[500px] translate-x-[-29%]">
                {this.determiner()}
            </div>
        );
    }
}
