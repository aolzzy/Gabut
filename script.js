function toggleInfo() {
  const box = document.getElementById("detailBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}
function toggleInfo() {
  const box = document.getElementById("detailBox");
  box.classList.toggle("hide");
}
function launchAR() {
  const viewer = document.querySelector("model-viewer");
  viewer.activateAR();
}
// klik diluar sidebar untuk menghilangkan navbar menu
// Tutup menu saat klik area luar menu (overlay)
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const overlay = document.createElement("div");

  // Tambah overlay ke body
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Klik overlay = tutup menu
  overlay.addEventListener("click", () => {
    menuToggle.checked = false;

    document.addEventListener("DOMContentLoaded", function () {
      const menuToggle = document.getElementById("menu-toggle");
      const overlay = document.querySelector(".overlay"); // ambil dari HTML

      if (overlay) {
        overlay.addEventListener("click", () => {
          menuToggle.checked = false;
        });
      }
    });
  });
});
