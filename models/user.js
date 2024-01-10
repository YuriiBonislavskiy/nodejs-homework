const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const userValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "field name is incorrect format",
    "any.required": "Помилка від Joi або іншої бібліотеки валідації",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `field password} should have a minimum length of {#limit}`,
    "any.required": "Помилка від Joi або іншої бібліотеки валідації",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .messages({
      "any.only": `field subscription must be one of [starter, pro, business]`,
    }),
});

// const loginSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });

const schemas = {
  userValidationSchema,
  //   loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
