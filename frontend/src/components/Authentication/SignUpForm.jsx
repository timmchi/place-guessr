import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const CAPTCHA_SITEKEY = import.meta.env.VITE_CAPTCHA_SITEKEY;

const SignUpForm = ({ handleUserCreation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!captchaValue) return;

    await handleUserCreation({
      username,
      email,
      password,
      repeatPassword,
    });
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" className="text-amber-500">
        Sign Up
      </Typography>
      <Typography className="mt-1 font-normal text-amber-200">
        Enter your details below to register.
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSignUp}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h5" className="-mb-3 text-amber-200">
            Your Username
          </Typography>
          <Input
            size="lg"
            color="amber"
            placeholder="Username"
            className="!text-amber-200 focus:!border-t-amber-400 !border-t-blue-gray-200"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography variant="h5" className="-mb-3 text-amber-200">
            Your Email
          </Typography>
          <Input
            size="lg"
            color="amber"
            placeholder="name@mail.com"
            className="!text-amber-200 focus:!border-t-amber-400 !border-t-blue-gray-200"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography variant="h5" className="-mb-3 text-amber-200">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            color="amber"
            placeholder="********"
            className="!text-amber-200 focus:!border-t-amber-400 !border-t-blue-gray-200"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="h5" className="-mb-3 text-amber-200">
            Repeat Password
          </Typography>
          <Input
            type="password"
            size="lg"
            color="amber"
            placeholder="********"
            className="!text-amber-200 focus:!border-t-amber-400 !border-t-blue-gray-200"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <ReCAPTCHA
          sitekey={CAPTCHA_SITEKEY}
          onChange={(value) => setCaptchaValue(value)}
          className="pt-3"
        />
        <Button
          className="mt-3 self-center w-full bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
          fullWidth
          type="submit"
          disabled={!captchaValue}
        >
          sign up
        </Button>
        <Typography className="mt-4 text-center font-normal text-amber-200">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-amber-500">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default SignUpForm;
