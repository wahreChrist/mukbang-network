import { Component } from "react";
import ProfilePic from "./profile-pic";
import Logo from "./logo";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            profilePic: undefined,
            uploaderVisible: false,
        };
    }

    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    email: data.email,
                    profilePic: data.profile_pic,
                });
            })
            .catch((err) => console.log(err));
    }

    showUploader() {
        this.setState({
            uploaderVisible: !this.uploaderVisible,
        });
    }

    hideUploader() {
        this.setState({
            uploaderVisible: false,
        });
    }

    updateProfilePic(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }

    render() {
        return (
            <div id="app">
                <Logo />
                <br />
                <div className="dashboard">
                    <div className="userInfo">
                        <h4>
                            Name: {this.state.first} {this.state.last}
                        </h4>
                        <p>E-mail: {this.state.email}</p>
                    </div>
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
                </div>
            </div>
        );
    }
}
