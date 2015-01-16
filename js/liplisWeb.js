//=======================================================================
//  ClassName : LiplisWeb
//  概要      : リプリスウェブ
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

///====================================================================
///
///                          データオブジェクト
///                         
///====================================================================

///====================================================================
/// 表示用オブジェクト
var lpsGlb;
var lpsBdyLst;
var lpsGreetLst;
var lpsConst;
var lpsWindow;
var lpsSettingDefine;

///====================================================================
///
///                        ページ読み込み時処理
///                         
///====================================================================


//バッテリー情報の初期化
window.addEventListener("load", function () {
	var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

	if (!battery) {
		return;
	}
	
	battery.addEventListener("chargingchange", function () {
		if (battery.charging) {
			chattingTest('充電開始ですっ!');
		} else {
			chattingTest('充電停止です。');
		}
	}, false);

	battery.addEventListener("levelchange", function () {
		chattingTest('充電レベルが変更されました。現在の値は ' + this.level + ' です');
	}, false);
}, false);

///====================================================================
///
///                             初期化処理
///                         
///====================================================================

/// <summary>
/// 初期化
/// </summary>
function init() {

	//オブジェクトの初期化
	lpsGlb = new liplisGlobal();

	//定数クラスの初期化
	lpsConst = new liplisConst();

	//グリートリストの初期化
	lpsGreetLst = new objChat();

	//設定定義クラスの初期化
	lpsSettingDefine = new liplisSettingDefine();

	//ユーザーエージェントの取得
	getUserAgent();

	//エモーションオブジェクトを取得する
	loadLpsGlb();
	
	//ウインドウオブジェクトを取得する
	loadLpsWindow();

	// リフレッシュタイマーの設定
	startTimer();

	// アップデートタイマーの設定
	setFreqence(10000);

	//初期化セットタイマーのセット
	setInitTimer();

	//挨拶
	greet();
}


/// <summary>
/// createObjBody
/// ボディオブジェクトを作成する
/// </summary>
function createObjBody(emotionStr) {
	//結果ボディ配列
	var bodyList = [];

	//カウンタ
	var i = 0;

	//目/口オブジェクト
	var eye_1_c;
	var eye_1_o;
	var eye_2_c;
	var eye_2_o;
	var eye_3_c;
	var eye_3_o;
	
	//xmlオブジェクトから要素を取り出す
	eye_1_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "11");
	eye_1_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "12");
	eye_2_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "21");
	eye_2_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "22");
	eye_3_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "31");
	eye_3_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "32");

	//ボディ配列に格納する
	for (i = 0; i < eye_1_c.length; i = i + 1) {
		bodyList.push(new objBody(eye_1_c[i].childNodes[0].nodeValue, eye_1_o[i].childNodes[0].nodeValue, eye_2_c[i].childNodes[0].nodeValue, eye_2_o[i].childNodes[0].nodeValue, eye_3_c[i].childNodes[0].nodeValue, eye_3_o[i].childNodes[0].nodeValue));
	}

	return bodyList;
}


/// <summary>
/// createObjBodySleep
/// スリープオブジェクトを作成する
/// </summary>
function createObjBodySleep(emotionStr) {
	//結果ボディ配列
	var bodyList = [];

	//カウンタ
	var i = 0;

	//目/口オブジェクト
	var eye_1_c;
	var eye_1_o;
	var eye_2_c;
	var eye_2_o;
	var eye_3_c;
	var eye_3_o;
	
	//xmlオブジェクトから要素を取り出す
	eye_1_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "11");
	eye_1_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "12");
	eye_2_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "21");
	eye_2_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "22");
	eye_3_c = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "31");
	eye_3_o = lpsGlb.xmlEmotion.getElementsByTagName(emotionStr + "32");

	//ボディ配列に格納する
	for (i = 0; i < eye_1_c.length; i = i + 1) {
		bodyList.push(new objBody(eye_1_c[i].childNodes[0].nodeValue, eye_1_o[i].childNodes[0].nodeValue, eye_2_c[i].childNodes[0].nodeValue, eye_2_o[i].childNodes[0].nodeValue, eye_3_c[i].childNodes[0].nodeValue, eye_3_o[i].childNodes[0].nodeValue));
	}

	return bodyList;
}

/// <summary>
/// loadLpsWindow
/// ウインドウオブジェクトを取得する
/// </summary>
function loadLpsWindow() {
	//ウインドウオブジェクト
	lpsWindow = new objLiplisWindow();
	setWindow(0);
	return;
}

///==============================================================================================
///
///                         設定関連処理
///                         
///==============================================================================================


/// <summary>
///initSetting
/// 設定の初期化
/// </summary>
function initSetting() {
	//設定値の反映
	setSettingChatMode();
	setSettingActiveMode();
	setSettingGenreNews();
	setSettingGenre2ch();
	setSettingGenreNico();
	setSettingWindow();
	setSettingFlgSkipOn();
	return;
}


/// <summary>
/// setSettingChatMode
/// チャットモードをセット
/// </summary>
function setSettingChatMode() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}

	if (localStorage[lpsSettingDefine.chatMode]) {
		lpsGlb.chatMode = localStorage[lpsSettingDefine.chatMode];
	} else {
		localStorage[lpsSettingDefine.chatMode] = 0;
		lpsGlb.chatMode= 0;
	} 

	$("input[name='freqlist']:eq("+ lpsGlb.chatMode +")").attr("checked", true);
	return;
}


/// <summary>
/// setSettingActiveMode
/// アクティブモードをセット
/// </summary>
function setSettingActiveMode() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	if (localStorage[lpsSettingDefine.activeMode]) {
		lpsGlb.activeMode = localStorage[lpsSettingDefine.activeMode];
	} else {
		localStorage[lpsSettingDefine.activeMode] = 0;
		lpsGlb.activeMode= 0;
	} 

	$("input[name='activelist']:eq("+ lpsGlb.activeMode +")").attr("checked", true);
	return;
}

