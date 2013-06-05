//=======================================================================
//  ClassName : LiplisWeb
//  �T�v      : ���v���X�E�F�u
//
//  LiplisWeb
//  Copyright(c) 2011-2013 LipliStyle sachin. All Rights Reserved. 
//=======================================================================

///====================================================================
/// �\���p�I�u�W�F�N�g
var EnableColorDialog = 0;				//�F�ݒ�X�N���v�g�F���p
var PreviousRefreshSecond = -1;			//�O��\�����X�V�����Ƃ��̕b
var CenterPointX;						//���S�̍��W
var CenterPointY;
var Clock_Display;						//���v�̃f�B�X�v���C
var Clock_Display_Id = 'liplisClock';
var Clock_Display_Width;				//�\���̈�̑傫��
var Clock_Display_Height;
var AnalogClock_FrameRadius;			//�A�i���O���v�̊�{�̔��a


//onLoad�C�x���g���Z�b�g
window.onload = AnalogClock_Load;

///====================================================================
///
///                        ����������
///                         
///====================================================================

/// <summary>
/// ���[�h����
/// </summary>
function AnalogClock_Load(){

	//���v�̕\���̈���擾
	Clock_Display = document.getElementById(Clock_Display_Id);

	//���v�̘g��\��
	Clock_Display.style.display='block';

	//���v�̕\���̈�̑傫�����擾
	Clock_Display_Height = Clock_Display.offsetHeight - 2;
	Clock_Display_Width = Clock_Display.offsetWidth - 2;

	//���S�̍��W���v�Z
	CenterPointY = Clock_Display_Height / 2;
	CenterPointX = Clock_Display_Width / 2;

	//�G�悷�锼�a�����߂�
	if (Clock_Display_Height >= Clock_Display_Width) AnalogClock_FrameRadius = (Clock_Display_Width / 2);
	else AnalogClock_FrameRadius = (Clock_Display_Height / 2);

	//�C�x���g��ݒ�
	Clock_Display.onresize = AnalogClock_Resize;

	//���v�̃p�[�c�𐶐�
	OutputClockDisplay();

	//�F�ݒ肪�\�Ȃ�ݒ��ǂݍ��݁Atitle��������������
	if (EnableColorDialog){
	CreateColorDialog(Clock_Display);
	}

	//���v�̃p�[�c�̈ʒu������
	DrawDot();

	//���v�̐j��`��
	RefreshLine();
}

///====================================================================
///
///                        ���v�`�揈��
///                         
///====================================================================


/// <summary>
/// �_��`��
/// </summary>
function DrawDot(){
	var i;
	var Dot_Radius;
	var Number_Radius;

	//�G�悷�锼�a�����߂�
	Dot_Radius = AnalogClock_FrameRadius * 0.95;
	Number_Radius = AnalogClock_FrameRadius * 0.85;

	for (i=0; i<60; i++){
	//�_�̍��W�����肵�ē�����

	if (i % 5 == 0){
	document.getElementById('Dot_' + (i + 1)).style.left = CenterPointX + (Math.sin((i * 6) * Math.PI / 180) * Dot_Radius) + 'px';
	document.getElementById('Dot_' + (i + 1)).style.top = CenterPointY - (Math.cos((i * 6) * Math.PI / 180) * Dot_Radius) + 'px';
	//�����̍��W�����肵�ē�����
	//document.getElementById('Number_' + ((i / 5) + 1)).style.left = (CenterPointX + (Math.sin(((i * 6) + 30) * Math.PI / 180) * Number_Radius) - 2.5) + 'px';
	//document.getElementById('Number_' + ((i / 5) + 1)).style.top = (CenterPointY - (Math.cos(((i * 6) + 30) * Math.PI / 180) * Number_Radius) - 5) + 'px';
	}
	}
	//y=(q-b)/(p-a)*(x-p)+q
	//��a:�~�̒��S��x���W
	//b:�~�̒��S��y���W
	//(p,q):�ړ_

}

