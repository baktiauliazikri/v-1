window.addEventListener("DOMContentLoaded", () => {
    const flowerImages = [
      "./assets/rose-straight.png",
      "./assets/lys-straight.png",
      "./assets/sunflower-straight.png",
      "./assets/tulip-straight.png",
      "./assets/babies-breath-straight.png",
      "./assets/daisy-straight.png"
    ];
    const vaseImages = [
      "./assets/pink-vase-straight.png",
      "./assets/green-vase-straight.png",
      "./assets/blue-vase-straight.png"
    ];
  
    const selectedFlowers = JSON.parse(localStorage.getItem("selectedFlowers")) || [];
    const selectedVase = localStorage.getItem("selectedVase");
  
    // Set the vase image
    document.getElementById("vase").src = vaseImages[selectedVase];
  
    // Set flower images
    selectedFlowers.forEach((flowerIndex, i) => {
      document.getElementById(`flower${i + 1}`).src = flowerImages[flowerIndex];
    });
  
    console.log("Rendering bouquet with:", selectedFlowers, selectedVase);
  });