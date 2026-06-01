const prisma = require("../prismaClient");

const createBill = async (
  req,
  res
) => {
  const bill =
    await prisma.billing.create({
      data: req.body,
    });

  res.json(bill);
};

const getBills = async (
  req,
  res
) => {
  const bills =
    await prisma.billing.findMany({
      include: {
        patient: true,
      },
    });

  res.json(bills);
};
const updateBillStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const bill = await prisma.billing.update({
      where: {
        billId: id,
      },
      data: {
        paymentStatus: req.body.paymentStatus,
      },
    });

    res.json({
      message: "Bill updated successfully",
      bill,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBill,
  getBills,
  updateBillStatus,
};
