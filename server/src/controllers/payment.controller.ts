import type { Request, Response } from "express";
import { initializePayment } from "../services/paystack.service.js";

export async function createPayment(
  req: Request,
  res: Response
) {
  try {
    const { email, amount } = req.body;

    if (!email || !amount) {
      return res.status(400).json({
        message: "Email and amount are required",
      });
    }

    const payment = await initializePayment(email, amount);

    return res.status(200).json(payment);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to initialize payment",
    });
  }
}