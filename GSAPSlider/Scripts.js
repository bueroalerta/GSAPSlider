var $sliderContainer = $(".slider-container"),
    $sliderElements = $(".slider-elements"),
    $slides = $(".slider-elements").children(),
    slideCount = $slides.length,

    clicked = false, //for left-right buttons

    currentSlide = 1,
    sliderContainerWidth = $sliderContainer.width(),

    animationDuration = .3;

$(document).ready(function () {
    initialise();
});
$(window).resize(function () {
    sliderContainerWidth = $sliderContainer.width();
    resizeImages();

});


function initialise() {
    for (var i = 1; i < slideCount; i++) {
        $("#" + String(currentSlide + i)).hide();
    }
    resizeImages();
    
}

function nextSlide() {
    if (currentSlide < slideCount) {
        TweenMax.set($("#" + String(currentSlide)), { x: 0 }); //Current view
        TweenMax.set($("#" + String(currentSlide + 1)), { x: sliderContainerWidth }); //Next Slide

        $("#" + String(currentSlide + 1)).show(); //Revealing next slide

        resizeImages(); //when hiding elements resizing messes up, so we are calling it again

        TweenMax.to($("#" + String(currentSlide)), animationDuration, {
            x: -sliderContainerWidth, ease: Sine.easeInOut, onComplete: function () {
                $("#" + String(currentSlide)).hide(); //hiding the current view after complete
                currentSlide += 1;
                clicked = false;
            }
        });
        TweenMax.to($("#" + String(currentSlide + 1)), animationDuration, { x: 0, ease: Sine.easeInOut }); //This becomes currentSlide
    }
    else { clicked = false; }
}

function previousSlide() {
    if (currentSlide > 1) {
        TweenMax.set($("#" + String(currentSlide)), { x: 0 });
        TweenMax.set($("#" + String(currentSlide - 1)), { x: -sliderContainerWidth });

        $("#" + String(currentSlide - 1)).show();

        resizeImages();

        TweenMax.to($("#" + String(currentSlide)), animationDuration, {
            x: sliderContainerWidth, ease: Sine.easeInOut, onComplete: function () {
                $("#" + String(currentSlide)).hide();
                currentSlide -= 1;
                clicked = false;
            }
        });
        TweenMax.to($("#" + String(currentSlide - 1)), animationDuration, { x: 0, ease: Sine.easeInOut });
    }
    else { clicked = false; }
}

$(".slide-right").click(function () {
    if (!clicked) {
      clicked = true;
      nextSlide();
    }
    //nextSlide();
});
$(".slide-left").click(function () {
    if (!clicked) {
      clicked = true;
      previousSlide();
    }
    //previousSlide();

});




//Responsiveness
function resizeImages() {
    //Takes .slider-image-containers and applies fitImgToDiv to every child <IMG>
    $slides.each(function () { fitImgToDiv($(this).children()); });
}

function fitImgToDiv(Image) {
    if ($sliderContainer.width() > Image.width() || $sliderContainer.height() < Image.height()) { $(Image).removeClass("scale-height").addClass("scale-width"); }
    else { $(Image).removeClass("scale-width").addClass("scale-height"); }
}