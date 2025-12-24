// Protect dashboard
const token = localStorage.getItem("token");
const currentUser = localStorage.getItem("currentUser");

if (!token || !currentUser) {
  window.location.href = "login.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

// Public profile link
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
  const res = await fetch("http://localhost:5000/api/images/my", {
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
}

/* =========================
   Upload Image (FILE)
========================= */
async function uploadImage() {
  console.log("uploadImage called");

  const title = document.getElementById("title").value.trim();
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  console.log("Selected file:", file);

  if (!file) {
    alert("Please select an image file");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);   // MUST match multer field
  formData.append("title", title);

  const res = await fetch("http://localhost:5000/api/images/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // 🚨 NOT JSON
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Upload failed");
    return;
  }

  fileInput.value = "";
  document.getElementById("title").value = "";

  loadUserImages();
}

// Initial load
loadUserImages();
