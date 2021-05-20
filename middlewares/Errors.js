module.exports = (error, req, res, next) => {
  const data = {
    success: false,
    message: `E don spoil:... ${error.message}`
  };

  console.error('From async error middleware', error);
  next(error);

  return res.status(500).send(data);
};