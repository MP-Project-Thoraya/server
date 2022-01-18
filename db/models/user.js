const mongoose = require ("mongoose");
const usermodel =new mongoose.Schema ({
    email: { type: String,
        required: true,
        unique: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
     
      isDeleted:{type :Boolean ,default :false },
      role:{type: mongoose.Schema.Types.ObjectId, ref: "role"},
      isconfirme: { type: Boolean, default: false, },
      resetLink: { data: String, default:''}
},
      {timestamps: true}

)
module.exports =mongoose.model('user', usermodel);