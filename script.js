// Quiz questions and answers, using const to ensure they are not changeable.
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "High Tech Machine Learning", "Hyper Transferable Module Language", "Home Tool Management Language"],
        correctAnswer: 0
    },
    {
        question: "what does SQL stand for?",
        choices: ["Structured Query Language", "Sequential Query Language", "Simple Question Language", "Syntax Query Language"],
        correctAnswer: 0
    },
    {
        question: "What does MVC stand for in the context of web development?",
        choices: ["Model View Controller", "Multiple View Control", "Model Visual Component", "Multifunctional View Controller"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a programming language?",
        choices: ["HTML", "CSS", "JavaScript", "XML"],
        correctAnswer: 2
    },
    {
        question: "Which of the following terms are JavaScript syntax?",
        choices: [
            "If-else",
            "Who-else",
            "When-else",
            "Where-else"
        ],
        correctAnswer: [0]
    }
];

let remainingTime = 0;
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLimitInSeconds = 60; // This let will reset to 60 seconds for each quiz.

// Connecting JS to grab HTML elements
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const timerContainer = document.getElementById('timer-container');
const saveScoreContainer = document.getElementById('save-score-container');
const initialsInput = document.getElementById('initials-input');
const submitBtn = document.getElementById('submit-btn');
const backBtn = document.getElementById('back-btn');

// Click event for the start button.
startBtn.addEventListener('click', startQuiz);

// Function so the quiz can begin.
function startQuiz() {
    startBtn.style.display = 'none';
    quizContainer.style.display = 'block';

    // This is a display for question and timer.
    showQuestion();
    startTimer();
}

// This function will show the questions, currentQuestionIndex ensures the questions go in the order they are entered in.
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    clearChoiceButtons();

    // New buttons for the choices.
    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.textContent = choice;
        choiceBtn.className = 'choice-btn';
        choiceBtn.addEventListener('click', () => checkAnswer(index));
        document.getElementById('quiz-container').appendChild(choiceBtn);
    });
}

// This function will clear existing choice buttons.
function clearChoiceButtons() {
    const quizContainer = document.getElementById('quiz-container');
    const existingButtons = document.querySelectorAll('.choice-btn');
    
    existingButtons.forEach(button => {
        quizContainer.removeChild(button);
    });
}

// This function will check the answer to see if they're correct.
function checkAnswer(choiceIndex) {
    console.log(`Checking answer for index ${choiceIndex}`);
    console.log(`Before time deduction: timeLimitInSeconds = ${timeLimitInSeconds}`);
    
    // If statement checks to see if there is a valid currentQuestion.
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        if (choiceIndex === currentQuestion.correctAnswer) {
            score++;
        } else {
            timeLimitInSeconds -= 10;
            if (timeLimitInSeconds < 0) {
                timeLimitInSeconds = 0;
            }
        }

        console.log(`Current question: ${currentQuestion.question}`);
        console.log(`Score: ${score}`);
        console.log(`Remaining time: ${timeLimitInSeconds}`);
        
        // If answer is correct, test moves to next question.
        currentQuestionIndex++;

        console.log(`After moving to the next question: currentQuestionIndex = ${currentQuestionIndex}`);

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    } else {
        // Handle the scenario when all questions are answered
        console.log("All questions answered");
        endQuiz();
    }
}
  

// This function starts the timer countdown.
function startTimer() {
    let timeRemaining = timeLimitInSeconds;
    timerContainer.textContent = `Time: ${timeRemaining}s`;

    // Interval function updates the timer every second (1000 milliseconds).
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            endQuiz();
        } else {
            timeRemaining--;
            timerContainer.textContent = `Time: ${timeRemaining}s`;
        }
    }, 1000);
}

// This end function will end the quiz.
function endQuiz() {
    clearInterval(timer);

    const initialTime = 60;
    const elapsedTime = timeLimitInSeconds;
    const remainingTime = Math.max(0, initialTime - elapsedTime);

    quizContainer.style.display = 'none';
    resultContainer.textContent = `Quiz Over! Your score is ${remainingTime}s`;
    
    saveScoreContainer.style.display = 'block';
}

// This is a click event for the submit button.
submitBtn.addEventListener('click', saveScore);

// Click event for the back button.
backBtn.addEventListener('click', () => {
    saveScoreContainer.style.display = 'none';
    startBtn.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    timeLimitInSeconds = 60;
});

// This function will save the score.
function saveScore() {
    const initials = initialsInput.value.toUpperCase(); // Convert to uppercase for consistency
    console.log(`Initials: ${initials}, Score: ${score}`);

    resultContainer.textContent = `Quiz Over! Your score is ${remainingTime}s - ${initials}`;
   
    saveScoreContainer.style.display = 'none';
    startBtn.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    timeLimitInSeconds = 60;
}

  