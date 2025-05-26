document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const imageLinks = document.querySelectorAll(".clickable-modal");

  imageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const imgSrc = link.querySelector("img").getAttribute("src");
      modalImg.setAttribute("src", imgSrc);
      modal.style.display = "flex";
    });
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    modal.style.display = "none";
    modalImg.setAttribute("src", "");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.setAttribute("src", "");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      modalImg.setAttribute("src", "");
    }
  });
});
