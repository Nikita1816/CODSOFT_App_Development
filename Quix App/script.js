document.addEventListener("DOMContentLoaded", function () {
    const quizData = [
    { question: "When did India get independence?", options: ["1945", "1947", "1950", "1952"], answer: 1 },
    { question: "👤 Who is the Prime Minister of India (2024)?", options: ["Rahul Gandhi", "Amit Shah", "Narendra Modi", "Yogi Adityanath"], answer: 2 },
    { question: "🌍 What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: 1 },
    { question: "🔢 How many states are there in India?", options: ["28", "29", "30", "31"], answer: 0 },
    { question: "Which is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Leopard"], answer: "Tiger" },
    { question: "Which is the national bird of India?", options: ["Sparrow", "Peacock", "Eagle", "Parrot"], answer: "Peacock" },
    { question: "Which is the national flower of India?", options: ["Rose", "Lotus", "Marigold", "Sunflower"], answer: "Lotus" },
    { question: "Which river is called the Ganga of the South?", options: ["Krishna", "Godavari", "Kaveri", "Yamuna"], answer: "Kaveri" },
    { question: "Who was the first President of India?", options: ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Dr. S. Radhakrishnan", "Mahatma Gandhi"], answer: "Dr. Rajendra Prasad" },
    { question: "Which monument is called the Symbol of Love?", options: ["Red Fort", "Qutub Minar", "Taj Mahal", "India Gate"], answer: "Taj Mahal" },
    { question: "Which sport is known as the national sport of India?", options: ["Cricket", "Hockey", "Football", "Badminton"], answer: "Hockey" },
    { question: "Who wrote the Indian National Anthem?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhash Chandra Bose"], answer: "Rabindranath Tagore" },
    { question: "Which is the national currency of India?", options: ["Dollar", "Rupee", "Euro", "Yen"], answer: "Rupee" },
    { question: "Which is the longest river in India?", options: ["Ganga", "Brahmaputra", "Yamuna", "Godavari"], answer: "Ganga" },
    { question: "Who is known as the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Sardar Patel", "Subhash Chandra Bose", "Mahatma Gandhi"], answer: "Mahatma Gandhi" },
    { question: "Which festival is known as the Festival of Lights?", options: ["Holi", "Diwali", "Eid", "Christmas"], answer: "Diwali" },
    { question: "Which is the smallest state in India?", options: ["Goa", "Sikkim", "Tripura", "Manipur"], answer: "Goa" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "N2"], answer: "H2O" },
    { question: "Which is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Nanga Parbat"], answer: "Mount Everest" },
    { question: "🏛️ Where is the Taj Mahal located?", options: ["Jaipur", "Delhi", "Agra", "Mumbai"], answer: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
    let currentQuestion = quizData[currentQuestionIndex];

    // Set question text
    questionEl.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Create buttons for options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    // Hide result text and next button
    resultEl.textContent = "";
    nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    let correctIndex = quizData[currentQuestionIndex].answer;
    let optionButtons = document.querySelectorAll(".option");

    // Disable all buttons after selection
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        optionButtons[selectedIndex].style.backgroundColor = "#00c853"; // Green for correct
        resultEl.textContent = "✅ Correct!";
        score++;
    } else {
        optionButtons[selectedIndex].style.backgroundColor = "#d32f2f"; // Red for wrong
        optionButtons[correctIndex].style.backgroundColor = "#00c853"; // Highlight correct answer
        resultEl.textContent = "❌ Wrong!";
    }

    // Show next button
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        questionEl.textContent = `🎉 Quiz Completed! Your Score: ${score}/${quizData.length}`;
        optionsContainer.style.display = "none";
        nextBtn.style.display = "none";
    }
}

// Load first question on start
loadQuestion();

// Next button event listener
nextBtn.addEventListener("click", nextQuestion);
});
