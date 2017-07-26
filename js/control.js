// header mobile
$('.x-wrapper').click(function() {
  $('.nav-header-mobile').toggleClass('open');
  if($('.nav-header-mobile').hasClass('open')){
    $('.introduction').css('display','none');   
  } else {
    $('.introduction').css('display','block');   
  }
});
$('.header-center > li > a').click(function() {
  $(this).next().slideToggle(300);
  $(this).toggleClass('first-open');
});
$('.header-center .multi > a').click(function() {
  $(this).next().slideToggle(300);
  $(this).toggleClass('second-open');
});