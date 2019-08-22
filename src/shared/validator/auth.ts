import { body } from 'express-validator/check';

export const validateUserRegister = [
  body('email').exists().isEmail(),
  body('password').exists().isString().isLength({ min: 7, max: 32 }),
  body('password_confirm').exists().custom((val, { req }) => {
    return req.body.password === val;
  })
];
