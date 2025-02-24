const questions = [
    {
        id: 1,
        question: "What is the last 4 digits of the phone number for NKU's Health, Counseling and Student Wellness center? (Format 1234)",
        answer: "5650",
        hint: "Check the NKU Health Services website or call the main campus number for assistance."
    },
    {
        id: 2,
        question: "Where is the Health, Counseling and Student Wellness center located on campus?",
        answer: "UC 440",
        hint: "It's located in the University Center (UC) building. Please write down a space between the building number and room number."
    },
    {
        id: 3,
        question: "How many free counseling sessions are available to NKU students per academic year?",
        answer: "10",
        hint: "The number is between 5 and 15 sessions."
    },
    {
        id: 4,
        question: "How many dimensionsn of wellness is there?",
        answer: "10",
        hint: "The number is between 5 and 15 as well."
    }
];

let currentQuestionIndex = 0;
let completedQuestions = new Set(); // Using Set for better uniqueness handling

function initializeQuiz() {
    updateQuestion();
    updateProgressBar();
}

function updateQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('mental-health-question').textContent = currentQuestion.question;
    document.getElementById('hint-text').textContent = currentQuestion.hint;
    document.getElementById('mental-health-answer').value = '';
    document.getElementById('completion-message').classList.add('hidden');
}

function updateProgressBar() {
    const progress = Math.floor((completedQuestions.size / questions.length) * 100);
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function toggleHint() {
    const hint = document.getElementById('hint');
    hint.classList.toggle('hidden');
}

function checkMentalHealthAnswer() {
    const answer = document.getElementById('mental-health-answer').value;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        completedQuestions.add(currentQuestion.id);
        
        if (completedQuestions.size === questions.length) {
            showFinalCompletion();
            updateProgressBar(); // Update progress bar one final time
        } else {
            showSuccessMessage();
            setTimeout(() => {
                currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
                while (completedQuestions.has(questions[currentQuestionIndex].id) && completedQuestions.size < questions.length) {
                    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
                }
                updateQuestion();
                updateProgressBar();
            }, 1500);
        }
    } else {
        showErrorMessage();
    }
}

function showSuccessMessage() {
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerHTML = `
        <div class="bg-green-400/10 border border-green-400 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-green-400 font-bold">Correct!</h4>
                    <p class="text-gray-300 text-sm">Moving to next question...</p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showFinalCompletion() {
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerHTML = `
        <div class="bg-green-400/10 border border-green-400 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-green-400 font-bold">Quiz Completed!</h4>
                    <p class="text-gray-300 text-sm">
                        Congratulations! You've completed all questions about NKU's health resources.
                        Please write down "Healthy" in the second blank provided to you.
                    </p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showErrorMessage() {
    alert("That's not quite right. Try again!");
}

// Initialize the quiz when the page loads
window.onload = initializeQuiz;