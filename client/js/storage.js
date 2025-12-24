/* =========================
   Session & Auth Helpers
   (Backend-based)
========================= */

// Save session after login
function setSession(token, username) {
  localStorage.setItem("token", token);
  localStorage.setItem("currentUser", username);
}

// Get auth token
function getToken() {
  return localStorage.getItem("token");
}

// Get current logged-in user
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

// Check if user is logged in
function isAuthenticated() {
  return !!getToken();
}

// Logout user
function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
}
