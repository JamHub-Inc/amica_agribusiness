import Joi from 'joi';

export const signupValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().optional(),
    full_name: Joi.string().optional(),
    phone: Joi.string().optional(),
    phone_number: Joi.string().optional(),
    location: Joi.string().optional(),
    role: Joi.string().valid('SYSTEM_ADMIN', 'FARMER', 'SUPERVISOR', 'VENDOR', 'BUYER', 'WHOLESALER', 'SALES').optional()
  });
  return schema.validate(data, { abortEarly: false });
};

export const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(data, { abortEarly: false });
};


