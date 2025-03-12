document.addEventListener("DOMContentLoaded", function () {
    // Change Background on Refresh
    let bgCount = 22; // Adjust to the actual number of background images
    let randomIndex = Math.floor(Math.random() * bgCount) + 1;
    document.body.style.backgroundImage = `url('bg/${randomIndex}.webp')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  
  

    const randomBg = bgImages[Math.floor(Math.random() * bgImages.length)];
    document.body.style.backgroundImage = `url('${randomBg}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
});