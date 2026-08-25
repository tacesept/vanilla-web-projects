/**
 *
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
const $ = (selector) => document.querySelector(selector);

const QUESTIONS = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

const RESULT_MESSAGES = [
  {
    minimumPercentage: 100,
    message: "Perfect! You're a genius!",
  },
  {
    minimumPercentage: 80,
    message: "Great job! You know your stuff!",
  },
  {
    minimumPercentage: 60,
    message: "Good effort! Keep learning!",
  },
  {
    minimumPercentage: 40,
    message: "Not bad! Try again to improve!",
  },
  {
    minimumPercentage: 0,
    message: "Keep studying! You'll get better!",
  },
];

const state = {
  currentQuestionIndex: 0,
  score: 0,
  answersDisabled: false,
  nextQuestionTimer: null,
  questionCount: QUESTIONS.length,
};

function initializeQuiz() {
  $(".total-questions").textContent = state.questionCount;

  $(".start-btn").addEventListener("click", startQuiz);
  $(".restart-btn").addEventListener("click", startQuiz);
  $(".answers-container").addEventListener("click", handleAnswerSelection);
}

function startQuiz() {
  resetState();
  showScreen(".quiz-screen");
  renderQuestion();
}

function resetState() {
  clearTimeout(state.nextQuestionTimer);

  state.currentQuestionIndex = 0;
  state.score = 0;
  state.answersDisabled = false;

  $(".score").textContent = "0";
  $(".progress").style.width = "0%";
}

function renderQuestion() {
  state.answersDisabled = false;
  const { question, answers } = QUESTIONS[state.currentQuestionIndex];

  $("#question-text").textContent = question;

  $(".answers-container").innerHTML = answers
    .map((answer, index) => {
      return `<button class="answer-btn" data-index="${index}">${answer.text}</button>`;
    })
    .join("");

  const percentage =
    ((state.currentQuestionIndex + 1) / state.questionCount) * 100;
  $(".progress").style.width = `${percentage}%`;
  $(".progress-bar").setAttribute(
    "aria-valuenow",
    String(Math.round(percentage)),
  );
}

/**
 *
 * @param {Event & {target: HTMLElement}} event
 */
function handleAnswerSelection(event) {
  /** @type {HTMLButtonElement} */
  const clickedBtn = event.target.closest(".answer-btn");
  if (!clickedBtn || state.answersDisabled) return;

  state.answersDisabled = true;

  const { answers } = QUESTIONS[state.currentQuestionIndex];
  const clickedIndex = parseInt(clickedBtn.dataset.index, 10);
  const isCorrect = answers[clickedIndex].correct === true;

  Array.from($(".answers-container").children).forEach((btn) => {
    const buttonIndex = parseInt(btn.dataset.index, 10);
    const isThisBtnCorrect = answers[buttonIndex].correct === true;

    if (isThisBtnCorrect) {
      btn.classList.add("correct");
    } else if (btn === clickedBtn) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    state.score++;
    $(".score").textContent = state.score;
  }

  state.nextQuestionTimer = setTimeout(() => {
    state.currentQuestionIndex++;

    if (state.currentQuestionIndex < state.questionCount) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  showScreen(".result-screen");

  $(".final-score").textContent = state.score;
  const percentage = (state.score / state.questionCount) * 100;
  $(".result-message").textContent = RESULT_MESSAGES.find(
    ({ minimumPercentage }) => percentage >= minimumPercentage,
  ).message;
}

/**
 *
 * @param {string} screenName
 */
function showScreen(screenName) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.querySelector(screenName).classList.add("active");
}
initializeQuiz();