/// <summary>
/// setSettingGenreNews
/// ジャンル:ニュースをセットする
/// </summary>
function setSettingGenreNews() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	if (localStorage[lpsSettingDefine.genreNews]) {
		lpsGlb.genreNews = localStorage[lpsSettingDefine.genreNews];
	} else {
		localStorage[lpsSettingDefine.genreNews] = 1;
		lpsGlb.genreNews= 1;
	} 

	$("#" + lpsSettingDefine.genreNews).attr("checked", lpsGlb.genreNews == 1);
	return;
}

/// <summary>
/// setSettingGenreNews
/// ジャンル:2chをセットする
/// </summary>
function setSettingGenre2ch() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	if (localStorage[lpsSettingDefine.genre2ch]) {
		lpsGlb.genre2ch = localStorage[lpsSettingDefine.genre2ch];
	} else {
		localStorage[lpsSettingDefine.genre2ch] = 1;
		lpsGlb.genre2ch= 1;
	} 

	$("#" + lpsSettingDefine.genre2ch).attr("checked", lpsGlb.genre2ch == 1);
	return;
}


/// <summary>
/// setSettingGenreNews
/// ジャンル:ニコニコをセットする
/// </summary>
function setSettingGenreNico() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	if (localStorage[lpsSettingDefine.genrenico]) {
		lpsGlb.genrenico = localStorage[lpsSettingDefine.genrenico];
	} else {
		localStorage[lpsSettingDefine.genrenico] = 1;
		lpsGlb.genrenico= 1;
	} 

	$("#" + lpsSettingDefine.genrenico).attr("checked", lpsGlb.genrenico == 1);
	return;
}

/// <summary>
/// setSettingWindow
/// ウインドウをセットする
/// </summary>
function setSettingWindow() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	if (localStorage[lpsSettingDefine.window]) {
		lpsGlb.window = localStorage[lpsSettingDefine.window];
	} else {
		localStorage[lpsSettingDefine.window] = 0;
		lpsGlb.window= 0;
	} 

	$('#windowlist').val(lpsGlb.window);
	return;
}

/// <summary>
/// setSettingFlgSkipOn
/// スキップフラグをセットする
/// </summary>
function setSettingFlgSkipOn() {
	//IEはブロック。ごめんなさい！
	if (lpsGlb.agent == 'ie') {
		return;
	}
	
	
	if (localStorage[lpsSettingDefine.flgSkipOn]) {
		lpsGlb.flgSkipOn = localStorage[lpsSettingDefine.flgSkipOn];
	} else {
		localStorage[lpsSettingDefine.flgSkipOn] = 0;
		lpsGlb.flgSkipOn= 0;
	} 

	$("#" + lpsSettingDefine.flgSkipOn).attr("checked", lpsGlb.flgSkipOn == 1);

	return;
}

///==============================================================================================
///
///                         イベントハンドラ
///                         
///==============================================================================================

/// <summary>
/// タイマーイベント
/// </summary>
function on_timerRef() {
	chatting();
	chage_body();
	//chage_calendar();   
}

/// <summary>
/// 話題取得タイマーイベント
/// </summary>
function on_timerUpd() {
	loadChatTopic();
}

/// <summary>
/// 初期化タイマーイベント
/// </summary>
function on_timerInit() {
	//設定の反映
	initSetting();
		
	//ウインドウの設定
	setWindow(lpsGlb.window);
	
	//タイマー破棄
	clearInterval(lpsGlb.timerFirstInit);
}


/// <summary>
/// ネクスト クリック
/// </summary>
function nextLiplis() {
	setNext();
}

/// <summary>
/// ストップボタン クリック
/// </summary>
function stopLiplis() {
	setSleep();
}

/// <summary>
/// ジャンプボタン クリック
/// </summary>
function jumpLiplistyle() {
	location.href = "http://liplis.mine.nu";
}

/// <summary>
/// 現在時刻をおしゃべりする
/// </summary>
function chatNowTime() {

	var str = '';
	var strTime = '';
	var nowDate =new Date(); 
	var nowTime= new Date();
	
	//日の取得
	var Yer = nowDate.getFullYear();
	var Mon = nowDate.getMonth()+1;
	var Wek = nowDate.getDay();
	var Day = nowDate.getDate();
	var Yobi= new Array("日","月","火","水","木","金","土");

	//時の取得
	var Hor = nowTime.getHours();
	var Min = nowTime.getMinutes();
	var Sec = nowTime.getSeconds();
	
	//タイムストリング作成
	strTime = Yer+"年"+Mon+"月"+Day+"日 "+Yobi[Wek]+"曜日 " + Hor+"時" + Min + "分" + Sec+"秒";

	//文章作成
	str = lpsGreetLst.nowTime.replace("[?]", strTime) + '　　　';

	//発言
	chattingTest(str)
}

///==============================================================================================
///
///                        タイマー制御
///                         
///==============================================================================================

/// <summary>
/// タイマースタート
/// </summary>
function startTimer() {
	clearInterval(lpsGlb.timerRefresh);
	lpsGlb.timerRefresh = setInterval(on_timerRef, 100);
}

/// <summary>
/// タイマーストップ
/// </summary>
function stopTimer() {
	clearInterval(lpsGlb.timerRefresh);
}

/// <summary>
/// タイマースタート
/// </summary>
function setInitTimer() {
	clearInterval(lpsGlb.timerFirstInit);
	lpsGlb.timerFirstInit = setInterval(on_timerInit, 1000);
}


///==============================================================================================
///
///                        操作応答
///                         
///==============================================================================================

