import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedSlot: string;
  onConfirm: (data: {
    name: string;
    contact: string;
  }) => void;
};

export default function CheckoutModal({
  open,
  onClose,
  selectedDate,
  selectedSlot,
  onConfirm,
}: Props) {

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (open) {

      setName("");
      setContact("");
      setLoading(false);
    }

  }, [open]);

  if (!open) return null;

  const isValid =
    name.trim().length >= 2 &&
    (contact.includes("@") ||
      /^[0-9]{10}$/.test(contact));

  const handleConfirm = () => {

    if (!isValid || loading) return;

    setLoading(true);

    onConfirm({ name, contact });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-end md:items-center z-50 px-3">

      <div className="bg-white rounded-t-3xl md:rounded-2xl w-full max-w-md p-5 md:p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-4">
          Confirm your booking
        </h2>

        {/* DETAILS */}
        <div className="bg-gray-100 rounded-xl p-4 mb-5 text-sm space-y-1">

          <p>
            <strong>Date:</strong> {selectedDate}
          </p>

          <p>
            <strong>Time:</strong> {selectedSlot}
          </p>

        </div>

        {/* INPUTS */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border border-gray-200 focus:border-purple-500 outline-none p-3 rounded-xl mb-3"
        />

        <input
          type="text"
          placeholder="Email or Phone"
          value={contact}
          onChange={(e) =>
            setContact(e.target.value)
          }
          className="w-full border border-gray-200 focus:border-purple-500 outline-none p-3 rounded-xl mb-5"
        />

        {/* BUTTON */}
        <button
          disabled={!isValid || loading}
          onClick={handleConfirm}
          className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3.5 rounded-xl font-medium disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : "Continue to payment"}
        </button>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 w-full"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}