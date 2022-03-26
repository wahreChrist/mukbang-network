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
                    className="w-[200px] h-[250px] object-cover"
                    src={this.props.profilePic || "/defaultProfilePic.jpg"}
                    alt="profilepic"
                />
                <div className="mx-4 w-9/12">
                    <h3 className="font-semibold text-lg">
                        {this.props.first} {this.props.last}
                    </h3>
                    <h4 className="my-2">E-mail: {this.props.email}</h4>
                    <BioEditor
                        bio={this.props.bio}
                        updateBio={this.props.updateBio}
                    />
                </div>
            </>
        );
    }
}
