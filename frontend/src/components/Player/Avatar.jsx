import avatar from "../../../test/vavatar.jpg";

const Avatar = ({ imgLink = avatar, playerName, gameType }) => {
  if (gameType === "vs") {
    return (
      <img
        className="h-64 w-64 rounded-full object-cover object-center"
        src={imgLink}
        alt={`${playerName} avatar`}
      />
    );
  }

  return (
    <img
      className="h-16 w-16 rounded-full object-cover object-center"
      src={imgLink}
      alt={`${playerName} avatar`}
    />
  );
};

export default Avatar;
