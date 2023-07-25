const asyncHandler = require('../middleware/asyncHandler');
const BootCamp = require('../models/bootcamp');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await BootCamp.find();
    res.status(201).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

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
