const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/jobSeekerProfile');
const companyProfile = require('../models/companyProfile');
const ErrorResponse = require('../utils/errorResponse');
const { sendTokenResponse } = require('../middleware/tokenResponse');
const jobPost = require('../models/jobPost');

//@desc     Create registerEmployer
//@route    POST /api/v1/employer/register
//@access   Private
exports.registerEmployer = asyncHandler(async (req, res) => {
  const {
    name,
    password,
    userType,
    company_name,
    company_email,
    company_description,
  } = req.body;
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

//@desc     Create registerEmployer
//@route    POST /api/v1/employer/register
//@access   Private
exports.postJob = asyncHandler(async (req, res) => {
  const { job_title, job_desc } = req.body;
  // Create user
  const job = await jobPost.create({ job_title, job_desc });

  res.status(201).json({ success: true, job });
});

//@desc     GET Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Private
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: bootcamp });
});

//@desc     Create bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    // console.log('ERR:', err.message);
  }
});

//@desc     UPDATE bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    run: true,
    runValidators: true,
  });
  if (!bootcamp) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: bootcamp });
});

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = async (req, res) => {
  console.log(req.params.id, req.body);
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res
    .status(201)
    .json({ success: true, data: [], message: 'Bootcamp deleted' });
};
