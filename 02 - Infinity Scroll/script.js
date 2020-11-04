const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
// Unsplahs API URL
const count = 30;
const apiKey = "";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// get photos
async function getPhotos(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    displayPhotos(photosArray, imgContainer);
  } catch (err) {
    console.log("Error fetching API", err);
  }
}

function createPhotoItem(photo) {
  const itemAnchor = document.createElement("a");
  itemAnchor.setAttribute("href", photo.links.html);
  itemAnchor.setAttribute("target", "_blank");

  const img = document.createElement("img");
  img.setAttribute("src", photo.urls.regular);
  img.setAttribute("alt", photo.alt_description);
  img.setAttribute("title", photo.alt_description);

  return itemAnchor.appendChild(img);
}

async function displayPhotos(photosArray, target) {
  try {
    photosArray.forEach((photo) => {
      const photoItem = createPhotoItem(photo);
      target.appendChild(photoItem);
    });
  } catch (err) {
    console.log("Error displaying photos", err);
  }
}

// On load

loader.hidden = false;
// getPhotos(apiUrl);
setTimeout(() => {
  loader.hidden = true;
}, 1000);
