const cases = [
    {
        id: 1,
        question: "A wealthy businessman, James Sterling, was found dead in his study at 42 Maple Drive. The medical examiner found traces of poison in his evening tea. What time was the body discovered, according to the grandfather clock in the study? The maid reported us with a time of 11:45 pm. (Format: HH:MM, 24-hour time)",
        answer: "23:45",
        hint: "The maid mentioned the clock stopped when she heard a loud thud from the study. The hands haven't moved since."
    },
    {
        id: 2,
        question: "Three suspects were in the mansion at the time of death: the maid (Emma), the business partner (Thomas), and the victim's wife (Sarah). Security footage shows one of them entering the study at 23:15. The detective noted in their report that a golden brooch was clearly visible on the suspect's clothing. What was this distinctive item? (One word)",
        answer: "Brooch",
        hint: "The security footage was grainy, but a circular golden object was clearly visible on the suspect's lapel, catching the light as they moved."
    },
    {
        id: 3,
        question: "Upon searching the suspects' rooms, Detective Morris discovered a partially burned receipt. In his notes, he wrote: 'Receipt from Morton's Antiques, dated two days before the murder. Item purchased: Vintage Tea Set with Golden Trim - $___. It is the the midpoint of $50 and $100.' What was the price paid for this item? (Format: $XX)",
        answer: "$75",
        hint: "The receipt was partially burned, but the total amount remained visible. The item was listed as 'Vintage Tea Set with Golden Trim.'"
    },
    {
        id: 4,
        question: "The evidence is clear: The body was found at 23:45, the security footage shows someone wearing a family heirloom brooch entering at 23:15, and Sarah Sterling's credit card was used to purchase the tea set from Morton's Antiques. Who killed James Sterling? (First name only)",
        answer: "Sarah",
        hint: "Consider: Who would have access to both the study and James's evening tea? The brooch was a family heirloom, and the receipt shows premeditation."
    }
];

let currentCaseIndex = 0;
let solvedCases = new Set();

function initializeInvestigation() {
    updateCase();
    updateProgressBar();
}

function updateCase() {
    const currentCase = cases[currentCaseIndex];
    document.getElementById('case-question').textContent = currentCase.question;
    document.getElementById('hint-text').textContent = currentCase.hint;
    document.getElementById('case-answer').value = '';
    document.getElementById('completion-message').classList.add('hidden');
}

function updateProgressBar() {
    const progress = Math.floor((solvedCases.size / cases.length) * 100);
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `Case File ${currentCaseIndex + 1} of ${cases.length}`;
}

function toggleHint() {
    const hint = document.getElementById('hint');
    hint.classList.toggle('hidden');
}

function checkCaseAnswer() {
    const answer = document.getElementById('case-answer').value;
    const currentCase = cases[currentCaseIndex];
    
    if (answer.toLowerCase() === currentCase.answer.toLowerCase()) {
        solvedCases.add(currentCase.id);
        
        if (solvedCases.size === cases.length) {
            showFinalResolution();
            updateProgressBar();
        } else {
            showSuccessMessage();
            setTimeout(() => {
                currentCaseIndex = (currentCaseIndex + 1) % cases.length;
                while (solvedCases.has(cases[currentCaseIndex].id) && solvedCases.size < cases.length) {
                    currentCaseIndex = (currentCaseIndex + 1) % cases.length;
                }
                updateCase();
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
        <div class="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-red-500 font-bold">Breakthrough!</h4>
                    <p class="text-gray-300 text-sm">Excellent deduction. Moving to next case file...</p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showFinalResolution() {
    const completionMessage = document.getElementById('completion-message');
    completionMessage.innerHTML = `
        <div class="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <div class="flex items-center space-x-3">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h4 class="text-red-500 font-bold">Cases Closed!</h4>
                    <p class="text-gray-300 text-sm">
                        Exceptional work, Detective. All cases have been solved.
                        Write "Sleuth" in the sixth blank space provided.
                    </p>
                </div>
            </div>
        </div>
    `;
    completionMessage.classList.remove('hidden');
}

function showErrorMessage() {
    alert("The evidence doesn't support that conclusion. Review the facts and try again.");
}

// Initialize the investigation when the page loads
window.onload = initializeInvestigation;