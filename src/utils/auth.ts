const ADMIN_PASSWORD = "admin123";

// ✅ LOGIN
export const loginAdmin = (
  password: string
) => {

  if (password === ADMIN_PASSWORD) {

    localStorage.setItem(
      "isAdmin",
      "true"
    );

    return true;
  }

  return false;
};

// ✅ CHECK AUTH
export const isAdminAuthenticated =
  () => {

    return (
      localStorage.getItem(
        "isAdmin"
      ) === "true"
    );
  };

// ✅ LOGOUT
export const logoutAdmin = () => {

  localStorage.removeItem(
    "isAdmin"
  );
};