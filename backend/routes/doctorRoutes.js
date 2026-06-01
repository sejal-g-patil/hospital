const express = require("express");

const router = express.Router();

const {
  createDoctor,
  getDoctors,
  deleteDoctor,
} = require("../controllers/doctorController");

router.post("/", createDoctor);
router.get("/", getDoctors);
router.delete("/:id", deleteDoctor);

module.exports = router;