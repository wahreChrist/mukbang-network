type AppProps = {
    url?: string;
    first: string;
    last: string;
    showUploader: () => void;
};

export default function ProfilePic(props: AppProps): JSX.Element {
    let url = props.url || "/defaultProfilePic.jpg";
    return (
        <div onClick={props.showUploader}>
            <img
                className="w-[60px] object-cover cursor-pointer"
                src={url}
                alt={`${props.first} ${props.last}`}
            />
        </div>
    );
}
