const params = new URLSearchParams(window.location.search);
const username = params.get("username");

const profileName = document.getElementById("profileName");
const profileGallery = document.getElementById("profileGallery");
const noProfileImages = document.getElementById("noProfileImages");

if (!username) {
  profileName.innerText = "User not found";
  noProfileImages.style.display = "block";
} else {
  profileName.innerText = username;

  loadPublicImages(username);
}

async function loadPublicImages(username) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/images/user/${username}`
    );

    const images = await res.json();

    profileGallery.innerHTML = "";

    if (!images.length) {
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
  } catch (err) {
    console.error("Failed to load public profile", err);
    noProfileImages.style.display = "block";
  }
}
