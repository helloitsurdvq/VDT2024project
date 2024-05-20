const express = require('express');
const traineeController = require("../controllers/traineeController")
const router = express.Router();

router.get("/", traineeController.getAllTrainees);
router.get("/:id", traineeController.getOneTrainee);
router.post("/", traineeController.saveTrainee);
router.put("/:id", traineeController.updateTrainee);
router.delete("/:id", traineeController.deleteTrainee);

module.exports = router;