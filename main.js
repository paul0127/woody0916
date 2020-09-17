$(document).ready(function() {
  let close = document.createElement('div')
  close.className ='mobile_menu_close'
  document.body.prepend(close)
})

$('.search_btn').click(function () {
  $('.search_bar').toggleClass('active');
});

$(window).scroll(function() {
    let win_h = $(document).scrollTop();
    let header_h = $('.slider_block').offset().top;
    let overhead_h = $('.slider_block').height();

    if(win_h > (header_h + overhead_h - 5)){
        $('.go_top').addClass('active')
    }else{
        $('.go_top').removeClass('active')
    }
})

$('.go_top').click(function () {
  $('html,body').animate({ scrollTop: 0 }, 900);
});

$('.go_to').click(function () {
  let t = $('#news').offset();
  $('html,body').animate({ scrollTop: t.top }, 900);
});

$('.mobile_nav').click(function () {
  $('.mobile_nav').toggleClass('active');
  $('.mobile_menu').toggleClass('active')
  $('.mobile_menu_close').toggleClass('active')
});

$(document).on('click','.mobile_menu_close',function(){
  $('.mobile_nav').toggleClass('active');
  $('.mobile_menu').toggleClass('active')
  $('.mobile_menu_close').toggleClass('active')
})
