let lastMouseX = 0;
let lastMouseY = 0;
let moving = false;

document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Detect if the cursor is moving
  if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
    moving = true;
    shapes.forEach((shape) => {
      const speed = shape.getAttribute("data-speed") || 10;
      const x = (window.innerWidth - mouseX * speed) / 100;
      const y = (window.innerHeight - mouseY * speed) / 100;
      const scale = 1 + (mouseX / window.innerWidth) * 0.2;
      shape.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    });

    // Store the last mouse position
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
});

// Stop moving the shapes when the mouse stops moving
document.addEventListener("mouseleave", () => {
  moving = false;
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape) => {
    shape.style.transform = `translate(0, 0) scale(1)`; // Reset to the default position and scale
  });
});
