$('.search').click(function () {
  $('.search_bar').toggleClass('active');
});

$(window).scroll(function() {
    let win_h = $(document).scrollTop();
    let header_h = $('.silder_block').offset().top;
    let overhead_h = $('.silder_block').height();

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
