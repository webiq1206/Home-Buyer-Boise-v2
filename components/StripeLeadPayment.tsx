import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import type { Lead } from "@shared/schema";

interface StripeLeadPaymentProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  lead: {
    id: string;
    city: string;
    propertyType: string;
    currentPrice: string;
  };
}

function CheckoutForm({
  lead,
  paymentIntentId,
  onSuccess,
  onClose,
}: {
  lead: Lead;
  paymentIntentId: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const queryClient = useQueryClient();

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/leads/${lead.id}/purchase`, {
        paymentIntentId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leads/purchases"] });
      setIsComplete(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to complete purchase");
      setIsProcessing(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      purchaseMutation.mutate();
    } else {
      setError("Payment was not successful. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="py-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
        <p className="text-muted-foreground">
          You now have access to the full lead details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Lead Purchase</p>
            <p className="text-sm text-muted-foreground">
              {lead.propertyType?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} in {lead.city}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${parseFloat(lead.currentLeadPrice).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <PaymentElement />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className="flex-1"
          data-testid="button-confirm-payment"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${parseFloat(lead.currentLeadPrice).toFixed(2)}`
          )}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Your payment is secured by Stripe. You'll receive the full lead details immediately after payment.
      </p>
    </form>
  );
}

export function StripeLeadPayment({
  lead,
  isOpen,
  onClose,
  onSuccess,
}: StripeLeadPaymentProps) {
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: publishableKey } = useQuery<{ publishableKey: string }>({
    queryKey: ["/api/stripe/publishable-key"],
    enabled: isOpen,
  });

  useEffect(() => {
    if (publishableKey?.publishableKey && !stripePromise) {
      setStripePromise(loadStripe(publishableKey.publishableKey));
    }
  }, [publishableKey, stripePromise]);

  const createPaymentIntentMutation = useMutation({
    mutationFn: async (): Promise<PaymentIntentResponse> => {
      const response = await apiRequest("POST", `/api/leads/${lead.id}/create-payment-intent`);
      return response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to initialize payment");
    },
  });

  useEffect(() => {
    if (isOpen && !clientSecret && !createPaymentIntentMutation.isPending) {
      setError(null);
      createPaymentIntentMutation.mutate();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setClientSecret(null);
      setPaymentIntentId(null);
      setError(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-stripe-payment">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Enter your payment details to purchase this lead
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {createPaymentIntentMutation.isPending && (
          <div className="py-8 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Preparing payment...</p>
          </div>
        )}

        {stripePromise && clientSecret && paymentIntentId && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#C5A572",
                },
              },
            }}
          >
            <CheckoutForm
              lead={lead}
              paymentIntentId={paymentIntentId}
              onSuccess={onSuccess}
              onClose={handleClose}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}
