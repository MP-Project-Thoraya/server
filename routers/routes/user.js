const express = require("express");
const authentication = require("./../../routers/middleware/authentication");
const authorization = require("./../../routers/middleware/authorization");
const {

  login,
  signup,
  getallusers,
  deleteUser ,
  updateuser  ,
  activateAccount ,
  forgetpassword
} = require("./../controllers/user");

const userRouter = express.Router();


userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/active-email", activateAccount );
//userRouter.put("/forgetpassword", forgetpassword);
userRouter.get("/allusers", getallusers);
userRouter.delete("/delusers/:id", authentication , deleteUser );
userRouter.put("/updateuser:id", updateuser);


module.exports = userRouter;