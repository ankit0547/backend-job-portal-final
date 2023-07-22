//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res) => {
  res.status(200).json({ success: 'hello world ALL GET' });
};

//@desc     GET bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Private
exports.getBootcamp = (req, res) => {
  res.status(200).json({ success: 'hello world GET' });
};

//@desc     Create bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = (req, res) => {
  res.status(200).json({ success: 'hello world POST' });
};

//@desc     UPDATE bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = (req, res) => {
  res.status(200).json({ success: 'hello world UPDATE' });
};

//@desc     Delete bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = (req, res) => {
  res.status(200).json({ success: 'hello world DELETE' });
};
