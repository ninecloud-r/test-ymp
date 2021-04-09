/*-----------------------------------------
	slideshow.js
-----------------------------------------*/
 
var timerID,imgValue;
var imgNum = 1;//current image number
var imgNum2 = 2;//next image number
var changeable = 1;
var interval = 5000;//�摜�؂�ւ��Ԋu
var navFile = "images/button01.gif";
var navFile_o = "images/button02.gif";
 
$(document).ready(function(){
 
    imgValue = $("#imgPhoto li").size();//�摜���擾
 
    //�i�r�{�^������
    for ( var i = 1; i <= imgValue; i++) {
        if ( i == 1 ) {
            $( "#photoNav ul" ).append('<li><img id="thumb' + i + '" src="' + navFile_o +'" alt="" /></li>');
        } else {
            $( "#photoNav ul" ).append('<li><img id="thumb' + i + '" src="' + navFile +'" alt="" /></li>');
        }
    }
 
    $("#imgPhoto li:first-child").css("display","block");
    $("img[id^=thumb]").hover( function() {
        $(this).attr( "src",navFile_o );
    }, function(){
        var tNum = parseFloat(this.id.substring(5, 6));
        if( imgNum == tNum ) {
            $(this).attr( "src",navFile_o );
        } else {
            $(this).attr( "src",navFile );
        }
    });
 
        $("img[id^=thumb]").click( function(){
            var tNum = parseFloat(this.id.substring(5, 6));
 
            if ( changeable == 1 && tNum != imgNum) {
                clearTimer();
                imgNum2 = parseFloat( tNum );
                fadeImg( imgNum, imgNum2 );
            }
        })
 
    timerID = setTimeout( "fadeImg( imgNum, imgNum2 )",interval );
 
});
 
function fadeImg( currentImg, nextImg ) {
    changeable = 0;//�t�F�[�h�������͉摜�ύX�s��
 
    //���ݕ\������Ă���摜�ԍ����擾
    var cImg = currentImg;
 
    //���ɕ\������摜�ԍ����擾
    var nImg = nextImg;
 
    //�i�r�{�^���i���݈ʒu�j�̒���
    for ( var i = 1; i <= imgValue; i++) {
        $("img#thumb" + i).attr( "src",navFile );
    }
    $("img#thumb" + nImg ).attr( "src",navFile_o );
 
    //�t�F�[�h�����铯�m�̏d�Ȃ菇�𔻕�
    if( cImg < nImg ) { //���̉摜����w�ł���ꍇ
                //�O���[�o���ϐ��ɉ摜�ԍ����
                imgNum = nImg;
                imgNum2 =  nImg < imgValue?nImg+1:1;
        //���̉摜���t�F�[�h�C��
        $("#imgPhoto li:nth-child(" + nImg +")").css({filter:''});
        $("#imgPhoto li:nth-child(" + nImg +")").fadeIn(
            "slow",
            function() {
                //���w�̉摜���\��
                $("#imgPhoto li:nth-child(" + cImg +")").css("display","none");
 
                //�摜�ύX����
                changeable = 1;
                //�t�F�[�h�C���J��Ԃ�
                timerID = setTimeout( "fadeImg( imgNum, imgNum2 )",interval );
        }
    );
    } else { //���̉摜�����w�ł���ꍇ
        //�i�r�{�^���i���݈ʒu�j�̒���
        for ( var i = 1; i <= imgValue; i++) {
            $("img#thumb" + i).attr( "src",navFile );
        }
        $("img#thumb" + nImg ).attr( "src",navFile_o );
 
        //���̉摜�i���w�j��\�������Ă���
        $("#imgPhoto li:nth-child(" + nImg +")").css("display","block");
                //�O���[�o���ϐ��ɉ摜�ԍ����
                imgNum = nImg;
                imgNum2 =  nImg < imgValue?nImg+1:1;
        //���݂̉摜�i��w�j���t�F�[�h�A�E�g
        $("#imgPhoto li:nth-child(" + cImg +")").fadeOut(
            "slow",
            function() {
                //�摜�ύX����
                changeable = 1;
                //�t�F�[�h�C���J��Ԃ�
                timerID = setTimeout( "fadeImg( imgNum, imgNum2 )",interval );
            }
        )
    }
}
 
function setTimer() {
    timerID = setTimeout( "fadeImg( imgNum, imgNum2 )",interval );
}
 
function clearTimer() {
    clearTimeout( timerID );
}