/// <summary>
/// 次の話題
/// 寝ていたら起こす。
/// </summary>
function setNext() {
	if(lpsGlb.sleepFlg == 0)
	{
		if(lpsGlb.chatFlg == 1)
		{
			skipChatting();
		}
		else
		{
			loadChatTopic();
		}
	}
	else
	{
		setCssSleep();
		lpsGlb.sleepFlg = 0;
		lpsGlb.chatFlg = 0;
		selectFreqence();
		loadChatTopic();
	}
}

/// <summary>
/// スリープにする/スリープ解除する
/// </summary>
function setSleep() {
	if(lpsGlb.sleepFlg == 0)
	{
		setCssWaikUp();
		lpsGlb.sleepFlg = 1;
		clearInterval(lpsGlb.timerRefresh);
		clearInterval(lpsGlb.timerUpdate);
		setImage(99);
		message = document.getElementById('message');
		message.innerHTML = "zzz";
	}
	else
	{
		setCssSleep();
		lpsGlb.sleepFlg = 0;
		lpsGlb.chatFlg = 0;
		selectFreqence();
		greet();
	}
}

/// <summary>
/// ログ画面を開く
/// </summary>
function openLog() {
	$('#logListPanel').trigger("click");
}

/// <summary>
/// 設定画面を開く
/// </summary>
function openSetting() {
	$('#settingPanel').trigger("click");
}


///==============================================================================================
///
///                        チャット制御
///                         
///==============================================================================================

/// <summary>
/// チャット
/// </summary>
function chatting() {
	var message;    //メッセージ
	var name;
	//--- チェックフェーズ --------------------
	//チャットフラグチェック
	//alert(lpsGlb.xmlEmotionEndFlg);
	if (lpsGlb.xmlEmotionEndFlg != 1) { return; }
	if (lpsGlb.chatFlg != 1) { return; }

	//nullチェック
	if (!lpsGlb.jsonDoc) {
		if(lpsGlb.skipFlg == 1)
		{
			chatEnd();
		}
		return;
	}

	//nullチェック2
	if (!lpsGlb.jsonDoc.laeList) {
		return;
	}
	//nullチェック3
	if (!lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx]) {
		return;
	}
		
	//nullチェック4
	if (!lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].name) {
		return;
	}

	//--- ワードセット、感情チェックフェーズ --------------------
	//送りワード文字数チェック
	if (lpsGlb.wordIdx >= lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].name.length) {

		do {
			//次ワード遷移
			lpsGlb.nowIdx++;

			if (lpsGlb.nowIdx >= lpsGlb.jsonDoc.laeList.length-1) {
				//チャット終了
				chatEnd();

				//帰る
				return;
			}

			//なうインデックスの初期化
			lpsGlb.wordIdx = 0;

			//ナウワードの初期化
			lpsGlb.nowWord = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].name;

		} while (!lpsGlb.nowWord);

		//エモーション取得
		lpsGlb.prvEmotion = lpsGlb.nowEmotion;
		lpsGlb.nowEmotion = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].emotion;
		lpsGlb.nowPoint = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].point;

		//エモーションチェック
		if (lpsGlb.prvEmotion != lpsGlb.nowEmotion) {
			//前回からエモーションが変化していたらセットする
			setImage(lpsGlb.nowEmotion);
		}

	}
	//初回ワードチェック
	else if (lpsGlb.wordIdx == 0) {
		message = document.getElementById('message');
		message.innerHTML = "";

		lpsGlb.wordIdx = 0;
		lpsGlb.nowWord = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].name;

		//空だったら、空じゃなくなるまで繰り返す
		if (!lpsGlb.nowWord) {
			do {
				//次ワード遷移
				lpsGlb.nowIdx++;

				if (lpsGlb.nowIdx >= lpsGlb.jsonDoc.laeList.length -1) {
					//チャット終了
					chatEnd();

					//帰る
					return;
				}

				//なうインデックスの初期化
				lpsGlb.wordIdx = 0;

				//ナウワードの初期化
				lpsGlb.nowWord = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].name;

			} while (!lpsGlb.nowWord);
		}

		//エモーションチェック
		lpsGlb.prvEmotion = 0;
		lpsGlb.nowEmotion = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].emotion;
		lpsGlb.nowPoint = lpsGlb.jsonDoc.laeList[lpsGlb.nowIdx].point;
		setImage(0);
	}
	//おしゃべり中は何もしない
	else {

	}

	//--- メッセージセットフェーズ --------------------
	//メッセージの取得と次文字のセット
	message = document.getElementById('message');
	lpsGlb.nowReadWord = lpsGlb.nowReadWord + lpsGlb.nowWord.substr(lpsGlb.wordIdx, 1);
	if (lpsGlb.jsonDoc.url == "nonUrl") {
		message.innerHTML = lpsGlb.nowReadWord;
	}
	else {
		message.innerHTML = '<a href="' + lpsGlb.jsonDoc.url + '" target="_blank" style="text-decoration:none;"/>' + lpsGlb.nowReadWord + '</a>';
	}

	lpsGlb.wordIdx++;
}

/// <summary>
/// スキップ
/// </summary>
function skipChatting() {
	//スキップフラグONなら何もしないする
	if(lpsGlb.flgSkipOn == '0')
	{
		return;
	}

	//スキップ済みなら何もしない
	if(lpsGlb.skipFlg == 1)
	{    
		return;
	}
	//スキップする
	lpsGlb.sskipFlg = 1;
	
	while (lpsGlb.chatFlg == 1) {
		if (!lpsGlb.jsonDoc) {
			return;
		}
		chatting();
	}

}

/// <summary>
/// 指定てきすとをおしゃべり
/// </summary>
function chattingTest(str) {
	lpsGlb.xmlDoc = null;
	lpsGlb.jsonDoc = null;
	getText(str);
	chatStart();
}

