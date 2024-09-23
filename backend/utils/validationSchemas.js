const v = require("valibot");

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, "Please enter your email."),
    v.email("The email address is badly formatted")
  ),
  password: v.pipe(
    v.string("Your password must be a string."),
    v.minLength(1, "Please enter your password."),
    v.minLength(8, "Your password must have 8 characters or more.")
    // v.regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    //   "Your password must have one uppercase letter, one lowercase letter and one number"
    // )
    // dont want this while developing
  ),
});

const RegistrationSchema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.minLength(1, "Please enter your email."),
      v.email("The email address is badly formatted")
    ),
    username: v.pipe(
      v.string(),
      v.minLength(1, "Please enter your username."),
      v.minLength(3, "Username should be 3 or more symbols")
    ),
    password: v.pipe(
      v.string(),
      v.minLength(1, "Please enter your password."),
      v.minLength(8, "Your password must have 8 characters or more.")
      //   v.regex(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      //     "Your password must have one uppercase letter, one lowercase letter and one number"
      //   )
    ),
    passwordConfirm: v.pipe(
      v.string(),
      v.minLength(1, "Please confirm password")
    ),
  }),
  v.forward(
    v.check(
      (input) => input.password === input.passwordConfirm,
      "The two password do not match"
    ),
    ["passwordConfirm"]
  )
);

module.exports = { LoginSchema, RegistrationSchema };
