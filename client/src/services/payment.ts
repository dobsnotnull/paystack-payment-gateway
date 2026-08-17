const API_URL = "https://paystack-payment-gateway-sjzh.onrender.com";

export async function initializePayment(
  email: string,
  amount: number
) {
  const response = await fetch(
    `${API_URL}/api/payments/initialize`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Payment initialization failed");
  }

  return response.json();
}