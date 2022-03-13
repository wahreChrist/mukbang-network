export default function ProfilePic(props) {
    let url = props.url || "defaultProfilePic.jpg";
    return (
        <div onClick={props.showUploader}>
            <img src={url} alt={`${props.first} ${props.last}`} />
        </div>
    );
}
