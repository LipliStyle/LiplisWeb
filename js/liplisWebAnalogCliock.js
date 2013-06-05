//=======================================================================
//  ClassName : LiplisWeb
//  概要      : リプリスウェブ
//
//  LiplisWeb
//  Copyright(c) 2011-2013 LipliStyle sachin. All Rights Reserved. 
//=======================================================================

///====================================================================
/// 表示用オブジェクト
var EnableColorDialog = 0;				//色設定スクリプト認識用
var PreviousRefreshSecond = -1;			//前回表示を更新したときの秒
var CenterPointX;						//中心の座標
var CenterPointY;
var Clock_Display;						//時計のディスプレイ
var Clock_Display_Id = 'liplisClock';
var Clock_Display_Width;				//表示領域の大きさ
var Clock_Display_Height;
var AnalogClock_FrameRadius;			//アナログ時計の基本の半径


//onLoadイベントをセット
window.onload = AnalogClock_Load;

///====================================================================
///
///                        初期化処理
///                         
///====================================================================

/// <summary>
/// ロード処理
/// </summary>
function AnalogClock_Load(){

	//時計の表示領域を取得
	Clock_Display = document.getElementById(Clock_Display_Id);

	//時計の枠を表示
	Clock_Display.style.display='block';

	//時計の表示領域の大きさを取得
	Clock_Display_Height = Clock_Display.offsetHeight - 2;
	Clock_Display_Width = Clock_Display.offsetWidth - 2;

	//中心の座標を計算
	CenterPointY = Clock_Display_Height / 2;
	CenterPointX = Clock_Display_Width / 2;

	//絵画する半径を求める
	if (Clock_Display_Height >= Clock_Display_Width) AnalogClock_FrameRadius = (Clock_Display_Width / 2);
	else AnalogClock_FrameRadius = (Clock_Display_Height / 2);

	//イベントを設定
	Clock_Display.onresize = AnalogClock_Resize;

	//時計のパーツを生成
	OutputClockDisplay();

	//色設定が可能なら設定を読み込み、title属性を書き込む
	if (EnableColorDialog){
	CreateColorDialog(Clock_Display);
	}

	//時計のパーツの位置を決定
	DrawDot();

	//時計の針を描く
	RefreshLine();
}

///====================================================================
///
///                        時計描画処理
///                         
///====================================================================


/// <summary>
/// 点を描く
/// </summary>
function DrawDot(){
	var i;
	var Dot_Radius;
	var Number_Radius;

	//絵画する半径を求める
	Dot_Radius = AnalogClock_FrameRadius * 0.95;
	Number_Radius = AnalogClock_FrameRadius * 0.85;

	for (i=0; i<60; i++){
	//点の座標を決定して動かす

	if (i % 5 == 0){
	document.getElementById('Dot_' + (i + 1)).style.left = CenterPointX + (Math.sin((i * 6) * Math.PI / 180) * Dot_Radius) + 'px';
	document.getElementById('Dot_' + (i + 1)).style.top = CenterPointY - (Math.cos((i * 6) * Math.PI / 180) * Dot_Radius) + 'px';
	//数字の座標を決定して動かす
	//document.getElementById('Number_' + ((i / 5) + 1)).style.left = (CenterPointX + (Math.sin(((i * 6) + 30) * Math.PI / 180) * Number_Radius) - 2.5) + 'px';
	//document.getElementById('Number_' + ((i / 5) + 1)).style.top = (CenterPointY - (Math.cos(((i * 6) + 30) * Math.PI / 180) * Number_Radius) - 5) + 'px';
	}
	}
	//y=(q-b)/(p-a)*(x-p)+q
	//※a:円の中心のx座標
	//b:円の中心のy座標
	//(p,q):接点

}

/// <summary>
/// 針を更新する
/// </summary>
function RefreshLine(){
	var nowTime=new Date();
	var nowSecond;
	var nowMinute;
	var nowHour;

	//現在の時間を取得
	nowSecond=nowTime.getSeconds();
	nowMinute = nowTime.getMinutes();
	nowHour = nowTime.getHours();

	//前回更新したときと時刻が変わっていたら画面を更新
	if (PreviousRefreshSecond != nowSecond){
	var SinValue;
	var CosValue;
	var i;
	var FrameRadius;

	//更新時刻を記録
	PreviousRefreshSecond = nowSecond;

	//絵画する半径を求める
	if (Clock_Display_Height >= Clock_Display_Width) FrameRadius = (Clock_Display_Width / 2);
	else FrameRadius = (Clock_Display_Height / 2);

	//秒針の書き換え
	//SinValue = Math.sin((90 - (6 * nowSecond)) * Math.PI / 180);
	//CosValue = Math.cos((90 - (6 * nowSecond)) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.8; i++){
	document.getElementById('SecondHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('SecondHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}

	//分針の書き換え
	SinValue = Math.sin((90 - ((6 * nowMinute) + (0.1 * nowSecond))) * Math.PI / 180);
	CosValue = Math.cos((90 - ((6 * nowMinute) + (0.1 * nowSecond))) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.65; i++){
	document.getElementById('MinuteHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('MinuteHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}

	//時針の書き換え
	SinValue = Math.sin((90 - ((30 * nowHour) + (0.5 * nowMinute) + ((30 / 3600) * nowSecond))) * Math.PI / 180);
	CosValue = Math.cos((90 - ((30 * nowHour) + (0.5 * nowMinute) + ((30 / 3600) * nowSecond))) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.5; i++){
	document.getElementById('HourHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('HourHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}
	}
	//タイマーをセット
	//setTimeout('RefreshLine()',1000);
	setTimeout('RefreshLine()',60000);
}


/// <summary>
/// 画面の大きさを求める
/// </summary>
function AnalogClock_Resize(){
	//時計の表示領域の大きさを取得
	Clock_Display_Height = Clock_Display.offsetHeight - 2;
	Clock_Display_Width = Clock_Display.offsetWidth - 2;

	//中心の座標を計算
	CenterPointY = Clock_Display_Height / 2;
	CenterPointX = Clock_Display_Width / 2;

	//時計のパーツの位置を決定
	DrawDot();
}

/// <summary>
/// 時計盤の表示を書き出す
/// </summary>
function OutputClockDisplay(){
	var i;
	var OutputStr = '';

	//周りの点を作成
	for (i=0; i<60; i++){
		if (i % 5){}
		else
		{
			OutputStr += '<div id="Dot_' + (i + 1) + '" class="Clock_Dot_small">&nbsp;</div>';
		}
	}

	//秒針を作成
	for (i=1; i<=AnalogClock_FrameRadius * 0.8; i++) OutputStr += '<div id="SecondHand_' + i + '" class="Clock_SecondHand">&nbsp;</div>';

	//分針を作成
	for (i=1; i<=AnalogClock_FrameRadius * 0.65; i++) OutputStr += '<div id="MinuteHand_' + i + '" class="Clock_MinuteHand">&nbsp;</div>';

	//時針を作成
	for (i=1; i<=AnalogClock_FrameRadius * 0.5; i++) OutputStr += '<div id="HourHand_' + i + '" class="Clock_HourHand">&nbsp;</div>';

	Clock_Display.innerHTML = OutputStr;
}
