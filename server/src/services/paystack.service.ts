const PAYSTACK_URL = "https://api.paystack.co";

export async function initializePayment(
  email: string,
  amount: number
) {
  const response = await fetch(
    `${PAYSTACK_URL}/transaction/initialize`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: String(amount * 100),
        currency: "NGN",
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payment initialization failed");
  }

  return data;
}