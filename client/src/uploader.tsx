import { Component } from "react";

type Props = {
    hideUploader: () => void;
    updateProfilePic: (profile_pic: string) => void;
};

type State = {
    file: File | undefined;
};

export default class Uploader extends Component<Props, State> {
    constructor(props: Props) {
        super(props); // hideUploader & updateProfilePic functions
        this.state = {
            file: undefined,
        };
    }
    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            file: e.currentTarget.files[0],
        });
    }

    handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", this.state.file);
        fetch("/profile-pic", {
            method: "POST",
            body: data,
        })
            .then((resp) => resp.json())
            .then(({ profile_pic }) => {
                this.props.updateProfilePic(profile_pic);
            })
            .catch((err) => {
                console.log("error in updating a profile picture", err);
            });
    }
    render() {
        return (
            <>
                <div onClick={this.props.hideUploader}>X</div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        accept="image/*"
                        type="file"
                        name="profilePic"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button>Submit</button>
                </form>
            </>
        );
    }
}
