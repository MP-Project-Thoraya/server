const express = require("express");
const authentication =require('./../../routers/middleware/authentication')
const authorization=require('./../../routers/middleware/authorization')

const { create} = require("./../controllers/role");
const roleRouter = express.Router();
roleRouter.post("/createrole", create);


module.exports = roleRouter;