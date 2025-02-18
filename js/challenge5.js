// Define your custom math problems dynamically
let score = 0;
let questionsCompleted = 0;
let currentQuestionIndex = 0;

// Function to get letter position in the alphabet
function getLetterPosition(letter) {
  return letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

// Math problems with dynamically calculated answers
const mathProblems = [
  { question: "If a = 1, b = 2, What number is c?", formula: "c = a + b" },
  { question: "What number is 'l'?", formula: "l" },
  { question: "What number is 'a'?", formula: "a" },
  { question: "What number is 'i'?", formula: "i" },
  { question: "What number is 'm'?", formula: "m" },
  { question: "What is the sum of the letter positions for the word 'claim'?", formula: "claim" }
];

// Function to calculate the answer based on the formula
function calculateAnswer(formula) {
  if (formula === "claim") {
    // Sum letter positions for the word 'claim'
    return ['c', 'l', 'a', 'i', 'm'].reduce((sum, letter) => sum + getLetterPosition(letter), 0);
  } else {
    // Calculate the letter position for a single letter (like 'a', 'i', 'l', etc.)
    return getLetterPosition(formula);
  }
}

// Update the logic to display the current question
function displayMathProblem() {
  // Check if all questions are completed
  if (questionsCompleted === 6) {
    document.getElementById('math-question').textContent = "All questions completed!";
    document.getElementById('answer').disabled = true;
    document.getElementById('submit-button').disabled = true;
    document.getElementById('completion-message').classList.remove('hidden');
    update_point();
    return;
  }

  const problem = mathProblems[currentQuestionIndex];
  document.getElementById('math-question').innerHTML = `${problem.question} = ?`;
  document.getElementById('answer').value = '';
  document.getElementById('completion-message').classList.add('hidden');
}

// Check the user's answer
function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const correctAnswer = calculateAnswer(mathProblems[currentQuestionIndex].formula);

  if (userAnswer === correctAnswer) {
    // Increase counter for completed questions
    questionsCompleted++;

    // Check if all questions are completed
    if (questionsCompleted === 6) {
      score++; // Add one point after all questions
      document.getElementById('completion-message').textContent = "Write down this number in the fifth box provided to you.";
      displayMathProblem(); // This will show the completion state
    } else {
      // Show intermediate success message
      document.getElementById('completion-message').textContent = `Correct! Moving to question ${currentQuestionIndex + 2}/6`;
      document.getElementById('completion-message').classList.remove('hidden');
      
      // Move to the next question after a short delay
      setTimeout(() => {
        currentQuestionIndex++;
        displayMathProblem();
      }, 100);
    }
  } else {
    alert('Incorrect. Try again!');
  }
}

// Initialize the page with the first math problem
document.addEventListener('DOMContentLoaded', () => {
  displayMathProblem();
});

// Allow Enter key to submit answer
document.getElementById('answer').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});
