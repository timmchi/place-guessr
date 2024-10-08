import PlayerOverlay from "./Player/PlayerOverlay";
import avatar from "../../test/vavatar.jpg";
import avatar2 from "../../test/avatar2.jpg";

const players = [
  { id: 1, name: "Kariz", avatar: avatar },
  { id: 2, name: "Sheldon", avatar: avatar2 },
];

const Test = () => {
  return (
    <div className="bg-indigo-300 h-screen">
      {/* <PlayerOverlay player1={players[0]} player2={players[1]} /> */}
    </div>
  );
};

export default Test;
