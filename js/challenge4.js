// Define your score and completion tracker
let score = 0;
let questionCompleted = false;
let holymoly = "A"
function mystifyAlgorithm(inputStr) {
    // Step 1: Obtain the ASCII value of the character and perform a transformation
    let rA = inputStr.charCodeAt(0);
    let rB = rA + 1;
    
    // Step 2: Convert the ASCII values back into characters
    let rC = String.fromCharCode(rB);
    
    // Step 3: Build the final string
    let intermediary = inputStr + rC + "+";
    // Step 4: Return the final output
    return intermediary;
}
holymoly = mystifyAlgorithm(holymoly);

// Define the single blood group problem
const bloodGroupProblem = {
  question: "John's mom has the blood group AB+ and John's dad has the blood group AB+. What will be the blood group of John?",
  correctAnswer: holymoly // Based on the provided logic
};

// Function to display the problem
function displayBloodGroupProblem() {
  document.getElementById('bio-question').innerHTML = `${bloodGroupProblem.question} = ?`;
  document.getElementById('bio-answer').value = '';
  document.getElementById('completion-message').classList.add('hidden');
}

// Function to check if the user's answer is correct
function checkBioAnswer() {
  const userAnswer = document.getElementById('bio-answer').value.trim().toUpperCase();
  const correctAnswer = bloodGroupProblem.correctAnswer.toUpperCase();

  if (userAnswer === correctAnswer) {
    // If correct, update score and show completion message
    score++;
    questionCompleted = true;
    document.getElementById('completion-message').textContent = "Correct! You've completed the question. Write down the answer(AB+) in the fourth box provided!";
    document.getElementById('completion-message').classList.remove('hidden');
  } else {
    alert('Incorrect. Try again!');
  }
}

// Initialize the page with the question
document.addEventListener('DOMContentLoaded', () => {
  displayBloodGroupProblem();
});

// Allow Enter key to submit answer
document.getElementById('bio-answer').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    checkBloodGroupAnswer();
  }
});
