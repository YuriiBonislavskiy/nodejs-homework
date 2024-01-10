const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
// const reqType = [ "/register", "/login", "/current","/logout"]

//     const url = req.url;
    const method = req.method;
    if (!Object.keys(req.body).length) {
      if (method === "POST" || method === "PUT") {
        next(HttpError(400, "missing fields"));
      }
    }

    const { error } = schema.validate(req.body);
    // console.log(error);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
