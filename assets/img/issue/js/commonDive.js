/**
 *  
 *  JS  Name    : commonDive.js
 *  Description : commonDive
 *  author      : GGCM93
 *  since       : 2019. 10. 17.
 *  version     : 1.0
 *  Modification Information
 *     since                author                      description
 *  ===========    =====================        ===========================
 *  2019. 12. 12.      GGCM93               SR번호 : 175638 [DIVE] WEB 운영계 배포의 건 (앱소개페이지 업데이트, What’s on 레이블 업데이트, 외 기타 버그 수정)
 *  2019. 12. 05.      GGCM93               SR번호 : 175261 [DIVE] WEB 운영계 배포의 건 (Space 화면수정, 인스타그램 방문인증 화면 오류 수정, 외 기타 버그 수정)
 *  2019. 11. 28.      GGCM93               SR번호 : 174952 [DIVE] WEB 운영계 배포의 건 (각 공간 더 알아보기 반영, 다빈치모텔 업데이트, 그 외 수정사항 )
 *  2019.10.17.    GGCM93        최초 생성
 */
/* 공백 처리 */
function isEmpty_nvl(str){
    if(typeof str == "undefined" || str == null || str == ''){
        return '';
    }else{
        return str;
    }
}

/* 콤마처리 */
function fnComma(str){
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//현재일자 (년월일 시분초)
function fnNowDate(){
    var date = new Date();
    var result = date.getFullYear() +""+ fnSetFormatDate(date.getMonth()+1) +""+ fnSetFormatDate(date.getDate()) +""+ fnSetFormatDate(date.getHours()) +""+ fnSetFormatDate(date.getMinutes()) +""+ fnSetFormatDate(date.getSeconds());
    return result;
}

/*
 * 문자형식 일자 (yyyyMMdd)
 * view 화면 일자 포멧 변경
 * str : yyyyMMdd
 * format : .
 */
function fnStringDateFormat(str, format){
    var result = "";
    var temp_val = isEmpty_nvl(str);
    if(temp_val != "" && temp_val.length == 8){
        result = temp_val.substring(0,4) + format + temp_val.substring(4,6) + format + temp_val.substring(6,8);
    }else{ 
        result = str;
    }
    return result;
}

/*
 * 문자형식 일자 (yyyyMM)
 * return October 2019
 */
function fnSetMainFormatDate(str){
    var result = "";
    var temp_val = isEmpty_nvl(str);
    var temp_year = "";
    var temp_month = "";
    
    if(temp_val != "" && temp_val.length == 6){
        temp_year = temp_val.substring(0,4);
        temp_month = temp_val.substring(4,6);
    }else{
        var date = new Date();
        temp_year = date.getFullYear();
        temp_month = fnSetFormatDate(date.getMonth()+1);
    }
    
    result = fnStrMonthEng(temp_month) + " " + temp_year;
    
    return result;
}

function fnStrMonthEng(month){
    var result = "";
    var temp_month = Number(month);
    if(temp_month == 1){
        result = "January";
    }else if(temp_month == 2){
        result = "February";
    }else if(temp_month == 3){
        result = "March";
    }else if(temp_month == 4){
        result = "April";
    }else if(temp_month == 5){
        result = "May";
    }else if(temp_month == 6){
        result = "June";
    }else if(temp_month == 7){
        result = "July";
    }else if(temp_month == 8){
        result = "August";
    }else if(temp_month == 9){
        result = "September";
    }else if(temp_month == 10){
        result = "October";
    }else if(temp_month == 11){
        result = "November";
    }else if(temp_month == 12){
        result = "December";
    }
    return result;
}

//일자 형식 설정
function fnSetFormatDate(str){
    if(str === undefined || str === '') {
        return '';
    }else{
        str = ''+str;
    }
    if(str.length == 1){
        return '0'+str;
    }else{
        return str;
    }
}

/* 스페이스 한글 명 */
function setSpaceValueName(code){
    var resultName = "";
    
    var temp_code = isEmpty_nvl(code);
    if(temp_code == "1"){
        resultName = "디자인 라이브러리";
    }else if(temp_code == "2"){
        resultName = "트래블 라이브러리";
    }else if(temp_code == "3"){
        resultName = "뮤직 라이브러리";
    }else if(temp_code == "4"){
        resultName = "쿠킹 라이브러리";
    }else if(temp_code == "5"){
        resultName = "스토리지";
    }else if(temp_code == "6"){
        resultName = "바이닐앤플라스틱";
    }else if(temp_code == "7"){
        resultName = "언더스테이지";
    }else if(temp_code == "8"){
        resultName = "슈퍼콘서트";
    }else if(temp_code == "9"){
        resultName = "컬처프로젝트";
    }else if(temp_code == "11"){
        resultName = "다빈치모텔";
    }
    
    return resultName;
}

/* 스페이스 공간 정보 */
function setSpaceValuePlace(code){
    var resultPlace = "";
    
    var temp_code = isEmpty_nvl(code);
    if(temp_code == "1"){               //디자인 라이브러리
        resultPlace = "가회";
    }else if(temp_code == "2"){     //트래블 라이브러리
        resultPlace = "청담";
    }else if(temp_code == "3"){     //뮤직 라이브러리
        resultPlace = "이태원";
    }else if(temp_code == "4"){     //쿠킹 라이브러리
        resultPlace = "청담";
    }else if(temp_code == "5"){     //스토리지
        resultPlace = "이태원";
    }else if(temp_code == "6"){     //바이닐앤플라스틱
        resultPlace = "이태원";
    }else if(temp_code == "7"){     //언더스테이지
        resultPlace = "이태원";
    }else if(temp_code == "8"){
    }else if(temp_code == "9"){
    }else if(temp_code == "11"){
    }
    
    return resultPlace;
}

/* 스페이스 Url 정보 */
function setSpaceValueUrl(code){
    var resultUrl = "";
    
    var temp_code = isEmpty_nvl(code);
    if(temp_code == "1"){
        resultUrl = "designlibrary";
    }else if(temp_code == "2"){
        resultUrl = "travellibrary";
    }else if(temp_code == "3"){
        resultUrl = "musiclibrary";
    }else if(temp_code == "4"){
        resultUrl = "cookinglibrary";
    }else if(temp_code == "5"){
        resultUrl = "storage";
    }else if(temp_code == "6"){
        resultUrl = "vinylandplastic";
    }else if(temp_code == "7"){
        resultUrl = "understage";
    }else if(temp_code == "8"){
        resultUrl = "superconcert";
    }else if(temp_code == "9"){
        resultUrl = "cultureproject";
//    }else if(temp_code == "10"){
//        resultUrl = "";
    }
    
    return resultUrl;
}

/* 외부 컨텐츠 새창으로 호출 */
function fnExternalLinkUrl(contentId){
    var param = {
            contentId : contentId
    };        
    
    cult.ajax({
        url: '/web/content/contentViewExternal.hdc',
        type: 'POST',
        data: param
    }).done($.proxy(function(res) {
        var externalLinkUrl = isEmpty_nvl(res.body.externalLinkUrl);
        
        if(externalLinkUrl != ""){
            window.open(externalLinkUrl);
        }else{
            alert("관리자에게 문의해 주시기 바랍니다.");
        }
        
    }, this));
}

/* 상세화면에서 목록 리스트 이동 */
function fnDiveWebMoveList(contentCategory){
    if(contentCategory == "4"){                   //POST 리스트 이동
        var mainCategory = "";
        //cookie 정보 확인
        if (location.search.indexOf('cookieDiveWeb=Y') > -1 && $.cookie('diveWebParam') ) {
            //cookie 값 있으면 cookie 값으로 set
            var param = JSON.parse($.cookie('diveWebParam'));
            mainCategory = param.mainCategory;
        }
        
        cult.movePage('/web/post/post.hdc?mainCategory='+isEmpty_nvl(mainCategory));
    }else if(contentCategory == "5"){          //Event 리스트 이동
        cult.movePage('/web/event/event.hdc');
    }else{                                                //Culture Calendar 리스트 이동
        var filterPlaceSpace = "";
        var reservationYN = "";
        //cookie 정보 확인
        if (location.search.indexOf('cookieDiveWeb=Y') > -1 && $.cookie('diveWebParam') ) {
            //cookie 값 있으면 cookie 값으로 set
            var param = JSON.parse($.cookie('diveWebParam'));
            filterPlaceSpace = param.filterPlaceSpace;
            reservationYN = param.reservationYN;
        }
        
        cult.movePage('/web/culture/culture.hdc?filterPlaceSpace=' + isEmpty_nvl(filterPlaceSpace)+"&reservationYN="+isEmpty_nvl(reservationYN));
    }
}

/* DIVE APP */
function diveWeb2App_web() {
    var path = 'launch';
    var scheme = 'culture',
        pkgName = 'com.hyundaicard.cultureapp',
        iphoneId = 'id1469507774', //ex) 마켓 등록 후 필요 id1133383679
        urlScheme = 'culture://' + path,
        intentURI = 'intent://' + path + '#Intent;scheme=' + scheme + ';package=' + pkgName + ';end',
        appStoreURL = bowser.android ? 'market://details?id=' + pkgName : 'itms-apps://itunes.apple.com/app/' + iphoneId;
        //universalLink = 'https://apps.apple.com/kr/app/' + iphoneId;
        
    daumtools.web2app({
        urlScheme : urlScheme,  //iphone : custom scheme
        intentURI : intentURI,  //android : intent URI
        storeURL : appStoreURL, //app store URL
        //universalLink : universalLink, //IOS download store URL(WEB)
        appName : 'culture',    //application name
        willInvokeApp: function() {
            console.log('willInvokeApp');
        },
        /*
        onAppMissing: function() {
            console.log('onAppMissing');
            showLaunchingDiv();
        }, 
        */
        onUnsupportedEnvironment: function() {
            console.log('onUnsupportedEnvironment');
            showLaunchingDiv = null;
        }
    });
}