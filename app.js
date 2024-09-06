let lastMouseX = 0;
let lastMouseY = 0;
let progress = 0;

// Paths for each shape - these are fixed coordinates the shapes will follow
const paths = {
  triangle: [
    { x: 0, y: window.innerHeight }, // Bottom-left start
    { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Center
    { x: window.innerWidth, y: 0 }, // Top-right
  ],
  square: [
    { x: window.innerWidth, y: 0 }, // Top-right start
    { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Center
    { x: 0, y: window.innerHeight }, // Bottom-left
  ],
  hexagon: [
    { x: 0, y: 0 }, // Top-left start
    { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Center
    { x: window.innerWidth, y: window.innerHeight }, // Bottom-right
  ],
};

// Function to interpolate between two points
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Function to move each shape along its path
function moveShapeAlongPath(shape, path, progress) {
  const segmentCount = path.length - 1;
  const segmentProgress = progress * segmentCount; // Determine which segment we're in
  const segmentIndex = Math.floor(segmentProgress); // Get the segment index
  const localProgress = segmentProgress - segmentIndex; // Progress within the current segment

  const start = path[segmentIndex];
  const end = path[segmentIndex + 1];

  const newX = lerp(start.x, end.x, localProgress);
  const newY = lerp(start.y, end.y, localProgress);

  shape.style.transform = `translate(${newX}px, ${newY}px) scale(${
    1 + localProgress * 0.2
  })`;
}

document.addEventListener("mousemove", (e) => {
  const currentMouseX = e.clientX;
  const currentMouseY = e.clientY;

  const dx = currentMouseX - lastMouseX;
  const dy = currentMouseY - lastMouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Increase progress based on the distance moved
  progress += distance * 0.001; // Adjust speed by changing the multiplier
  if (progress > 1) progress = 0; // Loop the movement

  // Move shapes along their respective paths
  moveShapeAlongPath(
    document.querySelector(".triangle"),
    paths.triangle,
    progress
  );
  moveShapeAlongPath(document.querySelector(".square"), paths.square, progress);
  moveShapeAlongPath(
    document.querySelector(".hexagon"),
    paths.hexagon,
    progress
  );

  // Update last mouse position
  lastMouseX = currentMouseX;
  lastMouseY = currentMouseY;
});
