/*----------------------------------------
 SLIDER
 ----------------------------------------*/
$(window).bind("load resize slid.bs.carousel", function () {
    var imageHeight = $(".active .holder").height();
    $(".controllers").height(imageHeight);
    $('.carousel').carousel({
        interval: 100
    });
//  console.log("Slid");
});


/*----------------------------------------
 BACK TO TOP
 ----------------------------------------*/
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    $('#back-to-top').tooltip('show');

});

/*----------------------------------------
 FILTERED PORTFOLIO
 ----------------------------------------*/
$('#filter-works a').click(function (e) {
    e.preventDefault();

    $('#filter-works li').removeClass('active');
    $(this).parent('li').addClass('active');

    var category = $(this).attr('data-filter');

    $('.listing-item').each(function () {
        if (category == '*') {
            $(this).removeClass('filtered').removeClass('selected');
            return;
        } else if ($(this).is(category)) {
            $(this).removeClass('filtered').addClass('selected');
        } else {
            $(this).removeClass('selected').addClass('filtered');
        }

    });

});

/*----------------------------------------
 PORTFOLIO PREVIEW
 ----------------------------------------*/

$('.listing-thumb .main-link, .listing-thumb .link').click(function (e) {
    e.preventDefault();

    var elem = $(this).parents('.listing-item');

    if (elem.find('.link').length < 1) {
        justEnlarge(elem);
        return false;
    }

    if ($(this).parents('.listing-item').is('.filtered')) {
        return false;
    }

    $('html,body').scrollTo(0, '#preview-scroll',
            {
                gap: {y: -120},
                animation: {
                    duration: 500
                }
            });

    if (elem.is('.active')) {
        return false;
    } else if ($('#listing-preview').is('.open')) {
        closePreview();
        elem.addClass('active');
        setTimeout(function () {
            buildPreview(elem);
            openPreview();
        }, 500);
    } else {
        elem.addClass('active');
        buildPreview(elem);
        openPreview();
    }

});

$('#listing-preview .close-preview').click(function (e) {
    e.preventDefault();

    $('html,body').scrollTo(0, '.listings-container',
            {
                gap: {y: -120},
                animation: {
                    duration: 400
                }
            });

    closePreview();
})

function switchPreview(elem) {
    alert('OK');
}

function buildPreview(elem) {

    var content = elem.find('.preview-content').html();

    $('#preview-content').html(content).find('.preview-subtitle').remove();

    $('#listing-preview .preview-title').text(elem.find('.listing-title').text());
    $('#listing-preview .preview-subtitle').text(elem.find('.preview-subtitle').text());

    if (elem.find('.preview-content').data('images')) {

        $('#listing-preview .frame').removeClass('hidden').show();

        var slidesHtml = '<ul class="slides">',
                slides = elem.find('.preview-content').data('images').split(',');

        for (var i = 0; i < slides.length; ++i) {
            slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
        }

        slidesHtml = slidesHtml + '</ul>';
        $('#listing-preview').find('.preview-slider').html(slidesHtml);


    } else {
        $('#listing-preview .frame').addClass('hidden').hide();
    }
}

function openPreview() {


    $('#listing-preview').slideDown(400);
    $('#listing-preview').addClass('open');

    $('.preview-slider').flexslider({
        prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
        nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
        animation: 'slide',
        slideshowSpeed: 3000,
        useCSS: true,
        controlNav: false,
        pauseOnAction: false,
        pauseOnHover: true,
        smoothHeight: false
    });

    $('#listing-preview .slides img').load(function () {
        $('#listing-preview .preview-slider').addClass('loaded');
        $('#listing-preview .loader').fadeOut('fast');
    });

    //  scrollSpyRefresh();
    // waypointsRefresh();

}

function closePreview() {

    $('#listing-preview').removeClass('open').slideUp(400, function () {
        if (!$('#listing-preview .frame').is('.hidden')) {
            $('#listing-preview .preview-slider').flexslider('destroy');
        }

        $('#listing-preview .preview-slider').removeClass('loaded').html('');
        $('#listing-preview .loader').show();
    });

    $('.listings-container .listing-item').removeClass('active');

    //scrollSpyRefresh();
    //waypointsRefresh();
}

function justEnlarge(elem) {

    var image = elem.find('.enlarge').attr('href');
    var title = elem.find('.enlarge').attr('title');

    $.colorbox({href: image, title: title, maxWidth: "85%", maxHeight: "85%"});
}

/*Colorbox*/
$(".enlarge").colorbox({maxWidth: "85%", maxHeight: "85%"});

/*----------------------------------------
 LOAD MORE PROJECTS
 ----------------------------------------*/
