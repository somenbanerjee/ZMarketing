const Joi = require("joi");

const validateSchema = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length > 0 && req.is("application/json")) {
      const { error } = schema.validate(req.body);

      if (error == null) {
        next();
      } else {
        console.log(error);
        const { details } = error;
        const message = details.map((i) => i.message).join(",");

        console.log("error", message);
        res.status(422).json({ error: message });
      }
    } else {
      res.status(415).json({ error: "Supports JSON request body only" });
    }
  };
};

module.exports = validateSchema;
