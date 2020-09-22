//FB SDK載入
window.fbAsyncInit = function () {
  FB.init({
    appId: '310984486334688',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.1',
  })
  FB.AppEvents.logPageView()
}
;(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = '//connect.facebook.net/zh_TW/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

$(document).ready(function () {
  /*產生選單、搜尋開啟遮幕*/
  let close = document.createElement('div')
  close.className = 'mobile_menu_close'
  document.body.prepend(close)

  /*向上滑到頂*/
  let goTop = document.createElement('div')
  goTop.className = 'go_top'
  document.body.prepend(goTop)

  /*手機版選單*/
  let m_nav = `<div class="mobile_nav">
                <span></span>
                <span></span>
                <span></span>
                </div>`
  $('.top_main').prepend(m_nav)

  /*首頁banner輪播*/
  if ($('.banner_slider').length) {
    $('.banner_slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    })
  }

  /*首頁最新消息輪播*/
  if ($('.news_slider').length) {
    $('.news_slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    })
  }

  /* 工藝師專區產生手機版圖*/
  let list = document.querySelectorAll('.artisan_item .img img')
  let m_list = document.querySelectorAll('.artisan_item .main')

  list.forEach((item, index) => {
    let src = item.getAttribute('src')
    let img = document.createElement('img')
    img.className = 'm_img'
    img.setAttribute('src', src)
    m_list[index].prepend(img)
  })
})

/*更換網址 query */
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)'
  var replaceText = arg + '=' + arg_val
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi'
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText
    } else {
      return url + '?' + replaceText
    }
  }
  return url + '\n' + arg + '\n' + arg_val
}

/*切換頁數*/
function pageSet(c) {
  var url = location.href
  window.location.href = changeURLArg(url, 'p', c)
}

/*偵測向上滑動按鈕 超過輪播區塊 才會出現*/
$(window).scroll(function () {
  let win_h = $(document).scrollTop()
  let header_h, overhead_h
  if ($('.slider_block').length) {
    header_h = $('.slider_block').offset().top
    overhead_h = $('.slider_block').height()
  } else {
    header_h = 300
    overhead_h = 0
  }

  if (win_h > header_h + overhead_h - 5) {
    $('.go_top').addClass('active')
  } else {
    $('.go_top').removeClass('active')
  }
})

/*卷軸置頂*/
$(document).on('click', '.go_top', function () {
  $('html,body').animate({ scrollTop: 0 }, 900)
})

/*卷軸置最新消息*/
$(document).on('click', '.go_to', function () {
  let t = $('#news').offset()
  $('html,body').animate({ scrollTop: t.top }, 900)
})

/*手機選單開啟關閉*/
$(document).on('click', '.mobile_nav', function () {
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
$(document).on('click', 'li a.down', function () {
  $(this.parentNode).toggleClass('active')
})

/*搜尋bar開啟關閉*/
$(document).on('click', '.search_btn', function () {
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

/*產品內頁 更換圖片 */
$(document).on('click', '.small_pic li', function () {
  $('.small_pic li').removeClass('active')
  $(this).addClass('active')

  let pic = $(this).data('img')
  $('.product_pic .main_pic')[0].setAttribute('src', pic)
})

/*產品內頁 數量增加或減少 n為true=>增加 n為false=>減少*/
function product_qty(n) {
  let q = Number($('#qty').val())
  if (n && q < 10) {
    q = q + 1
  } else if (!n && q > 1) {
    q = q - 1
  }
  $('#qty').val(q)
}

/*產品內頁 判斷數量是否為數字 或超出該範圍*/
function check_number(input) {
  var number_input = input.value

  if (!$.isNumeric(number_input)) {
    $('#qty').val(1)
    return
  }

  if (Number(number_input) <= 0) {
    $('#qty').val(1)
    return
  }

  if (Number(number_input) > 100) {
    $('#qty').val(100)
    return
  }
}

/*產品內頁 商品描述tab切換*/
$(document).on('click', '.tab_nav li', function () {
  $('.tab_nav li').removeClass('active')
  $(this).addClass('active')

  $('.tab_panel').removeClass('active')
  let t = '#' + $(this).data('tab')
  $(t).addClass('active')
})

//產品內頁 fb分享
$(document).on('click', '#fbshare', function () {
  FB.ui(
    {
      method: 'share',
      mobile_iframe: true,
      href:
        'https://www.i7fresh.tw/Product/ProductDetail/fd183c95-839c-4df8-be5c-633562227ee6',
    },
    function (response) {
      if (response && !response.error_message) {
        //alert('Posting completed.');
        alert('分享成功')
      } else {
        //alert('Error while posting.');
        //alert('發生錯誤');
      }
    }
  )
})
