const Trainee = require("../models/trainee")

// get all trainee
const getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find({});

    return res.status(200).json({
      count: trainees.length,
      data: trainees,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

//get a trainee
const getOneTrainee = async (req, res) => {
  try {
      const { id } = req.params;
      const trainee = await Trainee.findById(id);

      if (!trainee) {
        return res.status(404).json({ message: "Trainee not found" });
      }
      
      return res.status(200).json(trainee);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
  }
};

// add a trainee
const saveTrainee = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.gender ||
      !req.body.school
    ) {
      return res.status(400).send({
        message: "Send all required fileds",
      });
    }
    const newTrainee = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      school: req.body.school,
    };
    const trainee = await Trainee.create(newTrainee);

    return res.status(201).send(trainee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// update a trainee information
const updateTrainee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).send({
        message: "No update data provided",
      });
    }

    const result = await Trainee.findByIdAndUpdate(id, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!result) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    return res.status(200).send({ message: "Trainee updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// delete a trainee
const deleteTrainee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Trainee.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    return res.status(200).send({ message: "Trainee deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllTrainees, getOneTrainee, saveTrainee, updateTrainee, deleteTrainee };