var moreSet = 1;
$('#ajax-load').click(function (e) {
    e.preventDefault();

    $(this).html('<i class="fa fa-spinner fa-spin"></i>Загрузка');

    var moreLink = 'more_listings_' + moreSet + '.html';

    $.get(moreLink, function (data) {

        $('#ajax-load').html('Посмотреть еще');

        $('.listings-container .parent-row').append(data);

        var currFilter = $('#filter-works .active a').data('filter');
        $('.listings-container .loaded-item').each(function () {
            $(this).addClass('filtered');
            if ($(this).is(currFilter)) {
                $(this).removeClass('filtered');
            }
        });

        $('.listings-container .loaded-item .enlarge').colorbox({maxWidth: "85%", maxHeight: "85%"});

        var i = 1,
                delay = [];
        $('.loaded-item .listing-thumb').each(function (i) {
            i++;
            var elem = $(this);
            delay[i] = setTimeout(function () {
                elem.addClass('in');
            }, 200 * i);
        })

        $('.listings-container .loaded-item').removeClass('loaded-item').find('.listing-thumb .main-link,.listing-thumb .link').click(function (e) {
            e.preventDefault();


            var elem = $(this).parents('.listing-item');

            if (elem.find('.link').length < 1) {
                justEnlarge(elem);
                return false;
            }

            if ($(this).parents('.listing-item').is('.filtered')) {
                return false;
            }

            $('html,body').scrollTo(0, '#preview-scroll',
                    {
                        gap: {y: -120},
                        animation: {
                            duration: 500
                        }
                    });

            if (elem.is('.active')) {
                return false;
            } else if ($('#listing-preview').is('.open')) {
                closePreview();
                elem.addClass('active');
                setTimeout(function () {
                    buildPreview(elem);
                    openPreview();
                }, 500);
            } else {
                elem.addClass('active');
                buildPreview(elem);
                openPreview();
            }
        });
    }).fail(function () {
        $('#ajax-load').html('Больше нет');
    });

    moreSet = moreSet + 1;

});

/*----------------------------------------
 RESPONSIVE VIDEO
 ----------------------------------------*/
$('.container').fitVids();

/*----------------------------------------
 CONTACT FORM
 ----------------------------------------*/
$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function () {
    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
});
$('.contact-form form').submit(function (e) {
    e.preventDefault();
    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
    var postdata = $('.contact-form form').serialize();
    $.ajax({
        type: 'POST',
        url: 'php/contact.php',
        data: postdata,
        dataType: 'json',
        success: function (json) {
            if (json.emailMessage != '') {
                $('.contact-form form .contact-email').addClass('contact-error');
            }
            if (json.subjectMessage != '') {
                $('.contact-form form .contact-subject').addClass('contact-error');
            }
            if (json.messageMessage != '') {
                $('.contact-form form textarea').addClass('contact-error');
            }
            if (json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
                $('.contact-form form').fadeOut('fast', function () {
                    $('.contact-form').append('<p>Thanks for contacting us!<br>We will get back to you very soon.</p>');
                });
            }
        }
    });
});

/*----------------------------------------
 SUBSCRIBE FORM
 ----------------------------------------*/
$('.success-message').hide();
$('.error-message').hide();

$('.subscribe form').submit(function (e) {
    e.preventDefault();
    var postdata = $('.subscribe form').serialize();
    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php',
        data: postdata,
        dataType: 'json',
        success: function (json) {
            if (json.valid == 0) {
                $('.success-message').hide();
                $('.error-message').hide();
                $('.error-message').html(json.message);
                $('.error-message').fadeIn();
            } else {
                $('.error-message').hide();
                $('.success-message').hide();
                $('.subscribe form').hide();
                $('.success-message').html(json.message);
                $('.success-message').fadeIn();
            }
        }
    });
});

//click to map

$('#prof_link_traderoom').click(function (e) {
    e.preventDefault();
    $('body, html').animate({scrollTop: $('#prof_traderoom').offset().top}, 1000);
});

$('#mira_link_traderoom').click(function (e) {
    e.preventDefault();
    $('body, html').animate({scrollTop: $('#mira_traderoom').offset().top}, 1000);
});

$('#tel_link_traderoom').click(function (e) {
    e.preventDefault();
    $('body, html').animate({scrollTop: $('#tel_traderoom').offset().top}, 1000);
});

var reg = /#([\s\S]*)/g;
var LocationSite = document.location.href;
$('.navbar-nav a').each(function () {

    var notIndussianreg = LocationSite.replace(reg, '');
    
    if (this.href.replace(reg, '') == notIndussianreg)
    {
        $(this).addClass('active_li');
    }
});


/*$("#form").submit(function () { //устанавливаем событие отправки для формы с id=form
    var form_data = $(this).serialize(); //собираем все данные из формы
    $.ajax({
        type: "POST", //Метод отправки
        url: "send.php", //путь до php фаила отправителя
        data: form_data,
        success: function (data) {
            if (data == '1') {
                $('#form').html('Спасибо! Ваше сообщение отправлено!');
            } else
                $('#form').html('000Сервер не отвечает, попробуйте позже!');
        },
        error: function () {
            $('#form').html('111Сервер не отвечает, попробуйте позже!');
        }
    });
    return false;
});
*/


  $("#form").submit(function() {
    $.ajax({
      type: "POST",
      context: this,
      url: "send.php",
      data: $(this).serialize(),
      error: function() {
        $('#form').html('000Сервер не отвечает, попробуйте позже!');
      },
      success: function() {
        $('#form').html('Спасибо! Ваше сообщение отправлено!');
      }
    });
    return false;
  });
});
