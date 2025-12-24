/* =========================
   API Base URL
========================= */
const API_BASE = "https://creative-showcase-y6r9.onrender.com";

const gallery = document.getElementById("gallery");
const emptyMessage = document.getElementById("emptyMessage");

/* =========================
   Load Gallery Images (Backend)
========================= */
async function loadGalleryImages() {
  try {
    const res = await fetch(`${API_BASE}/api/images/random`);
    const images = await res.json();

    gallery.innerHTML = "";

    if (!images.length) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    images.forEach((img) => {
      const imageEl = document.createElement("img");
      imageEl.src = img.imageUrl;
      imageEl.alt = img.title || "Artwork";
      gallery.appendChild(imageEl);
    });
  } catch (error) {
    console.error("Gallery load error:", error);
    emptyMessage.style.display = "block";
  }
}

/* =========================
   Initial Load
========================= */
loadGalleryImages();
