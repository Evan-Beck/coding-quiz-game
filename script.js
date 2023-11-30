// Quiz questions and answers, using const to ensure they are not changeable.
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Meow", "Woof", "Hello mate", "Nothing"],
        correctAnswer: 0
    },
{
    question: "what does SQL stand for?",
    choices: ["structured Query Language", "Sequential Query Language", "Simple Question Language", "Syntax Query Language"],
    correctAnswer: 0
},
{
    question: "What does MVC stand for in the context of web development?",
    choices: ["Model View Controller", "Multiple View Control", "Model Visual Component", "Multifunctional View Controller"],
    correctAnswer: 0
  }
];

let currentQuestionsIndex = 0;
let score = 0;
let timer;
const timeLimitInSeconds = 60;

// Connecting JS to grab HTML elements
const startBtn = document.getElementById('start-btn');
const quizContainer =document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');

// Click event for the start button
startBtn.addEventListener('click', startQuiz);

// Function so the quiz can be started
function startQuiz() {
    startBtn.style.display ='none';
    quizContainer.style.display = 'block';

    // Display for question and timer
    showQuestion();
    startTimer();
}