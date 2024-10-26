import { Input, Button } from "@material-tailwind/react";

const UserEditingControls = ({
  editingUsername,
  handleEditingCancel,
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
        <div className="flex gap-4 ">
          <Button
            size="sm"
            variant="outlined"
            className={`text-center w-full ${
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
          {editingUsername && (
            <Button
              size="sm"
              variant="outlined"
              className="text-center border-red-400 text-red-400 w-full"
              onClick={handleEditingCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserEditingControls;
