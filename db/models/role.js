const mongoose =require("mongoose")
const rolemodel = new mongoose.Schema({
    role: { type: String, required: true },
    Permissions: { type:Array,required: true }
  });
module.exports =mongoose.model('role',rolemodel)
