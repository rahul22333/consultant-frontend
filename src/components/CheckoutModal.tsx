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

  // 🔄 Reset form when modal opens
  useEffect(() => {
    if (open) {
      setName("");
      setContact("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  // ✅ Better validation
  const isValid =
    name.trim().length >= 2 &&
    (contact.includes("@") || /^[0-9]{10}$/.test(contact));

  const handleConfirm = () => {
    if (!isValid || loading) return;

    setLoading(true);
    onConfirm({ name, contact });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      
      <div className="bg-white rounded-xl w-full max-w-md p-5">

        {/* HEADER */}
        <h2 className="text-lg font-bold mb-3">
          Confirm your booking
        </h2>

        {/* DETAILS */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm">
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedSlot}</p>
        </div>

        {/* INPUTS */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          placeholder="Email or Phone"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* BUTTON */}
        <button
          disabled={!isValid || loading}
          onClick={handleConfirm}
          className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : "Continue to payment"}
        </button>

        {/* CANCEL */}
        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}