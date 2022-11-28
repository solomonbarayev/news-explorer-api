const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new ConflictError('Email already exists'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const login = (req, res, next) =>
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      const { password, ...userWithoutPassword } = user.toObject();
      res.status(200).send({ token, user: userWithoutPassword });
    })
    .catch(() => next(new UnauthorizedError('Invalid email or password')));

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  registerUser,
  login,
  getCurrentUser,
};
