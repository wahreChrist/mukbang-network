import { Component } from "react";

type Props = {
    bio: string;
    updateBio: (bio: string) => void;
};

type State = {
    editMode: boolean;
    bioDraft: string;
};

export default class BioEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editMode: false,
            bioDraft: "",
        };
    }

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        fetch("/update-bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.updateBio(data.bio);
                this.setState({ editMode: false });
            })
            .catch((err) => {
                console.log("error in updating bio", err);
            });
    }

    toggleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.setState({ editMode: true });
    }

    render() {
        return (
            <div>
                {this.state.editMode && (
                    <div>
                        <textarea
                            name="bioDraft"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button onClick={(e) => this.handleSubmit(e)}>
                            Save
                        </button>
                    </div>
                )}
                {!this.state.editMode && this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={(e) => this.toggleEdit(e)}>
                            Edit bio
                        </button>
                    </div>
                )}
                {!this.state.editMode && !this.props.bio && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button onClick={(e) => this.toggleEdit(e)}>
                            Add bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
