
$(document).ready(function(){


var queryURL = "https://opentdb.com/api.php?amount=1";
var correct_count=0;
var incorrect_count=0;
var time_left;
var question_number_count =1;
var time_interval;
var correct_answer;
var time_up;


$("#start_btn").on("click",function(){
	generate_question();
	timer();
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function generate_question(){ 
	
	$(".opening_screen").css("display","none");

	$.ajax({
	url:queryURL,
	method: 'GET'
	}).done(function(response){

	var incorrect_answers=response.results[0].incorrect_answers
	var question_text;
	var answers_array=[];


	question_text = response.results[0].question;
	answers_array[0]=response.results[0].correct_answer;
	correct_answer=response.results[0].correct_answer;

	
	for (var i=1; i<=incorrect_answers.length;i++){
		
		answers_array[i]=incorrect_answers[(i-1)];
	}

	shuffleArray(answers_array);
	var answer_button_count='';
	console.log(answers_array)
	for (var j=0;j<answers_array.length;j++){
		answer_button_count = answer_button_count+'<button class="answer_buttons">'+answers_array[j]+'</button><div class="clear">';
	}
		
	var question_screen_form = '<div class="question_screen"><div class="question_number"><span>Question #'+question_number_count+'</span></div><div class="clear"></div><div class="question_text"><span>'+question_text+'</span></div><div class="question_answers">'+answer_button_count+'</div></div>';
	
	$(".container").append(question_screen_form);

	})
};



$(document).on("click",".answer_buttons",function(){
	question_number_count +=1;

	if ($(this).text()==correct_answer){
		correct_count +=1;
	}
	else{
		incorrect_count+=1;
	}
	score_display();
	clear();

})


function timer(){
	time_left=5;
	time_interval = setInterval(time_decrease, 1000);
	time_up = setTimeout(timeUp, 1000 * 5);
	

	function time_decrease (){
		time_left -=1;
		console.log(time_left);
		$(".timer").children(".timer_text").text(time_left);
	}

}

function timeUp(){
	clearInterval(time_interval);	
	
	$(".question_screen").remove();
	$(".opening_screen").children("#opening_text").text("Game Over");
	$(".opening_screen").children("#opening_text").css("left","290px");
	$(".opening_screen").children("#start_btn").text("Restart");
	$(".opening_screen").css("display","block");
	
	}


function clear(){
	$("#prev_ans").text("Correct answer was:   "+correct_answer);	
	$(".question_screen").remove();
	generate_question()
	clearInterval(time_interval);
	clearTimeout(time_up);
	timer();

}

function score_display(){
	$(".score_div").html('<span class="count">Correct Answer:'+correct_count+'</span><div class="clear"></div><span class="count">Incorrect Answer: '+incorrect_count+'</span>')
}


});