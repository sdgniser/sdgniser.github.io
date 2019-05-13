// Highlight navbar links when clicked
$('.navlink').click(function(e) {
	$('nav > ul > li').children().removeClass('on');
	$(this).addClass('on');
})
