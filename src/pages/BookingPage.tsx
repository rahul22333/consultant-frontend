import { useState, useEffect, useCallback } from "react";

import Header from "../components/Header";
import SessionCard from "../components/SessionCard";
import TimeSlots from "../components/TimeSlots";
import CheckoutModal from "../components/CheckoutModal";

import { startPayment } from "../services/payment";

import axios from "axios";

import { toast } from "react-hot-toast";

type Slot = {
  time: string;
  isBooked: boolean;
};

type DateType = {
  day: string;
  date: string;
};

// ✅ DYNAMIC DATE GENERATOR
const generateDates = (): DateType[] => {

  const result: DateType[] = [];

  const today = new Date();

  for (let i = 0; i < 5; i++) {

    const current = new Date();

    current.setDate(today.getDate() + i);

    const day = current
      .toLocaleDateString("en-US", {
        weekday: "short",
      })
      .toUpperCase();

    const date = current.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    result.push({
      day,
      date,
    });
  }

  return result;
};

const dates = generateDates();

const API = import.meta.env.VITE_API_URL;

export default function BookingPage() {

  const [selectedDate, setSelectedDate] =
    useState<DateType>(dates[0]);

  const [slots, setSlots] =
    useState<Slot[]>([]);

  const [selectedSlot, setSelectedSlot] =
    useState<string | null>(null);

  const [filter, setFilter] = useState<
    "all" | "morning" | "midday" | "evening"
  >("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isPaying, setIsPaying] =
    useState(false);

  const [loadingSlots, setLoadingSlots] =
    useState(true);

  const [bookingSuccess, setBookingSuccess] =
    useState<{
      name: string;
      date: string;
      time: string;
    } | null>(null);

  // ✅ FETCH SLOTS
  const fetchSlots = useCallback(async () => {

    try {

      setLoadingSlots(true);

      const res = await axios.get(
        `${API}/api/slots?date=${encodeURIComponent(
          selectedDate.date
        )}`
      );

      setSlots(res.data || []);

    } catch (err) {

      console.error("Slot fetch error:", err);

      toast.error("Failed to load slots");

      setSlots([]);

    } finally {

      setLoadingSlots(false);
    }

  }, [selectedDate]);

  // ✅ FETCH WHEN DATE CHANGES
  useEffect(() => {

    fetchSlots();

    setSelectedSlot(null);

  }, [selectedDate, fetchSlots]);

  // 🔒 LOCK SLOT BEFORE PAYMENT
  const handleOpenModal = async () => {

    if (!selectedSlot) return;

    try {

      await axios.post(
        `${API}/api/slots/lock`,
        {
          date: selectedDate.date,
          time: selectedSlot,
        }
      );

      setIsModalOpen(true);

    } catch (err) {

      console.error(err);

      toast.error(
        "Slot already booked by someone else ❌"
      );

      fetchSlots();
    }
  };

  // 🚀 BOOKING FLOW
  const handleBooking = (userData: {
    name: string;
    contact: string;
  }) => {

    if (!selectedSlot || isPaying) return;

    setIsPaying(true);

    setIsModalOpen(false);

    startPayment({
      amount: 500,

      name: userData.name,

      contact: userData.contact,

      date: selectedDate.date,

      time: selectedSlot,

      onSuccess: () => {

        toast.success(
          "Booking confirmed 🎉"
        );

        // instant update
        setSlots((prev) =>
          prev.map((s) =>
            s.time === selectedSlot
              ? {
                  ...s,
                  isBooked: true,
                }
              : s
          )
        );

        setBookingSuccess({
          name: userData.name,
          date: selectedDate.date,
          time: selectedSlot,
        });

        setSelectedSlot(null);

        setIsPaying(false);

        // sync with backend
        fetchSlots();
      },

      onFailure: () => {

        toast.error(
          "Payment failed ❌"
        );

        setIsPaying(false);
      },
    });
  };

  // ✅ SUCCESS SCREEN
  if (bookingSuccess) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">

          <h2 className="text-2xl font-bold text-green-600 mb-2">
            🎉 Booking Confirmed
          </h2>

          <p className="text-gray-600 mb-5">
            Your consultation session has been booked successfully.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-left text-sm mb-5">

            <p>
              <strong>Name:</strong>{" "}
              {bookingSuccess.name}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {bookingSuccess.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {bookingSuccess.time}
            </p>

          </div>

          <button
            onClick={() =>
              setBookingSuccess(null)
            }
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Book Another Session
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24 md:pb-6">

      {/* HEADER */}
      <Header
        name="Dr Jainith Lowvanshi"
        tagline="Dedicated to solve health problems 🙏"
        image="https://i.pravatar.cc/100"
      />

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <SessionCard
          title="Tele consultation, valid for 7 days!"
          duration="30 mins"
          mode="Your Phone Number"
          price={500}
          originalPrice={999}
          badge="Most Popular"
          description="In this exclusive session, you'll engage in a direct and insightful conversation..."
        />

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          <TimeSlots
            dates={dates}
            selectedDate={selectedDate}
            slots={slots}
            selectedSlot={selectedSlot}
            filter={filter}
            onFilterChange={setFilter}
            loading={loadingSlots}
            onDateChange={(d) => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
            onSlotSelect={(slot) =>
              setSelectedSlot(slot)
            }
          />

          {/* DESKTOP CTA */}
          <div className="hidden md:flex justify-end mt-4">

            <button
              disabled={
                !selectedSlot || isPaying
              }
              onClick={handleOpenModal}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {isPaying
                ? "Processing..."
                : "Confirm details"}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t md:hidden">

        <button
          disabled={
            !selectedSlot || isPaying
          }
          onClick={handleOpenModal}
          className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {isPaying
            ? "Processing..."
            : "Confirm details"}
        </button>

      </div>

      {/* CHECKOUT MODAL */}
      {selectedSlot && (
        <CheckoutModal
          open={isModalOpen}
          onClose={() =>
            setIsModalOpen(false)
          }
          selectedDate={selectedDate.date}
          selectedSlot={selectedSlot}
          onConfirm={handleBooking}
        />
      )}
    </div>
  );
}