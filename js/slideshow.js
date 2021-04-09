/*-----------------------------------------
	slideshow.js
-----------------------------------------*/
 
var timerID,imgValue;
var imgNum = 1;//current image number
var imgNum2 = 2;//next image number
var changeable = 1;
var interval = 5000;//画像切り替え間隔
var navFile = "images/button01.gif";
var navFile_o = "images/button02.gif";
 
$(document).ready(function(){
 
    imgValue = $("#imgPhoto li").size();//画像数取得
 
    //ナビボタン生成
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
    changeable = 0;//フェード処理中は画像変更不可
 
    //現在表示されている画像番号を取得
    var cImg = currentImg;
 
    //次に表示する画像番号を取得
    var nImg = nextImg;
 
    //ナビボタン（現在位置）の調整
    for ( var i = 1; i <= imgValue; i++) {
        $("img#thumb" + i).attr( "src",navFile );
    }
    $("img#thumb" + nImg ).attr( "src",navFile_o );
 
    //フェードさせる同士の重なり順を判別
    if( cImg < nImg ) { //次の画像が上層である場合
                //グローバル変数に画像番号代入
                imgNum = nImg;
                imgNum2 =  nImg < imgValue?nImg+1:1;
        //次の画像をフェードイン
        $("#imgPhoto li:nth-child(" + nImg +")").css({filter:''});
        $("#imgPhoto li:nth-child(" + nImg +")").fadeIn(
            "slow",
            function() {
                //下層の画像を非表示
                $("#imgPhoto li:nth-child(" + cImg +")").css("display","none");
 
                //画像変更許可
                changeable = 1;
                //フェードイン繰り返し
                timerID = setTimeout( "fadeImg( imgNum, imgNum2 )",interval );
        }
    );
    } else { //次の画像が下層である場合
        //ナビボタン（現在位置）の調整
        for ( var i = 1; i <= imgValue; i++) {
            $("img#thumb" + i).attr( "src",navFile );
        }
        $("img#thumb" + nImg ).attr( "src",navFile_o );
 
        //次の画像（下層）を表示させておく
        $("#imgPhoto li:nth-child(" + nImg +")").css("display","block");
                //グローバル変数に画像番号代入
                imgNum = nImg;
                imgNum2 =  nImg < imgValue?nImg+1:1;
        //現在の画像（上層）をフェードアウト
        $("#imgPhoto li:nth-child(" + cImg +")").fadeOut(
            "slow",
            function() {
                //画像変更許可
                changeable = 1;
                //フェードイン繰り返し
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