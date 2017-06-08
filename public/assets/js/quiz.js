var questions = [
	{
		question: "What is 2+2?",
		answers: ["3", "4", "fish", "foure"],
		correctAnswer: 1
	},
	{
		question: "What is 9-(5 * 2)?",
		answers: ["10", "-2", "-1", "9"],
		correctAnswer: 2
	},
	{
		question: "What is 12+3+7+13+8+9?",
		answers: ["42", "52", "48", "50"],
		correctAnswer: 1
	},
	{
		question: "What is a^2 + b^2 = c^2?",
		answers: ["triangularTheorem", "pythagoreantheorem", "quadraticfunction", "righthandrule"],
		correctAnswer: 1
	},
	{
		question: "what is 48/2(9+3)?",
		answers: ["2", "288", "48", "50"],
		correctAnswer: 4
	}
]
var score = 0;
var currentQuestionIndex = 0;
var currentQuestion;
var time = 7*1000;
var timer;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 10 * 1000;
			$('#time').text(time/1000);

			currentQuestionIndex++;

			if (currentQuestionIndex <= questions.length - 1){
				loadQuestion();
			}else{
				clearInterval(timer);
			
				$("#container").empty();
				$("#container").html("<p>Done</p>");
			}
		}
	}, 1 * 1000);
}

countDown();

function loadQuestion(){

	currentQuestion = questions[currentQuestionIndex];

	$('#displayQuestion').html("");

	var question = $('<div>').text(currentQuestion.question);
	$('#displayQuestion').append(question);

	for (var i=0; i<currentQuestion.answers.length; i++){
		var answerButton = $("<button>").attr('class', 'answer').attr('data-key', i).text(currentQuestion.answers[i]);
		$('#displayQuestion').append(answerButton);
	}
}

loadQuestion();

$(document).on('click', '.answer', function(){
	if ($(this).data('key') == currentQuestion.correctAnswer){
		alert('nice job!');
		score = score + 1;
	}else{
		alert('wrong answer');
	}

	currentQuestionIndex++;
	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 7;
		$('#time').text(time/1000);
	}else{
		clearInterval(timer);
		$("#container").empty();
		$("#container").html("<p>Quiz is over</p>");
	}
	if (currentQuestionIndex == 5) {
			var data = {
			total_score: score,
		}

		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});
	
	}
})















