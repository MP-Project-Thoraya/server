const express = require("express");
const authentication =require('./../middleware/authentication')
const authorization =require ('./../middleware/authorization')
const {createnewcomment ,deletecomment , getallcomments, getusercomment ,updatecomment  } = require("./../controllers/comments");

const commentRouter = express.Router();
commentRouter.post("/createcomment", createnewcomment);
commentRouter.delete("/deletecomment/:id", deletecomment);
commentRouter.get("/getallcomment", getallcomments);
commentRouter.get("/getonecomment/:createby", getusercomment);
commentRouter.put("/update/:_id",updatecomment  );
module.exports = commentRouter ;