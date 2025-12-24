const gallery = document.getElementById("landingGallery");
const noImages = document.getElementById("noImages");

async function loadLandingImages() {
  try {
    const res = await fetch("http://localhost:5000/api/images/random");
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
  } catch (err) {
    console.error("Landing page error:", err);
    noImages.style.display = "block";
  }
}

loadLandingImages();
