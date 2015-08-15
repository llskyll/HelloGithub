<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>フリーHTML5/CSS3ホームページテンプレート NO.003</title>
<meta name="viewport" content="width=device-width">
<meta name="keywords" content="">
<meta name="description" content="">
<link rel="stylesheet" type="text/css" href="css/style.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/jquery.smoothscroll.js"></script>
<script type="text/javascript" src="js/jquery.scrollshow.js"></script>
<script type="text/javascript" src="js/jquery.rollover.js"></script>
<script type="text/javascript" src="js/jquery.slidewide.js"></script>
<script>
$(function(){
    $('html').smoothscroll({easing : 'swing', speed : 1000, margintop : 10});
    $('.totop').scrollshow({position : 500});
    $('.slide').slidewide({
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
        baseWidth     : 940

    });
    $('.slidePrev img').rollover();
    $('.slideNext img').rollover();
    });
</script>
<?php
	require_once "util.php";
	$arrayGame = getGameList();
?>
<!--[if lt IE 9]>
   <script src="js/html5shiv.js"></script>
   <script src="js/css3-mediaqueries.js"></script>
<![endif]-->
</head>
<body>
<header>
    <h1><a href="index.html">HTML5/CSS3デザインテンプレート</a></h1>
    <div class="contact"><a href="index.html">お問い合わせ</a></div>
    <p class="summary">
    この箇所はホームページの説明文など記載するのに最適です。だいたい1行程度で収めるのがよいかと思います。
    </p>
</header>
<nav>
    <h3>メニュー</h3>
    <ul>
        <li><a href="index.html">HOME</a></li>
        <li><a href="index.html">メニュー・料金</a></li>
        <li><a href="index.html">ご予約</a></li>
        <li><a href="index.html">ブログ</a></li>
        <li><a href="index.html">お問い合わせ</a></li>
        <li><a href="sample.html">SAMPLE</a></li>
    </ul>
</nav>
<div class="slide">
    <ul class="slideInner">
        <li><a href="index.html"><img src="images/c9.jpg" width="743" height="231" alt=""></a></li>
        <li><a href="index.html"><img src="images/TERA.jpg" width="743" height="231"alt=""></a></li>
        <li><a href="index.html"><img src="images/DQ10.jpg"width="743" height="231" alt=""></a></li>
    </ul>
    <div class="slidePrev"><img src="images/nav_prev.png" alt="前へ"></div>
    <div class="slideNext"><img src="images/nav_next.png" alt="次へ"></div>
    <div class="controlNav"></div>
</div><!-- /.slide -->

<div id="contents">
<div class="topNavi">
	<?php 
		for ($count = 0; $count< count($arrayGame); $count++) {
	?>
			<div class="topNaviColumn">
			<a class="topNaviCon" href="clickUp.php?gameId=<?php echo $arrayGame[$count]['gameId'] ?>"/>
				<p>順位：<?php echo $count + 1 ?></p>
				<h2><?php echo $arrayGame[$count]['gameName'] ?></h2>
				<div class="topNaviPhoto">
					<img src="images/<?php echo $arrayGame[$count]['gameImg'] ?>" alt="" width="150" height="150" />
				</div>
				<p>クリック数:<?php echo $arrayGame[$count]['clickCount'] ?></p>
				
			</a>
			
		    </div><!-- /.topNaviColumn -->
    <?php
        }
    ?>
</div><!-- /.topNavi -->
<div id="main">
<section>
    <h2>INFORMATION</h2>
    <dl class="info">
       <dt><span>20XX-01-01</span></dt>
       <dd>
             更新情報などを掲載するのに便利なデザインです。dlタグに『class="info"』を追加してください。
       </dd>
       <dt><span>20XX-01-01</span></dt>
       <dd>
             更新情報などを掲載するのに便利なデザインです。
       </dd>
    </dl>
</section>
<section>
    <div class="photo">
        <h3>見出し</h3>
        <div class="imgL"><img src="images/photo.png" alt=""></div>
        <p>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
    </div><!-- /.photo -->
    <div class="photo">
        <h3>見出し</h3>
        <div class="imgR"><img src="images/photo.png" alt=""></div>
        <p>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </p>
    </div><!-- /.photo -->
</section>
</div><!-- /#main -->
<div id="sub">
    <h3>h3タグ</h3>
    <p>
    サブコンテンツはバナーを掲載するのに便利です。ulタグに『class="bnr"』とすれば、きれいに画像が並びます。
    </p>
    <ul class="bnr">
        <li><a href="index.html"><img src="images/banner.png" alt=""></a></li>
        <li><a href="index.html"><img src="images/banner.png" alt=""></a></li>
        <li><a href="index.html"><img src="images/banner.png" alt=""></a></li>
        <li><a href="index.html"><img src="images/banner.png" alt=""></a></li>
    </ul>
</div><!-- /#sub -->
</div><!-- /#contents -->
<footer>
    <div class="footmenu">
        <ul>
            <li><a href="index.html">HOME</a></li>
            <li><a href="index.html">メニュー・料金</a></li>
            <li><a href="index.html">ご予約</a></li>
            <li><a href="index.html">ブログ</a></li>
            <li><a href="index.html">お問い合わせ</a></li>
            <li><a href="sample.html">SAMPLE</a></li>
        </ul>
    </div><!-- /.footmenu -->
    <div class="copyright">Copyright &#169; 20XX - 20XX SITENAME All Rights Reserved.</div><!-- /.copyright -->
</footer>
<div class="totop"><a href="#"><img src="images/totop.png" alt="ページのトップへ戻る"></a></div><!-- /.totop -->
</body>
</html>