$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
  });

  $('.owl-carousel').owlCarousel({
    items:3,
    loop:true,
    margin:10,
    nav:true,
    autoHeight: true
});

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