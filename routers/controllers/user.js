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
  token = req.params.token;
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
      expiresIn: "60m",
    });
) */                                   
                   
                   

/// reset link 

module.exports = { signup, login , getallusers, getuser ,deleteUser, activateAccount };