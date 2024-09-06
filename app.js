let lastMouseX = 0;
let lastMouseY = 0;
let lastMoveTime = Date.now();

document.addEventListener("mousemove", (e) => {
  const currentMouseX = e.clientX;
  const currentMouseY = e.clientY;
  const currentTime = Date.now();

  const dx = currentMouseX - lastMouseX;
  const dy = currentMouseY - lastMouseY;
  const dt = currentTime - lastMoveTime;

  const speed = (Math.sqrt(dx * dx + dy * dy) / dt) * 100; // Speed based on mouse movement

  // Update shapes positions and sizes based on speed
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const shapeSpeed = speed * (index + 1); // Make each shape move at a different speed

    // Calculate new positions
    const currentX = parseFloat(getComputedStyle(shape).left);
    const currentY = parseFloat(getComputedStyle(shape).top);
    const newX = currentX + dx * shapeSpeed * 0.05;
    const newY = currentY + dy * shapeSpeed * 0.05;

    // Apply movement and scaling
    shape.style.left = `${newX}px`;
    shape.style.top = `${newY}px`;
    shape.style.transform = `scale(${1 + speed * 0.001})`; // Scale the shape slightly
  });

  // Update last mouse position and time
  lastMouseX = currentMouseX;
  lastMouseY = currentMouseY;
  lastMoveTime = currentTime;
});
