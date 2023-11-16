const ErrorResponse = require('../utils/errorResponse');
const JobSeekerProfile = require('../models/jobSeekerProfile');
const companyProfile = require('../models/companyProfile');
const asyncHandler = require('../middleware/asyncHandler');
const { CONSTANTS } = require('../utils/Constants');
const { sendTokenResponse } = require('../middleware/tokenResponse');

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
  const {
    name,
    firstName,
    lastName,
    email,
    password,
    userType,
    skills,
    company_name,
    company_email,
    company_description,
  } = req.body;

  if (userType === '0') {
    // Create user
    const jobSeekerUser = await JobSeekerProfile.create({
      firstName,
      lastName,
      email,
      password,
      skills,
      userType,
    });
    //Create token
    sendTokenResponse(jobSeekerUser, 200, res);
  }
  if (userType === '1') {
    // Create user
    const company = await companyProfile.create({
      name,
      company_name,
      company_email,
      company_description,
      userType,
      password,
    });
    //Create token
    sendTokenResponse(company, 200, res);
  }

  res.status(201).json({ success: true, token });
});

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, company_email, password, userType } = req.body;
  // Validate email & password
  console.log('@@@@@@@@@@@', req.body);
  if (!company_email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const User = userType === '0' ? JobSeekerProfile : companyProfile;

  // Check for User
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('User not Found', 401));
  }
  console.log('@@@', user);

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
