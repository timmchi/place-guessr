import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import ReCAPTCHA from "react-google-recaptcha";

const CAPTCHA_SITEKEY = import.meta.env.VITE_CAPTCHA_SITEKEY;

const MainPageShield = ({ handlePageUnshield }) => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const pageUnshieldCheck = () => {
    if (captchaValue) handlePageUnshield();
  };

  return (
    <div className="fixed inset-0 bg-indigo-200 bg-opacity-100 z-50 flex items-center justify-center z-1000">
      <div className="bg-indigo-400 p-8 rounded-lg shadow-lg flex flex-col gap-4 items-center">
        <Typography variant="h5" className="-mb-3 text-amber-200">
          Prove you are not a robot to access Placeguessr
        </Typography>
        <ReCAPTCHA
          sitekey={CAPTCHA_SITEKEY}
          onChange={(value) => setCaptchaValue(value)}
          className="pt-2"
        />
        <Button
          onClick={pageUnshieldCheck}
          className=" bg-amber-200 hover:bg-amber-400 text-indigo-500"
        >
          Access Placeguessr
        </Button>
      </div>
    </div>
  );
};

export default MainPageShield;
