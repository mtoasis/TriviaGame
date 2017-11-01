
$(document).ready(function(){


var queryURL = "https://opentdb.com/api.php?amount=10";
var correct_count=0;
var incorrect_count=0;
var time_left;
var qn =0;  //question number count
var time_interval;
var correct_answer;
var time_up;
var question_text=[];
var ans_c=[];
var r_result;

pulling_data();


$(document).on("click","#start_btn",function(){

	$(".opening_screen").css("display","none");
	console.log("button pressed")
	generate_question();
	$(".timer").children(".timer_text").css("display","block");
	timer();
});


function shuffleArray(array) {
	var lp=ans_c.length;
    for (var i =(lp - 1); i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function pulling_data(){
	$.ajax({
	url:queryURL,
	method: 'GET'
	}).done(function(response){

	var len=response.results.length;

	for (var i=0; i<len; i++){

		question_text[i]=response.results[i].question;
	}

	r_result=response.results;

	})

	}



function generate_question(){
	

	if (qn<10){
	var ll=r_result[qn].incorrect_answers.length;
	for (var i=0; i<=ll; i++){
		ans_c[i]=r_result[qn].incorrect_answers[i]

	}
	ans_c[ll]=r_result[qn].correct_answer;
	correct_answer=ans_c[ll];


	console.log("ans_c is: "+ans_c)

	var answer_button_count='';
	var ans_len = ans_c.length;


	for (var j=0;j<ans_len;j++){

		answer_button_count = answer_button_count+'<button class="answer_buttons">'+ans_c[j]+'</button><div class="clear">';

	}

		
	var question_screen_form = '<div class="question_screen"><div class="question_number"><span>Question #'+(qn+1)+'</span></div><div class="clear"></div><div class="question_text"><span>'+question_text[qn]+'</span></div><div class="question_answers">'+answer_button_count+'</div></div>';
	
	$(".container").append(question_screen_form);
	ans_c=[];
}
	else{

	qn=0;
	incorrect_count=0;
	correct_count=0;
	score_display();
	pulling_data();
	game_end();
	}

};	


$(document).on("click",".answer_buttons",function(){
	qn +=1;

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
	clearInterval(time_interval);
	clearTimeout(time_up);
	time_left=30;
	time_interval = setInterval(time_decrease, 1000);
	time_up = setTimeout(timeUp, 1000 * (time_left));
	

	function time_decrease (){
		time_left -=1;
		// console.log(time_left);
		$(".timer").children(".timer_text").text(time_left);
	}

}

function timeUp(){
	clearInterval(time_interval);
	clearTimeout(time_up);	
	$(".question_screen").remove();
	$(".opening_screen").children("#opening_text").text("Game Over");
	$(".opening_screen").children("#opening_text").css("left","290px");
	$(".opening_screen").children("#start_btn").text("Restart");
	$(".opening_screen").css("display","block");
	
	}

function game_end(){
	$(".question_screen").remove();
	$(".opening_screen").children("#opening_text").text("Game End");
	$(".opening_screen").children("#opening_text").css("left","290px");
	$(".opening_screen").children("#start_btn").text("Restart");
	$(".opening_screen").css("display","block");
	$(".opening_screen").children("#ins_div").css("display","none");
	$(".timer").children(".timer_text").css("display","none");
	
	}


function clear(){
	$("#prev_ans").text("Correct answer was:   "+correct_answer);	
	$(".question_screen").remove();
	generate_question()
	// clearInterval(time_interval);
	// clearTimeout(time_up);
	timer();

}


function score_display(){
	$(".score_div").html('<span class="count">Correct Answer:'+correct_count+'</span><div class="clear"></div><span class="count">Incorrect Answer: '+incorrect_count+'</span>')
}


});