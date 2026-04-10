const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxViewport = document.getElementById("lightbox-viewport");
const openButtons = document.querySelectorAll(".js-open-lightbox");
const closeButton = document.getElementById("close-lightbox");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const zoomResetButton = document.getElementById("zoom-reset");

let currentScale = 1;

function clampScale(value) {
  return Math.min(4, Math.max(1, value));
}

function applyScale() {
  lightboxImage.style.transform = `scale(${currentScale})`;
  zoomResetButton.textContent = `${Math.round(currentScale * 100)}%`;
}

function setScale(nextScale) {
  currentScale = clampScale(nextScale);
  applyScale();
}

function openLightbox(imageSrc, title, altText) {
  lightboxImage.src = imageSrc;
  lightboxImage.alt = altText;
  lightboxTitle.textContent = title;
  setScale(1);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightboxViewport.scrollTo({ top: 0, left: 0 });
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.dataset.image;
    const title = button.dataset.title || "القائمة";
    const altText = button.querySelector("img")?.alt || title;
    openLightbox(image, title, altText);
  });
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target.hasAttribute("data-close-lightbox")) {
    closeLightbox();
  }
});

zoomInButton.addEventListener("click", () => setScale(currentScale + 0.25));
zoomOutButton.addEventListener("click", () => setScale(currentScale - 0.25));
zoomResetButton.addEventListener("click", () => setScale(1));

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "+" || event.key === "=") {
    setScale(currentScale + 0.25);
  }

  if (event.key === "-") {
    setScale(currentScale - 0.25);
  }
});
