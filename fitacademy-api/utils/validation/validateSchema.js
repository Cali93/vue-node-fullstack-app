const Ajv = require('ajv');

exports.validateSchema = (data, schema) => {
  const result = {};
  const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: false}
  const validate = ajv.compile(schema);
  const valid = validate(data);
  const { errors } = validate;
  if (!valid) { result.errors = errors; }
  result.isValid = valid;
  return result;
};
