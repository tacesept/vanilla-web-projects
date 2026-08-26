const generateBtn = document.querySelector(".generate-btn");
const colorCards = document.querySelectorAll(".color-card");

// Generate button
generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
  colorCards.forEach((card) => {
    const color = generateRandomColor();

    card.querySelector(".color-preview").style.backgroundColor = color;
    card.querySelector(".hex").textContent = color;
  });
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

// copy button
colorCards.forEach((card) => {
  const preview = card.querySelector(".color-preview");
  const copyBtn = card.querySelector(".copy-btn");

  preview.addEventListener("click", () => {
    copyColor(card);
  });
  copyBtn.addEventListener("click", () => {
    copyColor(card);
  });
});

async function copyColor(card) {
  const hex = card.querySelector(".hex").textContent;

  try {
    await navigator.clipboard.writeText(hex);

    const button = card.querySelector(".copy-btn");
    const icon = button.querySelector("i");

    icon.classList.remove("fa-copy", "far");
    icon.classList.add("fa-check", "fas");
    icon.style.color = "#48bb78";

    setTimeout(() => {
      icon.classList.remove("fa-check", "fas");
      icon.classList.add("fa-copy", "far");
      icon.style.color = "";
    }, 1000);
  } catch (error) {
    console.error("Failed to copy color:", error);
  }
}
