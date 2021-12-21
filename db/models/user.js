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
      avatar: {
        type: String,
        default:

          "https://www.bing.com/images/search?view=detailV2&ccid=7k0iaIN%2B&id=0177C04F40EA3773F6466E01200DDDB236AE89B9&thid=OIP.7k0iaIN-AWogqFcJHEhZKQHaHZ&mediaurl=https%3A%2F%2Fwww.cjf.jus.br%2Fcjf%2Fcomposicoes%2Freis-friede%2F%40%40images%2F288b7af1-42e1-4970-9e3f-f9f95495512a.jpeg&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.ee4d2268837e016a20a857091c485929%3Frik%3DuYmuNrLdDSABbg%26pid%3DImgRaw%26r%3D0&exph=594&expw=595&q=user+image&form=IRPRST&ck=6B69869759801941E6A78C3B22E25E58&selectedindex=25&ajaxhist=0&ajaxserp=0&vt=0&sim=11&pivotparams=insightsToken%3Dccid_iYpFSu2O*cp_2B7A977B59EAA571C460360CC9771F74*mid_4D39D032961CB3FDC2DFF84F34F8BC243F5E152B*simid_608047118810306719*thid_OIP.iYpFSu2O2kVP1OptEdJ-uwHaHx&iss=VSI&ajaxhist=0&ajaxserp=0",
      
        },
      isDeleted:{type :Boolean ,default :false },
      role:{type: mongoose.Schema.Types.ObjectId, ref: "role",default:"61a86bb7d10e31f22c0a3301"},
      isconfirme: { type: Boolean, default: false, },
      resetLink: { data: String, default:''}
},
      {timestamps: true}

)
module.exports =mongoose.model('User', usermodel);