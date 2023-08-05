const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //Create token

  //   const token = user.getSignedJwtToken();
  sendTokenResponse(user, 200, res);

  res.status(201).json({ success: true, token });
});

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('Invalid Credential', 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credential', 401));
  }

  sendTokenResponse(user, 200, res);
});

//@desc     Get All Users
//@route    POST /api/v1/auth/users
//@access   Public
exports.allUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json({ success: true, data: users });
  } catch (err) {
    next(new ErrorResponse(err.status, err.message));
  }
});

// Set token from model, create cookie and send to response

const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
