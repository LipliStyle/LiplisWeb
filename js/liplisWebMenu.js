//=======================================================================
//  ClassName : LiplisWebMenu
//  概要      : メニュー制御
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

$(function(){
	var opened = 0;
	$("#dock li ul").height($(window).height());
	
	$("#dock .panelTag").click(function(){
		if(opened == 0)
		{
			$(this).find("ul.free").animate({right:"-320px"}, 200);
			opened = 1;
		}
		else
		{
			$(this).find("ul").animate({right:"30px"}, 200);
			opened = 0;
		}
	});
	
	//ブロックハンドラ
	$("#dock .clickBlock").click(function(event) {
		//イベント続行をキャンセル
		event.stopPropagation();
	});
}); 