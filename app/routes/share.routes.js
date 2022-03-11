module.exports = app => {
  const shares = require("../controllers/share.controller.js");
  var router = require("express").Router();
  // update  share price by share code
  router.post("/UpdatePrice", shares.updatePrice);
  
  // Create a new share
  router.post("/", shares.create);
  // Retrieve all shares
  router.get("/", shares.findAll);
  // Retrieve a single share with id
  router.get("/:id", shares.findOne);
  // Update a share with id
  router.put("/:id", shares.update);
  // Delete a share with id
  router.delete("/:id", shares.delete);
  // Delete all shares
  router.delete("/", shares.deleteAll);
  app.use('/api/shares', router);
};