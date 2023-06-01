const { body, validationResult } = require('express-validator');

exports.validateUserLogin = [
    body('email')
        .notEmpty()
        .withMessage('Email field cannot be empty')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password field cannot be empty'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array()[0].msg });
        }
        next();
    },
];

exports.validateUserSignup = [
    body('name')
        .notEmpty()
        .withMessage('Name field cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email field cannot be empty')
        .isEmail()
        .withMessage('Invalid email format'),
    body('adhaar_no')
        .isNumeric()
        .withMessage('Should Contain Numbers')
        .isLength({ min: 12 })
        .withMessage('Adhaar must contain 12 digits'),
    body('phone_no')
        .isNumeric()
        .withMessage('Should Contain Numbers')
        .isLength({ min: 10 })
        .withMessage('Phone Number must contain 10 digits'),
    body('password')
        .notEmpty()
        .withMessage('Password field cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array()[0].msg });
        }
        next();
    },
];