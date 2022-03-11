module.exports = app => {
  const userportfolio = require("../controllers/userportfolio.controller.js");
  var router = require("express").Router();
  //Buy_Sale
  router.post("/Buy_Sale", userportfolio.Buy_Sale);
  // Create a new userportfolio
  router.post("/", userportfolio.create);
  // Retrieve all userportfolios
  router.get("/", userportfolio.findAll);
  // Retrieve a single userportfolio with id
  router.get("/:id", userportfolio.findOne);
  // Update a userportfolio with id
  router.put("/:id", userportfolio.update);
  // Delete a userportfolio with id
  router.delete("/:id", userportfolio.delete);
  // Delete all userportfolios
  router.delete("/", userportfolio.deleteAll);
  app.use('/api/userportfolio', router);
};