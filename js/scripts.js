$( function () {

	// Wrap up the nav#slices section
	$("nav#slices").wrapInner("<ul></ul>");
	$("nav#slices a").wrap("<li><div class='reveal'></div></li>");
	$("nav#slices div.reveal").filter(":even").each( function () {
		$(this).after(
			"<div class='slice slice-right'>" +
				"<img src='img/arrowsr.png' />" + 
			"</div>"
		);
	});
	$("nav#slices div.reveal").filter(":odd").each( function () {
		$(this).after(
			"<div class='slice slice-left'>" +
				"<img src='img/arrowsl.png' />" +
			"</div>"
		);
	});

	// Wrap up the content sections
	$("#content").wrapInner("<div class='frostywrap'></div>");
	$(".frostywrap").wrapInner("<div></div>");
	$(".frostywrap").addClass("slice");

	// Wrap up the nav#sitemap section
	$("nav#sitemap").wrapInner("<ul></ul>");
	$("nav#sitemap a").wrap("<li></li>");

	// Wrap up and parse the gallery section
	$("#isotope").wrap("<div id='isotope-wrapper'></div>");
	$(".isotope-item").each( function() {
		$(this).wrapInner(
			"<a href='img/" +
			$(this).attr("data-image") +
			".jpg' rel='shadowbox[gallery]' title='" +
			$(this).attr("title") +
			"'><img src='img/" +
			$(this).attr("data-image") +
			"_thumb.jpg' /></a>"
		);
		$(this).removeAttr("title");
	});

	// Set the background image for all elements on page
	setBackgroundImage(
		$("body, nav#slices li .slice"),
		$(".frostywrap"),
		$("body").attr("data-background")
	);

	// Size the background size of all slices
	setSliceBackground( $('.slice') );

	// Set the background color for all reveals
	$("nav a").each( function () {
		$(this).css("background-color", $(this).attr("data-color"));
	});

	/**********     EVENT LISTENERS     **********/
	$( window ).resize( function () {
		setSliceBackground( $('.slice') );
	});

	var timeoutQueue = {};

	$("#slices ul li").mouseenter( function () {
		window.clearTimeout(timeoutQueue[ $(this).find("a").text() ]);
		timeoutQueue[ $(this).find("a").text() ] = 0;
		slideSlice( $(this).children(".slice-right"), "right" );
		slideSlice( $(this).children(".slice-left"), "left" );
	});

	$("#slices ul li").mouseleave( function () {
		timeoutQueue[ $(this).find("a").text() ] = 
			window.setTimeout(
				resetSlice,
				2000,
				$(this).children(".slice")
			);
	});
});

function setBackgroundImage ( regSlices, blurSlices, image ) {
	regSlices.each( function () {
		$(this).css('background-image', "url('img/" + image + ".jpg')");
	});
	blurSlices.each( function () {
		$(this).css('background-image', "url('img/" + image + "_blur.jpg')");
	});
}

function setSliceBackground ( slices ) {
	slices.each( function () {
		$(this).css('background-size', "auto " + $(document).height() + "px" );
		$(this).css(
			'background-position',
			"center " + -$(this).offset().top + "px"
		);
	});
}

function slideSlice ( slice, rightOrLeft ) {
	var translate = "0px";
	if ( rightOrLeft == "right") {
		translate = "100%";
	} else if ( rightOrLeft == "left" ) {
		translate = "-100%";
	}
	slice.css({
        "-webkit-transform": "translate(" + translate + ", 0px)",
        "-moz-transform": "translate(" + translate + ", 0px)",
        "-o-transform": "translate(" + translate + ", 0px)",
        "transform": "translate(" + translate + ", 0px)",
        "filter": "alpha(opacity=0)",
        "opacity": "0"
    });
}

function resetSlice ( slice ) {
	slice.css({
        "-webkit-transform": "translate(0px, 0px)",
        "-moz-transform": "translate(0px, 0px)",
        "-o-transform": "translate(0px, 0px)",
        "transform": "translate(0px, 0px)",
        "filter": "alpha(opacity=1)",
        "opacity": "1"
    });
}