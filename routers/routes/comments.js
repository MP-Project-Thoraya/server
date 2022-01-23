const express = require("express");
const authentication =require('./../middleware/authentication')
const {createnewcomment ,deletecomment , getallcomments, getusercomment ,updatecomment  } = require("./../controllers/comments");

const commentRouter = express.Router();
commentRouter.post("/createcomment",authentication, createnewcomment);
commentRouter.delete("/deletecomment/:id", deletecomment);
commentRouter.get("/getallcomment", getallcomments);
commentRouter.get("/getonecomment/:createby",authentication, getusercomment);
commentRouter.put("/update/:_id", authentication,updatecomment  );

module.exports = commentRouter ;