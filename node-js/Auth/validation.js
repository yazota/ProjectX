const Joi = require('joi');

//register validation

const registerValidate = data => {

    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };

return Joi.validate(data, schema);
    
};

const loginValidate = data => {

    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };

return Joi.validate(data, schema);
    
};


module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;