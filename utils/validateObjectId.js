const mongoose = require("mongoose");
function validateObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid Id...${id}`);
  }
  return true;
}
module.exports = { validateObjectId };
