const questions = [
    {
      item: "Banana (medium)",
      calories: 105,
      hint: "A medium banana is about 7-8 inches long. Think about its natural sugar content!"
    },
    {
      item: "Plain Bagel",
      calories: 245,
      hint: "This is made primarily of refined flour. Consider its dense nature!"
    },
    {
      item: "Chicken Caesar Salad",
      calories: 440,
      hint: "Remember to consider the dressing, croutons, and parmesan cheese!"
    },
    {
      item: "Slice of Pepperoni Pizza",
      calories: 285,
      hint: "Consider the cheese, meat, and bread components."
    },
    {
      item: "Chocolate Chip Cookie (large)",
      calories: 180,
      hint: "Think about the butter, sugar, and chocolate chips!"
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    // If we're on question 5 (index 4), set progress to 100%, otherwise calculate normally
    const progress = currentQuestion === 4 ? 100 : ((currentQuestion) / 5) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion + 1}/5 Questions`;
}

function displayQuestion() {
    document.getElementById('current-question').innerHTML = `
      <p class="text-lg">How many calories are in:</p>
      <p class="text-2xl font-bold text-green-400 mt-2">${questions[currentQuestion].item}</p>
    `;
    document.getElementById('progress').innerText = `Question ${currentQuestion + 1} of 5`;
    document.getElementById('hint-text').innerText = questions[currentQuestion].hint;
    document.getElementById('calorie-answer').value = '';
    document.getElementById('feedback-message').classList.add('hidden');
    updateProgressBar();
}

function toggleHint() {
    const hint = document.getElementById('hint');
    hint.classList.toggle('hidden');
}

function checkAnswer() {
    const answer = parseInt(document.getElementById('calorie-answer').value);
    const correctAnswer = questions[currentQuestion].calories;
    const feedback = document.getElementById('feedback-message');
    
    // Check if answer is within 20 calories of the correct answer
    const difference = Math.abs(answer - correctAnswer);
    
    if (difference <= 20) {
      correctAnswers++;
      feedback.classList.remove('hidden', 'bg-red-400/10', 'text-red-400');
      feedback.classList.add('bg-green-400/10', 'text-green-400');
      feedback.innerHTML = `Correct! ${questions[currentQuestion].item} has ${correctAnswer} calories. You were off by ${difference} calories.`;
      
      if (currentQuestion < 4) {
        currentQuestion++;
        setTimeout(displayQuestion, 2000);
      } else {
        if (correctAnswers === 5) {
          setTimeout(() => {
            document.getElementById('completion-message').classList.remove('hidden');
          }, 1000);
        }
      }
    } else {
      feedback.classList.remove('hidden', 'bg-green-400/10', 'text-green-400');
      feedback.classList.add('bg-red-400/10', 'text-red-400');
      feedback.innerHTML = `Try again! Your guess was ${answer > correctAnswer ? 'too high' : 'too low'} by some calories.`;
    }
}

// Initialize first question
displayQuestion();