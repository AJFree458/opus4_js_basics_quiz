// Button generator

// Quiz Function
// Quiz starts up, with a question
// A countdown timer starts at same time
// Each Question requires three things:
//  - Register a button press for one of the answers
//  - If a question is answered correctly, add a certain amount of time to the countdown, and add to the final score
//  - Else reduce the timer by a certain amount, and register the question as incorrectly answered
// Either at the end of the quiz, or when the timer runs out, the score needs to displayed
// An option to put up the score in a high score area
// Option to do the quiz over

// Button press Event Listener to start the quiz

//Questions in an object
var inputScore = document.createElement("button");
inputScore.textContent = "Submit";
var highScorer = document.createElement("input");
var nameInput = document.getElementsByTagName("input");
// create questions here
var questions = [
    new Question("What is the HTML tag under which one can write the Javascript code?", ["&lt;javascript&gt;", "&lt;scripted&gt;","&lt;script&gt;", "&lt;js&gt;"], "&lt;script&gt;"),

    new Question("Which of the following is the correct syntax to display \"Hello World\" in an alert box using Javascript?", ["alertbox(\"Hello World\")", "msg(\"Hello World\")", "msgbox(\"Hello World\")", "alert(\"Hello World\")"], "alert(\"Hello World\")"),

    new Question("What is the correct syntax for referring to an external script called \"myScript.js\"?", ["&lt;script src = \"myScript.js\"&gt;", "&lt;script href = \"myScript.js\"&gt;","&lt;script ref = \"myScript.js\"&gt;", "&lt;script name = \"myScript.js\"&gt;"], "&lt;script src = \"myScript.js\"&gt;"),

    new Question("Which of the following is not a reserved word in Javascript?", ["interface", "throws", "program", "short"], "program"),

    new Question("What is the syntax for creating a function in Javascript named as Quizfunc?", ["function = Quizfunc()", "function Quizfunc()", "function := Quizfunc()", "function : Quizfunc()"], "function Quizfunc()"),

    new Question("How is the function called in Javascript?", ["call Quizfunc()", "call function Quizfunc()", "Quizfunc()", "function Quizfunc()"], "Quizfunc()"),

    new Question("What is the correct syntax for adding comments in Javascript?", ["&lt;!-This is a comment-&gt;", "\/\/This is a comment", "-This is a comment", "**This a comment**"], "\/\/This is a comment"),

    new Question("What is the method in Javascript used to remove the whitespace at the beginning and end of any string?", ["strip()", "trim()", "stripped()", "trimmed()"], "trim()")

];

//Need start button
var startEl = document.querySelector("#start-btn");

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

var timeLeft = document.querySelector("#time");
var secondsLeft = 76;
function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeLeft.textContent = secondsLeft;
        if(secondsLeft === 0){
            clearInterval(timerInterval);
        }
    }, 1000);
}
setTime();

function populate() {

    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h2>Result</h2>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    document.getElementById("quiz").appendChild(highScorer);
    highScorer.setAttribute("style", "font-size:25px; margin-top:10px; margin-bottom:20px;");
    document.getElementById("quiz").appendChild(inputScore);
    inputScore.setAttribute("style", "font-size:25px; margin-left:30px; padding:5px 15px 5px 15px");
};

// Local Storage
inputScore.addEventListener("click", function(event){
    event.preventDefault();

    // High Score object
    var scorer = {
        name: highScorer.value.trim(),
        score: quiz.score,
    }

    localStorage.setItem("scorer", JSON.stringify(scorer));

})

// create quiz
var quiz = new Quiz(questions);

// display quiz
startEl.addEventListener("click", populate);