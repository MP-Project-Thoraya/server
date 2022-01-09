const mongoose =require("mongoose")
const commentmodel = new mongoose.Schema({
text: { type: String, required: true },
isDeleted:{type :Boolean ,default :false },
onservicepost:{type: mongoose.Schema.Types.ObjectId , ref: "services"},
createby :{type: mongoose.Schema.Types.ObjectId , ref: "user"}
},
{timestamps: true}

)
module.exports =mongoose.model('comment',commentmodel)
