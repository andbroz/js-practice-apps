const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

const initialPhotosCount = 5;
const morePhotosCount = 30;

// Unsplahs API URL
const apiKey = "";

/**
 * imagesLoaded - count numbers of loaded images and set ready flag when all images are loaded
 */
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded >= totalImages) {
    ready = true;
    imagesLoaded = 0;
    loader.hidden = true;
  }
}

// get photos
/** getPhotos - Downloads photos from API
 *
 * @param {String} apiUrl - url for API get request
 * @returns {Array} - array containing photo objects or empty array
 */
async function getPhotos(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    return photosArray;
  } catch (err) {
    console.log("Error fetching API", err);
    return [];
  }
}
/** Create Photo HTMLElement
 *
 * @param {Object} photo
 * @returns {HTMLElement} item
 */
function createPhotoItem(photo) {
  const item = document.createElement("a");
  item.setAttribute("href", photo.links.html);
  item.setAttribute("target", "_blank");

  const img = document.createElement("img");
  img.setAttribute("src", photo.urls.regular);
  img.setAttribute("alt", photo.alt_description);
  img.setAttribute("title", photo.alt_description);

  img.addEventListener("load", imageLoaded);
  item.appendChild(img);

  return item;
}

/**
 *
 * @param {Array} photosArray
 * @param {HTMLElement} target
 */
function appendPhotos(photosArray, target) {
  if (photosArray.length > 0) {
    photosArray.forEach((photo) => {
      const photoItem = createPhotoItem(photo);
      target.appendChild(photoItem);
    });
  } else {
    console.warn("No photos to append");
  }
}

/** displayPhotos - display given number of Photos on page, new photos appened at bottom
 *
 * @param {Number} count
 */
async function displayPhotos(count) {
  totalImages = count;
  ready = false;

  // Update API URL with images count number to retrieve
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

  const photosArray = await getPhotos(apiUrl);
  appendPhotos(photosArray, imgContainer);
}

// Add event listener for scroll trigger
window.addEventListener("scroll", () => {
  const currentPosition = window.innerHeight + window.scrollY;
  const triggerLoadPosition = document.body.offsetHeight - 1000;

  // scroll till trigger point is reached && previous images loaded
  if (currentPosition >= triggerLoadPosition && ready) {
    // get new photos
    displayPhotos(morePhotosCount);
  }
});

// Initial load
displayPhotos(initialPhotosCount);
