let lastMouseX = 0;
let lastMouseY = 0;
let progress = 0; // Represents the progress along the path (0 to 100%)

// Paths for each shape (these can be adjusted as needed)
const paths = {
  triangle: [
    { x: 10, y: 20 }, // Start
    { x: 100, y: 150 }, // First point
    { x: 200, y: 50 }, // Second point
    { x: 300, y: 300 }, // End
  ],
  square: [
    { x: 200, y: 300 },
    { x: 350, y: 200 },
    { x: 450, y: 50 },
    { x: 600, y: 300 },
  ],
  hexagon: [
    { x: 50, y: 400 },
    { x: 150, y: 250 },
    { x: 400, y: 100 },
    { x: 500, y: 450 },
  ],
};

// Function to interpolate between two points
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Function to move each shape along its path
function moveShapeAlongPath(shape, path, progress) {
  // Calculate which two points the shape is between
  const segmentCount = path.length - 1;
  const segmentProgress = progress * segmentCount; // Determine which segment we're in
  const segmentIndex = Math.floor(segmentProgress); // Get the segment index
  const localProgress = segmentProgress - segmentIndex; // Progress within the current segment

  const start = path[segmentIndex];
  const end = path[segmentIndex + 1];

  const newX = lerp(start.x, end.x, localProgress);
  const newY = lerp(start.y, end.y, localProgress);

  shape.style.transform = `translate(${newX}px, ${newY}px)`;
}

document.addEventListener("mousemove", (e) => {
  const currentMouseX = e.clientX;
  const currentMouseY = e.clientY;

  // Calculate mouse movement distance
  const dx = currentMouseX - lastMouseX;
  const dy = currentMouseY - lastMouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Increase progress based on the distance moved
  progress += distance * 0.001; // Adjust speed by changing the multiplier
  if (progress > 1) progress = 1; // Keep progress within bounds
  if (progress < 0) progress = 0;

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
