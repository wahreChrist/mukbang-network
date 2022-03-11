import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
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
        //3 append file to it
        //4 send data over o the server with fetch
        //if its success, update a profile pic
    }

    render() {
        return (
            <>
                <div onClick={this.props.showUploader}>X</div>
                <div>uploader</div>
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleChange}></input>
                    <button>Submit</button>
                </form>
            </>
        );
    }
}
