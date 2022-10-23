const router = require('express').Router();
const auth = require('../middleware/auth');
const { registerUser, login } = require('../controllers/user');
const {
  validateRegistration,
  validateAuthentication,
} = require('../middleware/validation');
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const articleRouter = require('./articles');

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateRegistration, registerUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
