document.addEventListener("DOMContentLoaded", function () {
  // Change Background on Refresh
  let bgCount = 22; // Adjust to the actual number of background images
  let randomIndex = Math.floor(Math.random() * bgCount) + 1;
  document.body.style.backgroundImage = `url('bg/${randomIndex}.webp')`;

  // Modal & Image Navigation
  let modal = document.getElementById("imageModal");
  let modalImg = document.getElementById("modalImage");
  let currentImageIndex = 0;
  let currentFolder = "";
  let imagesInFolder = [];

  function openModal(imgElement) {
      modal.style.display = "flex";
      modalImg.src = imgElement.src;

      let srcParts = imgElement.src.split("/");
      currentFolder = srcParts[srcParts.length - 2];
      currentImageIndex = parseInt(srcParts[srcParts.length - 1].split(".")[0]);

      loadImagesInFolder(currentFolder);
      createNavigationButtons();
  }

  function closeModal() {
      modal.style.display = "none";
      removeNavigationButtons();
  }

  function loadImagesInFolder(folder) {
      let maxImages = { "Otm": 191, "Cleave": 90, "Tape": 4, "Other": 13 };
      imagesInFolder = Array.from({ length: maxImages[folder] }, (_, i) => `gallery/${folder}/${i + 1}.jpg`);
  }

  function changeImage(step) {
      currentImageIndex = (currentImageIndex - 1 + step + imagesInFolder.length) % imagesInFolder.length + 1;
      modalImg.src = imagesInFolder[currentImageIndex - 1];
  }

  function createNavigationButtons() {
      if (!document.querySelector(".prev")) {
          let prevBtn = document.createElement("button");
          prevBtn.className = "prev";
          prevBtn.innerHTML = "&#10094;";
          prevBtn.onclick = () => changeImage(-1);
          modal.appendChild(prevBtn);
      }

      if (!document.querySelector(".next")) {
          let nextBtn = document.createElement("button");
          nextBtn.className = "next";
          nextBtn.innerHTML = "&#10095;";
          nextBtn.onclick = () => changeImage(1);
          modal.appendChild(nextBtn);
      }
  }

  function removeNavigationButtons() {
      document.querySelectorAll(".prev, .next").forEach(btn => btn.remove());
  }

  // Keyboard Navigation
  document.addEventListener("keydown", function (event) {
      if (modal.style.display === "flex") {
          if (event.key === "ArrowLeft") changeImage(-1);
          else if (event.key === "ArrowRight") changeImage(1);
          else if (event.key === "Escape") closeModal();
      }
  });

  // Attach modal to all images
  document.querySelectorAll(".gallery-images img").forEach(img => {
      img.addEventListener("click", () => openModal(img));
  });

  // Close modal on clicking outside the image
  modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
  });
});