/// <summary>
/// �j���X�V����
/// </summary>
function RefreshLine(){
	var nowTime=new Date();
	var nowSecond;
	var nowMinute;
	var nowHour;

	//���݂̎��Ԃ��擾
	nowSecond=nowTime.getSeconds();
	nowMinute = nowTime.getMinutes();
	nowHour = nowTime.getHours();

	//�O��X�V�����Ƃ��Ǝ������ς���Ă������ʂ��X�V
	if (PreviousRefreshSecond != nowSecond){
	var SinValue;
	var CosValue;
	var i;
	var FrameRadius;

	//�X�V�������L�^
	PreviousRefreshSecond = nowSecond;

	//�G�悷�锼�a�����߂�
	if (Clock_Display_Height >= Clock_Display_Width) FrameRadius = (Clock_Display_Width / 2);
	else FrameRadius = (Clock_Display_Height / 2);

	//�b�j�̏�������
	//SinValue = Math.sin((90 - (6 * nowSecond)) * Math.PI / 180);
	//CosValue = Math.cos((90 - (6 * nowSecond)) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.8; i++){
	document.getElementById('SecondHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('SecondHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}

	//���j�̏�������
	SinValue = Math.sin((90 - ((6 * nowMinute) + (0.1 * nowSecond))) * Math.PI / 180);
	CosValue = Math.cos((90 - ((6 * nowMinute) + (0.1 * nowSecond))) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.65; i++){
	document.getElementById('MinuteHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('MinuteHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}

	//���j�̏�������
	SinValue = Math.sin((90 - ((30 * nowHour) + (0.5 * nowMinute) + ((30 / 3600) * nowSecond))) * Math.PI / 180);
	CosValue = Math.cos((90 - ((30 * nowHour) + (0.5 * nowMinute) + ((30 / 3600) * nowSecond))) * Math.PI / 180);

	for (i=1; i<=AnalogClock_FrameRadius * 0.5; i++){
	document.getElementById('HourHand_' + i).style.left = (CenterPointX + (CosValue * i)) + 'px';
	document.getElementById('HourHand_' + i).style.top = (CenterPointY - (SinValue * i)) + 'px';
	}
	}
	//�^�C�}�[���Z�b�g
	//setTimeout('RefreshLine()',1000);
	setTimeout('RefreshLine()',60000);
}


/// <summary>
/// ��ʂ̑傫�������߂�
/// </summary>
function AnalogClock_Resize(){
	//���v�̕\���̈�̑傫�����擾
	Clock_Display_Height = Clock_Display.offsetHeight - 2;
	Clock_Display_Width = Clock_Display.offsetWidth - 2;

	//���S�̍��W���v�Z
	CenterPointY = Clock_Display_Height / 2;
	CenterPointX = Clock_Display_Width / 2;

	//���v�̃p�[�c�̈ʒu������
	DrawDot();
}

/// <summary>
/// ���v�Ղ̕\���������o��
/// </summary>
function OutputClockDisplay(){
	var i;
	var OutputStr = '';

	//����̓_���쐬
	for (i=0; i<60; i++){
		if (i % 5){}
		else
		{
			OutputStr += '<div id="Dot_' + (i + 1) + '" class="Clock_Dot_small">&nbsp;</div>';
		}
	}

	//�b�j���쐬
	for (i=1; i<=AnalogClock_FrameRadius * 0.8; i++) OutputStr += '<div id="SecondHand_' + i + '" class="Clock_SecondHand">&nbsp;</div>';

	//���j���쐬
	for (i=1; i<=AnalogClock_FrameRadius * 0.65; i++) OutputStr += '<div id="MinuteHand_' + i + '" class="Clock_MinuteHand">&nbsp;</div>';

	//���j���쐬
	for (i=1; i<=AnalogClock_FrameRadius * 0.5; i++) OutputStr += '<div id="HourHand_' + i + '" class="Clock_HourHand">&nbsp;</div>';

	Clock_Display.innerHTML = OutputStr;
}
