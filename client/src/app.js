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
            profilePic: "",
            uploaderVisible: false,
        };
    }

    componentDidMount() {
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                //user Obj {first: george, last: barkley, ...}
                this.setState({
                    first: "Oliver",
                    last: "Twist",
                });
            })
            .catch((err) => console.log(err));
    }

    showUploader() {
        this.setState({
            uploaderVisible: !this.uploaderVisible,
        });
    }

    updateProfilePic(newProfilePic) {
        //??
    }

    render() {
        return (
            <div id="app">
                <Logo />
                <ProfilePic
                    url={this.state.profilePic}
                    first={this.state.first}
                    last={this.state.last}
                    showUploader={() => this.showUploader()}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        hideUploader={() => this.showUploader()}
                        updateProfilePic={() => this.updateProfilePic()}
                    />
                )}
            </div>
        );
    }
}
