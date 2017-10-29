
$("#start_btn").on("click",function(){

$("#start_btn").css("display","none");

timer()

//display_questions()


})


function timer() {
	var time_left=30;
	setInterval(time_decrease, 1000);
	

	function time_decrease (){
		time_left -=1;
		console.log(time_left);
		$(".timer").text(time_left);
	}



}