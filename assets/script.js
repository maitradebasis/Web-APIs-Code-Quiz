document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('start-btn');
    const questionContainer = document.getElementById('question-container');
    const timerElement = document.getElementById('time');
    const scoreForm = document.getElementById('score-form');
    let timer;
    let timeLeft = 60; // set the initial time
  
    const quizQuestions = [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'],
        correctAnswer: "Hyper Text Markup Language"
      },
      {question: "what does CSS stand for?",
      options: ["Community Styling Sheet", "Cascading Style Sheet", "Coding Style Sheet", "Common Stle Sheet"],
      correctAnswer: "Cascading Style Sheet"}
    ];
  
    let currentQuestionIndex = 0;
    let userScore = 0;
  
    startBtn.addEventListener('click', startQuiz);
  
    function startQuiz() {
      startBtn.disabled = true;
      displayQuestion();
      timer = setInterval(updateTimer, 1000);
    }
  
    function displayQuestion() {
      const currentQuestion = quizQuestions[currentQuestionIndex];
    //   questionContainer.innerHTML = `
    //     <h2>${currentQuestion.question}</h2>
    //     ${currentQuestion.options.map((option, index) => `
    //       <button onclick="checkAnswer(${index})">${option}</button>
    //     `).join('')}
    //   `;
    questionContainer.innerHTML=""
    var question=document.createElement("h2")
    question.innerHTML=currentQuestion.question
    questionContainer.appendChild(question)
    currentQuestion.options.forEach ((option, index) => {
        var button=document.createElement("button")
        button.innerHTML=option
        button.addEventListener("click", function(){
            checkAnswer(index)
        })
        questionContainer.appendChild(button)
    })
    }

  
    function updateTimer() {
      if (timeLeft > 0) {
        timeLeft--;
        timerElement.textContent = timeLeft;
      } else {
        endQuiz();
      }
    }
  
    function checkAnswer(answerIndex) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      if (answerIndex === currentQuestion.correctAnswer) {
        userScore++;
      } else {
        timeLeft -= 10; // Penalty for wrong answer
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex< quizQuestions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  
    function endQuiz() {
      clearInterval(timer);
      questionContainer.innerHTML = `<h2>Quiz Over</h2><p>Your score is: ${userScore}</p>`;
      scoreForm.style.display = 'block';
    }
  
    function saveScore(initials, score) {
      
      alert(`Score saved for ${initials}: ${userScore}`);
    }
  
    scoreForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const initialsInput = document.getElementById('initials');
      const initials = initialsInput.value.trim();
      if (initials !== '') {
        saveScore(initials, userScore);
      }
    });
  });
  