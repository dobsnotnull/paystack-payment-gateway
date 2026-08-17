import { useState } from "react";
import { initializePayment } from "./services/payment.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const amounts = [5000, 10000, 1000000];

function App() {
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handlePayment = async () => {
    if (!validateEmail(email)) return;

    try {
    const payment = await initializePayment(
      email,
      selectedAmount
    );

    window.location.href = payment.data.authorization_url; 
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Support this project</CardTitle>
            <CardDescription>
              Choose an amount and test.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Amount selection */}
            <div className="space-y-3">
              <Label>Choose amount</Label>

              <div className="grid grid-cols-2 gap-3">
                {amounts.slice(0, 2).map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setSelectedAmount(amount)}
                    className={`rounded-lg border p-4 text-left transition ${
                      selectedAmount === amount
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted"
                    }`}
                  >
                    <p className="text-lg font-semibold">
                      {formatAmount(amount)}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      One-time support
                    </p>
                  </button>
                ))}
              </div>

              {/* ₦1M option */}
              <button
                type="button"
                onClick={() => setSelectedAmount(1000000)}
                className={`w-full rounded-lg border p-5 text-left transition ${
                  selectedAmount === 1000000
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold">₦1,000,000</p>

                    <p className="text-sm text-muted-foreground">
                      You really want to support this project 
                    </p>
                  </div>

                  <span className="text-xs text-muted-foreground">
                    Superdad/Supermom
                  </span>
                </div>
              </button>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (emailError) {
                    validateEmail(e.target.value);
                  }
                }}
                onBlur={() => validateEmail(email)}
              />

              {emailError && (
                <p className="text-sm text-destructive">
                  {emailError}
                </p>
              )}
            </div>

            {/* Payment */}
            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
            >
              Pay {formatAmount(selectedAmount)}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Payments are securely processed by Paystack.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <p className="mt-4 px-4 text-center text-xs leading-relaxed text-muted-foreground">
          #Needmoneyformac🤍
        </p>
      </div>
    </main>
  );
}

export default App;