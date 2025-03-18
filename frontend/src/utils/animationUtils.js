import confetti from "canvas-confetti";

export const triggerConfetti = (event) => {
  const { clientX: x, clientY: y } = event;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: x / screenWidth, // Normalize X position (0 to 1)
      y: y / screenHeight, // Normalize Y position (0 to 1)
    },
  });
};

export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};