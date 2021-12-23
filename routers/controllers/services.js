const servmodel=require('./../../db/models/services');
//const rolemodel = require("../../db/models/user");
//const commentmodel= require("../../db/models/comment");


const getallpost = (req, res) => {
    servmodel
    .find({ isDelelted: false })
    .populate("createby")
    .sort ({"createdAt":-1})
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the post not fount");
      }
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};



////////
const getuserpost = (req, res) => {
    const {_id } = req.params;
    servmodel
    .find({})
    .populate("createby")
    .sort ({"createdAt":-1})
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the post not fount");
      }
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};


//create new 

const createnew = (req, res) => {
    const {image,  description, createby } = req.body; 
    const newpost = new servmodel({
      image,
      description,
      createby,
    });
  
    newpost
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });

  };
  

  ///// delete post 
  const deletepost  = (req, res) => {
    const { id } = req.params;
    servmodel
       .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("the post has deleted");
        } else {
          res.status(404).json("the post not found");
        }
      })
      
      .catch((err) => {
        res.status(400).json(err);
      });
  };

//// update
const updatePost = (req, res) => {
  const { _id } = req.params;
  const { description } = req.body;
  try {
    servmodel.findOne({ _id: _id }).then((result) => {
      console.log(result);
      if (result) {
        if (result.createby == req.token._id) {
          servmodel
            .findOneAndUpdate(
              { _id: _id },
              { $set: {  description: description }}
            )
            .then((result) => {
              res.status(200).json(result);
            });
        } else if (req.token.role == "61c1dd09f5d2821008f4dd11") {
          servmodel
            .findOneAndUpdate(
              { _id: _id },
              { $set: { description :description } }, 
            )
            .then((result) => {
              res.status(200).json(result);
            });
        } else {
          res.status(403).json({ message: "forbidden" });
        }
      } else {
        res.status(404).send("Post not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};


module.exports = {getallpost ,getuserpost,createnew, deletepost,updatePost};

