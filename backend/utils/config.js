require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET,
  GEO_API: process.env.POSITION_STACK_API_KEY,
};
