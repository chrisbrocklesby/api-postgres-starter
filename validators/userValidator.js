import Joi from 'joi';

export default (data, required = []) => Joi.object().keys({
  id: Joi.string().uuid(),
  email: Joi.string().email(),
  password: Joi
    .string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .message('Password must be min 8 characters, at least one uppercase and lowercase letter, one number and one special character'),
  token: Joi.string().uuid(),
})
  .fork(required, (field) => field.required())
  .validateAsync(data);
