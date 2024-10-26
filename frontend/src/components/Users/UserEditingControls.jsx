import { Input, Button } from "@material-tailwind/react";

const UserEditingControls = ({
  editingUsername,
  username,
  user,
  data,
  handleUsernameChange,
  handleUsernameEditing,
  setUsername,
}) => {
  return (
    <div
      className={`flex flex-col text-center ${
        editingUsername ? "gap-8" : "gap-4"
      }`}
    >
      {!editingUsername ? (
        <h1 className="text-4xl font-bold pt-4 text-center">
          {data?.username}
        </h1>
      ) : (
        <Input
          size="lg"
          value={username}
          className="!text-white focus:!border-amber-400 !border-t-blue-gray-200 mt-4"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      {user && user.id === data?.id && (
        <Button
          size="sm"
          variant="outlined"
          className={`text-center self-center ${
            editingUsername
              ? "border-green-300 text-green-300"
              : "border-white text-white"
          }`}
          onClick={
            editingUsername ? handleUsernameChange : handleUsernameEditing
          }
        >
          {editingUsername ? "Save Username" : "Edit Username"}
        </Button>
      )}
    </div>
  );
};

export default UserEditingControls;
