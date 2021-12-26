const mongoose =require("mongoose")
const servmodel = new mongoose.Schema({
description: { type: String, required: true },
image: { type: String, required :false},
isDeleted:{type :Boolean ,default :false },
createby :{type: mongoose.Schema.Types.ObjectId , ref: "user"}
},
{timestamps: true}

)
module.exports =mongoose.model('services',servmodel)
