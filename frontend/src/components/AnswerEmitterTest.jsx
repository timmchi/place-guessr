import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { socket } from "../sockets/socket";

const AnswerEmitterTest = ({ answers }) => {
  const [player, setPlayer] = useState("");
  const [answer, setAnswer] = useState("");

  const submitAnswer = (e) => {
    e.preventDefault();
    socket.emit("submit answer", player, answer);
  };

  return (
    <div>
      <form onSubmit={submitAnswer}>
        <Input
          label="Player"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <Input
          label="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AnswerEmitterTest;
