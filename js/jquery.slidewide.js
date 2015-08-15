/* =========================================================*/
// jquery.shidewide.js / ver.2.0
// Lisence : MIT License

// Date: 2015-08-09
// Author: CoolWebWindow
// Mail: info@coolwebwindow.com
// Web: http://www.coolwebwindow.com

// Used jquery.js
// http://jquery.com/
/* =========================================================*/

$.fn.slidewide = function(options) {
    // 初期値
    var o = $.extend({
        touch         : true,
        touchDistance : '80',
        autoSlide     : true,
        repeat        : true,
        interval      : 3000,
        duration      : 500,
        easing        : 'swing',
        imgHoverStop  : true,
        navHoverStop  : true,
        prevPosition  : 0,
        nextPosition  : 0,
        viewSlide     : 1,
        baseWidth     : 0
    }, options);

    // セレクタ設定
    var $slider     = $(this),
        $container  = $slider.find('.slideInner'),
        $element    = $container.children(),
        $prevNav    = $slider.find('.slidePrev'),
        $nextNav    = $slider.find('.slideNext'),
        $prevImg    = $slider.find('.slidePrev img'),
        $nextImg    = $slider.find('.slideNext img'),
        $controlNav = $slider.find('.controlNav');

    // 変数設定
    var windowWidth,
        slideWidth,
        totalWidth,
        slidePosition,
        filterWidth,
        filterHeight,
        imgMargin,
        imgPadding,
        prevImgWidth,
        prevImgHeight,
        prevImgYPosition,
        prevImgXPosition,
        nextImgWidth,
        nextImgHeight,
        nextImgYPosition,
        nextImgXPosition,
        count = 1,
        imgNum = 1,
        slideCount = 1,
        stopFlag = false;

    // フィルター設置
    $slider.append('<div class="filterPrev"></div><div class="filterNext"></div>');
    var $filterPrev = $slider.find('.filterPrev'),
        $filterNext = $slider.find('.filterNext');

    // スライド画像複製
    $('li', $container).clone().prependTo($container);
    $('li', $container).clone().appendTo($container);

    // 最後の画像を最初に移動
    $('li:last-child', $container).prependTo($container);

    // スライドの標準サイズ設定
    if(o.baseWidth == 0) {
        o.baseWidth = $element.width();
    }

    // ストップモード時PREVボタン非表示
    if (!o.repeat) {
        $prevNav.hide();
    }

    // スライド設置
    $(window).on('load resize', function(){
        windowWidth = $('body').width();
        if(windowWidth < o.baseWidth){
            $slider.find('img').css({width : windowWidth});
        }

        // 各値取得
        slideWidth = $slider.find('li').outerWidth(true);
        totalWidth = ($slider.find('li').length * slideWidth);
        imgMargin = parseInt($element.find('img').css('margin-left'));
        imgPadding = parseInt($element.find('img').css('padding-left'));
        filterWidth = ((windowWidth - slideWidth * o.viewSlide) / 2) - (imgMargin + imgPadding);
        filterHeight = $slider.find('li').height();
        prevImgWidth = parseInt($prevImg.css('width'));
        prevImgHeight = parseInt($prevImg.css('height'));
        prevImgYPosition = (filterHeight- prevImgHeight) / 2;
        prevImgXPosition = filterWidth - prevImgWidth + o.prevPosition;
        nextImgWidth = parseInt($nextImg.css('width'));
        nextImgHeight = parseInt($nextImg.css('height'));
        nextImgYPosition = (filterHeight- nextImgHeight) / 2;
        nextImgXPosition = filterWidth - nextImgWidth + o.nextPosition;

        // スマートフォンの場合はスライド画像を1枚ずつ表示
        if('ontouchstart' in document) {
            slidePosition = ((windowWidth - totalWidth ) / 2) - (slideWidth / 2);
        } else {
            slidePosition = ((windowWidth - totalWidth ) / 2) - (slideWidth / 2) - (slideWidth * (0.5* o.viewSlide -0.5));
        }

        // スライドショーの横幅再調整
        if(windowWidth < o.baseWidth){
            slidePosition = ((windowWidth - totalWidth ) / 2) - (slideWidth / 2);
       }

        // CSS
        $slider.css({
            'width' : 100 + '%',
            'height' : filterHeight
        });
        $container.css({
            'float' : 'left',
            'width' : totalWidth,
            'top'   : '0',
            'left'  : slidePosition,
            'margin-left'  : -slideWidth
        });

        $element.css({'width' : slideWidth , 'height' : filterHeight});
        $prevNav.css({'width' : filterWidth , 'height' : filterHeight});
        $prevNav.css({'top' : '0' , 'left' : '0'});
        $prevImg.css({'top' : prevImgYPosition , 'left' : prevImgXPosition});
        $nextNav.css({'width' : filterWidth , 'height' : filterHeight});
        $nextNav.css({'top' : '0' , 'right' : '0'});
        $nextImg.css({'top' : nextImgYPosition , 'right' : nextImgXPosition});
        $filterPrev.css({'width' : filterWidth , 'height' : filterHeight});
        $filterNext.css({'width' : filterWidth , 'height' : filterHeight});

        // タッチパネルはPREV/NEXTボタン非表示
        if('ontouchstart' in document) {
            $prevNav.hide();
            $prevImg.hide();
            $nextNav.hide();
            $nextImg.hide();
        }
    });

    // コントールナビデザイン
    var controlNavDesign = function () {
        $controlNav.children('span').removeClass('current');
        $controlNav.children('span:eq(' + (count -1) + ')').addClass('current');
    };

    // 自動切り替えスタート
    var start;
    var startTimer = function () {
        start = setInterval(function(){
            nextSlide(slideCount);
        },o.interval);
    };

    // 自動切り替えストップ
    var stopTimer = function () {
         clearInterval(start);
    };

    // ストップ機能
    var slideStop = function () {
        if (!o.repeat) {
            if(count >= $element.length){
                $nextNav.hide();
                stopTimer();
                stopFlag = true;
            }else{
                $nextNav.show();
            }
            if(count == 1){
                $prevNav.hide();
            }else{
                $prevNav.show();
            }
        }
    };

    // カウンター
     var counter = function () {
        if(count > $element.length){
            count = 1;
        }
         if(count == 0){
            count = $element.length;
        }
        slideCount = 1;
    };

    // 左方向スライド
    var prevSlide = function (slideCount) {
        stopTimer();
        $container.not(':animated').animate({
            marginLeft:parseInt($container.css('margin-left')) + (slideWidth * slideCount) + 'px'
        },o.duration,o.easing,
        function(){
            for(i=0; i < slideCount; i++){
                $('li:last-child', $container).prependTo($container);
            }
            $container.css('margin-left',-slideWidth + 'px');
        });
        count = count - slideCount;
        counter();
        controlNavDesign();
        slideStop();
        if(!o.navHoverStop && !stopFlag && o.autoSlide) {
            startTimer();
        }
        if(!stopFlag && o.autoSlide) {
            startTimer();
        }
    }

    // 右方向スライド
    var nextSlide = function (slideCount) {
        stopTimer();
        $container.not(':animated').animate({
            marginLeft:parseInt($container.css('margin-left')) - (slideWidth * slideCount) + 'px'
        },o.duration,o.easing,
        function(){
            for(i=0; i < slideCount; i++){
                $('li:first-child', $container).appendTo($container);
            }
            $container.css('margin-left',-slideWidth + 'px');
        });
        count = count + slideCount;
        counter();
        controlNavDesign();
        slideStop();
        if(!o.navHoverStop && !stopFlag && o.autoSlide) {
            startTimer();
        }
        if(!stopFlag && o.autoSlide) {
            startTimer();
        }
    }

    // 戻るボタン
    $prevNav.click(function(){
        if($container.is(':animated')) {
            return false;
        }
        prevSlide(slideCount);
   });

    // 進むボタン
    $nextNav.click(function(){
        if($container.is(':animated')) {
            return false;
        }
        nextSlide(slideCount);
    });

    // コントローラー生成
    $element.each(function (e) {
        $('<span/>').text(e + 1).appendTo($controlNav)
        .click(function () {
            if($container.is(':animated')) {
                return false;
            }
            if((e + 1) == count) { return false; }
            // 左方向スライド
            if((e + 1) < count) {
                slideCount = count - (e + 1);
                prevSlide(slideCount);
            }
            // 右方向スライド
            if((e + 1) > count) {
                slideCount = (e + 1) - count;
                nextSlide(slideCount);
            }
        });
    });
    $controlNav.find('span:first-child').addClass('current');

    // タッチパネルはホバー動作無効
    if(!('ontouchstart' in document)) {
        // 画像にホバーした際の動作
        if(o.imgHoverStop){
            $container.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    startTimer();
                }
            });
        }

        // ナビゲーションにホバーした際の動作
        if(o.navHoverStop){
            $prevNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });

            $nextNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });

            $controlNav.hover(function() {
                stopTimer();
            },function() {
                if(!stopFlag && o.autoSlide) {
                    stopTimer();
                    startTimer();
                }
            });
        }
    }

    if(o.touch) {
        // タッチパネル対応
        $slider.find('li').on('touchstart', touchStart);
        $slider.find('li').on('touchmove' , touchMove);
        $slider.find('li').on('touchend' , touchEnd);
    }

    // タップした位置をメモリーする
    function touchStart(e) {
        var pos = Position(e);
        $slider.find('li').data('memoryS',pos.x);
    }

    // タップを離した位置をメモリーする
    function touchMove(e) {
        // 位置情報を取得
        var pos = Position(e);
        $slider.find('li').data('memoryE',pos.x);
    }

    // スワイプ（タップした位置からプラスかマイナスかで左右移動を判断）
    function touchEnd(e) {
        var startX = $slider.find('li').data('memoryS');
        var endX = $slider.find('li').data('memoryE');

        // 左から右へスワイプ
        if(startX < endX) {
            if(endX - startX > o.touchDistance){
                if($container.is(':animated')) {
                    return false;
                }
                prevSlide(slideCount);
            }

        // 右から左へスワイプ
        }else{
            if(startX - endX > o.touchDistance){
                if($container.is(':animated')) {
                    return false;
                }
                nextSlide(slideCount);
            }
        }
    }

    // 現在位置を取得
    function Position(e){
        var x = Math.floor(e.originalEvent.touches[0].pageX)
        var y = Math.floor(e.originalEvent.touches[0].pageY);
        var pos = {'x' : x , 'y' : y};
        return pos;
    }

    // 自動スタート設定
    if(o.autoSlide){
        startTimer();
    }

};
