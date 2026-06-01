const prisma = require("../prismaClient");

// Create Patient
const createPatient = async (req, res) => {
  try {
    const { name, age, gender, phone, address, disease } = req.body;

    const patient = await prisma.patient.create({
      data: {
        name,
        age: Number(age),
        gender,
        phone,
        address,
        disease,
      },
    });

    res.status(201).json(patient);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Patients
const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();

    res.json(patients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Patient By ID
const getPatientById = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        patientId: Number(req.params.id),
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Patient
const updatePatient = async (req, res) => {
  try {
    const patient = await prisma.patient.update({
      where: {
        patientId: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // 1. Delete Appointments first
    await prisma.appointment.deleteMany({
      where: {
        patientId: id,
      },
    });

    // 2. Delete Billing records
    await prisma.billing.deleteMany({
      where: {
        patientId: id,
      },
    });

    // 3. Now delete Patient
    const patient = await prisma.patient.delete({
      where: {
        patientId: id,
      },
    });

    res.json({
      message: "Patient deleted successfully",
      patient,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};