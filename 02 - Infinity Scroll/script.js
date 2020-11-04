// Unsplash API

const count = 30;
const apiKey = "";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// get photos

async function getPhotos(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    console.log("photos :>> ", photos);
  } catch (err) {
    console.log("Error fetching API", err);
  }
}

// On load

getPhotos(apiUrl);
