const Joi = require('joi');

const revaluatePasswordPayload = Joi.object({
    password: Joi.string().required()
});

module.exports = { revaluatePasswordPayload }