/// <summary>
/// チャットデータのロード
/// </summary>
function loadChatTopic() {
	if (lpsGlb.sleepFlg == 1) {
		return;
	}
	setCssLiplisLog();
	lpsGlb.xmlDoc = null;
	lpsGlb.jsonDoc = null;
	getShrotNews();
	chatStart();
	setCssLiplisThinkingNot();
}


/// <summary>
/// チャットをスタートする
/// </summary>
function chatStart() {
	lpsGlb.wordIdx = 0;
	lpsGlb.nowIdx = 0;
	lpsGlb.nowWord = "";
	lpsGlb.nowReadWord = "";
	var message = document.getElementById('message');
	if(message)
	{
		message.innerHTML = ""
	}

	lpsGlb.chatFlg = 1;
	startTimer();
}

/// <summary>
/// チャットを終了する
/// </summary>
function chatEnd() {
	lpsGlb.chatFlg = 0;
	lpsGlb.xmlEndFlg = 0;
	lpsGlb.skipFlg = 0;
	appendLog(lpsGlb.nowReadWord, lpsGlb.jsonDoc.url);
	stopTimer();
	
	//アップデートを再開させる
	selectFreqence();
}


/// <summary>
/// 挨拶
/// </summary>
function greet() {
	if (lpsGlb.agent == 'ie') {
		//IEはあいさつエラーとなるので、いきなりしゃべる
		setNext();
	}
	else {
		chattingTest(lpsGreetLst.greet[Math.floor(Math.random() * lpsGreetLst.greet.length)]);
	}
}


/// <summary>
/// 会話頻度の選択
/// </summary>
function selectFrequenceLiplis() {
	selectFreqence();
}

/// <summary>
/// バッテリーインフォ
/// </summary>
function chatBatteryInfo() {
	try {
		var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
	   
		//未対応メッセージ
		if (!battery) {
			chattingTest('Battery Status APIに対応していません。　　　');
			return;
		}
		
		//％表示の文字列に変換
		var batteryStr = String(battery.level*100);
		
		//出力
		chattingTest('現在の充電レベルは' + batteryStr + '%です　　　');
		}
	catch (e) {
		chattingTest('Battery Status APIに対応していません。　　　');
	}

}

/// <summary>
/// 発言頻度の設定
/// </summary>
function selectFreqence() {
	var i;
	var items = document.getElementsByName('freqlist');
	var selIdx = -1;
	//ラジオボタンの選択状況をチェック
	for (i = 0; i <= items.length - 1; i++) {
		if (items[i].checked) {
			selIdx = i;
		}
	}

	if (selIdx != -1) {
		//おしゃべり
		if (selIdx == 0) {
			setFreqence(10000);
			//ふつう
		} else if (selIdx == 1) {
			setFreqence(30000);
			//控えめ
		} else if (selIdx == 2) {
			setFreqence(60000);
		}
		
		//設定の保存
		setLocalStrageData(lpsSettingDefine.chatMode,selIdx);        
	}
}

/// <summary>
/// 発言頻度の設定
/// </summary>
function setFreqence(val) {
	clearInterval(lpsGlb.timerUpdate);
	lpsGlb.timerUpdate = setInterval(on_timerUpd, val);
}

/// <summary>
/// アクティブ度の設定
/// </summary>
function selectActive() {
	var i;
	var items = document.getElementsByName('activelist');
	var selIdx = -1;
	//ラジオボタンの選択状況をチェック
	for (i = 0; i <= items.length - 1; i++) {
		if (items[i].checked) {
			selIdx = i;
		}
	}
	
	if (selIdx != -1) {
		
		//設定の保存
		setLocalStrageData(lpsSettingDefine.activeMode,selIdx);      
	}
}

/// <summary>
/// ジャンルの設定
/// </summary>
function selectGenre() {
	if($('#genreNews').attr('checked'))
	{
		setLocalStrageData(lpsSettingDefine.genreNews,'1'); 
		lpsGlb.genreNews = '1';
	}
	else
	{
		setLocalStrageData(lpsSettingDefine.genreNews,'0'); 
		lpsGlb.genreNews = '0';
	}
	
	if($('#genre2ch').attr('checked'))
	{
		setLocalStrageData(lpsSettingDefine.genre2ch,'1'); 
		lpsGlb.genre2ch = '1';
	}
	else
	{
		setLocalStrageData(lpsSettingDefine.genre2ch,'0'); 
		lpsGlb.genre2ch = '0';
	}
	
	if($('#genrenico').attr('checked'))
	{
		setLocalStrageData(lpsSettingDefine.genrenico,'1'); 
		lpsGlb.genrenico = '1';
	}
	else
	{
		setLocalStrageData(lpsSettingDefine.genrenico,'0'); 
		lpsGlb.genrenico = '0';
	}
}

/// <summary>
/// ウインドウの設定
/// </summary>
function selectWindow() {
	var winIdx = $('#windowlist option:selected').val();
	setWindow(winIdx);
	setLocalStrageData(lpsSettingDefine.window,winIdx); 
	lpsGlb.window = winIdx;
	
}

/// <summary>
/// スキップフラグの設定
/// </summary>
function selectSkip() {
	if($('#flgSkipOn').attr('checked'))
	{
		setLocalStrageData(lpsSettingDefine.flgSkipOn,'1'); 
		lpsGlb.flgSkipOn = '1';
	}
	else
	{
		setLocalStrageData(lpsSettingDefine.flgSkipOn,'0'); 
		lpsGlb.flgSkipOn = '0';
	}
}


///==============================================================================================
///
///                                      画像セット処理
///                         
///==============================================================================================

