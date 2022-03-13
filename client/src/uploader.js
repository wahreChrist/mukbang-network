import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props); // hideUploader & updateProfilePic functions
        this.state = {};
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", this.state.profilePic);
        fetch("/profile-pic", {
            method: "POST",
            body: data,
        })
            .then((resp) => resp.json())
            .then(({ profile_pic }) => {
                //update profile pic
                this.props.updateProfilePic(profile_pic);
            })
            .catch((err) => {
                console.log("error in updating a profile picture", err);
            });
        //3 append file to it
        //4 send data over o the server with fetch
        //if its success, update a profile pic
    }

    render() {
        return (
            <>
                <div onClick={this.props.hideUploader}>X</div>
                <div>uploader</div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="file"
                        name="profilePic"
                        onChange={this.handleChange}
                    ></input>
                    <button>Submit</button>
                </form>
            </>
        );
    }
}
