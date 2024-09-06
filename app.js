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

  const speed = (Math.sqrt(dx * dx + dy * dy) / dt) * 50; // Slower speed

  // Get screen dimensions to prevent shapes from moving outside
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Update shapes positions and sizes based on speed
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const shapeSpeed = speed * (index + 1); // Make each shape move at a different speed

    // Get current position of the shape
    const currentX = parseFloat(getComputedStyle(shape).left);
    const currentY = parseFloat(getComputedStyle(shape).top);

    // Calculate new position
    let newX = currentX + dx * shapeSpeed * 0.01;
    let newY = currentY + dy * shapeSpeed * 0.01;

    // Prevent shapes from going off screen by setting boundaries
    const shapeWidth = shape.offsetWidth;
    const shapeHeight = shape.offsetHeight;

    if (newX < 0) newX = 0; // Don't go left outside the screen
    if (newX + shapeWidth > screenWidth) newX = screenWidth - shapeWidth; // Don't go right outside the screen

    if (newY < 0) newY = 0; // Don't go above the screen
    if (newY + shapeHeight > screenHeight) newY = screenHeight - shapeHeight; // Don't go below the screen

    // Apply movement and scaling (scale will be subtle now)
    shape.style.left = `${newX}px`;
    shape.style.top = `${newY}px`;
    shape.style.transform = `scale(${1 + speed * 0.005})`; // Subtle scaling
  });

  // Update last mouse position and time
  lastMouseX = currentMouseX;
  lastMouseY = currentMouseY;
  lastMoveTime = currentTime;
});
