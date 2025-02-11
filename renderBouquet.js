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

  // Get selected flowers and vase from localStorage
  const selectedFlowers = JSON.parse(localStorage.getItem("selectedFlowers")) || [];
  const selectedVase = parseInt(localStorage.getItem("selectedVase"), 10); // Ensure it's an integer

  // Get the spans for name and message
  const loverNameSpan = document.getElementById("lover-name");
  const loverMsgSpan = document.getElementById("lover-msg");

  // Get values from localStorage
  const storedName = localStorage.getItem("loverName") + "❤️" || "Your Valentine";
  const storedMsg = localStorage.getItem("loverMsg") || "A sweet message for you ❤️";

  // Set the retrieved text inside the spans
  loverNameSpan.innerText = storedName;
  loverMsgSpan.innerText = storedMsg;

  // Set the vase image, ensure the selectedVase index is valid
  if (selectedVase >= 0 && selectedVase < vaseImages.length) {
      document.getElementById("vase").src = vaseImages[selectedVase];
  }

  // Set flower images
  selectedFlowers.forEach((flowerIndex, i) => {
    // Ensure flowerIndex is valid
    if (flowerIndex >= 0 && flowerIndex < flowerImages.length) {
      document.getElementById(`flower${i + 1}`).src = flowerImages[flowerIndex];
    }
  });

  console.log("Rendering bouquet with:", selectedFlowers, selectedVase);
});