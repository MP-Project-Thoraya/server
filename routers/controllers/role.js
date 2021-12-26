const rolemodel =require ("./../../db/models/role");

const create = (req, res) => { 
    const {role}=req.body;
  const newRole = new rolemodel({role});
  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};




module.exports = {
  create
 
};