const prisma = require("../prismaClient");

// Create Doctor
const createDoctor = async (req, res) => {
  try {
    const doctor = await prisma.doctor.create({
      data: req.body,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  try {
    await prisma.doctor.delete({
      where: {
        doctorId: Number(req.params.id),
      },
    });

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  deleteDoctor,
};