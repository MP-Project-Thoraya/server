const mongoose = require("mongoose");
const rolemodel = new mongoose.Schema({
  role: { type: String, required: true },
});
module.exports = mongoose.model("roles", rolemodel);
