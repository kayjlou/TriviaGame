 $(document).ready(function(){


  //this dislayes all questions and answers
var trivia = {
  questions: [{
    question: "What is the highest recorded temperature in San Francisco?",
    answerList: ["106", "108", "98", "90"],
    id: 'question-one',
    answer: 0
  },{
    question: "What is the most popular brand of cars in San Francisco?",
    answerList: ["Volkswagen", "BMW", "Subaru", "Toyota"],
    id: 'question-two',
    answer: 3
  },{
  question: "What type of bear is on the California Flag",
  answerList: ["Panda Bear", "Black Bear", "Grizzly Bear", "Brown Bear"],
  id: 'question-three',
  answer: 2
}
]}

//Start the game once this is clicked
$('.startGame').on('click', function(){
  //Show the questions
  $(".container").show();
  console.log("The game has begun");
});

//Timer
var count = 30;
$('#time-div').on('click', countDown());

//This function changes the time and display countdown
function decrement(){
  count--;
//Display countdown number
$('#time-div').html('<h2>' + count + " seconds" + '</h2>');
//Stops when timer reaches 0
if (count === 0){
  stop();
  console.log("YOU RAN OUT OF TIME!")
  $('#timeUp').html('You have ran out of time!');
  checkAnswers();
}
}

//Set time for 1 seconds to decrement
function countDown(){
  counter = setInterval(decrement, 1000);
}

//Clear the interval counter
function stop(){
  clearInterval(counter);
}

//This function creates the quiz form
function formTemplate(data){
  var qString = "<form id='questionOne'>" + data.question + "<br>";
  var answerList = data.answerList

  //for loop to go through answers and add values
  for (var i =0; i<answerList.length; i++){
    var answers = answerList[i];
    console.log(answers);
    qString = qString + "<input type='radio' name ='"+data.id+"' value="+ i +">" + answers;
  }
  return qString + "</form>";
}
window.formTemplate = formTemplate;

//Appends the template that was created to page
function quiz(){
  var questionHTML = ''
  for (var i =0; i<trivia.questions.length; i++){
      questionHTML = questionHTML + formTemplate(trivia.questions[i]);
  }
  $('#questions-div').append(questionHTML);
}

//Correct function
function isCorrect(question){
  var answers = $('[name='+question.id+']');
  var correct = answers.eq(question.answer);
  var isChecked = correct.is(':checked');
  return isChecked;
}


//Call quiz function
quiz();

//Function makes the guesser results
function resultsTemplate(question){
  var htmlBlock = "<div>"
  htmlBlock = htmlBlock + question.question + ': ' + isChecked;
  return htmlBlock + "<div>";
}
//function
function checkAnswers(){

  //varibales for results
  var resultsHTML = "";
  var guessedAnswers = [];
  var correct = 0;
  var incorrect = 0;
  var unAnswered = 0;

  //for loop to go through each question and checks to see if it is correct then
  //adds to the score
  for (var i=0; i<trivia.questions.length; i++){
    if (isCorrect(trivia.questions[i])){
      correct++;
    }
    else {
      //runs through check answered function to see if answeris clicked to update variables
      if (checkAnswered(trivia.questions[i])){
          incorrect++;
      }
      else {
         unAnswered++;
      }
    }
  }

  //Display results and variables
  $('.results').html('correct: ' +correct + "<br>" + 'incorrect: ' + incorrect + "<br>" + 'unaswered: ' + unAnswered);
}

//Function to check if answers were clicked
function checkAnswered(question){
  var anyAnswered = false;
  var answers = $('[name'+question.id+']');
  for (var i=0; i <answers.length; i++){
    if (answers[i].checked){
      anyAnswered=true;
    }
  }
  return anyAnswered;
}

//WHen player clicks submit it checks answers and stops game
$('#submitButton').on('click', function(){
  
  checkAnswers();
  stop();
  $('#time-div').append("Game Over!");
  $(".container").hide();
  
})

});