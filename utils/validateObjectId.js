const mongoose = require("mongoose");
function validateObjectId(id) {
  if (!id) throw new Error("No ID provided in request.");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid Id...${id}`);
  }
  return true;
}
module.exports = { validateObjectId };
