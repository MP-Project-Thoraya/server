const mongoose =require("mongoose")
const busmodel = new mongoose.Schema({
description: { type: String, required: true },
image: { type: String },
isDeleted:{type :Boolean ,default :false },
createby :{type: mongoose.Schema.Types.ObjectId , ref: "user"}
},
{timestamps: true}

)
module.exports =mongoose.model('business',busmodel)

