document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".background-circle");
  const container = document.getElementById("background-container");

  let mouseX = 0;
  let mouseY = 0;

  // Mouse event listener
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Touch event listeners
  document.addEventListener("touchstart", (e) => {
    e.preventDefault();
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  });

  document.addEventListener("touchmove", (e) => {
    e.preventDefault();
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  });

  // When touch ends, keep last position
  document.addEventListener("touchend", () => {
    // Optional: Reset position or keep last known position
  });

  // ...existing animation code...

  function animateCircles() {
    circles.forEach((circle, index) => {
      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Maximum distance circles can move from their original position
      const maxOffset = 200;

      // Reduce speed for subtler movement
      const baseSpeed = 0.1;

      // Add elasticity factor
      const elasticity = 0.2;

      // Calculate new position with elastic constraints
      const offsetX = Math.min(
        Math.max(deltaX * elasticity, -maxOffset),
        maxOffset
      );
      const offsetY = Math.min(
        Math.max(deltaY * elasticity, -maxOffset),
        maxOffset
      );

      // Reverse speed calculation: outer circles (higher index) move faster
      const speed = (baseSpeed * (index + 1)) / circles.length;
      const newX = centerX + offsetX * speed;
      const newY = centerY + offsetY * speed;

      circle.style.transform = `translate(${newX - centerX}px, ${
        newY - centerY
      }px)`;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
});
