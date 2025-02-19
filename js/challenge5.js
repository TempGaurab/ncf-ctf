      // Define your custom math problems dynamically
      let score = 0;
      let questionsCompleted = 0;
      let currentQuestionIndex = 0;

      // Function to get letter position in the alphabet
      function getLetterPosition(letter) {
        return letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0) + 1;
      }

      // Math problems with dynamically calculated answers and hints
      const mathProblems = [
        {
          question: "If a = 1, b = 2, What number is c?",
          formula: "c = a + b",
          hint: "Think about the alphabet positions. If 'a' is 1 and 'b' is 2, what position would 'c' be?",
        },
        {
          question: "What number is 'l'?",
          formula: "l",
          hint: "Count through the alphabet: a=1, b=2, c=3... keep going until you reach 'l'",
        },
        {
          question: "What number is 'a'?",
          formula: "a",
          hint: "'a' is the first letter of the alphabet",
        },
        {
          question: "What number is 'i'?",
          formula: "i",
          hint: "Count through the alphabet: a=1, b=2, c=3... until you reach 'i'",
        },
        {
          question: "What number is 'm'?",
          formula: "m",
          hint: "m is in the middle of the alphabet. Count its position: a=1, b=2, c=3...",
        },
        {
          question:
            "What is the sum of the letter positions for the word 'claim'?",
          formula: "claim",
          hint: "Add up the positions of each letter: c=3, l=12, a=1, i=9, m=13",
        },
      ];

      // Function to toggle hint visibility
      function toggleHint() {
        const hint = document.getElementById("hint");
        hint.classList.toggle("hidden");
      }

      // Function to update progress bar
      function updateProgressBar() {
        const progressBar = document.getElementById("progress-bar");
        const progressText = document.getElementById("progress-text");
        const progress =
          questionsCompleted === 6 ? 100 : (questionsCompleted / 6) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.min(
          questionsCompleted + 1,
          6
        )}/6 Questions`;
      }

      // Function to calculate the answer based on the formula
      function calculateAnswer(formula) {
        if (formula === "claim") {
          return ["c", "l", "a", "i", "m"].reduce(
            (sum, letter) => sum + getLetterPosition(letter),
            0
          );
        } else {
          return getLetterPosition(formula);
        }
      }

      // Update the logic to display the current question
      function displayMathProblem() {
        // Check if all questions are completed
        if (questionsCompleted === 6) {
          document.getElementById("math-question").textContent =
            "All questions completed!";
          document.getElementById("answer").disabled = true;
          document.getElementById("submit-button").disabled = true;
          document
            .getElementById("completion-message")
            .classList.remove("hidden");
          document.getElementById("hint").classList.add("hidden");
          updateProgressBar();
          return;
        }

        const problem = mathProblems[currentQuestionIndex];
        document.getElementById(
          "math-question"
        ).innerHTML = `${problem.question} = ?`;
        document.getElementById("hint-text").textContent = problem.hint;
        document.getElementById("answer").value = "";
        document.getElementById("completion-message").classList.add("hidden");
        document.getElementById("hint").classList.add("hidden");
        updateProgressBar();
      }

      // Check the user's answer
      function checkAnswer() {
        const userAnswer = parseInt(document.getElementById("answer").value);
        const correctAnswer = calculateAnswer(
          mathProblems[currentQuestionIndex].formula
        );

        if (userAnswer === correctAnswer) {
          // Increase counter for completed questions
          questionsCompleted++;

          // Check if all questions are completed
          if (questionsCompleted === 6) {
            score++; // Add one point after all questions
            document.getElementById("completion-message").textContent =
              "Write down this number in the fifth box provided to you.";
            displayMathProblem(); // This will show the completion state
          } else {
            // Show intermediate success message
            document.getElementById(
              "completion-message"
            ).textContent = `Correct! Moving to question ${
              currentQuestionIndex + 2
            }/6`;
            document
              .getElementById("completion-message")
              .classList.remove("hidden");

            // Move to the next question after a short delay
            setTimeout(() => {
              currentQuestionIndex++;
              displayMathProblem();
            }, 100);
          }
        } else {
          alert("Incorrect. Try again!");
        }
      }

      // Initialize the page with the first math problem
      document.addEventListener("DOMContentLoaded", () => {
        displayMathProblem();
      });

      // Allow Enter key to submit answer
      document.getElementById("answer").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          checkAnswer();
        }
      });