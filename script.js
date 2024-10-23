const questions = [
    { question: "What is 4 + 7?", answers: ["9", "11", "7"], correct: "11"},
    { question: "What is the national game of Canada?", answers: [ "Ice Hockey", "Baseball", "Volleyball"], correct: "Ice Hockey" },
    { question: "Which is the largest bone in the body?", answers: ["hip", "Femur", "Osmium"], correct: "Femur" },
    { question: "What is the capital city of Canada?", answers: ["Brunswick", " Malton", "Ottawa", "Brampton"], correct: "Ottawa" },
];

let score = 0;
let currentQuestion = 0;

const fakeAuth = { username: "Gurpreet", password: "4737" };

function startQuiz() {
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<p>${questions[currentQuestion].question}</p>`;
    
    questions[currentQuestion].answers.forEach(answer => {
        questionContainer.innerHTML += `<label><input type="radio" name="answer" value="${answer}">${answer}</label><br>`;
    });

    document.getElementById("question-counter").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = percentage + "%";
}

document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    if (selectedAnswer.value === questions[currentQuestion].correct) {
        score++;
        document.getElementById("result").innerHTML = "<p class='correct'>Correct!</p>";
    } else {
        document.getElementById("result").innerHTML = "<p class='incorrect'>Incorrect! The correct answer was " + questions[currentQuestion].correct + ".</p>";
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("result").innerHTML += `<p>Your final score is ${score} out of ${questions.length}.</p>`;
    }
});

function authenticate() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    if (username === fakeAuth.username && password === fakeAuth.password) {
        startQuiz();
    } else {
        alert("Invalid credentials! Please try again.");
        authenticate(); 
    }
}

authenticate();
