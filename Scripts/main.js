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
  let close = `<div class="mobile_menu_close" onclick="javascript:menu_close()"></div>`
  $('body').prepend(close)

  /*向上滑到頂*/
  let goTop = `<div class="go_top" onclick="javascript:go_top()"></div>`
  $('body').prepend(goTop)

  /*手機版選單按鈕*/
  let m_nav = `<div class="mobile_nav">
                <span></span>
                <span></span>
                <span></span>
                </div>`
  $('.top_main').prepend(m_nav)

  /*手機板選單 主選單 選單下部*/
  let m_menu = document.querySelector('nav').innerHTML
  let m_menu_login = document.querySelector('.toolbar li.login_btn').outerHTML //抓取PC版 登入html
  let m_menu_user = document.querySelector('.toolbar li.user_btn').outerHTML //抓取PC版 會員html
  let m_menu_cart = document.querySelector('.toolbar li.cart_btn').outerHTML //抓取PC版 購物車html

  let m_menu_template =
    `<div class="mobile_menu">
                            <div class="main">` +
    m_menu +
    `</div>
                            <div class="bottom">
                              <ul>` +
    m_menu_login +
    m_menu_user +
    m_menu_cart +
    `</ul>
                            </div>
                          </div>`
  $('.top_main').prepend(m_menu_template)

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
/*$(document).on('click', '.go_top', function () {
  $('html,body').animate({ scrollTop: 0 }, 900)
})*/
function go_top(){
  $('html,body').animate({ scrollTop: 0 }, 900)
}

/*卷軸置最新消息*/
$(document).on('click', '.go_to', function () {
  let t = $('#news').offset()
  $('html,body').animate({ scrollTop: t.top }, 900)
})

/*手機選單開啟關閉*/
$(document).on('click', '.mobile_nav', function () {
  $('.mobile_nav').toggleClass('active')
  $('.mobile_menu').toggleClass('active')
  $('.search_bar').removeClass('active')

  if (
    $('.search_bar').hasClass('active') ||
    $('.mobile_menu').hasClass('active')
  ) {
    $('.mobile_menu_close').addClass('active')
  } else {
    $('.mobile_menu_close').removeClass('active')
  }
})

/*pc版會員、購物車選單開啟關閉*/
$(document).on('click', '.toolbar li.sub a', function () {
  let t = $(this.parentNode).hasClass('active')

  $('.toolbar li.sub').removeClass('active')
  $('.search_bar').removeClass('active')
  if (!t) {
    $(this.parentNode).addClass('active')
  }
})

/*手機版子選單開關*/
$(document).on('click', '.mobile_menu .main li.sub a', function () {
  $(this.parentNode).toggleClass('active')
})

/*手機版會員、購物車選單開啟關閉*/
$(document).on('click', '.mobile_menu .bottom li.sub a', function () {
  let t = $(this.parentNode).hasClass('active')

  $('.mobile_menu .bottom li.sub').removeClass('active')
  if (!t) {
    $(this.parentNode).addClass('active')
  }
})

/*搜尋bar開啟關閉*/
$(document).on('click', '.search_btn', function () {
  $('.toolbar li.sub').removeClass('active')
  $('.search_bar').toggleClass('active')
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')

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
/*$(document).on('click', '.mobile_menu_close', function () {
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')
  $('.mobile_menu_close').removeClass('active')
  $('.search_bar').removeClass('active')
})*/
function menu_close(){
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')
  $('.mobile_menu_close').removeClass('active')
  $('.search_bar').removeClass('active')
}

/*據點 地圖 */
const map = {
  juming: {
    img: '據點_新北333X190.png',
    title: '新北市-朱銘美術館',
    addr: '208新北市金山區西勢湖2號',
  },
  hpipark: {
    img: '據點_基隆333X190.png',
    title: '基隆-和平島公園',
    addr: '202基隆市中正區平一路360號',
  },
  woody: {
    img: '據點_宜蘭333X190.png',
    title: '宜蘭-國立傳統藝術中心(宜蘭園區)-青木工坊·傳藝館',
    addr: '26841宜蘭縣五結鄉五濱路二段201號(青木工坊)',
  },
  cmcp: {
    img: '據點_彰化333X190.png',
    title: '彰化-成美文化園區',
    addr: '512彰化縣永靖鄉中山路二段60號',
  },
  hinoki: {
    img: '據點_嘉義333X190.png',
    title: '嘉義-檜意森活村',
    addr: '600嘉義市東區林森東路1號',
  },
}
$(document).on('click', 'g.map_btn', function () {
  let h = $(this).attr('class').indexOf('active')
  let s = $(this).attr('id')
  let path = './Content/img/location/'

  $('g.map_btn').attr('class', 'map_btn')

  $('.popup').removeClass('active')
  $('.popup .img img').attr('src', '')

  if(s=='woody'){
    $('.popup').addClass('red')
  }else{
    $('.popup').removeClass('red')
  }

  if (h < 0) {
    $(this).attr('class', 'map_btn active')
    setTimeout(function () {
      $('.popup .img img').attr('src', path + map[s]['img'])
      $('.popup .text .title').text(map[s]['title'])
      $('.popup .text .addr').text(map[s]['addr'])
      $('.popup').addClass('active')
    }, 300)
  } else {
    $('.popup').removeClass('active')
  }
})
/*據點 手機關閉*/
$(document).on('click', '.popup .cross_btn', function () {
  $('g.map_btn').attr('class', 'map_btn')
  $('.popup').removeClass('active')
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
