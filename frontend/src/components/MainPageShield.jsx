import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";

const MainPageShield = ({ handlePageUnshield }) => {
  const [passphrase, setPassphrase] = useState("");

  const pageUnshieldCheck = () => {
    if (passphrase == "panda228") handlePageUnshield();

    setPassphrase("");
  };

  return (
    <div
      className="fixed inset-0 bg-indigo-200 bg-opacity-100 z-50 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-indigo-400 p-8 rounded-lg shadow-lg flex flex-col gap-4 items-center">
        <Typography variant="h5" className="-mb-3 text-amber-200">
          Input the passphrase to unlock the website
        </Typography>
        <Input
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          color="amber"
          className="!text-amber-200 focus:!border-t-amber-400 !border-t-blue-gray-200"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Button
          onClick={pageUnshieldCheck}
          className=" bg-amber-200 hover:bg-amber-400 text-indigo-500"
        >
          Submit the code
        </Button>
      </div>
    </div>
  );
};

export default MainPageShield;
