const express = require("express");
const authentication =require('./../middleware/authentication')
const authorization=require ('./../middleware/authorization')
const { getallpost ,getuserpost,createnew, deletepost,updatePost } = require("./../controllers/services");

const servicesRouter = express.Router();
servicesRouter.get("/getall", getallpost);
servicesRouter.get("/getone/:createby",authentication,getuserpost);
servicesRouter.post("/create_post", authentication, createnew);
servicesRouter.delete("/deleteposts/:id", authentication , deletepost);
servicesRouter.put("/update/:_id",authentication, updatePost );


module.exports = servicesRouter;