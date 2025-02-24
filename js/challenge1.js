const questions = [
    {
        id: 1,
        question: "What programming language is primarily used for data analysis in the NKU Data Science Club?",
        answer: "Python",
        hint: "This language is named after a snake."
    },
    {
        id: 2,
        question: "How many challenges are in this hunt! ",
        answer: "8",
        hint: "More than 5 for sure!"
    },
    {
        id: 3,
        question: "What is the first name of the president of NKU?",
        answer: "Cady",
        hint: "ydac! the other way around!"
    },
    {
        id: 4,
        question: "How many E-Board members are there in this group!",
        answer: "5",
        hint: "This is a single digit number."
    }
];

let currentQuestionIndex = 0;
let completedQuestions = new Set();

function initializeQuiz() {
    updateQuestion();
    updateProgressBar();
}

function updateQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('yoga-question').textContent = currentQuestion.question;
    document.getElementById('hint-text').textContent = currentQuestion.hint;
    document.getElementById('yoga-answer').value = '';
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

function checkYogaAnswer() {
    const answer = document.getElementById('yoga-answer').value;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        completedQuestions.add(currentQuestion.id);
        
        if (completedQuestions.size === questions.length) {
            showFinalCompletion();
            updateProgressBar();
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
        <div class="bg-purple-400/10 border border-purple-400 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-purple-400 font-bold">Good!</h4>
                    <p class="text-gray-300 text-sm">Correct answer! Moving to the next question...</p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showFinalCompletion() {
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerHTML = `
        <div class="bg-purple-400/10 border border-purple-400 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-purple-400 font-bold">Journey Completed!</h4>
                    <p class="text-gray-300 text-sm">
                        Congratulations! You've mastered all the basics of our club.
                        Please write down "Data" in the first blank provided to you.
                    </p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showErrorMessage() {
    alert("That's not quite right. Take a deep breath and try again!");
}

// Initialize the quiz when the page loads
window.onload = initializeQuiz;