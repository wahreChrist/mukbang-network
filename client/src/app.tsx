import { Component } from "react";
import ProfilePic from "./profile-pic";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findpeople";
import OtherProfile from "./otherprofile";
import FriendsAndWannabees from "./friend-wannabies";
import { BrowserRouter, Link, Route } from "react-router-dom";

type State = {
    first: string;
    last: string;
    email: string;
    profilePic: string | undefined;
    uploaderVisible: boolean;
    bio: string;
};

export default class App extends Component {
    state: State = {
        first: "",
        last: "",
        email: "",
        profilePic: undefined,
        uploaderVisible: false,
        bio: "",
    };

    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    profilePic: data.profile_pic,
                    bio: data.bio,
                });
            })
            .catch((err) => console.log(err));
    }

    showUploader(): void {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    updateProfilePic(newProfilePic: string): void {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    updateBio(newBio: string): void {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div id="app" className="flex flex-col text-[#1d3557]">
                <BrowserRouter>
                    <header>
                        <Link to="/">
                            <Logo />
                        </Link>
                        <div className="flex self-center">
                            <Link
                                to="/friends"
                                className="self-center mr-4 bg-[#457b9d] text-white rounded py-1 px-4 hover:bg-[#1d3557] shadow-lg shadow-stone-500/40"
                            >
                                Fren List
                            </Link>
                            <Link
                                to="/users"
                                className="self-center mr-4 bg-[#457b9d] text-white rounded py-1 px-4 hover:bg-[#1d3557] shadow-lg shadow-stone-500/40"
                            >
                                Search for people
                            </Link>

                            <ProfilePic
                                url={this.state.profilePic}
                                first={this.state.first}
                                last={this.state.last}
                                showUploader={() => this.showUploader()}
                            />
                            {this.state.uploaderVisible && (
                                <Uploader
                                    hideUploader={() => this.showUploader()}
                                    updateProfilePic={(newProfilePic) =>
                                        this.updateProfilePic(newProfilePic)
                                    }
                                />
                            )}
                        </div>
                    </header>

                    <div className="flex p-4 w-[800px] border-2 border-[#457b9d] min-h-[450px] mb-4">
                        <Route exact path="/">
                            <Profile
                                profilePic={this.state.profilePic}
                                first={this.state.first}
                                last={this.state.last}
                                email={this.state.email}
                                bio={this.state.bio}
                                updateBio={(newBio) => this.updateBio(newBio)}
                            />
                        </Route>
                        <Route path="/users">
                            <FindPeople />
                        </Route>
                        <Route path="/api/user/:otherUserId">
                            <OtherProfile />
                        </Route>
                        <Route path="/friends">
                            <FriendsAndWannabees />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
