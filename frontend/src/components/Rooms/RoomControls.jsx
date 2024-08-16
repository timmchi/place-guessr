import { Button, Input } from "@material-tailwind/react";

const RoomControls = () => {
  const joinRoom = (e) => {
    e.preventDefault();
    console.log("joining roooooom....");
  };

  const createRoom = () => console.log("creating a room");

  return (
    <div className="flex bg-indigo-400 w-[36rem] container mx-auto my-12 justify-between items-center divide-x-2 divide-dashed divide-indigo-200 rounded-lg shadow-md h-80">
      <div className="p-4 basis-1/2 flex justify-center text-center h-full">
        <Button onClick={createRoom} className="self-center">
          Create a room
        </Button>
      </div>
      <div className="p-4 basis-1/2 flex flex-col justify-center h-full">
        <form onSubmit={joinRoom} className="">
          <Input placeholder="Room code" />
          <Button className="w-full mt-2">Join a room</Button>
        </form>
      </div>
    </div>
  );
};

export default RoomControls;
