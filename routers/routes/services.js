const express = require("express");
const authentication =require('./../middleware/authentication')
const authorization=require ('./../middleware/authorization')
const { getallpost ,getuserpost,createnew, deletepost,updatePost } = require("./../controllers/services");

const servicesRouter = express.Router();

servicesRouter.get("/getall", getallpost);
servicesRouter.get("/getone/:createby",getuserpost);
servicesRouter.post("/create", createnew);
servicesRouter.delete("/delete/:id", authentication , deletepost);
servicesRouter.put("/update/:_id", updatePost );


module.exports = servicesRouter;