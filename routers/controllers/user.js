const usermodel= require ('./../../db/models/user')
//this import for all package for email and password secret
const bcrypt=require ('bcrypt')
const jwt=require ('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;


//sign up

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const SALT = Number(process.env.SALT);
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);
  const newuser = new usermodel({
    email: savedEmail,
    password: hashedPassword,
    username,
  });


  newuser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(" Email Or Username already used .");
    });
};
//login
const login = (req, res) => {
  const { email, password } = req.body;
  usermodel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (email.toLowerCase() === result.email) {
          const unhashPassword = await bcrypt.compare(
            password,
            result.password
          );
          if (unhashPassword) {
            const payload = {
              role: result.role,
            };
            const options = {
              expiresIn: "12h",
            };
            const token = await jwt.sign(payload, SECRET_KEY, options);

            res.status(200).json({ result, token});
          } else {
            res.status(400).json("invalid email or password");
          }
        }else {
          res.status(400).json("invalid email or password");
          
      }}
      else {
        res.status(403).json("invalid email or password"); 
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

//get 
const getallusers = async (req, res) => {
    usermodel
      .find({ isDeleted: false })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
 //get 
const getuserbyid = async (req, res) => {
    const { _id } = req.params;
    usermodel
      .find({ _id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
//delete user

const deleteUser  = (req, res) => {
  const { id } = req.params;
  usermodel
     .findByIdAndUpdate(id, { $set: { isDeleted: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("the User has deleted");
      } else {
        res.status(404).json("the User not found");
      }
    })
    
    .catch((err) => {
      res.status(400).json(err);
    });
};


  module.exports = { signup, login , getallusers, getuserbyid ,deleteUser };