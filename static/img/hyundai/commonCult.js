/**
 *  
 *  JS  Name    : commonCult.js
 *  Description : commonCult
 *  author      : GGCM93
 *  since       : 2019. 10. 17.
 *  version     : 1.0
 *  Modification Information
 *     since                author                      description
 *  ===========    =====================        ===========================
 *  2019. 12. 19.      GGCM93               SR번호 : 175998 [DIVE Web] 12/19일 배포
 *  2019. 11. 28.      GGCM93               SR번호 : 174952 [DIVE] WEB 운영계 배포의 건 (각 공간 더 알아보기 반영, 다빈치모텔 업데이트, 그 외 수정사항 )
 *  2019.10.17.    GGCM93        최초 생성
 */
(function($) {
    /**
     * Culture Web Common API 정의
     */
    window.cult = window.cult || {};
    
    function sleep( delay ) {
        var start = new Date().getTime();
        while( new Date().getTime() < start + delay ) ;
    }
    
    // ejs tempate options
    var ejsOptions = {
        delimiter : '@',
        client : true,
        compileDebug : true
    };

    $.ajaxSetup({
        headers: {
            'Error-Json': 'Y'
        }
    });
    
    $.extend( cult, {
        ejsCompile: function(text, options) {
            return ejs.compile(text, options || ejsOptions);
        },
        // Microsoft Surface 이면 true
        isSurfaceTablet: function() {
            return /WebView/i.test( navigator.userAgent );  
        },
        isIos: function() {
            return /iPhone|iphone|ipod|ipad|iPad/.test(navigator.userAgent);
        },
        sleep: function(delay) {
            var start = new Date().getTime();
            while ( new Date().getTime() < start + delay );
        },
        movePagePopup: function(url) {
            url = window.projectPath + url;
            window.open(url);
        },
        movePageCookie: function(url) {
            url = window.projectPath + url;
            
            var temp_deviceApp = window.deviceApp;
            var temp_url = "";
            if(temp_deviceApp == 'Y'){
                temp_url = "&deviceApp=Y";
            }
            
            //뒤로가기 제어 용도 파라미터 추가
            if ( url.indexOf('?') > -1 ) {
                url += '&cookieDiveWeb=Y'+temp_url;
            } else {
                url += '?cookieDiveWeb=Y'+temp_url;
            }
            
            document.location.href = url;
        },
        movePage: function(url) {
            url = window.projectPath + url;
            
            var temp_deviceApp = window.deviceApp;
            var temp_url = "";
            if(temp_deviceApp == 'Y'){
                temp_url = "deviceApp=Y";
            }
            if(temp_url != ""){
                if (url.indexOf('?') > -1 ) {
                    url += '&'+temp_url;
                }else{
                    url += '?'+temp_url;
                }
            }
            
            document.location.href = url;
        },
        isShareView: function() {
            var result = false;
            var isShareView = $('[data-role=page]').data('isShareView');
            if ( isShareView === true || isShareView === 'true' ) {
                result = true;
            }
            return result;
        },
        ajax: function(obj) {
            var dfd = new $.Deferred();
            
            obj.data = obj.data || {};
            obj.data.web = 'web';
            obj.url = window.projectPath + obj.url;
            
            $.ajax(obj)
                .done( function(res) {
                    var resultCode = res.header.resultCode;
                    if ( resultCode == '0000' ) {
                        dfd.resolve(res);
                    } else {
                        alert(res.header.resultMessage + "["+res.header.resultCode+"]");
                        /**
                        cult.openBasicPopup({
                            popupTitle: '알림',
                            popupBody: res.header.resultMessage || res.header.resultCode
                        }, function(res) {
                            dfd.reject();
                        });
                        */
                    }
                })
                .fail(function(res) {
                    var popupBody = '서버와의 통신에 실패하였습니다.';
                    if ( window.serverMode == 'D' ) {
                        popupBody += '\n' + JSON.stringify(obj);
                        try {
                            popupBody += '\n' + JSON.stringify(res);
                        } catch (e) {
                            popupBody += '\n' + res;
                        }
                    }
                    
                    //alert(popupBody);
                    /**
                    cult.openBasicPopup({
                        popupTitle: '알림',
                        popupBody: popupBody
                    }, function(res) {
                        dfd.reject();
                    });
                    */
                });
            
            return dfd.promise();
        },
        formSubmit: $.outback.formSubmit,
        replaceCodeToTag: function(text) {
            text = text.replace(/&amp;/g, '&');
            text = text.replace(/&quot;/g, '"');
            text = text.replace(/&#39;/g, '\'');
            text = text.replace(/&lt;/g, '<');
            text = text.replace(/&gt;/g, '>');
            return text;
        }
    });
    
    /**
     * br태그 -> space로 변경
     */
    cult.brTagToSpace = function(value) {
        if ( value ) {
            value = value.replace(/<br\s*[\/]?>/gi, ' ')
                         .replace(/&lt;br\/&gt;/gi, ' ');
        }
        return value;
    };
    
    /**
     * xss 태그 변경
     */
    cult.xssToTag = function(value) {
        if ( value ) {
            value = value.replace(/&lt;br\/&gt;/gi, '<br />');
            value = value.replace(/&lt;br&gt;/gi, '<br />');
        }
        return value;
    };
    
    // 이벤트 리스너를 걸어놓은 실제 타겟을 찾는다.
    cult.findTargetByClass = function($e, selector) {
        var isFound = false;
        
        // 전체를 감싸는 tag에 event를 걸어놓는 경우, 실제 target을 찾을때까지 parent를 찾는다.
        while ( !isFound ) {
            if ( $e.hasClass(selector) ) {
                isFound = true;
            } else {
                $e = $e.parent();
            }
        }
        
        return $e;
    };
    
})(jQuery);