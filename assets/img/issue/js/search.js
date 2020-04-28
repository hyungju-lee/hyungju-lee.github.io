/**
 *  
 *  JS  Name    : search.js
 *  Description : search
 *  author      : GGCM93
 *  since       : 2019. 10. 21.
 *  version     : 1.0
 *  Modification Information
 *     since                author                      description
 *  ===========    =====================        ===========================
 *  2019.10.21.    GGCM93        최초 생성
 */
/** Search **/
//최근 검색어 Cookie 저장
function saveWordCookie(searchWord){
    var setData = {
            searchWord: searchWord,                            
            sortDt: fnNowDate()
    };
    
    //중복단어 제거
    deleteWordCookie_word(searchWord);
    
    //최근 검색어 저장
    var arrNewSearchWord;
    if($.cookie('arrNewSearchWord') && JSON.parse($.cookie('arrNewSearchWord')) != null){
        arrNewSearchWord = JSON.parse($.cookie('arrNewSearchWord'));
        arrNewSearchWord.push(setData);
    }else{
        arrNewSearchWord = new Array();
        arrNewSearchWord.push(setData);
    }
    
    arrNewSearchWord.sort(function (a, b){
        return a.sortDt < b.sortDt ? 1 : a.sortDt > b.sortDt ? -1 : 0;
    });
    
    //배열 등록 건수 체크 : 10건 이상일 경우 (삭제)
    if(arrNewSearchWord.length > 10){
        arrNewSearchWord.splice(10, 1);
    }
    
    $.cookie('arrNewSearchWord', JSON.stringify(arrNewSearchWord), {expires:30, path: '/'});
}
//최근 검색어 개별 Cookie 삭제
function deleteWordCookie(keyDt){
    if($.cookie('arrNewSearchWord')){
        var arrNewSearchWord = JSON.parse($.cookie('arrNewSearchWord'));
        if (arrNewSearchWord != null) {
            if(arrNewSearchWord.length > 0){
                var arr_temp = new Array();
                for(var i = 0; i < arrNewSearchWord.length; i++){
                    if( keyDt != arrNewSearchWord[i].sortDt ){
                        var setData = {
                                searchWord: arrNewSearchWord[i].searchWord,                            
                                sortDt: arrNewSearchWord[i].sortDt
                        };
                        arr_temp.push(setData);
                    }
                }
                $.cookie('arrNewSearchWord', JSON.stringify(arr_temp), {expires:30, path: '/'});
            }else{
                $.removeCookie('arrNewSearchWord', {path: '/'});
            }
        }
    }
}
//중복단어 제거
function deleteWordCookie_word(word){
    if($.cookie('arrNewSearchWord')){
        var arrNewSearchWord = JSON.parse($.cookie('arrNewSearchWord'));
        if (arrNewSearchWord != null) {
            if(arrNewSearchWord.length > 0){
                var arr_temp = new Array();
                for(var i = 0; i < arrNewSearchWord.length; i++){
                    if( word != arrNewSearchWord[i].searchWord ){
                        var setData = {
                                searchWord: arrNewSearchWord[i].searchWord,                            
                                sortDt: arrNewSearchWord[i].sortDt
                        };
                        arr_temp.push(setData);
                    }
                }
                $.cookie('arrNewSearchWord', JSON.stringify(arr_temp), {expires:30, path: '/'});
            }else{
                $.removeCookie('arrNewSearchWord', {path: '/'});
            }
        }
    }
}
//최근검색어 전체 삭제
function deleteAllWordCookie(){
    if($.cookie('arrNewSearchWord')){
        $.removeCookie('arrNewSearchWord', {path: '/'});
    }
}