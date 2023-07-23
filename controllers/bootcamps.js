const BootCamp = require('../models/bootcamp');

//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res) => {
  try {
    const bootcamps = await BootCamp.find();
    res.status(201).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log('ERR:', err.message);
  }
};

//@desc     GET Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Private
exports.getBootcamp = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const bootcamp = await BootCamp.findById(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, data: { message: 'Bootcamp not found' } });
    }

    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    // next(err);
    res.status(400).json({ success: false, message: err.message });
    // console.log('ERR:', err.message);
  }
};

//@desc     Create bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = async (req, res) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log('ERR:', err.message);
  }
};

//@desc     UPDATE bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      run: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, data: { message: 'Bootcamp not found' } });
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log('ERR:', err.message);
  }
};

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res
        .status(404)
        .json({ success: false, data: { message: 'Bootcamp not found' } });
    }
    res
      .status(201)
      .json({ success: true, data: [], message: 'Bootcamp deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log('ERR:', err.message);
  }
};
