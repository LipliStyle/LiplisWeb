//=======================================================================
//  ClassName : LiplisWebMenu
//  �T�v      : ���j���[����
//
//LiplisWeb
// Copyright  :2013 LipliStyle
// 
// ���C�Z���X : MIT License
// �E�{�\�t�g�E�F�A�͖��ۏ؂ł��B��҂͐ӔC��ǂ��܂���B
// �E��L�̒��쌠�\�����L�ڂ��ĉ������B
// �E��L�̂Q���ɓ��Ӓ�����Ύ��R�Ɏg�p���Ē����܂��B
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
	
	//�u���b�N�n���h��
	$("#dock .clickBlock").click(function(event) {
		//�C�x���g���s���L�����Z��
		event.stopPropagation();
	});
}); 