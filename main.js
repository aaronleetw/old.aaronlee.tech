$(".link").click(function () {
    var target = $(this).attr("href");
    var locate = $(target).offset().top - $(".navbar").outerHeight();
    var duration = 1000;
    $("html, body").stop().animate({
        scrollTop: locate
    }, duration);
});