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
            <section className="absolute top-[181px] left-[463px] bg-white rounded border border-stone-900 w-[400px] h-[250px] p-4 text-right shadow-lg shadow-stone-500/40">
                <div className="flex justify-between w-full content-center">
                    <h3 className="text-[#A8DADC]">Upload File</h3>

                    <div onClick={this.props.hideUploader}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            className="h-[20px] cursor-pointer fill-[#1d3557]"
                        >
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                    </div>
                </div>

                <form className="border-2 border-dotted rounded-md border-[#457B9D] my-4 flex justify-center h-24 items-center ">
                    <input
                        accept="image/*"
                        type="file"
                        id="file"
                        name="profilePic"
                        hidden
                        required
                        onChange={(e) => this.handleChange(e)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                        className="h-[30px] inline fill-[#A8DADC]"
                    >
                        <path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z" />
                    </svg>
                    <label
                        htmlFor="file"
                        className="ml-2 hover:text-indigo-500 cursor-pointer"
                    >
                        Choose a file to upload
                    </label>
                </form>
                <button
                    className="text-sm text-white bg-[#1d3557] rounded py-1.5 px-3  hover:bg-indigo-500"
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    UPLOAD FILE
                </button>
            </section>
        );
    }
}
