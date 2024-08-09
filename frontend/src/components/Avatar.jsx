import avatar from "../../test/vavatar.jpg";

const Avatar = ({ imgLink = avatar, playerName }) => {
  return (
    <img
      className="h-64 w-64 rounded-full object-cover object-center"
      src={imgLink}
      alt={`${playerName} avatar`}
    />
  );
};

export default Avatar;
