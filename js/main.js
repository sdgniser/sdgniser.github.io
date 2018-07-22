$("document").ready(function() {
	$("#navBar li>a").on("click", function (e) {
		$("#navBar li span.on").attr("class", "off");
		this.children[0].setAttribute("class", "on");
	});
});
