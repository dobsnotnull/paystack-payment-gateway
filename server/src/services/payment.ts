export async function initializePayment(
  email: string,
  amount: number
) {
  const response = await fetch(
    "http://localhost:5000/api/payments/initialize",
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