/// <summary>
/// ボディ変更
/// </summary>
function chage_body() {
	//--- チェックフェーズ --------------------
	//チャットフラグチェック
	//alert(lpsGlb.xmlEmotionEndFlg);
	if (lpsGlb.xmlEmotionEndFlg != 1) { return; }

	//口パクチェック
	if (lpsGlb.chatFlg == 1) {
		
		if (lpsGlb.mouthCnt <= 0) {
			//カウントの初期化
			lpsGlb.mouthCnt = 4;

			if (lpsGlb.blinkCnt <= 0) {
				//まばたきカウントの初期化
				lpsGlb.blinkCnt = getBlinkCnt();
				document.liplisBody.src = lpsGlb.nowObject.Eye1_Mouth1.src;
			}
			else if (lpsGlb.blinkCnt == 1) {
				document.liplisBody.src = lpsGlb.nowObject.Eye2_Mouth1.src;
			}
			else if (lpsGlb.blinkCnt == 2) {
				document.liplisBody.src = lpsGlb.nowObject.Eye3_Mouth1.src;
			}
			else if (lpsGlb.blinkCnt == 3) {
				document.liplisBody.src = lpsGlb.nowObject.Eye2_Mouth1.src;
			}
			else {
				document.liplisBody.src = lpsGlb.nowObject.Eye1_Mouth1.src;
			}
			
		}
		else if (lpsGlb.mouthCnt == 2) {
			if (lpsGlb.blinkCnt <= 0) {
				//まばたきカウントの初期化
				lpsGlb.blinkCnt = getBlinkCnt();
				document.liplisBody.src = lpsGlb.nowObject.Eye1_Mouth2.src;
			}
			else if (lpsGlb.blinkCnt == 1) {
				document.liplisBody.src = lpsGlb.nowObject.Eye2_Mouth2.src;
			}
			else if (lpsGlb.blinkCnt == 2) {
				document.liplisBody.src = lpsGlb.nowObject.Eye3_Mouth2.src;
			}
			else if (lpsGlb.blinkCnt == 3) {
				document.liplisBody.src = lpsGlb.nowObject.Eye2_Mouth2.src;
			}
			else {
				document.liplisBody.src = lpsGlb.nowObject.Eye1_Mouth2.src;
			}

		}
		else {

		}
	}

	lpsGlb.mouthCnt--;
	lpsGlb.blinkCnt--;

	//エモーションチェック
	//とりあえずなし

}

/// <summary>
/// エモーションとボディのマップメソッド
/// 引数   : pEmotion : int
/// 戻り値 : なし(lpsGlb.nowObjectへのセット)
function setImage(pEmotion) {
	try {

		if (pEmotion == 0) {
			lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.normal);
		}
		else if (pEmotion == 1) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.joyP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.joyM);
			}
		}
		else if (pEmotion == 2) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.admirationP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.admirationM);
			}
		}
		else if (pEmotion == 3) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.peaceP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.peaceM);
			}
		}
		else if (pEmotion == 4) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.ecstasyP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.ecstasyM);
			}
		}
		else if (pEmotion == 5) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.amazementP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.amazementM);
			}
		}
		else if (pEmotion == 6) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.rageP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.rageM);
			}
		}
		else if (pEmotion == 7) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.interestP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.interestM);
			}
		}
		else if (pEmotion == 8) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.respectP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.respectM);
			}
		}
		else if (pEmotion == 9) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.calmlyP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.calmlyM);
			}
		}
		else if (pEmotion == 10) {
			if (lpsGlb.nowPoint >= 0) {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.proudP);
			} else {
				lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.proudM);
			}
		}
		else if (pEmotion == 99) {
			lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.sleep);
		}
		else {
			lpsGlb.nowObject = getObjBodyRandom(lpsBdyLst.normal);
		}

		//表示情報の変更
		if(lpsGlb.nowObject.Eye1_Mouth1.src)
		{
			document.liplisBody.src = lpsGlb.nowObject.Eye1_Mouth1.src;
		}
		
	}
	catch (e) {
		//alert(e + "\n" + pEmotion); 
	}
}

/// <summary>
/// まばたき間隔のランダム値取得
/// </summary>
function getBlinkCnt() {
	//return 5 + Math.floor(Math.random()*5+1);
	return 50;
}

/// <summary>
/// ウインドウのマップメソッド
/// 引数   : idx : int
/// 戻り値 : なし(liplisWindowsへのセット)
function setWindow(idx) {
	try {
		if(idx == 0)
		{
			document.liplisWindow.src = lpsWindow.window0.src;
		}
		else if(idx == 1)
		{
			document.liplisWindow.src = lpsWindow.window1.src;
		}
		else if(idx == 2)
		{
			document.liplisWindow.src = lpsWindow.window2.src;
		}
		else if(idx == 3)
		{
			document.liplisWindow.src = lpsWindow.window3.src;
		}
		else if(idx == 4)
		{
			document.liplisWindow.src = lpsWindow.window4.src;
		}
		else if(idx == 5)
		{
			document.liplisWindow.src = lpsWindow.window5.src;
		}
		else if(idx == 6)
		{
			document.liplisWindow.src = lpsWindow.window6.src;
		}
		else
		{
			document.liplisWindow.src = lpsWindow.window0.src;
		}
	}
	catch (e) {
		//alert(e + "\n" + pEmotion); 
	}
}

///==============================================================================================
///
///                                      メッセージ更新処理
///                         
///==============================================================================================

/// <summary>
/// メッセージ変更
/// </summary>
function chage_message(str) {
	var message = document.getElementById('message');
	message.innerHTML = str;
}
function addMessage(str) {
	var message = document.getElementById('message');
	message.innerHTML = message.innerHTML + str;
}

/// <summary>
/// メッセージ変更
/// </summary>
function chage_calendar() {
	var date = new Date();
	var year = ("0000" + date.getFullYear()).slice(-4);
	var mon = ("00" + (date.getMonth() + 1)).slice(-2);
	var day = ("00" + date.getDate()).slice(-2);
	var hour = ("00" + date.getHours()).slice(-2);
	var min = ("00" + date.getMinutes()).slice(-2);
	var sec = ("00" + date.getSeconds()).slice(-2);
	var message = document.getElementById('calendar');
	message.innerHTML = year + "/" + mon + "/" + day + " " + hour + ":" + min + ":" + sec;
}

