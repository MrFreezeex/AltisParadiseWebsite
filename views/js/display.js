/*
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of the repository.
 * Copyright (C) 2015 by OUTHENIN-CHALANDRE Arthur. All right reserved.
 */
$(document).ready(function() {

	var presentation = $("#containerInfo").offset().top;
	var server = $("#slider").offset().top;

	var slideNbr = $('#sliderContainer > .slide').length;
	var slidePos = 0;

	var presentationHeight = $('#presentation').height() + 30;
	$('.slideChevron').css('top', presentationHeight + 250);

	$(window).resize(function() {
		presentation = $("#containerInfo").offset().top;
		server = $("#slider").offset().top;

		var presentationHeight = $('#presentation').height() + 30;
		$('.slideChevron').css('top', presentationHeight + 250);
	});
	$('.scrollTo').click( function(event) {
		event.preventDefault();
		var page = $(this).attr('href');
		var speed = 750;
		$('html, body').animate( { scrollTop: $(page).offset().top - 52 }, speed );
		return false;
	});
	function toScrollNav() {
		$("nav").addClass( "navbar-fixed" );
		$("nav").addClass( "navbar-scroll", 500, "swing" );
	}
	function toDefaultNav() {
		$("nav").removeClass( "navbar-fixed" );
		$("nav").removeClass( "navbar-scroll", 500, "swing" );
	}

	function clearActive () {
		$('#presentationNav').removeClass('active');
		$('#serverNav').removeClass('active');
	}
	function presentationActive () {
		$('#serverNav').removeClass('active');
		$('#presentationNav').addClass('active');
	}	
	function serverActive () {
		$('#presentationNav').removeClass('active');
		$('#serverNav').addClass('active');
	}

var slideReady = true;
function slide() {
	if (slideReady) {
		slideReady = false;

		if (slidePos < slideNbr - 1) {
			slidePos++;
			$('#sliderContainer').animate({right:'+=100%'}, 1000, 'swing', function() {
				slideReady = true;
				slideTimeout = setTimeout(slide, 12000);
			});
		} else {
			slidePos = 0;
			$('#sliderContainer').animate({right:'0'}, 1000, 'swing', function() {
				slideReady = true;
				slideTimeout = setTimeout(slide, 12000);
			});
		}
	}
}
var slideTimeout = setTimeout(slide, 12000);

	$(window).scroll(function() {
		if ($(window).scrollTop() == 0 && $('nav').hasClass('navbar-fixed')) {
			toDefaultNav();
		} else if ($(window).scrollTop() != 0 && !$('nav').hasClass('navbar-fixed')) {
			toScrollNav();
		}

		if ($(window).scrollTop() >= presentation - 120 && $(window).scrollTop() < server - 120 && !$('#presentationNav').hasClass('active')) {
			presentationActive();
		} else if ($(window).scrollTop() >= server - 120 && !$('#serverNav').hasClass('active')) {
			serverActive();
		} else if ($(window).scrollTop() < presentation - 120) {
			clearActive();
		}
	});

	$('#containerInfo').on('click', '.slideChevron', function (event) {
		if (slideReady) {
			clearTimeout(slideTimeout);
			slideReady = false;
			if ($(this).hasClass('slideChevronLeft')) {
				if (slidePos != 0) {
					slidePos--;
					$('#sliderContainer').animate({right:'-=100%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				} else {
					slidePos = slideNbr - 1;
					$('#sliderContainer').animate({right: (slideNbr - 1)*100+'%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				}
			} else {
				if (slidePos < slideNbr - 1) {
					slidePos++;
					$('#sliderContainer').animate({right:'+=100%'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				} else {
					slidePos = 0;
					$('#sliderContainer').animate({right:'0'}, 1000, 'swing', function() {
						slideReady = true;
						slideTimeout = setTimeout(slide, 12000);
					});
				}
			}
		}
	});
});