document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("resistorViewer");
  const btnStart = document.getElementById("btnAnimasiResistor");
  const btnStop = document.getElementById("btnStopAnimasiResistor");
  const flow = document.getElementById("arusFlow");
  const statusText = document.getElementById("statusResistor");

  if (!viewer || !btnStart || !btnStop || !flow || !statusText) return;

  let rafId = null;
  let startTime = 0;
  let resistorMaterials = [];

  function resetVisual() {
    flow.style.transform = "translateX(-110%)";
    flow.style.opacity = "0";
    viewer.cameraOrbit = "0deg 75deg 110%";

    resistorMaterials.forEach((mat) => {
      if (typeof mat.setEmissiveFactor === "function") {
        mat.setEmissiveFactor([0, 0, 0]);
      }
    });

    statusText.textContent = "Status: standby";
  }

  viewer.addEventListener("load", () => {
    if (viewer.model && Array.isArray(viewer.model.materials)) {
      resistorMaterials = viewer.model.materials;
    }
    resetVisual();
  });

  function animate(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;

    // Kamera bergerak pelan
    const orbit = 10 + Math.sin(elapsed * 0.0012) * 20;
    viewer.cameraOrbit = `${orbit}deg 75deg 110%`;

    // Efek arus bergerak
    const progress = (elapsed % 2400) / 2400;
    flow.style.opacity = "1";
    flow.style.transform = `translateX(${(-110 + progress * 220)}%)`;

    // Efek resistor bekerja / hangat
    const glow = 0.05 + ((Math.sin(elapsed * 0.004) + 1) / 2) * 0.22;

    resistorMaterials.forEach((mat, index) => {
      if (typeof mat.setEmissiveFactor === "function") {
        if (index < 2) {
          mat.setEmissiveFactor([glow, glow * 0.4, 0.0]);
        } else {
          mat.setEmissiveFactor([glow * 0.55, glow * 0.2, 0.0]);
        }
      }
    });

    // Status pembelajaran
    const phase = elapsed % 3600;
    if (phase < 1200) {
      statusText.textContent =
        "Status: arus mulai mengalir melalui resistor";
    } else if (phase < 2400) {
      statusText.textContent =
        "Status: resistor menghambat arus sesuai nilai resistansi";
    } else {
      statusText.textContent =
        "Status: sebagian energi berubah menjadi panas kecil pada resistor";
    }

    rafId = requestAnimationFrame(animate);
  }

  btnStart.addEventListener("click", () => {
    if (rafId) cancelAnimationFrame(rafId);
    startTime = 0;
    rafId = requestAnimationFrame(animate);
  });

  btnStop.addEventListener("click", () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    startTime = 0;
    resetVisual();
  });
});