///==============================================================================================
///
///                                      ログ操作
///                         
///==============================================================================================

/// <summary>
/// ログ追加
/// </summary>
function appendLog(pTitle, pUrl) {
	var title;
	var url;

	if(pTitle)
	{
		title = pTitle;
	}
	else
	{
		title = '';
	}
	
	if(pUrl)
	{
		if(pUrl =='nonUrl')
		{
			url = '';
		}
		else
		{
			url = pUrl;
		}
	}
	else
	{
		url = '';greet
	}

	if(url == '' && title =='')
	{
		return;
	}
	
	$('<li class="logdata"><a href="' + url + '" target="_blank">' + title + '</a></li>').appendTo($('#liplisLogList'));

	//20件以上なら削除する
	if(20 < $('.logdata').size()){
		$("#liplisLogList li:first").remove();
	}	
	
	//IEだとlistview('refresh');が動作しない
	//$('#liplisLogList').listview('refresh');
	//$('#liplisLogList').page();  
}


/// <summary>
/// ログ選択
/// </summary>
function logSelect() {
	var elSel = document.getElementById('liplisLogList');  g
	var w=window.open();w.location.href=elSel.value;
}


///==============================================================================================
///
///                                  ローカルストレージ操作
///                         
///==============================================================================================

/// <summary>
/// setLocalStrage
/// ローカルストレージにデータをセットする
/// 互換性の考慮のため、設定値はstring型とする
/// </summary>
function setLocalStrageData(key,  value)
{
	localStorage[key] = value;
}


///==============================================================================================
///
///                                      汎用処理
///                         
///==============================================================================================

/// <summary>
/// 指定のリストからランダムで1つの要素を取得する
/// 引数   : objBdyLst : objLiplisBodyクラス
/// 戻り値 : objBodyクラス
/// </summary>
function getObjBodyRandom(objBdyLst) {
	var lstCnt = objBdyLst.length;
	var randnum;
	//リストカウントが0の場合はノーマルを返しておく
	if (lstCnt < 1) {
		return null;
	}

	//ランダム値を取得する
	randnum = Math.floor(Math.random() * lstCnt);

	//返す
	return objBdyLst[randnum];

}

/// <summary>
/// あいさつリストからランダムに1つの要素を取得する
/// 引数   : なし
/// 戻り値 : string
/// </summary>
function getObjGreetRandom() {
	var lstCnt = lpsGreetLst.greet.length;
	var randnum;

	//リストカウントが0の場合はノーマルを返しておく
	if (lstCnt < 1) {
		return lpsGreetLst.greet[0];
	}

	//ランダム値を取得する
	randnum = Math.floor(Math.random() * lstCnt);
	alert(lpsGreetLst.greet[0]);
	//返す
	return '';
}


/// <summary>
/// getUserAgent
/// ユーザーエージェントを取得し、liplisオブジェクトに入れる
/// 引数   : なし
/// 戻り値 : なし
/// </summary>
function getUserAgent() {
	var userAgent = window.navigator.userAgent.toLowerCase();

	if (userAgent.indexOf('opera') != -1) {
		lpsGlb.agent = 'opera';
	} else if (userAgent.indexOf('msie') != -1) {
		lpsGlb.agent = 'ie'
	} else if (userAgent.indexOf('chrome') != -1) {
		lpsGlb.agent = 'chrome'
	} else if (userAgent.indexOf('safari') != -1) {
		lpsGlb.agent = 'safari'
	} else if (userAgent.indexOf('gecko') != -1) {
		lpsGlb.agent = 'gecko'
	} else {
		lpsGlb.agent = 'other'
	}

}

/// <summary>
/// sleep
/// スリープ
/// 引数   : なし
/// 戻り値 : なし
/// </summary>
function sleep(ms) {
	var d1 = new Date().getTime();
	var d2 = new Date().getTime();
	while (d2 < d1 + ms) {    //T秒待つ 
		d2 = new Date().getTime();
	}
	return;
} 


/// <summary>
/// sleep
/// スリープ
/// 引数   : なし
/// 戻り値 : なし
/// </summary>
function sleepJq(ms) {
	 $(this).delay(ms).queue(function() {
	   $(this).dequeue();
	 });
	return;
} 


/// <summary>
/// タイムスタンプを取得する
/// </summary>
function getTimeText() {
	var date = new Date();
	
	return date.getFullYear() + (date.getMonth() + 1)+ date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
}


///====================================================================
///
///                         データ取得処理
///                         
///====================================================================

