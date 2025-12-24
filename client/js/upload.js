/* =========================
   API Base URL
========================= */
const API_BASE = "https://creative-showcase-y6r9.onrender.com";

/* =========================
   Protect Dashboard
========================= */
const token = localStorage.getItem("token");
const currentUser = localStorage.getItem("currentUser");

if (!token || !currentUser) {
  window.location.href = "login.html";
}

/* =========================
   Logout
========================= */
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

/* =========================
   Public Profile Link
========================= */
const publicProfileLink = document.getElementById("publicProfileLink");
if (publicProfileLink) {
  publicProfileLink.href = `profile.html?username=${encodeURIComponent(
    currentUser
  )}`;
}

const userGallery = document.getElementById("userGallery");
const noUploads = document.getElementById("noUploads");

/* =========================
   Load My Images (Backend)
========================= */
async function loadUserImages() {
  try {
    const res = await fetch(`${API_BASE}/api/images/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const images = await res.json();
    userGallery.innerHTML = "";

    if (!images.length) {
      noUploads.style.display = "block";
      return;
    }

    noUploads.style.display = "none";

    images.forEach((img) => {
      const imageEl = document.createElement("img");
      imageEl.src = img.imageUrl;
      imageEl.alt = img.title || "Artwork";
      userGallery.appendChild(imageEl);
    });
  } catch (error) {
    alert("Failed to load images");
  }
}

/* =========================
   Upload Image (FILE)
========================= */
async function uploadImage() {
  const title = document.getElementById("title").value.trim();
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image file");
    return;
  }

  const formData = new FormData();
  formData.append("image", file); // MUST match multer field
  formData.append("title", title);

  try {
    const res = await fetch(`${API_BASE}/api/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // NOT JSON
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    fileInput.value = "";
    document.getElementById("title").value = "";

    loadUserImages();
  } catch (error) {
    alert("Server error during upload");
  }
}

/* =========================
   Initial Load
========================= */
loadUserImages();
