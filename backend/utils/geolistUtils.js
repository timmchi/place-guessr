const { readFileSync } = require("fs");

const parseText = (fileLocation) => {
  const text = readFileSync(fileLocation).toString("utf-8");
  const textByLine = text.split("\n").map((line) => {
    const [lat, lng] = line.split(" ").map(Number);
    return { lat, lng };
  });

  return textByLine;
};

module.exports = { parseText };
