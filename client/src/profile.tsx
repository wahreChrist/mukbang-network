import { Component } from "react";
import BioEditor from "./bioeditor";

type AppProps = {
    profilePic: string;
    email: string;
    first: string;
    last: string;
    bio: string;
    updateBio: (newBio: string) => void;
};

export default class Profile extends Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <img
                    className="profilePicBig"
                    src={this.props.profilePic || "/defaultProfilePic.jpg"}
                    alt="profilepic"
                />
                <div className="userInfo">
                    <h4>
                        {this.props.first} {this.props.last}
                    </h4>
                    <p>{this.props.email}</p>
                    <BioEditor
                        bio={this.props.bio}
                        updateBio={this.props.updateBio}
                    />
                </div>
            </>
        );
    }
}
