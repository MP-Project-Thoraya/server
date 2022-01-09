const usermodel= require ('./../../db/models/user')
//this import for all package for email and password secret
const bcrypt=require ('bcrypt')
const jwt=require ('jsonwebtoken');
const user = require('./../../db/models/user');
const SECRET_KEY = process.env.SECRET_KEY;


//sign up

const signup = async (req, res) => {
  const { email, password, username } = req.body;
  const SALT = Number(process.env.SALT);
  const savedEmail = email.toLowerCase();
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/)) {
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
    });}
    else{
      res.status(400).json("The password must be complex.");
    }
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
              _id: result._id,
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
const getuser = async (req, res) => {
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
//update user

  const updateuser = (req, res) => {
    console.log(req.token);
    const { _id } = req.params;
    const { email,username,password} = req.body;
    try {
      usermodel.findOne({ _id: _id }).then((result) => {
        console.log(result);
        if (result) {
          if (result.createby == req.token._id) {
            usermodel
              .findOneAndUpdate(
                { _id: _id },
                { $set: { email:email,
                password:password,
              username:username }},
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              });
          } else if (req.token.role == "61c824b37826606eacd4bf69") {
            usermodel
              .findOneAndUpdate(
                { _id: _id },
                { $set: { email:email,
                  password:password,
                username:username  } }
              )
              .then((result) => {
                res.status(200).json(result);
              });
          } else {
            res.status(403).json({ message: "forbidden" });
          }
        } else {
          res.status(404).send("user not found");
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }}
//   if (req.body.userId === req.params.id){

//   try {
//  const updateuser=await user.findByIdAndUpdate (req.params.id ,{
//   $set: req.body ,

//  },{new:true});
//  res.status(200).json(updateuser);
// } catch (error) {
//   res.status(400).json(error);
// }
// }else {
//   res.status(401).json("only you account");
// }
// }



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
//////////////// active account 

const activateAccount = (req, res) => {
 const token = req.params.token;
  jwt.verify(token, SECRET_KEY, (err, resul) => {
    console.log(resul);
    if (err) {
      return res.status(400).json({error:"the link incorrect or expired"})
    }
      usermodel.findOne ({ _id: resul._userid, email: req.params.email }).exec(( err, user)=> {
          
          if (user) {
          return  res.status(400).json({error:"User with this Email already exists."})
          }
          let newUser= new usermodel ({username ,email ,password });
          newUser.save ((err ,success)=>{
          if (err){
          return res.status(400).json({error:"error activating account"})
          }
         // res.json ({message: 'Signup Successfully'})        
        else {
         return res.json({error:"something went erong"}) }  
      })
    });
  })

}     
/*
/// forgetpassword 
const forgetpassword = (req, res) => {
  const { email } = req.body;
  usermodel.findOne({ email }, (err, user) => {
    if (err || ! user)
    {
 return res.status(400).json({error:"user with this email doesn`t exists"})  
    }
    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "60m", });
      const data ={
        from:'thoraya'
      }
           
  */           

/// reset link 
const resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (
    newPass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/)
  ) {
    if (resetLink) {
      jwt.verify(
 resetLink, 
        process.env.RESET_PASSWORD_KEY,
        async (err, result) => {
          if (err) {
            return res.status(201).json("token error");
          }
          const savePass = await bcrypt.hash(newPass, SALT);
          usermodel.findOne({ resetLink }, (err, user) => { 
            if (err || !user) {
              return res
                .status(201)
                .json("user with this token does not exists");
            }

            return user.updateOne(
              { resetLink: "", password: savePass },
              (err, result) => {
                if (err) {
                  return res.status(400).json("error");
                }
                return res
                  .status(200)
                  .json("your password has been updated successfully");
              }
            );
          });
        }
      );
    } else {
      return res.status(201).json("authentication error");
    }
  } else {
    res.status(201).json("you need to insert a complix password");
  }
};

module.exports = { signup, login , getallusers, getuser , updateuser ,deleteUser, activateAccount,resetPassword };