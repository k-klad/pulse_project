$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  

  $('.owl-carousel').owlCarousel({
    items:3,
    loop:true,
    margin:10,
    nav:true,
    autoHeight: true
});

//Tabs

$('ul.tabs').on('click', 'li:not(.tab_active)', function() {
  $(this)
    .addClass('tab_active').siblings().removeClass('tab_active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide (item) {
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__description').eq(i).toggleClass('catalog-item__description_active');
    })
  });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//modal

$('[data-modal=consultation]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
});
$('.modal-wind__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
});
$('.button_catalog').on('click', function() {
  $('.overlay, #order').fadeIn('slow');
});
$('.button_catalog').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal-wind__description').text($('.catalog-item__subtitle').eq(i).text());
  })
});

function validateForms(form){
  $(form).validate({
  rules: {
    name: {
      required: true,
      minlength: 2
    },
    phone: "required",
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    name: {
      required: "Пожалуйста, введите своё имя",
      minlength: jQuery.validator.format("Введите {0} символа.")
    },
    phone: "Пожалуйста, введите свой номер телефона",
    email: {
      required: "Пожалуйста, введите свой e-mail",
      email: "Неправильно введён e-mail"
    }
  }
});
}
validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

$('input[name=phone]').mask("+7(999) 999-9999");

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "../mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;
});

//scroll and page up

$(window).scroll(function(){
  if ($(this).scrollTop() > 1400) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});
$("a[href^='#']").click(function(){
  var _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});
new WOW().init();
});