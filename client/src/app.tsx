import { Component } from "react";
import ProfilePic from "./profile-pic";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";

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

    showUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    hideUploader() {
        this.setState({
            uploaderVisible: false,
        });
    }

    updateProfilePic(newProfilePic: string) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    updateBio(newBio: string) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div id="app">
                <header>
                    <Logo />
                    <div className="uploadSection">
                        <ProfilePic
                            url={this.state.profilePic}
                            first={this.state.first}
                            last={this.state.last}
                            showUploader={() => this.showUploader()}
                        />
                        {this.state.uploaderVisible && (
                            <Uploader
                                hideUploader={() => this.hideUploader()}
                                updateProfilePic={(newProfilePic) =>
                                    this.updateProfilePic(newProfilePic)
                                }
                            />
                        )}
                    </div>
                </header>

                <div className="dashboard">
                    <Profile
                        profilePic={this.state.profilePic}
                        first={this.state.first}
                        last={this.state.last}
                        email={this.state.email}
                        bio={this.state.bio}
                        updateBio={(newBio) => this.updateBio(newBio)}
                    />
                </div>
            </div>
        );
    }
}
