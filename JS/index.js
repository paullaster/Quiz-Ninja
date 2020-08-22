(function(){
    "use strict";
var $question = document.getElementById("question");
var $score = document.getElementById("score");
var $feedback = document.getElementById("feedback");
var $start = document.getElementById("button");
var $form = document.getElementById("answer");
var $timer =document.getElementById("timer");

//initialize  timer and set up a count down timer.

var time =20;
update($timer, time);
var interval = window.setInterval(countDown, 1000);

//event listener
$start.addEventListener('click', function(){
  return  new Game()
},false);

//view functions
function update(element, content,klass){
var p =element.firstChild || document.createElement("p");
p.textContent = content;
element.appendChild(p);
if(klass){
    p.className = klass;

}
}
var quiz ={
    "name":"Super Hero name Quiz",
    "description":"How many Super Heros can you name?",
    "question":"What is the real name of ",
    "questions":[
    {"question" :"Superman?", "answer": 'Clark Kent',"asked":false},
    {"question":"Wonderwoman?", "answer":'Dianna Prince',"asked":false},
    {"question":"Batman?", "answer":'Bruce Wayne',"asked":false}
]}
// initialize the score to zero
 //initializing the score.
function hide(element){
    element.style.display = "none";
}
function show(element){
    element.style.display ="block";
}
//hide the form at the start of page loads
hide($form);
    //main game loop
    class Game {
        constructor(quiz) {
            //hide the start button and show the quiz form
            this.questions = quiz.questions;
            this.phrase = quiz.question;
            this.score = 0; //initialize the score
            update($score, this.score);
            this.time = 20;
            update($timer, this.time);
            this.interval = window.setInterval(this.countDown.bind(this), 1000);
            //hide button and show form
            hide($start);
            show($form);
            // add eventlistener form for when it is submitted
            $form.addEventListener('click', function (e) {
                e.preventDefault();
                this.check(e.target.value);
            }.bind(this), false);
            //var question; //current question
            this.chooseQuestion();
            //Method definitions
            Game.prototype.chooseQuestion = function () {
                console.log("chooseQuestion() invoked");
                var questions = this.questions.filter(function (question) {
                    return question.asked === false;
                });
                //set the current function
                this.question = questions[random(questions.length) - 1];
                this.ask(this.question);
            };
            Game.prototype.ask = function (question) {
                console.log("ask() invoked");
                var quiz = this;
                //set the question.asked property to true so that it is not asked again.
                question.asked = true;
                update($question, this.phrase + question.question + "?");
                //clear the previous option
                $form.innerHTML = "";
                //create an array to put different options in the button variable
                var options = [], button;
                var option1 = chooseOption();
                options.push(option1.answer);
                var option2 = chooseOption();
                options.push(option2.answer);
                // add the actual answer at random position in the option array
                options.splice(random(0, 2), 0, this.question.answer);
                //loop through each option and dispaly it as a button.
                optioins.forEach(function (name) {
                    button = document.createElement("button");
                    button.value = name;
                    button.textContent = name;
                    $form.appendChild(button);
                });
                //choose an option of all possible answers without choosing same option twice
                function chooseOption() {
                    var option = quiz.questions[random(quiz.questions.length) - 1];
                    //check to see if the option chosen is the current questionor already one of the option, if it is, then recursivelly call this function untill it is not
                    if (option === question || option.indexOf(option.answer) !== -1) {
                        return chooseOption();
                    }
                    return option;
                }
                //  $form[0].value = "";
                //  $form[0].focus();
            };
            Game.prototype.check = function (answer) {
                console.log("check() invoked");
                if (answer === this.question.answer) {
                    update($feedback, "correct!", "right");
                    this.score++; //score increased by one 
                    update($score, this.score);
                }
                else {
                    update($feedback, "wrong", "wrong");
                }
                this.chooseQuestion();
                // if(i===quiz.questions.length){
                //     gameOver();
                // }
                // else{
                //     chooseQuestion();
                // }
            };
            //called every second and decreases time
            Game.prototype.countDown = function () {
                //decrease the time by 1
                this.time--;
                //update the time displayed
                update($timer, this.time);
                // the game is over if the time time reaches 0
                if (this.time <= 0) {
                    this.gameOver();
                }
            };
        }
        gameOver() {
            console.log("gameOver() invoked");
            show($score);
            //inform the player they have finished palying the game and show them the points they have scored.
            update($question, "Game over, You scored  " + this.score * 10 + "   points");
            window.clearInterval(this.interval);
            hide($form);
            show($start);
            //stop the countdown interval
        }
    }

    //function definations
    function  random(a,b,callback){
        if(b===undefined){
            // if only one argument supplied and assuming the lower limit is 1
            b=a, a=1; 
        }
         var result = Math.floor((b-a+1)* Math.random())+a;
         if(typeof callback ==="function"){
             result = callback(result);
         }
         return result;
    }

//end of main game loop
gameOver();



// for(var i=0; i<quiz.length; i++){
//     //get answer from the player
//     var answer = prompt(quiz[i][0]); //quiz[i][0] is the ith question
//     //check if answer is correct
//     if(answer === quiz[i][1]){ //quiz[i][1] is the ith answer
// alert('correct!');
// //increase the score by one
// score++;
//     }
//     else{
//         alert('wrong!');
//     }
// }
// alert("Game over, you scored "+ score*10 + "   points");
}());