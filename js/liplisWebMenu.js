//=======================================================================
//  ClassName : LiplisWebMenu
//  概要      : メニュー制御
//
//  LiplisWeb
//  Copyright(c) 2011-2013 LipliStyle sachin. All Rights Reserved. 
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