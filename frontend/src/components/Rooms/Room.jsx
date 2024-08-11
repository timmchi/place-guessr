const Room = ({ room, type }) => {
  return (
    <div>
      {/* <p>{type}</p> */}
      <p>{room.title}</p>
      <p>{room.region}</p>
    </div>
  );
};

export default Room;
