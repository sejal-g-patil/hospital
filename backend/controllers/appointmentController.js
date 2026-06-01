const prisma = require("../prismaClient");

const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      status,
    } = req.body;

    const appointment =
      await prisma.appointment.create({
        data: {
          patientId,
          doctorId,
          appointmentDate: new Date(
            appointmentDate
          ),
          status,
        },
      });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments =
      await prisma.appointment.findMany({
        include: {
          patient: true,
          doctor: true,
        },
      });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};