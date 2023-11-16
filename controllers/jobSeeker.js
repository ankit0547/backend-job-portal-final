//@desc     Create registerEmployer
//@route    POST /api/v1/employer/register

const asyncHandler = require('../middleware/asyncHandler');
const { sendTokenResponse } = require('../middleware/tokenResponse');
const JobSeekerProfile = require('../models/jobSeekerProfile');

//@access   Private
exports.registerJobSeeker = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, userType, skills } = req.body;
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

  res.status(201).json({ success: true, token });
});
