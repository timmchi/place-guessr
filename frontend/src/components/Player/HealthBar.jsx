const HealthBar = ({ healthPoints, style = "default" }) => {
  const healthPercentage = (healthPoints / 6000) * 100;

  const computeHealthBarBG = () => {
    if (healthPercentage <= 25) return "bg-red-700";

    if (healthPercentage <= 50) return "bg-yellow-700";

    if (healthPercentage < 100) return "bg-green-600";

    if (healthPercentage === 100) return "bg-green-700";
  };

  if (style !== "default") {
    return (
      <div className="relative w-96 h-10 bg-gray-500 rounded-lg">
        <div className="absolute flex justify-center items-center text-gray-200 font-bold text-lg z-10 w-full h-full rounded-lg">
          {healthPoints}
        </div>
        <div
          style={{ width: `${healthPercentage}%`, transition: "all 1s" }}
          className={`absolute h-10 ${computeHealthBarBG()} flex justify-center items-center rounded-lg`}
        ></div>
      </div>
    );
  }

  return (
    <div className="relative w-80 h-10 xl:h-14 bg-gray-500 rounded-lg">
      <div className="absolute flex justify-center items-center text-gray-200 font-bold text-sm md:text-xl z-10 w-full h-full rounded-lg">
        {healthPoints}
      </div>
      <div
        style={{ width: `${healthPercentage}%`, transition: "all 1s" }}
        className={`absolute h-10 xl:h-14 ${computeHealthBarBG()} flex justify-center items-center rounded-lg`}
      ></div>
    </div>
  );
};

export default HealthBar;
