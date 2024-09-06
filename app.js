document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  shapes.forEach((shape) => {
    // Determine speed and how much the shapes will scale based on cursor position
    const speed = shape.getAttribute("data-speed") || 10;
    const x = (window.innerWidth - mouseX * speed) / 100;
    const y = (window.innerHeight - mouseY * speed) / 100;
    const scale = 1 + (mouseX / window.innerWidth) * 0.2; // Adjust scaling based on cursor position

    // Apply movement and pulsation (scale) to the shapes
    shape.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  });
});
