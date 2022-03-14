import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetpassword";
import { BrowserRouter, Route } from "react-router-dom";

export default function Welcome(): JSX.Element {
    return (
        <>
            <img
                className="mainLogo"
                src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/2168385/2168385-1566118223275-96cfbdbb04d53.jpg"
                alt="logo"
            />
            <BrowserRouter>
                <h1>welcome</h1>
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
        </>
    );
}
