const { post } = require("../routes/user");
const servmodel = require("./../../db/models/services");
//const rolemodel = require("../../db/models/user");
//const commentmodel= require("../../db/models/comment");

const getallpost = (req, res) => {
  servmodel
    .find({ isDeleted: false })
    .populate("createby")
    // .sort({ createdAt: -1 })
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
  const id = req.params.createby;
  console.log(id, "params");
  // const userId = req.token._id;
  // console.log(userId, "token");
  servmodel
    .find({ createby: id })
    .populate("createby")
    .sort({ createdAt: -1 })
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the post not fount");
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//create new

const createnew = (req, res) => {
  console.log(req.token._id);
  const { image, description, title } = req.body;
  const newpost = new servmodel({
    image,
    title,
    description,
    createby: req.token._id,
  });

  newpost
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

///// delete post

const deletepost = (req, res) => {
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

/*
const deletepost = async (req, res) => {
 
  try{
   const post =await post.findById(req.params.id);
   if (post.userId === req.params.userId ) {
     await post.deleteone();
res.status(200).json("post has deleted");

  } else {
    res.status(403).json("only you post")
  }
}
catch (err) {
  res.status(500).json(err);
}
};

*/

//// update
const updatePost = (req, res) => {
  console.log(req.token);
  const { _id } = req.params;
  const { description, title, image } = req.body;
  try {
    servmodel.findOne({ _id: _id }).then((result) => {
      console.log(result);
      if (result) {
        if (result.createby == req.token._id) {
          servmodel
            .findOneAndUpdate(
              { _id: _id },
              {
                $set: { description: description, image: image, title: title },
              },
              { new: true }
            )
            .then((result) => {
              res.status(200).json(result);
            });
        } else if (req.token.role == "61c824b37826606eacd4bf69") {
          servmodel
            .findOneAndUpdate(
              { _id: _id },
              { $set: { description: description, image: image, title: title } }
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

module.exports = { getallpost, getuserpost, createnew, deletepost, updatePost };
