import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props); // hideUploader & updateProfilePic functions
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    handleSubmit(e) {
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
