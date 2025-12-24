/* =========================
   API Base URL
========================= */
const API_BASE = "https://creative-showcase-y6r9.onrender.com";

/* =========================
   Get Username from URL
========================= */
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

const profileName = document.getElementById("profileName");
const profileGallery = document.getElementById("profileGallery");
const noProfileImages = document.getElementById("noProfileImages");

/* =========================
   Initial Check
========================= */
if (!username) {
  profileName.innerText = "User not found";
  noProfileImages.style.display = "block";
} else {
  profileName.innerText = username;
  loadPublicImages(username);
}

/* =========================
   Load Public Profile Images
========================= */
async function loadPublicImages(username) {
  try {
    const res = await fetch(
      `${API_BASE}/api/users/${encodeURIComponent(username)}/images`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch profile images");
    }

    const data = await res.json(); 
    const images = data.images; // backend sends { username, images }

    profileGallery.innerHTML = "";

    if (!images || images.length === 0) {
      noProfileImages.style.display = "block";
      return;
    }

    noProfileImages.style.display = "none";

    images.forEach((img) => {
      const imageEl = document.createElement("img");
      imageEl.src = img.imageUrl;
      imageEl.alt = img.title || "Artwork";
      profileGallery.appendChild(imageEl);
    });
  } catch (error) {
    console.error("Failed to load public profile", error);
    noProfileImages.style.display = "block";
  }
}
