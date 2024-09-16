import LogInForm from "./LogInForm";
import bgImage from "../../berlinsignup.png";
import loginService from "../../services/login";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (data) => {
      navigate("/");
    },
  });

  const handleLogin = async (credentials) => {
    loginMutation.mutate(credentials);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex flex-1 justify-center bg-indigo-300 text-white items-center">
        <LogInForm handleLogin={handleLogin} />
      </div>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="hidden md:block md:flex-1 bg-cover bg-center"
      ></div>
    </div>
  );
};

export default LogIn;
