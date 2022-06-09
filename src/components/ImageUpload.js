export default function ImageUpload() {
  return (
    <div>
      <img
        src={user.userInformation.profieImage}
        onClick={updateUserImage}></img>
    </div>
  );
}
