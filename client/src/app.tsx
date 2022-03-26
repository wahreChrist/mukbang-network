import { Component } from "react";
import ProfilePic from "./profile-pic";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findpeople";
import OtherProfile from "./otherprofile";
import FriendsAndWannabees from "./friend-wannabies";
import Chat from "./chat";
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
                    <header className="flex justify-around w-screen px-8 bg-[#f5f5f5]">
                        <Link to="/">
                            <Logo />
                        </Link>
                        <Link
                            to="/chat"
                            className="font-[Wallpoet] font-bold self-center text-lg text-[#1d3557] hover:text-[#E63946] "
                        >
                            CHAT
                        </Link>
                        <Link
                            to="/friends"
                            className="font-[Wallpoet] font-bold self-center text-lg text-[#1d3557] hover:text-[#E63946] "
                        >
                            FREN LIST
                        </Link>
                        <Link
                            to="/users"
                            className="font-[Wallpoet] font-bold self-center text-lg text-[#1d3557] hover:text-[#E63946] "
                        >
                            SEARCH PEOPLE
                        </Link>
                        <div className="flex self-center">
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

                    <div className="mx-auto flex p-4 w-[850px] bg-[#1D3557] text-white border-2 border-[#F1FAEE] min-h-[450px] my-6">
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
                        <Route path="/chat">
                            <Chat />
                        </Route>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
