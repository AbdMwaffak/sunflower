const dotenv = require('dotenv');
dotenv.config();

const envVarSchema = require('./../validations/env.validation');

const {value : envVars , error} = envVarSchema.validate(process.env);

if(error){
    console.log(error);
}

module.exports = {
    port : envVars.PORT,
    dbLocal : envVars.DATABASE_LOCAL,
    jwtSecret : envVars.JWT_SECRET
}