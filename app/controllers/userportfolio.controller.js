const UserPortfolio = require("../models/userportfolio.model.js");
/////////////////////////////by share by an user/////////////////////////////by share by an user
exports.Buy_Sale = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Save userportfolio in the database
  UserPortfolio.Buy_Sale(req.body.userid,req.body.shareid,req.body.qty,req.body.mode, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the trading."
      });
    else res.send(data);
  });
};
/////////////////////////////by share by an user/////////////////////////////by share by an user
// Create and Save a new userportfolio
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a userportfolio
  const userportfolio = new UserPortfolio({
    userid: req.body.userid,
    shareid: req.body.shareid,
    qty: req.body.qty,
  });
  // Save userportfolio in the database
  UserPortfolio.create(userportfolio, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userportfolio."
      });
    else res.send(data);
  });
};
// Retrieve all userportfolios from the database (with condition).
exports.findAll = (req, res) => {
  const userid = req.query.userid;
  UserPortfolio.getAll(userid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userportfolios."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  UserPortfolio.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userportfolio with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving userportfolio with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  UserPortfolio.updateById(
    req.params.id,
    new userportfolio(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found userportfolio with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating userportfolio with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
exports.delete = (req, res) => {
  UserPortfolio.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userportfolio with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete userportfolio with id " + req.params.id
        });
      }
    } else res.send({ message: `userportfolio was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  UserPortfolio.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userportfolios."
      });
    else res.send({ message: `All userportfolios were deleted successfully!` });
  });
};