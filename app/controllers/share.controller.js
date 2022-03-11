const Share = require("../models/share.model.js");
// Create and Save a new share
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a share
  const share = new Share({
    sharecode: req.body.sharecode,
    lastprice: req.body.lastprice,
  });
  

  // Save share in the database
  Share.create(share, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the share."
      });
    else res.send(data);
  });
};
// Retrieve all shares from the database (with condition).
exports.findAll = (req, res) => {
  const sharecode = req.query.sharecode;
  Share.getAll(sharecode, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shares."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Share.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found share with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving share with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
/////UpdatePrice
exports.updatePrice = (req, res) => {
  console.log(req.body.sharecode);
  console.log(req.body.lastprice);
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Share.UpdatePrice(
    req.body.sharecode,
    req.body.lastprice,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found share with code ${req.params.sharecode}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating share with code " + req.params.sharecode
          });
        }
      } else res.send(data);
    }
  );
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Share.updateById(
    req.params.id,
    new share(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found share with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating share with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
exports.delete = (req, res) => {
  Share.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found share with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete share with id " + req.params.id
        });
      }
    } else res.send({ message: `share was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Share.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all shares."
      });
    else res.send({ message: `All shares were deleted successfully!` });
  });
};