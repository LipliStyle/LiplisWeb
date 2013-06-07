//=======================================================================
//  ClassName : LiplisCss
//  概要      : リプリスウェブCSS設定
//
//LiplisWeb
// Copyright  :2013 LipliStyle
// 
// ライセンス : MIT License
// ・本ソフトウェアは無保証です。作者は責任を追いません。
// ・上記の著作権表示を記載して下さい。
// ・上記の２項に同意頂ければ自由に使用して頂けます。
//
//=======================================================================


///==============================================================================================
///
///                              ロード処理
///                         
///==============================================================================================
$(function(){
	
	var width = $(window).width();
	var height = $(window).height();
	
	var bodyWidth = width - 10;
	var bodyHeight = height - 20;
	var lpsWidth = width - 40;
	var msgWidth = width - 45;
	var lpsLeft = width - 90;

	/// <summary>
	/// #liplisWebのCSS
	/// </summary>
	$('#liplisWeb')
		.css('background-image', 'url(window/setting.png)')
		.css('height', bodyHeight + 'px')
		.css('width', bodyWidth + 'px');
	
	/// <summary>
	/// #messageのCSS
	/// </summary>
	$('#message')
		.css('position', 'absolute')
		.css('top', '15px')
		.css('left', '15px')
		.css('width', msgWidth + 'px')
		.css('font-size', 'medium');
	
	/// <summary>
	/// #liplisBodyのCSS
	/// </summary>
	$('#liplisBody')
		.css('position', 'absolute')
		.css('top', '140px')
		.css('left', '10px')
		.css('width', lpsWidth + 'px');
	
	$('#liplisBody img').attr('width',lpsWidth);
	
	
	/// <summary>
	/// #liplisWindowのCSS
	/// </summary>
	$('#liplisWindow')
		.css('position', 'absolute')
		.css('top', '10px')
		.css('left', '10px')
		.css('width', msgWidth + 'px');
		
	$('#liplisWindow img').attr('width',msgWidth);
	

	/// <summary>
	/// #liplisLogListのCSS
	/// </summary>
	$('#liplisLogList')
		.css('height', '445px')
		.css('width', '280px')
		.css('cursor','pointer');

	/// <summary>
	/// #liplisLogListのCSS
	/// </summary>
	$('ul.tabReverse')
		.css('height', '20px')
		.css('float', 'right')
		.css('cursor','pointer');


	/// <summary>
	/// ボタンCSSのセット
	/// </summary>
	setCssSleep(10);
	setCssLiplisLog(10);
	setCssLiplisSetting(10);
	setCssLiplisThinkingNot(lpsLeft);
	setCssLiplisClock(lpsLeft);
	setCssLiplisBattery(lpsLeft);
	
	/// <summary>
	/// ミニボタンCSSのセット
	/// </summary>
	setCssLiplisNextMin();
	setCssLiplisSleepMin();
	setCssLiplisClockMin();
	setCssLiplisBatteryMin();
});



///==============================================================================================
///
///                              CSS作成処理
///                         
///==============================================================================================

/// <summary>
/// スリープCSS
/// </summary>
function setCssSleep(left) {
	$('#liplisSleep')
	    .css('position','absolute')
	    .css('top','240px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_zzz.png)')
	    .css('cursor','pointer');
}


/// <summary>
/// ウェイクアップCSS
/// </summary>
function setCssWaikUp(left) {
	$('#liplisSleep')
	    .css('position','absolute')
	    .css('top','240px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_waikup.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// ログCSS
/// </summary>
function setCssLiplisLog(left) {
	$('#liplisLog')
	    .css('position','absolute')
	    .css('top','300px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_log.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// セティングCSS
/// </summary>
function setCssLiplisSetting(left) {
	$('#liplisSetting')
	    .css('position','absolute')
	    .css('top','360px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_setting.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// シンキングノットCSS
/// </summary>
function setCssLiplisThinkingNot(left) {
	$('#liplisThinking')
	    .css('position','absolute')
	    .css('top','240px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_thinking_not.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// シンキングCSS
/// </summary>
function setCssLiplisThinking(left) {
	$('#liplisThinking')
	    .css('position','absolute')
	    .css('top','240px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_thinking.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// クロックCSS
/// </summary>
function setCssLiplisClock(left) {
	$('#liplisClock')
	    .css('position','absolute')
	    .css('top','300px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_back.png)')
	    .css('cursor','pointer');
}

/// <summary>
/// バッテリーCSS
/// </summary>
function setCssLiplisBattery(left) {
	$('#liplisBattery')
	    .css('position','absolute')
	    .css('top','360px')
	    .css('left', left + 'px')
	    .css('height','48px')
	    .css('width','48px')
	    .css('float','right')
	    .css('background-size','cover')
	    .css('background-image','url(window/battery_100.png)')
	    .css('cursor','pointer');
}

///==============================================================================================
///
///                              ミニアイコン
///                         
///==============================================================================================


/// <summary>
/// ネクストミニ
/// </summary>
function setCssLiplisNextMin() {
	$('#liplisNextMin')
	    .css('height','24px')
	    .css('width','24px')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_next.png)');
}

/// <summary>
/// スリープミニ
/// </summary>
function setCssLiplisSleepMin() {
	$('#liplisSleepMin')
	    .css('height','24px')
	    .css('width','24px')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_zzz.png)');
}


/// <summary>
/// 時計CSSミニ
/// </summary>
function setCssLiplisClockMin() {
	$('#liplisClockMin')
	    .css('height','24px')
	    .css('width','24px')
	    .css('background-size','cover')
	    .css('background-image','url(window/ico_back.png)');
}


/// <summary>
/// バッテリーミニCSS
/// </summary>
function setCssLiplisBatteryMin() {
	$('#liplisBatteryMin')
	    .css('height','24px')
	    .css('width','24px')
	    .css('background-size','cover')
	    .css('background-image','url(window/battery_100.png)');
}