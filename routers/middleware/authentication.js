const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//اي شي في dotenv وابغى استخدمه بالملف اسوي استدعاء له
dotenv.config();

// مفتاح لسكرت ولازم احفظه في ال dotenv
const SECRET = process.env.SECRET_KEY;


const authentication = (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ message: "Forbidden" });

    const token = req.headers.authorization.split(" ")[1];

    const parsedToken = jwt.verify(token, SECRET);

    req.token = parsedToken;

    next();
  } catch (error) {
    res.status(403).json (err);
  }
};

module.exports = authentication;