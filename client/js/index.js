/* =========================
   API Base URL
========================= */
const API_BASE = "https://creative-showcase-y6r9.onrender.com";

const gallery = document.getElementById("landingGallery");
const noImages = document.getElementById("noImages");

/* =========================
   Load Landing Page Images
========================= */
async function loadLandingImages() {
  try {
    const res = await fetch(`${API_BASE}/api/images/random`);
    const images = await res.json();

    gallery.innerHTML = "";

    if (!images.length) {
      noImages.style.display = "block";
      return;
    }

    noImages.style.display = "none";

    images.forEach((img) => {
      const imageEl = document.createElement("img");
      imageEl.src = img.imageUrl;
      imageEl.alt = img.title || "Artwork";
      gallery.appendChild(imageEl);
    });
  } catch (error) {
    console.error("Landing page error:", error);
    noImages.style.display = "block";
  }
}

/* =========================
   Initial Load
========================= */
loadLandingImages();
