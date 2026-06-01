const prisma = require("../prismaClient");

const getDashboardStats =
  async (req, res) => {

  const patients =
    await prisma.patient.count();

  const doctors =
    await prisma.doctor.count();

  const appointments =
    await prisma.appointment.count();

  const revenue =
    await prisma.billing.aggregate({
      _sum: {
        amount: true,
      },
    });

  res.json({
    totalPatients: patients,
    totalDoctors: doctors,
    totalAppointments:
      appointments,
    totalRevenue:
      revenue._sum.amount || 0,
  });
};

module.exports = {
  getDashboardStats,
};