const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerViewport = document.getElementById("viewer-viewport");
const openButtons = document.querySelectorAll(".menu-thumb");
const closeViewerButton = document.getElementById("close-viewer");
const backdropButton = document.getElementById("viewer-backdrop");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const zoomResetButton = document.getElementById("zoom-reset");

let scale = 1;

function clampScale(value) {
  return Math.min(4, Math.max(1, value));
}

function applyScale() {
  viewerImage.style.transform = `scale(${scale})`;
  zoomResetButton.textContent = `${Math.round(scale * 100)}%`;
}

function setScale(value) {
  scale = clampScale(value);
  applyScale();
}

function openViewer(src, alt) {
  viewerImage.src = src;
  viewerImage.alt = alt;
  setScale(1);
  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("viewer-open");
  viewerViewport.scrollTo({ top: 0, left: 0 });
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");
  viewerImage.src = "";
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.image;
    const alt = button.querySelector("img")?.alt || "menu";
    openViewer(src, alt);
  });
});

closeViewerButton.addEventListener("click", closeViewer);
backdropButton.addEventListener("click", closeViewer);
zoomInButton.addEventListener("click", () => setScale(scale + 0.25));
zoomOutButton.addEventListener("click", () => setScale(scale - 0.25));
zoomResetButton.addEventListener("click", () => setScale(1));

document.addEventListener("keydown", (event) => {
  if (!viewer.classList.contains("is-open")) {
    return;
  }

  if (event.key === "Escape") {
    closeViewer();
    return;
  }

  if (event.key === "+" || event.key === "=") {
    setScale(scale + 0.25);
    return;
  }

  if (event.key === "-") {
    setScale(scale - 0.25);
  }
});
