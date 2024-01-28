const { HttpError } = require("../helpers");
const { METHOD, ORIGINAL_URL } = require("../constants/constants");

const validateBody = (schema) => {
  const func = (req, res, next) => {

    // const method = req.method;
      const validateMethod = METHOD.indexOf(req.method);

    const validateUrl = ORIGINAL_URL.indexOf(req.originalUrl);

    if (!Object.keys(req.body).length && validateUrl === -1 ) {
      if (validateMethod > -1 ) {
        next(HttpError(400, "missing fields"));
      }
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
