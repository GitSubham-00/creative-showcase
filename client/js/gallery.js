const gallery = document.getElementById("gallery");
const emptyMessage = document.getElementById("emptyMessage");

const images = getImages(); // from storage.js

if (images.length === 0) {
  emptyMessage.style.display = "block";
} else {
  emptyMessage.style.display = "none";

  // Shuffle images randomly
  images.sort(() => 0.5 - Math.random());

  images.forEach(img => {
    const imageEl = document.createElement("img");
    imageEl.src = img.imageData;
    imageEl.alt = img.title || "Artwork";
    gallery.appendChild(imageEl);
  });
}
