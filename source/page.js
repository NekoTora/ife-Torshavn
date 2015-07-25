$(document).ready(function(){

});

$(".opition a").click(function chan(){
	$(this).parents().children("a").removeClass();
	$(this).addClass("on");
	var chart = $(this).attr("chart");
	$(this).parents().siblings(".chartbox").children().css("display","none");
	$(this).parents().siblings(".chartbox").children("#"+chart).css("display","block");
	console.log("on."+chart);
});