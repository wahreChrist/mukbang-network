import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { BrowserRouter, Route } from "react-router-dom";

export default function Welcome(): JSX.Element {
    return (
        <div className="bg-[#f5f5f5] text-[#1d3557] w-full min-h-screen">
            <div className="w-[800px] mx-auto">
                <img
                    className="mx-auto w-[500px] ob"
                    src="/mukbanglogo.jpg"
                    alt="logo"
                />
                <h1 className="font-[Wallpoet] my-2 text-lg text-center">
                    Social network for a hambeasts
                </h1>
                <div className="w-[200px] text-center mx-auto">
                    <BrowserRouter>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/reset-password">
                            <ResetPassword />
                        </Route>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
}
