import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const API = import.meta.env.VITE_API_URL

type PaymentProps = {
  amount: number;

  name: string;

  contact: string;

  date: string;

  time: string;

  onSuccess: () => void;

  onFailure: () => void;
};

export const startPayment = async ({
  amount,
  name,
  contact,
  date,
  time,
  onSuccess,
  onFailure,
}: PaymentProps) => {

  try {

    // ✅ CREATE ORDER
    const { data: order } =
      await axios.post(
        `${API}/api/payment/create-order`
      );

    const options = {

      key: import.meta.env
        .VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "Consultation Booking",

      description:
        "Session Booking Payment",

      order_id: order.id,

      handler: async (
        response: any
      ) => {

        try {

          // ✅ VERIFY PAYMENT
          await axios.post(
            `${API}/api/payment/verify`,
            {
              ...response,

              name,
              contact,
              date,
              time,
            }
          );

          onSuccess();

        } catch (error) {

          console.error(error);

          onFailure();
        }
      },

      prefill: {
        name,
        contact,
      },

      theme: {
        color: "#7C3AED",
      },

      // ✅ ENABLE UPI
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },

      modal: {
        ondismiss: () => {
          onFailure();
        },
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(error);

    onFailure();
  }
};