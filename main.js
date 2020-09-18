/*產生選單、搜尋開啟遮幕*/
$(document).ready(function () {
    let close = document.createElement('div')
    close.className = 'mobile_menu_close'
    document.body.prepend(close)
})

/*偵測向上滑動按鈕 超過輪播區塊 才會出現*/
$(window).scroll(function () {
    let win_h = $(document).scrollTop()
    let header_h,overhead_h
    if ($('.slider_block').length) {
        header_h = $('.slider_block').offset().top
        overhead_h = $('.slider_block').height()
    } else {
        header_h = 400
        overhead_h = 0
    }
    
    if (win_h > header_h + overhead_h - 5) {
        $('.go_top').addClass('active')
    } else {
        $('.go_top').removeClass('active')
    }
})

/*卷軸置頂*/
$('.go_top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 900)
})

/*卷軸置最新消息*/
$('.go_to').click(function () {
    let t = $('#news').offset()
    $('html,body').animate({ scrollTop: t.top }, 900)
})

/*手機選單開啟關閉*/
$('.mobile_nav').click(function () {
    $('.mobile_nav').toggleClass('active')
    $('.mobile_menu').toggleClass('active')

    if (
        $('.search_bar').hasClass('active') ||
        $('.mobile_menu').hasClass('active')
    ) {
        $('.mobile_menu_close').addClass('active')
    } else {
        $('.mobile_menu_close').removeClass('active')
    }
})

/*手機子選單開啟關閉*/
$('li.m_sub').click(function () {
    $(this).toggleClass('active')
})

/*搜尋bar開啟關閉*/
$('.search_btn').click(function () {
    $('.search_bar').toggleClass('active')

    if (
        $('.search_bar').hasClass('active') ||
        $('.mobile_menu').hasClass('active')
    ) {
        $('.mobile_menu_close').addClass('active')
    } else {
        $('.mobile_menu_close').removeClass('active')
    }
})

/*點擊遮幕關閉選單及搜尋*/
$(document).on('click', '.mobile_menu_close', function () {
    $('.mobile_nav').removeClass('active')
    $('.mobile_menu').removeClass('active')
    $('.mobile_menu_close').removeClass('active')
    $('.search_bar').removeClass('active')
})
