const finishBtn = document.querySelector(".final-step");

finishBtn.addEventListener("click", () => {
    window.electronAPI.loadPage("renderBouquet.html");
  });