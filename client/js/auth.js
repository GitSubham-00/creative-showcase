/* =========================
   API Base URL
========================= */
const API_BASE = "https://creative-showcase-y6r9.onrender.com";

/* =========================
   Sign Up Logic (Backend)
========================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully!");
      window.location.href = "login.html";
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  });
}

/* =========================
   Login Logic (Backend + JWT)
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invalid email or password");
        return;
      }

      // Save session
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", data.username);

      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  });
}
