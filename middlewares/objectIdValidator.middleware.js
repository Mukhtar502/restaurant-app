const { validateObjectId } = require("../utils/validateObjectId");

async function validateId(req, res, next) {
    
  try {
    validateObjectId(req.params.id);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = validateId;
