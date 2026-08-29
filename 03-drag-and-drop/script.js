/** @type {HTMLElement[]} */
const cards = document.querySelectorAll(".card");
/** @type {HTMLElement[]} */
const lists = document.querySelectorAll(".list");

let draggedCard = null;

cards.forEach((card) => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    draggedCard = null;
    card.classList.remove("dragging");
  });
});

lists.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    list.classList.add("over");
  });

  list.addEventListener("dragleave", (e) => {
    list.classList.remove("over");
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();

    if (draggedCard) {
      list.appendChild(draggedCard);
    }

    list.classList.remove("over");
  });
});
