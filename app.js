document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  shapes.forEach((shape) => {
    const speed = shape.getAttribute("data-speed") || 15;
    const x = (window.innerWidth - mouseX * speed) / 150;
    const y = (window.innerHeight - mouseY * speed) / 150;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});
