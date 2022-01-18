const express = require("express");
const authentication = require("./../../routers/middleware/authentication");
const authorization = require("./../../routers/middleware/authorization");
const {

  login,
  signup,
  getallusers,
  deleteUser ,
  useraccount ,
  updateuser  ,
  activateAccount ,
  getuser,
  forgetpassword
} = require("./../controllers/user");

const userRouter = express.Router();


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/active-email", activateAccount );
//userRouter.put("/forgetpassword", forgetpassword);
userRouter.get("/allusers", getallusers);
userRouter.get("/one_user/:id", getuser);
// userRouter.delete("/delusers/:id", authentication , deleteUser );
userRouter.delete("/delaccount/:id", authentication , deleteUser);
userRouter.put("/updateuser/:_id",authentication , updateuser);



module.exports = userRouter;