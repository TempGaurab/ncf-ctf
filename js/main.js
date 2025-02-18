// Function to update the score after completing all questions
function update_point() {
    if (!pointAwarded) {
      score++; // Give a maximum of 1 point
      pointAwarded = true;
    }
  }

// Function to update the progress bar
function updateProgressBar() {
    let progressPercentage = (questionsCompleted / 5) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-text').textContent = `${questionsCompleted}/5`;
  }

 // Initialize the page with the first math problem
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
  });
   