const commentmodel= require("../../db/models/comments");
const servmodel=require('./../../db/models/services');

/////// all comments 
const getallcomments = (req, res) => {
    commentmodel
    .find({ isDelelted: false })
    .populate("createby")
    .sort ({"createdAt":-1})
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the comments not fount");
      }
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};

/////// one comments by id 
const getusercomment = (req, res) => {
    const {_id } = req.params;
    commentmodel
    .find({})
    .populate("createby")
    .sort ({"createdAt":-1})
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the comments not fount");
      }
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};

const createnewcomment= (req, res) => {
        const { id } = req.params;
        const { text,createby, onservicepost} = req.body;
      
        const newComment = new commentmodel({
          text,
          createby,
          onservicepost,
        });
        newComment
          .save()
          .then((result) => {
            commentmodel
              .findByIdAndUpdate(id, { $push: { onservicepost: result._id } })
              .then((result) => {
                res.status(201).json(result);
        
              });
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      };

 ///delete 
  const deletecomment  = (req, res) => {
    const { id } = req.params;
    commentmodel
       .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("the comment has deleted");
        } else {
          res.status(404).json("the comment not found");
        }
      })
      
      .catch((err) => {
        res.status(400).json(err);
      });
  };

  /////////////////// update 

  const updatecomment = (req, res) => {
    const { _id } = req.params;
    const {text } = req.body;
    try {
        commentmodel.findOne({ _id: _id }).then((result) => {
        console.log(result);
        if (result) {
          if (result.createby == req.token._id) {
            commentmodel
              .findOneAndUpdate(
                { _id: _id },
                { $set: { text:text }}
              )
              .then((result) => {
                res.status(200).json(result);
              });
          } else if (req.token.role == "61c1dd09f5d2821008f4dd11") {
            commentmodel
              .findOneAndUpdate(
                { _id: _id },
                { $set: { text :text } }, 
              )
              .then((result) => {
                res.status(200).json(result);
              });
          } else {
            res.status(403).json({ message: "forbidden" });
          }
        } else {
          res.status(404).send("comment not found");
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };


  

  module.exports = { createnewcomment ,deletecomment , getallcomments, getusercomment ,updatecomment };
