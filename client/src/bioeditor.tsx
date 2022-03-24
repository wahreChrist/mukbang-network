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
                    <div className="flex flex-col">
                        <textarea
                            className="w-full my-2 rounded"
                            name="bioDraft"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <button
                            onClick={(e) => this.handleSubmit(e)}
                            className="text-xs rounded-full py-1.5 px-8 text-white font-medium self-center bg-[#e63946]"
                        >
                            Save
                        </button>
                    </div>
                )}
                {!this.state.editMode && this.props.bio && (
                    <div>
                        <p className="text-sm pt-1">{this.props.bio}</p>
                        <button
                            onClick={(e) => this.toggleEdit(e)}
                            className="text-xs rounded py-1.5 px-4 mt-2 text-white font-medium bg-[#1d3557] shadow-lg shadow-stone-500/40"
                        >
                            Edit bio
                        </button>
                    </div>
                )}
                {!this.state.editMode && !this.props.bio && (
                    <div>
                        <p className="text-sm pt-1">{this.props.bio}</p>
                        <button
                            onClick={(e) => this.toggleEdit(e)}
                            className="text-xs rounded py-1.5 px-4 mt-2 text-white font-medium bg-[#1d3557] shadow-lg shadow-stone-500/40"
                        >
                            Add bio
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
