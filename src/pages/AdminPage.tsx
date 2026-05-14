import { useEffect, useState } from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  logoutAdmin,
} from "../utils/auth";

type Booking = {
  id: string;

  name: string;

  contact: string;

  date: string;

  time: string;

  paymentId: string;

  createdAt: number;
};

const API = "http://localhost:5000";

export default function AdminPage() {

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  // ✅ FETCH BOOKINGS
  useEffect(() => {

    const fetchBookings =
      async () => {

        try {

          const res =
            await axios.get(
              `${API}/api/admin/bookings`
            );

          setBookings(res.data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      };

    fetchBookings();

  }, []);

  // ✅ CANCEL BOOKING
  const handleCancel =
    async (id: string) => {

      const confirmed =
        window.confirm(
          "Cancel this booking?"
        );

      if (!confirmed) return;

      try {

        await axios.delete(
          `${API}/api/admin/bookings/${id}`
        );

        // remove instantly from UI
        setBookings((prev) =>
          prev.filter(
            (booking) =>
              booking.id !== id
          )
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ✅ LOGOUT
  const handleLogout = () => {

    logoutAdmin();

    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

        {loading ? (

          <p className="p-4">
            Loading bookings...
          </p>

        ) : bookings.length === 0 ? (

          <p className="p-4">
            No bookings found
          </p>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-3">
                  Name
                </th>

                <th className="text-left p-3">
                  Contact
                </th>

                <th className="text-left p-3">
                  Date
                </th>

                <th className="text-left p-3">
                  Time
                </th>

                <th className="text-left p-3">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.map(
                (booking) => (

                  <tr
                    key={booking.id}
                    className="border-t"
                  >

                    <td className="p-3">
                      {booking.name}
                    </td>

                    <td className="p-3">
                      {booking.contact}
                    </td>

                    <td className="p-3">
                      {booking.date}
                    </td>

                    <td className="p-3">
                      {booking.time}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          handleCancel(
                            booking.id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}