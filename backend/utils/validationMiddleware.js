const v = require("valibot");
const validationSchemas = require("./validationSchemas");

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const parsedLoginData = v.parse(validationSchemas.LoginSchema, {
    email,
    password,
  });

  req.parsedLoginData = parsedLoginData;

  next();
};

const validateRegistration = (req, res, next) => {
  const { email, username, password, passwordConfirm } = req.body;

  const parsedCredentials = v.parse(validationSchemas.RegistrationSchema, {
    email,
    username,
    password,
    passwordConfirm,
  });

  req.parsedCredentials = parsedCredentials;

  next();
};

module.exports = { validateLogin, validateRegistration };
