let lastMouseX = 0;
let lastMouseY = 0;
let isMoving = false;

document.addEventListener("mousemove", (e) => {
  const currentMouseX = e.clientX;
  const currentMouseY = e.clientY;

  // Calculate how far the mouse has moved since the last event
  const dx = currentMouseX - lastMouseX;
  const dy = currentMouseY - lastMouseY;

  // Only move the shapes if there is actual mouse movement
  if (dx !== 0 || dy !== 0) {
    isMoving = true;

    const shapes = document.querySelectorAll(".shape");

    shapes.forEach((shape, index) => {
      // Each shape moves at a different speed
      const speedFactor = (index + 1) * 0.05;
      const currentX = parseFloat(getComputedStyle(shape).left);
      const currentY = parseFloat(getComputedStyle(shape).top);

      // Calculate new positions, ensuring gentle movement
      let newX = currentX + dx * speedFactor;
      let newY = currentY + dy * speedFactor;

      // Get the shape's dimensions and the screen size
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const shapeWidth = shape.offsetWidth;
      const shapeHeight = shape.offsetHeight;

      // Make sure the shapes stay within screen bounds
      if (newX < 0) newX = 0;
      if (newX + shapeWidth > screenWidth) newX = screenWidth - shapeWidth;
      if (newY < 0) newY = 0;
      if (newY + shapeHeight > screenHeight) newY = screenHeight - shapeHeight;

      // Apply the new positions to the shapes
      shape.style.left = `${newX}px`;
      shape.style.top = `${newY}px`;
    });

    // Update the last mouse position
    lastMouseX = currentMouseX;
    lastMouseY = currentMouseY;
  } else {
    isMoving = false;
  }
});