/// <summary>
/// loadlpsGlb
/// リプリスオブジェクトを作成する
/// </summary>
function loadLpsGlb() {
	var i = 0;
	var name;
	var xmlhttpEmotion;

	//ボディリストの初期化
	lpsBdyLst = new objLiplisBody();

	//エモーション取得フラグ(明示的に0を設定しておく)
	lpsGlb.xmlEmotionEndFlg = 0;

	//httpResuwst
	xmlhttpEmotion = new XMLHttpRequest();

	//body.xmlを読み込む
	xmlhttpEmotion.open('GET', 'define/body.xml', true);

	//ステートチェンジイベントの宣言
	xmlhttpEmotion.onreadystatechange = function () {

		//ステイト4,ステータス200の場合OK
		if (xmlhttpEmotion.readyState == 4 && xmlhttpEmotion.status == 200) {

			//XMLデータ取得
			lpsGlb.xmlEmotion = xmlhttpEmotion.responseXML;

			//各ボディデータの取得
			lpsBdyLst.normal = createObjBody("normal");
			lpsBdyLst.joyP = createObjBody("joy_p");
			lpsBdyLst.joyM = createObjBody("joy_m");
			lpsBdyLst.admirationP = createObjBody("admiration_p");
			lpsBdyLst.admirationM = createObjBody("admiration_m");
			lpsBdyLst.peaceP = createObjBody("peace_p");
			lpsBdyLst.peaceM = createObjBody("peace_m");
			lpsBdyLst.ecstasyP = createObjBody("ecstasy_p");
			lpsBdyLst.ecstasyM = createObjBody("ecstasy_m");
			lpsBdyLst.amazementP = createObjBody("amazement_p");
			lpsBdyLst.amazementM = createObjBody("amazement_m");
			lpsBdyLst.rageP = createObjBody("rage_p");
			lpsBdyLst.rageM = createObjBody("rage_m");
			lpsBdyLst.interestP = createObjBody("interest_p");
			lpsBdyLst.interestM = createObjBody("interest_m");
			lpsBdyLst.respectP = createObjBody("respect_p");
			lpsBdyLst.respectM = createObjBody("respect_m");
			lpsBdyLst.calmlyP = createObjBody("calmly_p");
			lpsBdyLst.calmlyM = createObjBody("calmly_m");
			lpsBdyLst.proudP = createObjBody("proud_p");
			lpsBdyLst.proudM = createObjBody("proud_m");
			lpsBdyLst.sleep =  createObjBody("sleep_");

			//初期表示としてデフォルトオブジェクトをセットしておく
			setImage(0);

			//エモーション取得完了
			lpsGlb.xmlEmotionEndFlg = 1;

		}
	}
	//xmlダウンロードには以下の指定が必要
	xmlhttpEmotion.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");

	//ポストデータ
	xmlhttpEmotion.send(null);

}

/// <summary>
/// ショートニュースを取得する
/// </summary>
function getShrotNews() {

	if (lpsGlb.agent == 'ie') {
		getShrotNewsIe();
	}
	else {
		getShrotNewsFx();
	}
}

/// <summary>
/// ショートニュースを取得する
/// </summary>
function getShrotNewsFx() {
	xmlhttp = new XMLHttpRequest();
	//ポスト指定(ポストするデータは最下行で指定)
	xmlhttp.open('POST', lpsConst.adrApiGetNews, true);

	//ステートチェンジイベントの宣言
	xmlhttp.onreadystatechange = function () {
		//ステイト4,ステータス200の場合OK
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			//XMLデータ取得
			lpsGlb.jsonDoc = eval( '(' + xmlhttp.responseText + ')' );

			lpsGlb.chatFlg = 1;
		}
	}
	
	//xmlダウンロードには以下の指定が必要
	xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
	
	//ポストデータ(口調ファイルのURLをポスト。タイムスタンプはiPhoneサファリ対策)
	xmlhttp.send("tone=" + lpsConst.adrTone + "&newsFlg=" + lpsGlb.genreNews + ',' + lpsGlb.genre2ch + ',' + lpsGlb.genrenico + "&time=" + getTimeText());
}

/// <summary>
/// ショートニュースを取得する
/// </summary>
function getShrotNewsIe() {
	var xdr = new XDomainRequest();

	xdr.onerror = function () {
		alert("error");

	}
	
	xdr.onload = function () {
		//XMLデータ取得
		lpsGlb.jsonDoc = eval( '(' + xdr.responseText + ')' );

		lpsGlb.chatFlg = 1;
	}
	
	//ゲットのリクエストを送る(タイムスタンプはキャッシュ対策)
	//xdr.open("GET", lpsConst.adrApiGetNews + "?tone=" + lpsConst.adrTone + "&newsFlg=" + lpsGlb.genreNews + ',' + lpsGlb.genre2ch + ',' + lpsGlb.genrenico + "&time="  + getTimeText());

	//xdr.send(null);
	
	xdr.open('POST', lpsConst.adrApiGetNews);
	xdr.send( $.param({tone:lpsConst.adrTone,newsFlg:lpsGlb.genreNews + ',' + lpsGlb.genre2ch + ',' + lpsGlb.genrenico,time:getTimeText()}) );
}

/// <summary>
/// ショートニュースを取得する
/// </summary>
function getText(str) {
	if (lpsGlb.agent == 'ie') {
		getTextIe(str);
	}
	else {
		getTextFx(str);
	}
}


/// <summary>
/// 任意の文章の感情値を取得する
/// </summary>
function getTextFx(str) {
	xmlhttp = new XMLHttpRequest();
	//ポスト指定(ポストするデータは最下行で指定)
	xmlhttp.open('POST', lpsConst.adrApiGetText, true);

	//ステートチェンジイベントの宣言
	xmlhttp.onreadystatechange = function () {
		//ステイト4,ステータス200の場合OK
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			//XMLデータ取得
			lpsGlb.jsonDoc = eval( '(' + xmlhttp.responseText + ')' );

			lpsGlb.chatFlg = 1;
		}
	}
	//xmlダウンロードには以下の指定が必要
	xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");

	//ポストデータ(口調ファイルのURLをポスト)
	xmlhttp.send("sentence=" + str);
}

/// <summary>
/// 任意の文章の感情値を取得する
/// </summary>
function getTextIe(str) {
	var xdr = new XDomainRequest();

	xdr.onerror = function () {
		alert("error");

	}
	
	xdr.onload = function () {
		//XMLデータ取得
		lpsGlb.jsonDoc = eval( '(' + xdr.responseText + ')' );

		lpsGlb.chatFlg = 1;
	}
	
	//ゲットのリクエストを送る(タイムスタンプはキャッシュ対策)
	xdr.open("GET", lpsConst.adrApiGetText + "?sentence=" + encodeURI(str));

	xdr.send(null);
}


///==============================================================================================
///
///                                        クラス定義
///                         
///==============================================================================================


