import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import BookingPage from "./pages/BookingPage";

import AdminPage from "./pages/AdminPage";

import AdminLogin from "./pages/AdminLogin";

import ProtectedRoute from "./components/ProtectedRoute";

// ✅ ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <BookingPage />,
  },

  {
    path: "/admin-login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {

  return (
    <>

      {/* 🔔 GLOBAL TOASTER */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,

          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* ✅ ROUTER PROVIDER */}
      <RouterProvider router={router} />

    </>
  );
}

export default App;