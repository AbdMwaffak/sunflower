const joi = require('joi');

const envVarSchema = joi.object({
    DATABASE_LOCAL : joi.string().required(),
    PORT : joi.number().positive().default(3000),
    JWT_SECRET : joi.string().required()
})
    .unknown()


module.exports = envVarSchema;