///=====================================
/// clsEmotionクラス
var liplisGlobal = function () {
	///=====================================
	/// ユーザーエージェント
	this.agent;

	///=====================================
	/// タイマーオブジェクト
	this.timerRefresh;
	this.timerUpdate;
	this.timerFirstInit;

	///=====================================
	/// 表示用オブジェクト
	this.nowObject;             //objBody

	///=====================================
	/// 制御フラグ
	this.chatFlg          = 0;
	this.xmlEndFlg        = 0;
	this.xmlEmotionEndFlg = 0;
	this.sleepFlg         = 0;
	this.skipFlg          = 0;

	///=====================================
	/// 制御カウンタ
	this.blinkCnt = 0;       //1回/5～10s
	this.mouthCnt = 0;       //1回/200ms
	this.nowIdx   = 0;
	this.wordIdx  = 0;

	///=====================================
	/// 制御プロパティ
	this.nowPoint    = 0;
	this.nowEmotion  = 0;
	this.prvEmotion  = 0;
	this.nowWord     = '';
	this.nowReadWord = '';

	///=====================================
	/// 受信データ
	this.xmlDoc;
	this.jsonDoc;
	///=====================================
	/// xml定義データ
	this.xmlEmotion;
	
	///=====================================
	/// liplis設定データ
	this.chatMode   = '';
	this.activeMode = '';
	this.genreNews  = '';
	this.genre2ch   = '';
	this.genrenico  = '';
	this.window     = '';
	this.region     = '';
	this.flgSkipOn  = '';
};

///=====================================
/// objBodyクラス
var objBody = function (Eye1_Mouth1, Eye1_Mouth2, Eye2_Mouth1, Eye2_Mouth2, Eye3_Mouth1, Eye3_Mouth2) {
	//イメージ型の宣言
	var imgEye1_Mouth1 = new Image();
	var imgEye1_Mouth2 = new Image();
	var imgEye2_Mouth1 = new Image();
	var imgEye2_Mouth2 = new Image();
	var imgEye3_Mouth1 = new Image();
	var imgEye3_Mouth2 = new Image();

	//ソースの指定
	imgEye1_Mouth1.src = "body/" + Eye1_Mouth1;
	imgEye1_Mouth2.src = "body/" + Eye1_Mouth2;
	imgEye2_Mouth1.src = "body/" + Eye2_Mouth1;
	imgEye2_Mouth2.src = "body/" + Eye2_Mouth2;
	imgEye3_Mouth1.src = "body/" + Eye3_Mouth1;
	imgEye3_Mouth2.src = "body/" + Eye3_Mouth2;

	///=====================================
	/// プロパティセット
	this.Eye1_Mouth1 = imgEye1_Mouth1;       //Image
	this.Eye1_Mouth2 = imgEye1_Mouth2;       //Image
	this.Eye2_Mouth1 = imgEye2_Mouth1;       //Image
	this.Eye2_Mouth2 = imgEye2_Mouth2;       //Image
	this.Eye3_Mouth1 = imgEye3_Mouth1;       //Image
	this.Eye3_Mouth2 = imgEye3_Mouth2;       //Image
};

///=====================================
/// objLiplisBodyクラス
var objLiplisBody = function () {
	this.normal;
	this.joyP;
	this.joyM;
	this.admirationP;
	this.admirationM;
	this.peaceP;
	this.peaceM;
	this.ecstasyP;
	this.ecstasyM;
	this.amazementP;
	this.amazementM;
	this.rageP;
	this.rageM;
	this.interestP;
	this.interestM;
	this.respectP;
	this.respectM;
	this.calmlyP;
	this.calmlyM;
	this.proudP;
	this.proudM;
	this.sleep;
}

///=====================================
/// objLiplisWindowクラス
var objLiplisWindow = function () {
	//イメージ型の宣言
	var imgWindow0 = new Image();
	var imgWindow1 = new Image();
	var imgWindow2 = new Image();
	var imgWindow3 = new Image();
	var imgWindow4 = new Image();
	var imgWindow5 = new Image();
	var imgWindow6 = new Image();

	//ソースの指定
	imgWindow0.src = "window/window.png";
	imgWindow1.src = "window/window_blue.png";
	imgWindow2.src = "window/window_green.png";
	imgWindow3.src = "window/window_pink.png";
	imgWindow4.src = "window/window_purple.png";
	imgWindow5.src = "window/window_red.png";
	imgWindow6.src = "window/window_yellow.png";
	
	//設定
	this.window0 = imgWindow0;
	this.window1 = imgWindow1;
	this.window2 = imgWindow2;
	this.window3 = imgWindow3;
	this.window4 = imgWindow4;
	this.window5 = imgWindow5;
	this.window6 = imgWindow6;
}

///=====================================
/// objChatクラス
var objChat = function () {
	this.greet = [];
	this.nowTime = '現在 [?] です。';
	this.greet.push('ごきげんよう、ご主人様。　　');
	this.greet.push('ようこそ、ご主人様。　　');
}

///=====================================
/// liplisConstクラス
var liplisConst = function () {
	//URL
	this.adrTone       = 'http://liplis.mine.nu/xml/Tone/LiplisLili.xml';
	this.adrApiGetNews = 'http://liplis.mine.nu/Clalis/v30/Liplis/clalisForLiplisWeb.aspx';
	this.adrApiGetText = 'http://liplis.mine.nu/Clalis/v30/Liplis/clalisForLiplisWebChatText.aspx';
}

///=====================================
/// liplisSettingDefineクラス
var liplisSettingDefine = function ()  {
	this.chatMode       = 'chatMode';
	this.activeMode     = 'activeMode';
	this.genreNews      = 'genreNews';
	this.genre2ch       = 'genre2ch';
	this.genrenico      = 'genrenico';
	this.window         = 'window';
	this.region         = 'region';
	this.flgSkipOn      = 'flgSkipOn';
}

///==============================================================================================
///
///                                          呼び出しメソッド
///                         
///==============================================================================================
	//LiplisShowの呼び出し
	init();