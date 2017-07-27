// header mobile
$('.x-wrapper').click(function() {
  $('.nav-header-mobile').toggleClass('open');
  $('body').css('overflow','hidden')
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
var G = {
  header: $('.nav-header'),
  toTop: $('#totop'),
  bodyCST: document.body.scrollTop || document.documentElement.scrollTop,
};
  G.bodyPST = G.bodyCST;
$(window).on({
  scroll: function() {
    G.bodyPST = G.bodyCST;
    G.bodyCST = document.body.scrollTop || document.documentElement.scrollTop;
    G.bodyDir = G.bodyPST > G.bodyCST ? -1 : 1;
    if(G.bodyCST > 800) {
      G.toTop.css({opacity: 1});
    } else {
      G.toTop.css({opacity: 0});
    }
  }
});
  $(G.toTop).click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 500);
});