/** @preserve
 * outback.js is UI Framework based on jQuery Mobile 1.4.4
 *
 * @author hush751001@gmail.com
 *
 */

(function ( root, doc, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    define( [ 'jquery' ], function ( $ ) {
      factory( $, root, doc );
      return $.outback;
    });
  } else {
    // Browser globals
    factory( root.jQuery, root, doc );
  }
}( this, document,
 function ( jQuery, window, document, undefined ) {

  /**
   * jQuery throttle / debounce - v1.1 
   */
    (function( $, window, undefined ) {
        $.throttle = jq_throttle = function(delay, no_trailing, callback, debounce_mode) {
            var timeout_id, last_exec = 0;
            if ( typeof no_trailing !== 'boolean' ) {
                debounce_mode = callback;
                callback = no_trailing;
                no_trailing = undefined;
            }
            function wrapper() {
                var that = this, elapsed = +new Date() - last_exec, args = arguments;
                function exec() {
                    last_exec = +new Date();
                    callback.apply(that,args);
                }
                function clear() {
                    timeout_id = undefined;
                }
                if(debounce_mode && !timeout_id) {
                    exec();
                }
                timeout_id && clearTimeout(timeout_id);
                
                if ( debounce_mode === undefined && elapsed > delay ) {
                    exec();
                } else if(no_trailing !== true) {
                    timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
                }
            }
            if( $.guid ) {
                wrapper.guid = callback.guid = callback.guid || $.guid++;
            }
            return wrapper;
        }
        
        $.debounce = function( delay,at_begin,callback ) {
            return callback === undefined ? jq_throttle(delay, at_begin, false) : jq_throttle(delay, callback, at_begin !== false);
        }
        
    })( jQuery, window );
    
  /*!
   * Bowser - a browser detector
   * https://github.com/ded/bowser
   * MIT License | (c) Dustin Diaz 2015
   */

  !function (root, name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition()
    else if (typeof define == 'function' && define.amd) define(name, definition)
    else root[name] = definition()
  }(this, 'bowser', function () {
    /**
     * See useragents.js for examples of navigator.userAgent
     */

    var t = true

    function detect(ua) {

      function getFirstMatch(regex) {
        var match = ua.match(regex);
        return (match && match.length > 1 && match[1]) || '';
      }

      function getSecondMatch(regex) {
        var match = ua.match(regex);
        return (match && match.length > 1 && match[2]) || '';
      }

      var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
        , likeAndroid = /like android/i.test(ua)
        , android = !likeAndroid && /android/i.test(ua)
        , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
        , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
        , chromeos = /CrOS/.test(ua)
        , silk = /silk/i.test(ua)
        , sailfish = /sailfish/i.test(ua)
        , tizen = /tizen/i.test(ua)
        , webos = /(web|hpw)os/i.test(ua)
        , windowsphone = /windows phone/i.test(ua)
        , samsungBrowser = /SamsungBrowser/i.test(ua)
        , windows = !windowsphone && /windows/i.test(ua)
        , mac = !iosdevice && !silk && /macintosh/i.test(ua)
        , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
        , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
        , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
        , tablet = /tablet/i.test(ua)
        , mobile = !tablet && /[^-]mobi/i.test(ua)
        , xbox = /xbox/i.test(ua)
        , result

      if (/opera/i.test(ua)) {
        //  an old Opera
        result = {
          name: 'Opera'
          , opera: t
          , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        }
      } else if (/opr|opios/i.test(ua)) {
        // a new Opera
        result = {
          name: 'Opera'
          , opera: t
          , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
        }
      }
      else if (/SamsungBrowser/i.test(ua)) {
        result = {
          name: 'Samsung Internet for Android'
          , samsungBrowser: t
          , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        }
      }
      else if (/coast/i.test(ua)) {
        result = {
          name: 'Opera Coast'
          , coast: t
          , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
        }
      }
      else if (/yabrowser/i.test(ua)) {
        result = {
          name: 'Yandex Browser'
          , yandexbrowser: t
          , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        }
      }
      else if (/ucbrowser/i.test(ua)) {
        result = {
          name: 'UC Browser'
          , ucbrowser: t
          , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
        }
      }
      else if (/mxios/i.test(ua)) {
        result = {
          name: 'Maxthon'
          , maxthon: t
          , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
        }
      }
      else if (/epiphany/i.test(ua)) {
        result = {
          name: 'Epiphany'
          , epiphany: t
          , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
        }
      }
      else if (/puffin/i.test(ua)) {
        result = {
          name: 'Puffin'
          , puffin: t
          , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
        }
      }
      else if (/sleipnir/i.test(ua)) {
        result = {
          name: 'Sleipnir'
          , sleipnir: t
          , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
        }
      }
      else if (/k-meleon/i.test(ua)) {
        result = {
          name: 'K-Meleon'
          , kMeleon: t
          , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
        }
      }
      else if (windowsphone) {
        result = {
          name: 'Windows Phone'
          , windowsphone: t
        }
        if (edgeVersion) {
          result.msedge = t
          result.version = edgeVersion
        }
        else {
          result.msie = t
          result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/msie|trident/i.test(ua)) {
        result = {
          name: 'Internet Explorer'
          , msie: t
          , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        }
      } else if (chromeos) {
        result = {
          name: 'Chrome'
          , chromeos: t
          , chromeBook: t
          , chrome: t
          , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        }
      } else if (/chrome.+? edge/i.test(ua)) {
        result = {
          name: 'Microsoft Edge'
          , msedge: t
          , version: edgeVersion
        }
      }
      else if (/vivaldi/i.test(ua)) {
        result = {
          name: 'Vivaldi'
          , vivaldi: t
          , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
        }
      }
      else if (sailfish) {
        result = {
          name: 'Sailfish'
          , sailfish: t
          , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/seamonkey\//i.test(ua)) {
        result = {
          name: 'SeaMonkey'
          , seamonkey: t
          , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/firefox|iceweasel|fxios/i.test(ua)) {
        result = {
          name: 'Firefox'
          , firefox: t
          , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        }
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
          result.firefoxos = t
        }
      }
      else if (silk) {
        result =  {
          name: 'Amazon Silk'
          , silk: t
          , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/phantom/i.test(ua)) {
        result = {
          name: 'PhantomJS'
          , phantom: t
          , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/slimerjs/i.test(ua)) {
        result = {
          name: 'SlimerJS'
          , slimer: t
          , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
        }
      }
      else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
        result = {
          name: 'BlackBerry'
          , blackberry: t
          , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        }
      }
      else if (webos) {
        result = {
          name: 'WebOS'
          , webos: t
          , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
        };
        /touchpad\//i.test(ua) && (result.touchpad = t)
      }
      else if (/bada/i.test(ua)) {
        result = {
          name: 'Bada'
          , bada: t
          , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
        };
      }
      else if (tizen) {
        result = {
          name: 'Tizen'
          , tizen: t
          , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
        };
      }
      else if (/qupzilla/i.test(ua)) {
        result = {
          name: 'QupZilla'
          , qupzilla: t
          , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
        }
      }
      else if (/chromium/i.test(ua)) {
        result = {
          name: 'Chromium'
          , chromium: t
          , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
        }
      }
      else if (/chrome|crios|crmo/i.test(ua)) {
        result = {
          name: 'Chrome'
          , chrome: t
          , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        }
      }
      else if (android) {
        result = {
          name: 'Android'
          , version: versionIdentifier
        }
      }
      else if (/safari|applewebkit/i.test(ua)) {
        result = {
          name: 'Safari'
          , safari: t
        }
        if (versionIdentifier) {
          result.version = versionIdentifier
        }
      }
      else if (iosdevice) {
        result = {
          name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
        }
        // WTF: version is not part of user agent in web apps
        if (versionIdentifier) {
          result.version = versionIdentifier
        }
      }
      else if(/googlebot/i.test(ua)) {
        result = {
          name: 'Googlebot'
          , googlebot: t
          , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
        }
      }
      else {
        result = {
          name: getFirstMatch(/^(.*)\/(.*) /),
          version: getSecondMatch(/^(.*)\/(.*) /)
        };
      }

      // set webkit or gecko flag for browsers based on these engines
      if (!result.msedge && /(apple)?webkit/i.test(ua)) {
        if (/(apple)?webkit\/537\.36/i.test(ua)) {
          result.name = result.name || 'Blink'
          result.blink = t
        } else {
          result.name = result.name || 'Webkit'
          result.webkit = t
        }
        if (!result.version && versionIdentifier) {
          result.version = versionIdentifier
        }
      } else if (!result.opera && /gecko\//i.test(ua)) {
        result.name = result.name || 'Gecko'
        result.gecko = t
        result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
      }

      // set OS flags for platforms that have multiple browsers
      if (!result.windowsphone && !result.msedge && (android || result.silk)) {
        result.android = t
      } else if (!result.windowsphone && !result.msedge && iosdevice) {
        result[iosdevice] = t
        result.ios = t
      } else if (mac) {
        result.mac = t
      } else if (xbox) {
        result.xbox = t
      } else if (windows) {
        result.windows = t
      } else if (linux) {
        result.linux = t
      }

      // OS version extraction
      var osVersion = '';
      if (result.windowsphone) {
        osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
      } else if (iosdevice) {
        osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
        osVersion = osVersion.replace(/[_\s]/g, '.');
      } else if (android) {
        osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
      } else if (result.webos) {
        osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
      } else if (result.blackberry) {
        osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
      } else if (result.bada) {
        osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
      } else if (result.tizen) {
        osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
      }
      if (osVersion) {
        result.osversion = osVersion;
      }

      // device type extraction
      var osMajorVersion = osVersion.split('.')[0];
      if (
        tablet
        || nexusTablet
        || iosdevice == 'ipad'
        || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
        || result.silk
      ) {
        result.tablet = t
      } else if (
        mobile
        || iosdevice == 'iphone'
        || iosdevice == 'ipod'
        || android
        || nexusMobile
        || result.blackberry
        || result.webos
        || result.bada
      ) {
        result.mobile = t
      }

      // Graded Browser Support
      // http://developer.yahoo.com/yui/articles/gbs
      if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
        (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split('.')[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
      ) {
        result.a = t;
      }
      else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split('.')[0] < 6)
        || (result.chromium && result.version < 20)
      ) {
        result.c = t
      } else result.x = t

      return result
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

    bowser.test = function (browserList) {
      for (var i = 0; i < browserList.length; ++i) {
        var browserItem = browserList[i];
        if (typeof browserItem=== 'string') {
          if (browserItem in bowser) {
            return true;
          }
        }
      }
      return false;
    }

    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */
    function getVersionPrecision(version) {
      return version.split('.').length;
    }

    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */
    function map(arr, iterator) {
      var result = [], i;
      if (Array.prototype.map) {
        return Array.prototype.map.call(arr, iterator);
      }
      for (i = 0; i < arr.length; i++) {
        result.push(iterator(arr[i]));
      }
      return result;
    }

    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])  // 1
     *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
     *   compareVersions(['1.10.2.1',  '1.10.2.1']);   // 0
     *   compareVersions(['1.10.2.1',  '1.0800.2']);   // -1
     *
     * @param  {Array<String>} versions versions to compare
     * @return {Number} comparison result
     */
    function compareVersions(versions) {
      // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
      var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
      var chunks = map(versions, function (version) {
        var delta = precision - getVersionPrecision(version);

        // 2) "9" -> "9.0" (for precision = 2)
        version = version + new Array(delta + 1).join('.0');

        // 3) "9.0" -> ["000000000'', "000000009"]
        return map(version.split('.'), function (chunk) {
          return new Array(20 - chunk.length).join('0') + chunk;
        }).reverse();
      });

      // iterate in reverse order by reversed chunks array
      while (--precision >= 0) {
        // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
        if (chunks[0][precision] > chunks[1][precision]) {
          return 1;
        }
        else if (chunks[0][precision] === chunks[1][precision]) {
          if (precision === 0) {
            // all version chunks are same
            return 0;
          }
        }
        else {
          return -1;
        }
      }
    }

    /**
     * Check if browser is unsupported
     *
     * @example
     *   bowser.isUnsupportedBrowser({
   *   msie: "10",
   *   firefox: "23",
   *   chrome: "29",
   *   safari: "5.1",
   *   opera: "16",
   *   phantom: "534"
   *   });
     *
     * @param  {Object}  minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function isUnsupportedBrowser(minVersions, strictMode, ua) {
      var _bowser = bowser;

      // make strictMode param optional with ua param usage
      if (typeof strictMode === 'string') {
        ua = strictMode;
        strictMode = void(0);
      }

      if (strictMode === void(0)) {
        strictMode = false;
      }
      if (ua) {
        _bowser = detect(ua);
      }

      var version = '' + _bowser.version;
      for (var browser in minVersions) {
        if (minVersions.hasOwnProperty(browser)) {
          if (_bowser[browser]) {
            if (typeof minVersions[browser] !== 'string') {
              throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
            }

            // browser version and min supported version.
            return compareVersions([version, minVersions[browser]]) < 0;
          }
        }
      }

      return strictMode; // not found
    }

    /**
     * Check if browser is supported
     *
     * @param  {Object} minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function check(minVersions, strictMode, ua) {
      return !isUnsupportedBrowser(minVersions, strictMode, ua);
    }

    bowser.isUnsupportedBrowser = isUnsupportedBrowser;
    bowser.compareVersions = compareVersions;
    bowser.check = check;

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser
  });

  /*!
   * jQuery resize event - v1.1 - 3/14/2010
   * http://benalman.com/projects/jquery-resize-plugin/
   * 
   * Copyright (c) 2010 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
// 
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub     - http://github.com/cowboy/jquery-resize/
// Source     - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
// 
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests    - http://benalman.com/code/projects/jquery-resize/unit/
// 
// About: Release History
// 
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//     immediately after bind in some circumstances. Also changed $.fn.data
//     to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

  (function($,window,undefined){
    '$:nomunge'; // Used by YUI compressor.

    // A jQuery object containing all non-window elements to which the resize
    // event is bound.
    var elems = $([]),

    // Extend $.resize if it already exists, otherwise create it.
      jq_resize = $.resize = $.extend( $.resize, {} ),

      timeout_id,

    // Reused strings.
      str_setTimeout = 'setTimeout',
      str_resize = 'resize',
      str_data = str_resize + '-special-event',
      str_delay = 'delay',
      str_throttle = 'throttleWindow';

    // Property: jQuery.resize.delay
    // 
    // The numeric interval (in milliseconds) at which the resize event polling
    // loop executes. Defaults to 250.

    jq_resize[ str_delay ] = 250;

    // Property: jQuery.resize.throttleWindow
    // 
    // Throttle the native window object resize event to fire no more than once
    // every <jQuery.resize.delay> milliseconds. Defaults to true.
    // 
    // Because the window object has its own resize event, it doesn't need to be
    // provided by this plugin, and its execution can be left entirely up to the
    // browser. However, since certain browsers fire the resize event continuously
    // while others do not, enabling this will throttle the window resize event,
    // making event behavior consistent across all elements in all browsers.
    // 
    // While setting this property to false will disable window object resize
    // event throttling, please note that this property must be changed before any
    // window object resize event callbacks are bound.

    jq_resize[ str_throttle ] = true;

    // Event: resize event
    // 
    // Fired when an element's width or height changes. Because browsers only
    // provide this event for the window element, for other elements a polling
    // loop is initialized, running every <jQuery.resize.delay> milliseconds
    // to see if elements' dimensions have changed. You may bind with either
    // .resize( fn ) or .bind( 'resize', fn ), and unbind with .unbind( 'resize' ).
    // 
    // Usage:
    // 
    // > jQuery('selector').bind( 'resize', function(e) {
    // >   // element's width or height has changed!
    // >   ...
    // > });
    // 
    // Additional Notes:
    // 
    // * The polling loop is not created until at least one callback is actually
    //   bound to the 'resize' event, and this single polling loop is shared
    //   across all elements.
    // 
    // Double firing issue in jQuery 1.3.2:
    // 
    // While this plugin works in jQuery 1.3.2, if an element's event callbacks
    // are manually triggered via .trigger( 'resize' ) or .resize() those
    // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
    // events system. This is not an issue when using jQuery 1.4+.
    // 
    // > // While this works in jQuery 1.4+
    // > $(elem).css({ width: new_w, height: new_h }).resize();
    // > 
    // > // In jQuery 1.3.2, you need to do this:
    // > var elem = $(elem);
    // > elem.css({ width: new_w, height: new_h });
    // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
    // > elem.resize();

    $.event.special[ str_resize ] = {

      // Called only when the first 'resize' event callback is bound per element.
      setup: function() {
        // Since window has its own native 'resize' event, return false so that
        // jQuery will bind the event using DOM methods. Since only 'window'
        // objects have a .setTimeout method, this should be a sufficient test.
        // Unless, of course, we're throttling the 'resize' event for window.
        if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

        var elem = $(this);

        // Add this element to the list of internal elements to monitor.
        elems = elems.add( elem );

        // Initialize data store on the element.
        $.data( this, str_data, { w: elem.width(), h: elem.height() } );

        // If this is the first element added, start the polling loop.
        if ( elems.length === 1 ) {
          loopy();
        }
      },

      // Called only when the last 'resize' event callback is unbound per element.
      teardown: function() {
        // Since window has its own native 'resize' event, return false so that
        // jQuery will unbind the event using DOM methods. Since only 'window'
        // objects have a .setTimeout method, this should be a sufficient test.
        // Unless, of course, we're throttling the 'resize' event for window.
        if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

        var elem = $(this);

        // Remove this element from the list of internal elements to monitor.
        elems = elems.not( elem );

        // Remove any data stored on the element.
        elem.removeData( str_data );

        // If this is the last element removed, stop the polling loop.
        if ( !elems.length ) {
          clearTimeout( timeout_id );
        }
      },

      // Called every time a 'resize' event callback is bound per element (new in
      // jQuery 1.4).
      add: function( handleObj ) {
        // Since window has its own native 'resize' event, return false so that
        // jQuery doesn't modify the event object. Unless, of course, we're
        // throttling the 'resize' event for window.
        if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }

        var old_handler;

        // The new_handler function is executed every time the event is triggered.
        // This is used to update the internal element data store with the width
        // and height when the event is triggered manually, to avoid double-firing
        // of the event callback. See the "Double firing issue in jQuery 1.3.2"
        // comments above for more information.

        function new_handler( e, w, h ) {
          var elem = $(this),
            data = $.data( this, str_data );

          // If called from the polling loop, w and h will be passed in as
          // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
          // those values will need to be computed.
          data.w = w !== undefined ? w : elem.width();
          data.h = h !== undefined ? h : elem.height();

          old_handler.apply( this, arguments );
        };

        // This may seem a little complicated, but it normalizes the special event
        // .add method between jQuery 1.4/1.4.1 and 1.4.2+
        if ( $.isFunction( handleObj ) ) {
          // 1.4, 1.4.1
          old_handler = handleObj;
          return new_handler;
        } else {
          // 1.4.2+
          old_handler = handleObj.handler;
          handleObj.handler = new_handler;
        }
      }

    };

    function loopy() {

      // Start the polling loop, asynchronously.
      timeout_id = window[ str_setTimeout ](function(){

        // Iterate over all elements to which the 'resize' event is bound.
        elems.each(function(){
          var elem = $(this),
            width = elem.width(),
            height = elem.height(),
            data = $.data( this, str_data );

          // If element size has changed since the last time, update the element
          // data store and trigger the 'resize' event.
          if ( width !== data.w || height !== data.h ) {
            elem.trigger( str_resize, [ data.w = width, data.h = height ] );
          }

        });

        // Loop.
        loopy();

      }, jq_resize[ str_delay ] );

    };

  })(jQuery,this);

  (function( $ ) {
    $.outback = {};
  }( jQuery ));

  (function( $, window, undefined ) {
    $.extend( $.outback, {
      version: '1.0.0',

      // Keepnative Selector
      keepNative: '[data-role="none"], [data-role="nojs"], .no-js'
    });

    jQuery.queryParameters = function(url) {
      var result = {};

      var search = url.slice(url.indexOf('?'));

      var params = search.split(/\?|&/);
      params.forEach(function(it) {
        if(it) {
          var param = it.split('=');
          result[param[0]] = param[1];
        }
      });
      return result;
    };

  })( jQuery, this );

  (function( $, window, undefined ) {
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;

    $.extend( $.outback, {

      getAttribute: function( element, key ) {
        var data;

        element = element.jquery ? element[0] : element;

        if ( element && element.getAttribute ) {
          data = element.getAttribute( 'data-' + key );
        }

        // Copied from core's src/data.js:dataAttr()
        // Convert from a string to a proper data type
        try {
          data = data === 'true' ? true :
            data === 'false' ? false :
              data === 'null' ? null :
                // Only convert to a number if it doesn't change the string
                +data + '' === data ? +data :
                  rbrace.test( data ) ? JSON.parse( data ) :
                    data;
        } catch( err ) {}

        return data;
      },

      // Find the closest javascript page element to gather settings data jsperf test
      // http://jsperf.com/single-complex-selector-vs-many-complex-selectors/edit
      // possibly naive, but it shows that the parsing overhead for *just* the page selector vs
      // the page and dialog selector is negligable. This could probably be speed up by
      // doing a similar parent node traversal to the one found in the inherited theme code above
      closestPageData: function( $target ) {
        return $target
          .closest( '[data-role="page"]' )
          .data( 'outback-page' );
      }
    });

  })( jQuery, this );

  /*!
   * jQuery UI Core c0ab71056b936627e8a7821f03c044aec6280a40
   * http://jqueryui.com
   *
   * Copyright 2013 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */
  (function( $, undefined ) {

  // plugins
    $.fn.extend({
      focus: (function( orig ) {
        return function( delay, fn ) {
          return typeof delay === 'number' ?
            this.each(function() {
              var elem = this;
              setTimeout(function() {
                $( elem ).focus();
                if ( fn ) {
                  fn.call( elem );
                }
              }, delay );
            }) :
            orig.apply( this, arguments );
        };
      })( $.fn.focus ),

      scrollParent: function() {
        var position = this.css( 'position' ),
          excludeStaticParent = position === 'absolute',
          overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          scrollParent = this.parents().filter( function() {
            var parent = $( this );
            if ( excludeStaticParent && parent.css( 'position' ) === 'static' ) {
              return false;
            }
            return overflowRegex.test( parent.css( 'overflow' ) + parent.css( 'overflow-y' ) + parent.css( 'overflow-x' ) );
          }).eq( 0 );

        return position === 'fixed' || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
      },

      uniqueId: (function() {
        var uuid = 0;
        return function() {
          return this.each(function() {
            if ( !this.id ) {
              this.id = 'ui-id-' + (++uuid);
            }
          });
        };
      })(),

      removeUniqueId: function() {
        return this.each(function() {
          if ( /^ui-id-\d+$/.test( this.id ) ) {
            $( this ).removeAttr( 'id' );
          }
        });
      }
    });

    // selectors
    function focusable( element, isTabIndexNotNaN ) {
      var map, mapName, img,
        nodeName = element.nodeName.toLowerCase();
      if ( 'area' === nodeName ) {
        map = element.parentNode;
        mapName = map.name;
        if ( !element.href || !mapName || map.nodeName.toLowerCase() !== 'map' ) {
          return false;
        }
        img = $( 'img[usemap=#' + mapName + ']' )[0];
        return !!img && visible( img );
      }
      return ( /input|select|textarea|button|object/.test( nodeName ) ?
          !element.disabled :
          'a' === nodeName ?
          element.href || isTabIndexNotNaN :
            isTabIndexNotNaN) &&
          // the element and all of its ancestors must be visible
        visible( element );
    }

    function visible( element ) {
      return $.expr.filters.visible( element ) &&
        !$( element ).parents().addBack().filter(function() {
          return $.css( this, "visibility" ) === "hidden";
        }).length;
    }

    $.extend( $.expr[ ':' ], {
      data: $.expr.createPseudo ?
        $.expr.createPseudo(function( dataName ) {
          return function( elem ) {
            return !!$.data( elem, dataName );
          };
        }) :
        // support: jQuery <1.8
        function( elem, i, match ) {
          return !!$.data( elem, match[ 3 ] );
        },

      focusable: function( element ) {
        return focusable( element, !isNaN( $.attr( element, 'tabindex' ) ) );
      },

      tabbable: function( element ) {
        var tabIndex = $.attr( element, 'tabindex' ),
          isTabIndexNaN = isNaN( tabIndex );
        return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
      }
    });

    $.support.selectstart = 'onselectstart' in document.createElement( 'div' );

    $.fn.extend({
      disableSelection: function() {
        return this.bind( ( $.support.selectstart ? 'selectstart' : 'mousedown' ) +
          '.ob-disableSelection', function( event ) {
          event.preventDefault();
        });
      },

      enableSelection: function() {
        return this.unbind( '.ob-disableSelection' );
      },

      zIndex: function( zIndex ) {
        if ( zIndex !== undefined ) {
          return this.css( 'zIndex', zIndex );
        }

        if ( this.length ) {
          var elem = $( this[ 0 ] ), position, value;
          while ( elem.length && elem[ 0 ] !== document ) {
            // Ignore z-index if position is set to a value where z-index is ignored by the browser
            // This makes behavior of this function consistent across browsers
            // WebKit always returns auto if the element is positioned
            position = elem.css( 'position' );
            if ( position === 'absolute' || position === 'relative' || position === 'fixed' ) {
              // IE returns 0 when zIndex is not specified
              // other browsers return a string
              // we ignore the case of nested elements with an explicit value of 0
              // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
              value = parseInt( elem.css( 'zIndex' ), 10 );
              if ( !isNaN( value ) && value !== 0 ) {
                return value;
              }
            }
            elem = elem.parent();
          }
        }

        return 0;
      }
    });

  })( jQuery );

  (function( $, window, undefined ) {

    $.extend( $.outback, {
      window: $( window ),
      document: $( document ),

      getScreenHeight: function() {
        return window.innerHeight || $.outback.window.height();
      },

      loading: function() {
        // If this is the first call to this function, instantiate a loader widget
        var loader = this.loading._widget || $( $.outback.loader.prototype.defaultHtml ).loader(),

        // Call the appropriate method on the loader
          returnValue = loader.loader.apply( loader, arguments );

        // Make sure the loader is retained for future calls to this function.
        this.loading._widget = loader;

        return returnValue;
      },
      
      fakeLoading: function() {
        var fakeLoader = this.fakeLoading._widget || $( $.outback.fakeLoader.prototype.defaultHtml ).fakeLoader();
          
        if(arguments[0] == 'show'){
          this.fakeLoading._widget = fakeLoader;    
        }
        else if(arguments[0] == 'done' || arguments[0] == 'hide'){
          this.fakeLoading._widget = undefined;
        }

        return fakeLoader.fakeLoader.apply( fakeLoader, arguments ); 
      }
    });


    // plugins
    $.fn.extend({

      // Enhance child elements
      enhanceWithin: function() {
        var index,
          widgetElements = {},
          keepNative = $.outback.page.prototype.keepNativeSelector(),
          that = this;

        $(document).trigger('componentinit', [that]);
        
        // Enhance widgets
        $.each( $.outback.widgets, function( name, constructor ) {

          // If initSelector not false find elements
          if ( constructor.initSelector ) {

            // Filter elements that should not be enhanced based on parents
            var elements = that.find( constructor.initSelector );

            // If any matching elements remain filter ones with keepNativeSelector
            if ( elements.length > 0 ) {

              // $.outback.page.prototype.keepNativeSelector is deprecated this is just for backcompat
              // Switch to $.outback.keepNative in 1.5 which is just a value not a function
              elements = elements.not( keepNative );
            }

            // Enhance whatever is left
            if ( elements.length > 0 ) {
              widgetElements[ constructor.prototype.widgetName ] = elements;
            }
          }
        });

        for ( index in widgetElements ) {
          widgetElements[ index ][ index ]();
        }
        
        return this;
      },

      // note that this helper doesn't attempt to handle the callback
      // or setting of an html element's text, its only purpose is
      // to return the html encoded version of the text in all cases. (thus the name)
      getEncodedText: function() {
        return $( '<a>' ).text( this.text() ).html();
      }
    });


    $.find.matches = function( expr, set ) {
      return $.find( expr, null, null, set );
    };

    $.find.matchesSelector = function( node, expr ) {
      return $.find( expr, null, null, [ node ] ).length > 0;
    };

  })( jQuery, this );


  (function( $, undefined ) {

    /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
    window.matchMedia = window.matchMedia || (function( doc, undefined ) {

        var bool,
          docElem = doc.documentElement,
          refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
          fakeBody = doc.createElement( 'body' ),
          div = doc.createElement( 'div' );

        div.id = 'mq-test-1';
        div.style.cssText = 'position:absolute;top:-100em';
        fakeBody.style.background = 'none';
        fakeBody.appendChild(div);

        return function(q){

          div.innerHTML = '&shy;<style media=\"' + q + '\"> #mq-test-1 { width: 42px; }</style>';

          docElem.insertBefore( fakeBody, refNode );
          bool = div.offsetWidth === 42;
          docElem.removeChild( fakeBody );

          return {
            matches: bool,
            media: q
          };

        };

      }( document ));

    // $.outback.media uses matchMedia to return a boolean.
    $.outback.media = function( q ) {
      return window.matchMedia( q ).matches;
    };

  })(jQuery);

  (function( $, undefined ) {
    var support = {
      touch: 'ontouchend' in document
    };

    $.extend( $.support, support );
  }( jQuery ));

  (function( $, undefined ) {
    $.extend( $.support, {
      orientation: 'orientation' in window && 'onorientationchange' in window
    });
  }( jQuery ));

  (function( $, undefined ) {

    // thx Modernizr
    function propExists( prop ) {
      var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
        props = ( prop + ' ' + vendors.join( uc_prop + ' ' ) + uc_prop ).split( ' ' ),
        v;

      for ( v in props ) {
        if ( fbCSS[ props[ v ] ] !== undefined ) {
          return true;
        }
      }
    }

    var fakeBody = $( '<body>' ).prependTo( 'html' ),
      fbCSS = fakeBody[ 0 ].style,
      vendors = [ 'Webkit', 'Moz', 'O' ],
      webos = 'palmGetResource' in window;


    function transform3dTest() {
      var mqProp = 'transform-3d',
      // Because the `translate3d` test below throws false positives in Android:
        ret = $.outback.media( '(-' + vendors.join( '-' + mqProp + '),(-' ) + '-' + mqProp + '),(' + mqProp + ')' ),
        el, transforms, t;

      if ( ret ) {
        return !!ret;
      }

      el = document.createElement( 'div' );
      transforms = {
        // We’re omitting Opera for the time being; MS uses unprefixed.
        'MozTransform': '-moz-transform',
        'transform': 'transform'
      };

      fakeBody.append( el );

      for ( t in transforms ) {
        if ( el.style[ t ] !== undefined ) {
          el.style[ t ] = 'translate3d( 100px, 1px, 1px )';
          ret = window.getComputedStyle( el ).getPropertyValue( transforms[ t ] );
        }
      }
      return ( !!ret && ret !== 'none' );
    }

    // Test for dynamic-updating base tag support ( allows us to avoid href,src attr rewriting )
    function baseTagTest() {
      var fauxBase = location.protocol + "//" + location.host + location.pathname + 'ui-dir/',
        base = $( 'head base' ),
        fauxEle = null,
        href = '',
        link, rebase;

      if ( !base.length ) {
        base = fauxEle = $( '<base>', { 'href': fauxBase }).appendTo( 'head' );
      } else {
        href = base.attr( 'href' );
      }

      link = $( '<a href="testurl" />' ).prependTo( fakeBody );
      rebase = link[ 0 ].href;
      base[ 0 ].href = href || location.pathname;

      if ( fauxEle ) {
        fauxEle.remove();
      }
      return rebase.indexOf( fauxBase ) === 0;
    }

    // non-UA-based IE version check by James Padolsey, modified by jdalton - from http://gist.github.com/527683
    // allows for inclusion of IE 6+, including Windows Mobile 7
    $.extend( $.outback, { browser: {} } );

    function fixedPosition() {
      var w = window,
        ua = navigator.userAgent,
        platform = navigator.platform,
      // Rendering engine is Webkit, and capture major version
        wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ ),
        wkversion = !!wkmatch && wkmatch[ 1 ];

      if (
        // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
      ( ( platform.indexOf( 'iPhone' ) > -1 || platform.indexOf( 'iPad' ) > -1  || platform.indexOf( 'iPod' ) > -1 ) && wkversion && wkversion < 534 ) ||
        //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
      ( ua.indexOf( 'Android' ) > -1 && wkversion && wkversion < 533 ) ) {
        return false;
      }

      return true;
    }

    $.extend( $.support, {
      // Note, Chrome for iOS has an extremely quirky implementation of popstate.
      // We've chosen to take the shortest path to a bug fix here for issue #5426
      // See the following link for information about the regex chosen
      // https://developers.google.com/chrome/mobile/docs/user-agent#chrome_for_ios_user-agent
      pushState: 'pushState' in history &&
      'replaceState' in history &&
        // When running inside a FF iframe, calling replaceState causes an error
      !( window.navigator.userAgent.indexOf( 'Firefox' ) >= 0 && window.top !== window ) &&
      ( window.navigator.userAgent.search(/CriOS/) === -1 ),
      touchOverflow: !!propExists( 'overflowScrolling' ),
      cssTransform3d: transform3dTest(),
      fixedPosition: fixedPosition(),
      scrollTop: ('pageXOffset' in window ||
      'scrollTop' in document.documentElement ||
      'scrollTop' in fakeBody[ 0 ]) && !webos,

      dynamicBaseTag: baseTagTest()
    });

    fakeBody.remove();

  })( jQuery );


// throttled resize event
  (function( $ ) {
    $.event.special.throttledresize = {
      setup: function() {
        $( this ).bind( 'resize', handler );
      },
      teardown: function() {
        $( this ).unbind( 'resize', handler );
      }
    };

    var throttle = 250,
      handler = function() {
        curr = ( new Date() ).getTime();
        diff = curr - lastCall;

        if ( diff >= throttle ) {

          lastCall = curr;
          $( this ).trigger( 'throttledresize' );

        } else {

          if ( heldCall ) {
            clearTimeout( heldCall );
          }

          // Promise a held call will still execute
          heldCall = setTimeout( handler, throttle - diff );
        }
      },
      lastCall = 0,
      heldCall,
      curr,
      diff;
  })( jQuery );


  (function( $, window ) {
    var win = $( window ),
      event_name = 'orientationchange',
      get_orientation,
      last_orientation,
      initial_orientation_is_landscape,
      initial_orientation_is_default,
      portrait_map = { '0': true, '180': true },
      ww, wh, landscape_threshold;

    // It seems that some device/browser vendors use window.orientation values 0 and 180 to
    // denote the 'default' orientation. For iOS devices, and most other smart-phones tested,
    // the default orientation is always 'portrait', but in some Android and RIM based tablets,
    // the default orientation is 'landscape'. The following code attempts to use the window
    // dimensions to figure out what the current orientation is, and then makes adjustments
    // to the to the portrait_map if necessary, so that we can properly decode the
    // window.orientation value whenever get_orientation() is called.
    //
    // Note that we used to use a media query to figure out what the orientation the browser
    // thinks it is in:
    //
    //   initial_orientation_is_landscape = $.outback.media("all and (orientation: landscape)");
    //
    // but there was an iPhone/iPod Touch bug beginning with iOS 4.2, up through iOS 5.1,
    // where the browser *ALWAYS* applied the landscape media query. This bug does not
    // happen on iPad.

    if ( $.support.orientation ) {

      // Check the window width and height to figure out what the current orientation
      // of the device is at this moment. Note that we've initialized the portrait map
      // values to 0 and 180, *AND* we purposely check for landscape so that if we guess
      // wrong, , we default to the assumption that portrait is the default orientation.
      // We use a threshold check below because on some platforms like iOS, the iPhone
      // form-factor can report a larger width than height if the user turns on the
      // developer console. The actual threshold value is somewhat arbitrary, we just
      // need to make sure it is large enough to exclude the developer console case.

      ww = window.innerWidth || win.width();
      wh = window.innerHeight || win.height();
      landscape_threshold = 50;

      initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;

      // Now check to see if the current window.orientation is 0 or 180.
      initial_orientation_is_default = portrait_map[ window.orientation ];

      // If the initial orientation is landscape, but window.orientation reports 0 or 180, *OR*
      // if the initial orientation is portrait, but window.orientation reports 90 or -90, we
      // need to flip our portrait_map values because landscape is the default orientation for
      // this device/browser.
      if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
        portrait_map = { '-90': true, '90': true };
      }
    }

    $.event.special.orientationchange = $.extend( {}, $.event.special.orientationchange, {
      setup: function() {
        // If the event is supported natively, return false so that jQuery
        // will bind to the event using DOM methods.
        if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
          return false;
        }

        // Get the current orientation to avoid initial double-triggering.
        last_orientation = get_orientation();

        // Because the orientationchange event doesn't exist, simulate the
        // event by testing window dimensions on resize.
        win.bind( 'throttledresize', handler );
      },
      teardown: function() {
        // If the event is not supported natively, return false so that
        // jQuery will unbind the event using DOM methods.
        if ( $.support.orientation && !$.event.special.orientationchange.disabled ) {
          return false;
        }

        // Because the orientationchange event doesn't exist, unbind the
        // resize event handler.
        win.unbind( 'throttledresize', handler );
      },
      add: function( handleObj ) {
        // Save a reference to the bound event handler.
        var old_handler = handleObj.handler;

        handleObj.handler = function( event ) {
          // Modify event object, adding the .orientation property.
          event.orientation = get_orientation();

          // Call the originally-bound event handler and return its result.
          return old_handler.apply( this, arguments );
        };
      }
    });

    // If the event is not supported natively, this handler will be bound to
    // the window resize event to simulate the orientationchange event.
    function handler() {
      // Get the current orientation.
      var orientation = get_orientation();

      if ( orientation !== last_orientation ) {
        // The orientation has changed, so trigger the orientationchange event.
        last_orientation = orientation;
        win.trigger( event_name );
      }
    }

    // Get the current page orientation. This method is exposed publicly, should it
    // be needed, as jQuery.event.special.orientationchange.orientation()
    $.event.special.orientationchange.orientation = get_orientation = function() {
      var isPortrait = true, elem = document.documentElement;

      // prefer window orientation to the calculation based on screensize as
      // the actual screen resize takes place before or after the orientation change event
      // has been fired depending on implementation (eg android 2.3 is before, iphone after).
      // More testing is required to determine if a more reliable method of determining the new screensize
      // is possible when orientationchange is fired. (eg, use media queries + element + opacity)
      if ( $.support.orientation ) {
        // if the window orientation registers as 0 or 180 degrees report
        // portrait, otherwise landscape
        isPortrait = portrait_map[ window.orientation ];
      } else {
        isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
      }

      return isPortrait ? 'portrait' : 'landscape';
    };

    $.fn[ event_name ] = function( fn ) {
      return fn ? this.bind( event_name, fn ) : this.trigger( event_name );
    };

    // jQuery < 1.8
    if ( $.attrFn ) {
      $.attrFn[ event_name ] = true;
    }

  }( jQuery, this ));


// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// 'vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel'

  (function( $, window, document, undefined ) {

    var dataPropertyName = 'virtualMouseBindings',
      touchTargetPropertyName = 'virtualTouchID',
      virtualEventNames = 'vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel'.split( ' ' ),
      touchEventProps = 'clientX clientY pageX pageY screenX screenY'.split( ' ' ),
      mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
      mouseEventProps = $.event.props.concat( mouseHookProps ),
      activeDocHandlers = {},
      resetTimerID = 0,
      startX = 0,
      startY = 0,
      didScroll = false,
      clickBlockList = [],
      blockMouseTriggers = false,
      blockTouchTriggers = false,
      eventCaptureSupported = 'addEventListener' in document,
      $document = $( document ),
      nextTouchID = 1,
      lastTouchID = 0, threshold,
      i;

    $.vmouse = {
      moveDistanceThreshold: 10,
      clickDistanceThreshold: 10,
      resetTimerDuration: 1500
    };

    function getNativeEvent( event ) {

      while ( event && typeof event.originalEvent !== 'undefined' ) {
        event = event.originalEvent;
      }
      return event;
    }

    function createVirtualEvent( event, eventType ) {

      var t = event.type,
        oe, props, ne, prop, ct, touch, i, j, len;

      event = $.Event( event );
      event.type = eventType;

      oe = event.originalEvent;
      props = $.event.props;

      // addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
      // https://github.com/jquery/jquery-mobile/issues/3280
      if ( t.search( /^(mouse|click)/ ) > -1 ) {
        props = mouseEventProps;
      }

      // copy original event properties over to the new event
      // this would happen if we could call $.event.fix instead of $.Event
      // but we don't have a way to force an event to be fixed multiple times
      if ( oe ) {
        for ( i = props.length; i; ) {
          prop = props[ --i ];
          event[ prop ] = oe[ prop ];
        }
      }

      // make sure that if the mouse and click virtual events are generated
      // without a .which one is defined
      if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
        event.which = 1;
      }

      if ( t.search(/^touch/) !== -1 ) {
        ne = getNativeEvent( oe );
        t = ne.touches;
        ct = ne.changedTouches;
        touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

        if ( touch ) {
          for ( j = 0, len = touchEventProps.length; j < len; j++) {
            prop = touchEventProps[ j ];
            event[ prop ] = touch[ prop ];
          }
        }
      }

      return event;
    }

    function getVirtualBindingFlags( element ) {

      var flags = {},
        b, k;

      while ( element ) {

        b = $.data( element, dataPropertyName );

        for (  k in b ) {
          if ( b[ k ] ) {
            flags[ k ] = flags.hasVirtualBinding = true;
          }
        }
        element = element.parentNode;
      }
      return flags;
    }

    function getClosestElementWithVirtualBinding( element, eventType ) {
      var b;
      while ( element ) {

        b = $.data( element, dataPropertyName );

        if ( b && ( !eventType || b[ eventType ] ) ) {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    }

    function enableTouchBindings() {
      blockTouchTriggers = false;
    }

    function disableTouchBindings() {
      blockTouchTriggers = true;
    }

    function enableMouseBindings() {
      lastTouchID = 0;
      clickBlockList.length = 0;
      blockMouseTriggers = false;

      // When mouse bindings are enabled, our
      // touch bindings are disabled.
      disableTouchBindings();
    }

    function disableMouseBindings() {
      // When mouse bindings are disabled, our
      // touch bindings are enabled.
      enableTouchBindings();
    }

    function startResetTimer() {
      clearResetTimer();
      resetTimerID = setTimeout( function() {
        resetTimerID = 0;
        enableMouseBindings();
      }, $.vmouse.resetTimerDuration );
    }

    function clearResetTimer() {
      if ( resetTimerID ) {
        clearTimeout( resetTimerID );
        resetTimerID = 0;
      }
    }

    function triggerVirtualEvent( eventType, event, flags ) {
      var ve;

      if ( ( flags && flags[ eventType ] ) ||
        ( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

        ve = createVirtualEvent( event, eventType );

        $( event.target).trigger( ve );
      }

      return ve;
    }

    function mouseEventCallback( event ) {
      var touchID = $.data( event.target, touchTargetPropertyName ),
        ve;

      if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
        ve = triggerVirtualEvent( 'v' + event.type, event );
        if ( ve ) {
          if ( ve.isDefaultPrevented() ) {
            event.preventDefault();
          }
          if ( ve.isPropagationStopped() ) {
            event.stopPropagation();
          }
          if ( ve.isImmediatePropagationStopped() ) {
            event.stopImmediatePropagation();
          }
        }
      }
    }

    function handleTouchStart( event ) {

      var touches = getNativeEvent( event ).touches,
        target, flags, t;

      if ( touches && touches.length === 1 ) {

        target = event.target;
        flags = getVirtualBindingFlags( target );

        if ( flags.hasVirtualBinding ) {

          lastTouchID = nextTouchID++;
          $.data( target, touchTargetPropertyName, lastTouchID );

          clearResetTimer();

          disableMouseBindings();
          didScroll = false;

          t = getNativeEvent( event ).touches[ 0 ];
          startX = t.pageX;
          startY = t.pageY;

          triggerVirtualEvent( 'vmouseover', event, flags );
          triggerVirtualEvent( 'vmousedown', event, flags );
        }
      }
    }

    function handleScroll( event ) {
      if ( blockTouchTriggers ) {
        return;
      }

      if ( !didScroll ) {
        triggerVirtualEvent( 'vmousecancel', event, getVirtualBindingFlags( event.target ) );
      }

      didScroll = true;
      startResetTimer();
    }

    function handleTouchMove( event ) {
      if ( blockTouchTriggers ) {
        return;
      }

      var t = getNativeEvent( event ).touches[ 0 ],
        didCancel = didScroll,
        moveThreshold = $.vmouse.moveDistanceThreshold,
        flags = getVirtualBindingFlags( event.target );

      didScroll = didScroll ||
        ( Math.abs( t.pageX - startX ) > moveThreshold ||
        Math.abs( t.pageY - startY ) > moveThreshold );

      if ( didScroll && !didCancel ) {
        triggerVirtualEvent( 'vmousecancel', event, flags );
      }

      triggerVirtualEvent( 'vmousemove', event, flags );
      startResetTimer();
    }

    function handleTouchEnd( event ) {
      if ( blockTouchTriggers ) {
        return;
      }

      disableTouchBindings();

      var flags = getVirtualBindingFlags( event.target ),
        ve, t;
      triggerVirtualEvent( 'vmouseup', event, flags );

      if ( !didScroll ) {
        ve = triggerVirtualEvent( 'vclick', event, flags );
        if ( ve && ve.isDefaultPrevented() ) {
          // The target of the mouse events that follow the touchend
          // event don't necessarily match the target used during the
          // touch. This means we need to rely on coordinates for blocking
          // any click that is generated.
          t = getNativeEvent( event ).changedTouches[ 0 ];
          clickBlockList.push({
            touchID: lastTouchID,
            x: t.clientX,
            y: t.clientY
          });

          // Prevent any mouse events that follow from triggering
          // virtual event notifications.
          blockMouseTriggers = true;
        }
      }
      triggerVirtualEvent( 'vmouseout', event, flags);
      didScroll = false;

      startResetTimer();
    }

    function hasVirtualBindings( ele ) {
      var bindings = $.data( ele, dataPropertyName ),
        k;

      if ( bindings ) {
        for ( k in bindings ) {
          if ( bindings[ k ] ) {
            return true;
          }
        }
      }
      return false;
    }

    function dummyMouseHandler() {}

    function getSpecialEventObject( eventType ) {
      var realType = eventType.substr( 1 );

      return {
        setup: function(/* data, namespace */) {
          // If this is the first virtual mouse binding for this element,
          // add a bindings object to its data.

          if ( !hasVirtualBindings( this ) ) {
            $.data( this, dataPropertyName, {} );
          }

          // If setup is called, we know it is the first binding for this
          // eventType, so initialize the count for the eventType to zero.
          var bindings = $.data( this, dataPropertyName );
          bindings[ eventType ] = true;

          // If this is the first virtual mouse event for this type,
          // register a global handler on the document.

          activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

          if ( activeDocHandlers[ eventType ] === 1 ) {
            $document.bind( realType, mouseEventCallback );
          }

          // Some browsers, like Opera Mini, won't dispatch mouse/click events
          // for elements unless they actually have handlers registered on them.
          // To get around this, we register dummy handlers on the elements.

          $( this ).bind( realType, dummyMouseHandler );

          // For now, if event capture is not supported, we rely on mouse handlers.
          if ( eventCaptureSupported ) {
            // If this is the first virtual mouse binding for the document,
            // register our touchstart handler on the document.

            activeDocHandlers[ 'touchstart' ] = ( activeDocHandlers[ 'touchstart' ] || 0) + 1;

            if ( activeDocHandlers[ 'touchstart' ] === 1 ) {
              $document.bind( 'touchstart', handleTouchStart )
                .bind( 'touchend', handleTouchEnd )

                // On touch platforms, touching the screen and then dragging your finger
                // causes the window content to scroll after some distance threshold is
                // exceeded. On these platforms, a scroll prevents a click event from being
                // dispatched, and on some platforms, even the touchend is suppressed. To
                // mimic the suppression of the click event, we need to watch for a scroll
                // event. Unfortunately, some platforms like iOS don't dispatch scroll
                // events until *AFTER* the user lifts their finger (touchend). This means
                // we need to watch both scroll and touchmove events to figure out whether
                // or not a scroll happenens before the touchend event is fired.

                .bind( 'touchmove', handleTouchMove )
                .bind( 'scroll', handleScroll );
            }
          }
        },

        teardown: function(/* data, namespace */) {
          // If this is the last virtual binding for this eventType,
          // remove its global handler from the document.

          --activeDocHandlers[ eventType ];

          if ( !activeDocHandlers[ eventType ] ) {
            $document.unbind( realType, mouseEventCallback );
          }

          if ( eventCaptureSupported ) {
            // If this is the last virtual mouse binding in existence,
            // remove our document touchstart listener.

            --activeDocHandlers[ 'touchstart' ];

            if ( !activeDocHandlers[ 'touchstart' ] ) {
              $document.unbind( 'touchstart', handleTouchStart )
                .unbind( 'touchmove', handleTouchMove )
                .unbind( 'touchend', handleTouchEnd )
                .unbind( 'scroll', handleScroll );
            }
          }

          var $this = $( this ),
            bindings = $.data( this, dataPropertyName );

          // teardown may be called when an element was
          // removed from the DOM. If this is the case,
          // jQuery core may have already stripped the element
          // of any data bindings so we need to check it before
          // using it.
          if ( bindings ) {
            bindings[ eventType ] = false;
          }

          // Unregister the dummy event handler.

          $this.unbind( realType, dummyMouseHandler );

          // If this is the last virtual mouse binding on the
          // element, remove the binding data from the element.

          if ( !hasVirtualBindings( this ) ) {
            $this.removeData( dataPropertyName );
          }
        }
      };
    }

// Expose our custom events to the jQuery bind/unbind mechanism.

    for ( i = 0; i < virtualEventNames.length; i++ ) {
      $.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
    }

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
    if ( eventCaptureSupported ) {
      document.addEventListener( 'click', function( e ) {
        var cnt = clickBlockList.length,
          target = e.target,
          x, y, ele, i, o, touchID;

        if ( cnt ) {
          x = e.clientX;
          y = e.clientY;
          threshold = $.vmouse.clickDistanceThreshold;

          // The idea here is to run through the clickBlockList to see if
          // the current click event is in the proximity of one of our
          // vclick events that had preventDefault() called on it. If we find
          // one, then we block the click.
          //
          // Why do we have to rely on proximity?
          //
          // Because the target of the touch event that triggered the vclick
          // can be different from the target of the click event synthesized
          // by the browser. The target of a mouse/click event that is synthesized
          // from a touch event seems to be implementation specific. For example,
          // some browsers will fire mouse/click events for a link that is near
          // a touch event, even though the target of the touchstart/touchend event
          // says the user touched outside the link. Also, it seems that with most
          // browsers, the target of the mouse/click event is not calculated until the
          // time it is dispatched, so if you replace an element that you touched
          // with another element, the target of the mouse/click will be the new
          // element underneath that point.
          //
          // Aside from proximity, we also check to see if the target and any
          // of its ancestors were the ones that blocked a click. This is necessary
          // because of the strange mouse/click target calculation done in the
          // Android 2.1 browser, where if you click on an element, and there is a
          // mouse/click handler on one of its ancestors, the target will be the
          // innermost child of the touched element, even if that child is no where
          // near the point of touch.

          ele = target;

          while ( ele ) {
            for ( i = 0; i < cnt; i++ ) {
              o = clickBlockList[ i ];
              touchID = 0;

              if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
                $.data( ele, touchTargetPropertyName ) === o.touchID ) {
                // XXX: We may want to consider removing matches from the block list
                //    instead of waiting for the reset timer to fire.
                e.preventDefault();
                e.stopPropagation();
                return;
              }
            }
            ele = ele.parentNode;
          }
        }
      }, true);
    }
  })( jQuery, window, document );


  (function( $, window, undefined ) {
    var $document = $( document ),
      supportTouch = $.support.touch,
      scrollEvent = 'touchmove scroll',
      touchStartEvent = supportTouch ? 'touchstart' : 'mousedown',
      touchStopEvent = supportTouch ? 'touchend' : 'mouseup',
      touchMoveEvent = supportTouch ? 'touchmove' : 'mousemove';

    // setup new event shortcuts
    $.each( ( 'touchstart touchmove touchend ' +
    'tap taphold ' +
    'swipe swipeleft swiperight ' +
    'scrollstart scrollstop' ).split( ' ' ), function( i, name ) {

      $.fn[ name ] = function( fn ) {
        return fn ? this.bind( name, fn ) : this.trigger( name );
      };

      // jQuery < 1.8
      if ( $.attrFn ) {
        $.attrFn[ name ] = true;
      }
    });

    function triggerCustomEvent( obj, eventType, event, bubble ) {
      var originalType = event.type;
      event.type = eventType;
      if ( bubble ) {
        $.event.trigger( event, undefined, obj );
      } else {
        $.event.dispatch.call( obj, event );
      }
      event.type = originalType;
    }

    // also handles scrollstop
    $.event.special.scrollstart = {

      enabled: true,
      setup: function() {

        var thisObject = this,
          $this = $( thisObject ),
          scrolling,
          timer;

        function trigger( event, state ) {
          scrolling = state;
          triggerCustomEvent( thisObject, scrolling ? 'scrollstart' : 'scrollstop', event );
        }

        // iPhone triggers scroll after a small delay; use touchmove instead
        $this.bind( scrollEvent, function( event ) {

          if ( !$.event.special.scrollstart.enabled ) {
            return;
          }

          if ( !scrolling ) {
            trigger( event, true );
          }

          clearTimeout( timer );
          timer = setTimeout( function() {
            trigger( event, false );
          }, 50 );
        });
      },
      teardown: function() {
        $( this ).unbind( scrollEvent );
      }
    };

    // also handles taphold
    $.event.special.tap = {
      tapholdThreshold: 750,
      emitTapOnTaphold: true,
      setup: function() {
        var thisObject = this,
          $this = $( thisObject ),
          isTaphold = false;

        $this.bind( 'vmousedown', function( event ) {
          isTaphold = false;
          if ( event.which && event.which !== 1 ) {
            return false;
          }

          var origTarget = event.target,
            timer;

          function clearTapTimer() {
            clearTimeout( timer );
          }

          function clearTapHandlers() {
            clearTapTimer();

            $this.unbind( 'vclick', clickHandler )
              .unbind( 'vmouseup', clearTapTimer );
            $document.unbind( 'vmousecancel', clearTapHandlers );
          }

          function clickHandler( event ) {
            clearTapHandlers();

            // ONLY trigger a 'tap' event if the start target is
            // the same as the stop target.
            if ( !isTaphold && origTarget === event.target ) {
              triggerCustomEvent( thisObject, 'tap', event );
            } else if ( isTaphold ) {
              event.preventDefault();
            }
          }

          $this.bind( 'vmouseup', clearTapTimer )
            .bind( 'vclick', clickHandler );
          $document.bind( 'vmousecancel', clearTapHandlers );

          timer = setTimeout( function() {
            if ( !$.event.special.tap.emitTapOnTaphold ) {
              isTaphold = true;
            }
            triggerCustomEvent( thisObject, 'taphold', $.Event( 'taphold', { target: origTarget } ) );
          }, $.event.special.tap.tapholdThreshold );
        });
      },
      teardown: function() {
        $( this ).unbind( 'vmousedown' ).unbind( 'vclick' ).unbind( 'vmouseup' );
        $document.unbind( 'vmousecancel' );
      }
    };

    // Also handles swipeleft, swiperight
    $.event.special.swipe = {

      // More than this horizontal displacement, and we will suppress scrolling.
      scrollSupressionThreshold: 30,

      // More time than this, and it isn't a swipe.
      durationThreshold: 100,

      // Swipe horizontal displacement must be more than this.
      horizontalDistanceThreshold: 30,

      // Swipe vertical displacement must be less than this.
      verticalDistanceThreshold: 30,

      getLocation: function ( event ) {
        var winPageX = window.pageXOffset,
          winPageY = window.pageYOffset,
          x = event.clientX,
          y = event.clientY;

        if ( event.pageY === 0 && Math.floor( y ) > Math.floor( event.pageY ) ||
          event.pageX === 0 && Math.floor( x ) > Math.floor( event.pageX ) ) {

          // iOS4 clientX/clientY have the value that should have been
          // in pageX/pageY. While pageX/page/ have the value 0
          x = x - winPageX;
          y = y - winPageY;
        } else if ( y < ( event.pageY - winPageY) || x < ( event.pageX - winPageX ) ) {

          // Some Android browsers have totally bogus values for clientX/Y
          // when scrolling/zooming a page. Detectable since clientX/clientY
          // should never be smaller than pageX/pageY minus page scroll
          x = event.pageX - winPageX;
          y = event.pageY - winPageY;
        }

        return {
          x: x,
          y: y
        };
      },

      start: function( event ) {
        var data = event.originalEvent.touches ?
            event.originalEvent.touches[ 0 ] : event,
          location = $.event.special.swipe.getLocation( data );
        return {
          time: ( new Date() ).getTime(),
          coords: [ location.x, location.y ],
          origin: $( event.target )
        };
      },

      stop: function( event ) {
        var data = event.originalEvent.touches ?
            event.originalEvent.touches[ 0 ] : event,
          location = $.event.special.swipe.getLocation( data );
        return {
          time: ( new Date() ).getTime(),
          coords: [ location.x, location.y ]
        };
      },

      handleSwipe: function( start, stop, thisObject, origTarget ) {
        if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
          Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
          Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
          var direction = start.coords[0] > stop.coords[ 0 ] ? 'swipeleft' : 'swiperight';

          triggerCustomEvent( thisObject, 'swipe', $.Event( 'swipe', { target: origTarget, swipestart: start, swipestop: stop }), true );
          triggerCustomEvent( thisObject, direction,$.Event( direction, { target: origTarget, swipestart: start, swipestop: stop } ), true );
          return true;
        }
        return false;

      },

      // This serves as a flag to ensure that at most one swipe event event is
      // in work at any given time
      eventInProgress: false,

      setup: function() {
        var events,
          thisObject = this,
          $this = $( thisObject ),
          context = {};

        // Retrieve the events data for this element and add the swipe context
        events = $.data( this, 'outback-events' );
        if ( !events ) {
          events = { length: 0 };
          $.data( this, 'outback-events', events );
        }
        events.length++;
        events.swipe = context;

        context.start = function( event ) {
          if(event.target.nodeName == 'svg') {
              return;
          } 
          if(event.target.type == 'range') {
            return;
          }
          
          // Bail if we're already working on a swipe event
          if ( $.event.special.swipe.eventInProgress ) {
            return;
          }
          $.event.special.swipe.eventInProgress = true;

          var stop,
            start = $.event.special.swipe.start( event ),
            origTarget = event.target,
            emitted = false;

          context.move = function( event ) {
            if ( !start || event.isDefaultPrevented() ) {
              return;
            }

            stop = $.event.special.swipe.stop( event );
            if ( !emitted ) {
              emitted = $.event.special.swipe.handleSwipe( start, stop, thisObject, origTarget );
              if ( emitted ) {

                // Reset the context to make way for the next swipe event
                $.event.special.swipe.eventInProgress = false;
              }
            }
            // prevent scrolling
            if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
              event.preventDefault();
            }
          };

          context.stop = function() {
            emitted = true;

            // Reset the context to make way for the next swipe event
            $.event.special.swipe.eventInProgress = false;
            $document.off( touchMoveEvent, context.move );
            context.move = null;
          };

          $document.on( touchMoveEvent, context.move )
            .one( touchStopEvent, context.stop );
        };
        $this.on( touchStartEvent, context.start );
      },

      teardown: function() {
        var events, context;

        events = $.data( this, 'outback-events' );
        if ( events ) {
          context = events.swipe;
          delete events.swipe;
          events.length--;
          if ( events.length === 0 ) {
            $.removeData( this, 'outback-events' );
          }
        }

        if ( context ) {
          if ( context.start ) {
            $( this ).off( touchStartEvent, context.start );
          }
          if ( context.move ) {
            $document.off( touchMoveEvent, context.move );
          }
          if ( context.stop ) {
            $document.off( touchStopEvent, context.stop );
          }
        }
      }
    };
    $.each({
      scrollstop: 'scrollstart',
      taphold: 'tap',
      swipeleft: 'swipe.left',
      swiperight: 'swipe.right'
    }, function( event, sourceEvent ) {

      $.event.special[ event ] = {
        setup: function() {
          $( this ).bind( sourceEvent, $.noop );
        },
        teardown: function() {
          $( this ).unbind( sourceEvent );
        }
      };
    });

  })( jQuery, this );

  (function( $, undefined ) {
    var props = {
        'animation': {},
        'transition': {}
      },
      testElement = document.createElement( 'a' ),
      vendorPrefixes = [ '', 'webkit-', 'moz-', 'o-' ];

    $.each( [ 'animation', 'transition' ], function( i, test ) {

      // Get correct name for test
      var testName = ( i === 0 ) ? test + '-' + 'name' : test;

      $.each( vendorPrefixes, function( j, prefix ) {
        if ( testElement.style[ $.camelCase( prefix + testName ) ] !== undefined ) {
          props[ test ][ 'prefix' ] = prefix;
          return false;
        }
      });

      // Set event and duration names for later use
      props[ test ][ 'duration' ] =
        $.camelCase( props[ test ][ 'prefix' ] + test + '-' + 'duration' );
      props[ test ][ 'event' ] =
        $.camelCase( props[ test ][ 'prefix' ] + test + '-' + 'end' );

      // All lower case if not a vendor prop
      if ( props[ test ][ 'prefix' ] === '' ) {
        props[ test ][ 'event' ] = props[ test ][ 'event' ].toLowerCase();
      }
    });

    // If a valid prefix was found then the it is supported by the browser
    $.support.cssTransitions = ( props[ 'transition' ][ 'prefix' ] !== undefined );
    $.support.cssAnimations = ( props[ 'animation' ][ 'prefix' ] !== undefined );

    // Remove the testElement
    $( testElement ).remove();

    // Animation complete callback
    $.fn.animationComplete = function( callback, type, fallbackTime ) {
      var timer, duration,
        that = this,
        eventBinding = function() {

          // Clear the timer so we don't call callback twice
          clearTimeout( timer );
          callback.apply( this, arguments );
        },
        animationType = ( !type || type === 'animation' ) ? 'animation' : 'transition';

      // Make sure selected type is supported by browser
      if ( ( $.support.cssTransitions && animationType === 'transition' ) ||
        ( $.support.cssAnimations && animationType === 'animation' ) ) {

        // If a fallback time was not passed set one
        if ( fallbackTime === undefined ) {

          // Make sure the was not bound to document before checking .css
          if ( $( this ).context !== document ) {

            // Parse the durration since its in second multiple by 1000 for milliseconds
            // Multiply by 3 to make sure we give the animation plenty of time.
            duration = parseFloat(
                $( this ).css( props[ animationType ].duration )
              ) * 3000;
          }

          // If we could not read a duration use the default
          if ( duration === 0 || duration === undefined || isNaN( duration ) ) {
            duration = $.fn.animationComplete.defaultDuration;
          }
        }

        // Sets up the fallback if event never comes
        timer = setTimeout( function() {
          $( that ).off( props[ animationType ].event, eventBinding );
          callback.apply( that );
        }, duration );

        // Bind the event
        return $( this ).one( props[ animationType ].event, eventBinding );
      } else {

        // CSS animation / transitions not supported
        // Defer execution for consistency between webkit/non webkit
        setTimeout( $.proxy( callback, this ), 0 );
        return $( this );
      }
    };

    // Allow default callback to be configured on mobileInit
    $.fn.animationComplete.defaultDuration = 1000;
  })( jQuery );

  /*!
   * jQuery UI Widget 1.11.2
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/jQuery.widget/
   */

  (function( $, undefined ) {
    var uuid = 0,
      slice = Array.prototype.slice,
      _cleanData = $.cleanData;
    $.cleanData = function( elems ) {
      for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
        try {
          $( elem ).triggerHandler( 'remove' );
          // http://bugs.jquery.com/ticket/8235
        } catch( e ) {}
      }
      _cleanData( elems );
    };

    $.widget = function( name, base, prototype ) {
      var fullName, existingConstructor, constructor, basePrototype,
      // proxiedPrototype allows the provided prototype to remain unmodified
      // so that it can be used as a mixin for multiple widgets (#8876)
        proxiedPrototype = {},
        namespace = name.split( '.' )[ 0 ];

      name = name.split( '.' )[ 1 ];
      fullName = namespace + '-' + name;

      if ( !prototype ) {
        prototype = base;
        base = $.Widget;
      }

      // create selector for plugin
      $.expr[ ':' ][ fullName.toLowerCase() ] = function( elem ) {
        return !!$.data( elem, fullName );
      };

      $[ namespace ] = $[ namespace ] || {};
      existingConstructor = $[ namespace ][ name ];
      constructor = $[ namespace ][ name ] = function( options, element ) {
        // allow instantiation without "new" keyword
        if ( !this._createWidget ) {
          return new constructor( options, element );
        }

        // allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if ( arguments.length ) {
          this._createWidget( options, element );
        }
      };
      // extend with the existing constructor to carry over any static properties
      $.extend( constructor, existingConstructor, {
        version: prototype.version,
        // copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend( {}, prototype ),
        // track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
      });

      basePrototype = new base();
      // we need to make the options hash a property directly on the new instance
      // otherwise we'll modify the options hash on the prototype that we're
      // inheriting from
      basePrototype.options = $.widget.extend( {}, basePrototype.options );
      $.each( prototype, function( prop, value ) {
        if ( !$.isFunction( value ) ) {
          proxiedPrototype[ prop ] = value;
          return;
        }
        proxiedPrototype[ prop ] = (function() {
          var _super = function() {
              return base.prototype[ prop ].apply( this, arguments );
            },
            _superApply = function( args ) {
              return base.prototype[ prop ].apply( this, args );
            };
          return function() {
            var __super = this._super,
              __superApply = this._superApply,
              returnValue;

            this._super = _super;
            this._superApply = _superApply;

            returnValue = value.apply( this, arguments );

            this._super = __super;
            this._superApply = __superApply;

            return returnValue;
          };
        })();
      });
      constructor.prototype = $.widget.extend( basePrototype, {
        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
      }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      });

      // If this widget is being redefined then we need to find all widgets that
      // are inheriting from it and redefine all of them so that they inherit from
      // the new version of this widget. We're essentially trying to replace one
      // level in the prototype chain.
      if ( existingConstructor ) {
        $.each( existingConstructor._childConstructors, function( i, child ) {
          var childPrototype = child.prototype;

          // redefine the child widget using the same prototype that was
          // originally used, but inherit from the new version of the base
          $.widget( childPrototype.namespace + '.' + childPrototype.widgetName, constructor, child._proto );
        });
        // remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
      } else {
        base._childConstructors.push( constructor );
      }

      $.widget.bridge( name, constructor );

      return constructor;
    };

    $.widget.extend = function( target ) {
      var input = slice.call( arguments, 1 ),
        inputIndex = 0,
        inputLength = input.length,
        key,
        value;
      for ( ; inputIndex < inputLength; inputIndex++ ) {
        for ( key in input[ inputIndex ] ) {
          value = input[ inputIndex ][ key ];
          if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
            // Clone objects
            if ( $.isPlainObject( value ) ) {
              target[ key ] = $.isPlainObject( target[ key ] ) ?
                $.widget.extend( {}, target[ key ], value ) :
                // Don't extend strings, arrays, etc. with objects
                $.widget.extend( {}, value );
              // Copy everything else by reference
            } else {
              target[ key ] = value;
            }
          }
        }
      }
      return target;
    };

    $.widget.bridge = function( name, object ) {
      var fullName = object.prototype.widgetFullName || name;
      $.fn[ name ] = function( options ) {
        var isMethodCall = typeof options === 'string',
          args = slice.call( arguments, 1 ),
          returnValue = this;

        // allow multiple hashes to be passed on init
        options = !isMethodCall && args.length ?
          $.widget.extend.apply( null, [ options ].concat(args) ) :
          options;

        if ( isMethodCall ) {
          this.each(function() {
            var methodValue,
              instance = $.data( this, fullName );
            if ( options === 'instance' ) {
              returnValue = instance;
              return false;
            }
            if ( !instance ) {
              return $.error( 'cannot call methods on ' + name + ' prior to initialization; ' +
                'attempted to call method "' + options + '"' );
            }
            if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === '_' ) {
              return $.error( 'no such method "' + options + '" for ' + name + ' widget instance' );
            }
            methodValue = instance[ options ].apply( instance, args );
            if ( methodValue !== instance && methodValue !== undefined ) {
              returnValue = methodValue && methodValue.jquery ?
                returnValue.pushStack( methodValue.get() ) :
                methodValue;
              return false;
            }
          });
        } else {
          this.each(function() {
            var instance = $.data( this, fullName );
            if ( instance ) {
              instance.option( options || {} )._init();
            } else {
              $.data( this, fullName, new object( options, this ) );
            }
          });
        }

        return returnValue;
      };
    };

    $.Widget = function( /* options, element */ ) {};
    $.Widget._childConstructors = [];

    $.Widget.prototype = {
      widgetName: 'widget',
      widgetEventPrefix: '',
      defaultElement: '<div>',
      options: {
        disabled: false,

        // callbacks
        create: null
      },
      _createWidget: function( options, element ) {
        element = $( element || this.defaultElement || this )[ 0 ];
        this.element = $( element );
        this.uuid = uuid++;
        this.eventNamespace = '.' + this.widgetName + this.uuid;
        this.options = $.widget.extend( {},
          this.options,
          this._getCreateOptions(),
          options );

        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();

        if ( element !== this ) {
          $.data( element, this.widgetFullName, this );
          this._on( true, this.element, {
            remove: function( event ) {
              if ( event.target === element ) {
                this.destroy();
              }
            }
          });
          this.document = $( element.style ?
            // element within the document
            element.ownerDocument :
            // element is window or document
          element.document || element );
          this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
        }

        this._create();
        this._trigger( 'create', null, this._getCreateEventData() );
        this._init();
      },
      _getCreateOptions: $.noop,
      _getCreateEventData: $.noop,
      _create: $.noop,
      _init: $.noop,

      destroy: function() {
        this._destroy();
        // we can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element
          .unbind( this.eventNamespace )
          .removeData( this.widgetFullName )
          // support: jquery <1.6.3
          // http://bugs.jquery.com/ticket/9413
          .removeData( $.camelCase( this.widgetFullName ) );
        this.widget()
          .unbind( this.eventNamespace )
          .removeAttr( 'aria-disabled' )
          .removeClass(
            this.widgetFullName + '-disabled ' +
            'ob-state-disabled' );

        // clean up events and states
        this.bindings.unbind( this.eventNamespace );
        this.hoverable.removeClass( 'ob-state-hover' );
        this.focusable.removeClass( 'ob-state-focus' );
      },
      _destroy: $.noop,

      widget: function() {
        return this.element;
      },

      option: function( key, value ) {
        var options = key,
          parts,
          curOption,
          i;

        if ( arguments.length === 0 ) {
          // don't return a reference to the internal hash
          return $.widget.extend( {}, this.options );
        }

        if ( typeof key === 'string' ) {
          // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
          options = {};
          parts = key.split( '.' );
          key = parts.shift();
          if ( parts.length ) {
            curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
            for ( i = 0; i < parts.length - 1; i++ ) {
              curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
              curOption = curOption[ parts[ i ] ];
            }
            key = parts.pop();
            if ( value === undefined ) {
              return curOption[ key ] === undefined ? null : curOption[ key ];
            }
            curOption[ key ] = value;
          } else {
            if ( value === undefined ) {
              return this.options[ key ] === undefined ? null : this.options[ key ];
            }
            options[ key ] = value;
          }
        }

        this._setOptions( options );

        return this;
      },
      _setOptions: function( options ) {
        var key;

        for ( key in options ) {
          this._setOption( key, options[ key ] );
        }

        return this;
      },
      _setOption: function( key, value ) {
        this.options[ key ] = value;

        if ( key === 'disabled' ) {
          this.widget()
            .toggleClass( this.widgetFullName + '-disabled', !!value );
          this.hoverable.removeClass( 'ob-state-hover' );
          this.focusable.removeClass( 'ob-state-focus' );
        }

        return this;
      },

      enable: function() {
        return this._setOptions({ disabled: false });
      },
      disable: function() {
        return this._setOptions({ disabled: true });
      },

      _on: function( suppressDisabledCheck, element, handlers ) {
        var delegateElement,
          instance = this;

        // no suppressDisabledCheck flag, shuffle arguments
        if ( typeof suppressDisabledCheck !== 'boolean' ) {
          handlers = element;
          element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }

        // no element argument, shuffle and use this.element
        if ( !handlers ) {
          handlers = element;
          element = this.element;
          delegateElement = this.widget();
        } else {
          // accept selectors, DOM elements
          element = delegateElement = $( element );
          this.bindings = this.bindings.add( element );
        }

        $.each( handlers, function( event, handler ) {
          function handlerProxy() {
            // allow widgets to customize the disabled handling
            // - disabled as an array instead of boolean
            // - disabled class as method for disabling individual parts
            if ( !suppressDisabledCheck &&
              ( instance.options.disabled === true ||
              $( this ).hasClass( 'ob-state-disabled' ) ) ) {
              return;
            }
            
            var _handler = ( typeof handler === 'string' ? instance[ handler ] : handler );
            if(_handler) {
                return _handler.apply( instance, arguments );
            }
            
            console.error('호출할 method가 정의되어 있지 않습니다.' + handler);
          }

          // copy the guid so direct unbinding works
          if ( typeof handler !== 'string' ) {
            handlerProxy.guid = handler.guid =
              handler.guid || handlerProxy.guid || $.guid++;
          }

          var match = event.match( /^(\w+)\s*(.*)$/ ),
            eventName = match[1] + instance.eventNamespace,
            selector = match[2];
          if ( selector ) {
            delegateElement.delegate( selector, eventName, handlerProxy );
          } else {
            element.bind( eventName, handlerProxy );
          }
        });
      },

      _off: function( element, eventName ) {
        eventName = (eventName || '').split( ' ' ).join( this.eventNamespace + ' ' ) + this.eventNamespace;
        element.unbind( eventName ).undelegate( eventName );

        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $( this.bindings.not( element ).get() );
        this.focusable = $( this.focusable.not( element ).get() );
        this.hoverable = $( this.hoverable.not( element ).get() );
      },

      _delay: function( handler, delay ) {
        function handlerProxy() {
          return ( typeof handler === 'string' ? instance[ handler ] : handler )
            .apply( instance, arguments );
        }
        var instance = this;
        return setTimeout( handlerProxy, delay || 0 );
      },

      _hoverable: function( element ) {
        this.hoverable = this.hoverable.add( element );
        this._on( element, {
          mouseenter: function( event ) {
            $( event.currentTarget ).addClass( 'ob-state-hover' );
          },
          mouseleave: function( event ) {
            $( event.currentTarget ).removeClass( 'ob-state-hover' );
          }
        });
      },

      _focusable: function( element ) {
        this.focusable = this.focusable.add( element );
        this._on( element, {
          focusin: function( event ) {
            $( event.currentTarget ).addClass( 'ob-state-focus' );
          },
          focusout: function( event ) {
            $( event.currentTarget ).removeClass( 'ob-state-focus' );
          }
        });
      },

      _trigger: function( type, event, data ) {
        var prop, orig,
          callback = this.options[ type ];

        data = data || {};
        event = $.Event( event );
        event.type = ( type === this.widgetEventPrefix ?
          type :
        this.widgetEventPrefix + type ).toLowerCase();
        // the original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[ 0 ];

        // copy original event properties over to the new event
        orig = event.originalEvent;
        if ( orig ) {
          for ( prop in orig ) {
            if ( !( prop in event ) ) {
              event[ prop ] = orig[ prop ];
            }
          }
        }

        this.element.trigger( event, data );
        return !( $.isFunction( callback ) &&
        callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
        event.isDefaultPrevented() );
      },
      
      $: function(selector) {
          return this.element.find(selector);
      }
    };

    $.each( { show: 'fadeIn', hide: 'fadeOut' }, function( method, defaultEffect ) {
      $.Widget.prototype[ '_' + method ] = function( element, options, callback ) {
        if ( typeof options === 'string' ) {
          options = { effect: options };
        }
        var hasOptions,
          effectName = !options ?
            method :
            options === true || typeof options === 'number' ?
              defaultEffect :
            options.effect || defaultEffect;
        options = options || {};
        if ( typeof options === 'number' ) {
          options = { duration: options };
        }
        hasOptions = !$.isEmptyObject( options );
        options.complete = callback;
        if ( options.delay ) {
          element.delay( options.delay );
        }
        if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
          element[ method ]( options );
        } else if ( effectName !== method && element[ effectName ] ) {
          element[ effectName ]( options.duration, options.easing, callback );
        } else {
          element.queue(function( next ) {
            $( this )[ method ]();
            if ( callback ) {
              callback.call( element[ 0 ] );
            }
            next();
          });
        }
      };
    });

  })( jQuery );

  (function( $, undefined ) {

    var rcapitals = /[A-Z]/g,
      replaceFunction = function( c ) {
        return '-' + c.toLowerCase();
      };

    $.extend( $.Widget.prototype, {
      _getCreateOptions: function() {
        var option, value,
          elem = this.element[ 0 ],
          options = {};

        //
        if ( !$.outback.getAttribute( elem, 'defaults' ) ) {
          for ( option in this.options ) {
            value = $.outback.getAttribute( elem, option.replace( rcapitals, replaceFunction ) );

            if ( value != null ) {
              options[ option ] = value;
            }
          }
        }

        return options;
      }
    });

  })( jQuery );

  (function( $, undefined ) {
    $.outback.widgets = {};

    var originalWidget = $.widget;

    $.widget = (function( orig ) {
      return function() {
        var constructor = orig.apply( this, arguments ),
          name = constructor.prototype.widgetName;

        constructor.initSelector = ( ( constructor.prototype.initSelector !== undefined ) ?
          constructor.prototype.initSelector : '[data-role="' + name + '"]' );

        $.outback.widgets[ name ] = constructor;

        return constructor;
      };
    })( $.widget );

    // Make sure $.widget still has bridge and extend methods
    $.extend( $.widget, originalWidget );

    /**
     * basePage Widget
     */
    $.widget( 'outback.basePage', {
      options: {
        theme: 'a',
        enhanced: false,
        renderingOninitpage: false,
        pageAnimation: true
      },

      _create: function() {
        var self = this;
        // If false is returned by the callbacks do not create the page
        if ( this._trigger( 'beforecreate' ) === false ) {
          return false;
        }

        window.onInitPage = function() {
          self.onInitPage.call(self);

          // page가 보이게 한다.
          $('html').removeClass( 'ob-rendering' );
        };

        window.onHistoryBackPage = function() {
          // popup이 떠있는 상태에서 Android의 하드웨어 이전버튼을 누를 경우 팝업을 닫는다.
          var $popup = $('.ob-popup-active');
          if($popup.length) {
            $popup.popup('close');
            return;
          }

          self.onHistoryBackPage.call(self);
        };

        window.onHidePage = $.proxy(this.onHidePage, this);
        // CHECK: onInitPage과 함께 onResume이 올 경우가 있을 수도 있으니 확인해봐야 함.
        window.onResume = $.proxy(this.onResume, this);
        window.onPause = $.proxy(this.onPause, this);

        if ( !this.options.enhanced ) {
          this._enhance();
        }

        this.element.enhanceWithin();
      },

      _enhance: function () {
        var attrPrefix = 'data-',
          self = this;

        if ( this.options.role ) {
          this.element.attr( attrPrefix + 'role', this.options.role );
        }

        this.element
          .attr( 'tabindex', '0' )
          .addClass( 'ob-page ob-page-theme-' + this.options.theme );
      },

      _setOptions: function( o ) {
        if ( o.theme !== undefined ) {
          this.element.removeClass( 'ob-page-theme-' + this.options.theme ).addClass( 'ob-page-theme-' + o.theme );
        }
      },

      keepNativeSelector: function() {
        return $.trim($.outback.keepNative);
      },
      onInitPage: function() {

      },
      onResume: function() {

      },
      onPause: function() {

      },
      onHistoryBackPage: function() {
        $.outback.historyBack();
      }
    });

  })( jQuery );

  /**
   * fakeLoader Widget
   */
  (function( $ ) {
      $.widget( 'outback.fakeLoader', {
          
          fpCont: '.js-fake-progress',
          fpBar: '-bar-gage',
          fpPercent: '-text-percent',
          fpIcon: '-icon',
           
          fpGageID: null,
          fpIconID: null,
           
          iconBg: ['#1e75d6',//done
                    '#fc4513',
                    '#fd8204',
                    '#07d6a3',
                    '#750d93',
                    '#FF0000',
                   ],
          iconSrc: ['/images/common/fin.png',
                    '/images/common/1.png',
                    '/images/common/2.png',
                    '/images/common/3.png',
                    '/images/common/4.png',
                    ],
          iconLoopCnt: 1,
          iconBGLoopCnt: 1,

          defaultHtml: '<div data-start="0" data-end="70" data-range="20" data-play-time="10" class="js-fake-progress">' + 
          '<div class="js-fake-progress-wrap">' +
          '<div class="js-fake-progress-img">' +
          '<div class="js-fake-progress-icon"></div>' +
          '</div>' +
          '<div class="js-fake-progress-bar">' +
          '<div class="js-fake-progress-bar-gage"></div>' +
          '</div>' +
          '<div class="js-fake-progress-text" data-percent="0">' +
          '<span>Loading</span>' +
          '<span class="js-fake-progress-text-percent">0%</span>' +
          '</div>' +
          '</div>' +
          '</div>', 
           
          _create: function() {
              this.element.appendTo( $('body') );
          },
          
          init: function() {
              this.isDone = false;
              this.width = 0;
             
              this.start = $(this.fpCont).data('start');
              this.range = $(this.fpCont).data('range');
              this.end = $(this.fpCont).data('end') + (Math.random() * this.range - this.range/2);
              this.playTime = $(this.fpCont).data('playTime') * 1000 / (this.end - this.start);
          },
          
          play: function () {
              if ( this.isDone ) return;
              
              this.iconLoopCnt = Math.round( Math.random() * this.iconSrc.length );
              this.iconBGLoopCnt = Math.round( Math.random() * this.iconBg.length );
              
              this.draw();
          },
          
          draw: function() {
              this.fpIconID = setInterval( $.proxy( this.drawIcon, this ), 200 );
              this.fpGageID = setInterval( $.proxy( this.drawProgress, this ), this.playTime );
          },
          
          drawIcon: function() {
              if ( this.isDone && this.width >= this.end ) {
                  clearInterval( this.fpIconID );

                  $( this.fpCont + this.fpIcon ).css({
                      'background-image': 'url(' + this.iconSrc[0] + ')',
                      'background-color': this.iconBg[0]
                  });
                  
                  setTimeout( $.proxy( function () {
                      this.hide();
                  }, this), 1000);
              } else {
                  var srcLen = this.iconSrc.length;
                  this.iconLoopCnt = this.iconLoopCnt > srcLen - 2 ? 1 : this.iconLoopCnt + 1;
                  var srcIdx = ( this.iconLoopCnt % (srcLen - 1) ) + 1;
                  
                  var BGLen = this.iconBg.length;
                  this.iconBGLoopCnt = this.iconBGLoopCnt > BGLen - 2 ? 1 : this.iconBGLoopCnt + 1;
                  var BGIdx = ( this.iconBGLoopCnt % (BGLen - 1) ) + 1;
                  
                  $( this.fpCont + this.fpIcon ).css({
                      'background-image': 'url(' + this.iconSrc[srcIdx] + ')',
                      'background-color': this.iconBg[BGIdx]
                  });
              }
          },
          
          drawProgress: function () {
              if( this.width >= this.end ) {
                  clearInterval(this.fpGageID);
              } else {
                  this.width++;
                  $( this.fpCont + this.fpBar ).css( 'width', this.width + '%' );
                  $( this.fpCont + this.fpPercent ).data( 'percent', this.width).text( this.width + '%' );
              }
          },
          
          done: function () {
              if(!this.fpIconID){
                  this.hide();
                  return;
              }
              
              if(this.fpIconID){
                  clearInterval( this.fpIconID );
              }
              this.isDone = true;
              
              this.start = this.width;
              this.end = 100;
              this.playTime = 1000 / (this.end - this.start);
              
              this.draw();
          },

          show: function() {
              this.init();
              
              this.play();
          },

          hide: function() {
              $(this.fpCont).remove();
          }
      });
  })(jQuery, this);
  
  /**
   * loader Widget
   */
  (function( $ ) {
    // TODO move loader class down into the widget settings
    var loaderClass = 'ob-loader', $html = $( 'html' );

    $.widget( 'outback.loader', {
      // NOTE if the global config settings are defined they will override these
      //    options
      options: {
        // the theme for the loading message
        theme: 'a',

        // whether the text in the loading message is shown
        textVisible: false,

        // custom html for the inner content of the loading message
        html: '',

        // the text to be displayed when the popup is shown
        text: 'loading'
      },

      _create: function() {
        this.count = 0;
      },

      defaultHtml: '<div class="' + loaderClass + '">' +
      '<span class="ob-icon-loading"></span>' +
      '<h1></h1>' +
      '</div>',

      // For non-fixed supportin browsers. Position at y center (if scrollTop supported), above the activeBtn (if defined), or just 100px from top
      fakeFixLoader: function() {
        this.element
          .css({
            top: $.support.scrollTop && this.window.scrollTop() + this.window.height() / 2 || 100
          });
      },

      // check position of loader to see if it appears to be 'fixed' to center
      // if not, use abs positioning
      checkLoaderPosition: function() {
        var offset = this.element.offset(),
          scrollTop = this.window.scrollTop(),
          screenHeight = $.outback.getScreenHeight();

        if ( offset.top < scrollTop || ( offset.top - scrollTop ) > screenHeight ) {
          this.element.addClass( 'ob-loader-fakefix' );
          this.fakeFixLoader();
          this.window
            .unbind( 'scroll', this.checkLoaderPosition )
            .bind( 'scroll', $.proxy( this.fakeFixLoader, this ) );
        }
      },

      resetHtml: function() {
        this.element.html( $( this.defaultHtml ).html() );
      },

      // Turn on/off page loading message. Theme doubles as an object argument
      // with the following shape: { theme: '', text: '', html: '', textVisible: '' }
      // NOTE that the $.outback.loading* settings and params past the first are deprecated
      // TODO sweet jesus we need to break some of this out
      show: function( theme, msgText, textonly ) {
        var textVisible, message, loadSettings;

        this.count++;
        if ( this.count > 1 ) {
          return;
        }

        this.resetHtml();

        // use the prototype options so that people can set them globally at
        // mobile init. Consistency, it's what's for dinner
        if ( $.type( theme ) === 'object' ) {
          loadSettings = $.extend( {}, this.options, theme );

          theme = loadSettings.theme;
        } else {
          loadSettings = this.options;

          // here we prefer the theme value passed as a string argument, then
          // we prefer the global option because we can't use undefined default
          // prototype options, then the prototype option
          theme = theme || loadSettings.theme;
        }

        // set the message text, prefer the param, then the settings object
        // then loading message
        message = msgText || ( loadSettings.text === false ? '' : loadSettings.text );

        // prepare the dom
        $html.addClass( 'ob-loading' );

        textVisible = loadSettings.textVisible;

        // add the proper css given the options (theme, text, etc)
        // Force text visibility if the second argument was supplied, or
        // if the text was explicitly set in the object args
        this.element.attr('class', loaderClass +
          ' ob-loader-' + ( textVisible || msgText || theme.text ? 'verbose' : 'default' ) +
          ( loadSettings.textonly || textonly ? ' ob-loader-textonly' : '' ) );

        // TODO verify that jquery.fn.html is ok to use in both cases here
        //    this might be overly defensive in preventing unknowing xss
        // if the html attribute is defined on the loading settings, use that
        // otherwise use the fallbacks from above
        if ( loadSettings.html ) {
          this.element.html( loadSettings.html );
        } else {
          this.element.find( 'h1' ).text( message );
        }

        // attach the loader to the DOM
        this.element.appendTo( $('body') );

        // check that the loader is visible
        this.checkLoaderPosition();

        // on scroll check the loader position
        this.window.bind( 'scroll', $.proxy( this.checkLoaderPosition, this ) );

        $('body').append('<div class="ob-loader-bg"></div>');
      },

      hide: function(all) {
        if(!all) {
          this.count--;
          if(this.count > 0) {
            return;
          }
          else {
            this.count = 0;
          }
        }
        else {
          this.count = 0;
        }

        $html.removeClass( 'ob-loading' );

        if ( this.options.text ) {
          this.element.removeClass( 'ob-loader-fakefix' );
        }

        $.outback.window.unbind( 'scroll', this.fakeFixLoader );
        $.outback.window.unbind( 'scroll', this.checkLoaderPosition );

        $('.ob-loader-bg').remove();
      }
    });
  })(jQuery, this);

  /**
   * partialView Widget
   */
  (function( $, window, undefined ) {
    $.widget( 'outback.partialView', {
      options: {
        theme: 'a',
        enhanced: false,
        renderingOninitpage: false,
        pageAnimation: true,
        url: ''
      },
      
      _create: function() {
        var self = this, $element = this.element, o = this.options;
        
        if ( !this.options.enhanced ) {
          this._enhance();
        }
      },
      
      _enhance: function() {
        var $element = this.element, o = this.options;

        if ( o.role ) {
          $element.attr( 'data-role', o.role );
        }
        
        $element.addClass( 'ob-partial-view ob-partial-view-theme-' + this.options.theme );
        $element.children().wrapAll('<div class="partial-view-container ob-partial-view-container-theme-' + this.options.theme + '"></div>');
      },
        
      _setOptions: function( o ) {
        if ( o.theme !== undefined ) {
          this.element.removeClass( 'ob-partial-view-theme-' + this.options.theme ).addClass( 'ob-partial-view-theme-' + o.theme );
        }
      },
      
      keepNativeSelector: function() {
        return $.trim( $.outback.keepNative );
      },
      
      load: function( url, data ) {
          var $element = this.element;
          var dfd = new $.Deferred();
          
          if ( url.length > 0 ) {
            $.outback.ajax({
              url : url,
              data : data
            }).done( $.proxy( function(response) {
              $element.children().remove();
              
              $element.append( response );
              
              // 내부에 popup이 있으면 body의 children으로 옮긴다.
              var $popup = $element.find('[data-role=popup], .ob-popup, .popup');
              $popup.filter(function() {
                  return !$('body').children('#' + this.id).length;
              });              
              
              $('body').prepend($popup);
              
              this._delay(function() {
                  $element.enhanceWithin();
                  this._trigger( 'loaded', null, [ url ] );
                  dfd.resolve();
              }, 100);
            }, this))
            .fail(function() {
                dfd.reject();
            });
            
            return dfd.promise();
          }

          dfd.reject();
          
          return dfd.promise();
        }
      // init, resume, stop ..
    });
  })(jQuery, this);
  
  /**
   * outback entry point
   */
  (function( $, window, undefined ) {
    var	$html = $( 'html' ),
      $window = $.outback.window;

    //remove initial build class (only present on first pageshow)
    function hideRenderingClass() {
      $html.removeClass( 'ob-rendering' );
    }

    // trigger mobileinit event - useful hook for configuring $.outback settings before they're used
    $( window.document ).trigger( 'mobileinit' );

    // Add mobile, initial load "rendering" classes to docEl
    $html.addClass( 'ob-rendering' );

    // This is a fallback. If anything goes wrong (JS errors, etc), or events don't fire,
    // this ensures the rendering class is removed after 5 seconds, so content is visible and accessible
    setTimeout( hideRenderingClass, 5000 );

    //
    var sendDataCount = 0;

    $.extend( $.outback, {
      initializePage: function() {
        if($('[data-role="page"]').length > 0 && $('[data-role="page"]').page) {
          $('[data-role="page"]').page();
          
          if(!$('[data-role="page"]').data('outback-page').option('renderingOninitpage')) {
            hideRenderingClass();
          }
        }
        else {
          hideRenderingClass();
        }
      },
      historyBack: function(obj) {
        if(xWalk) {
          xWalk.historyBack();
        }
        else {
          history.back();
        }
      },
      ajax: function(options) {
        var hideLoading = options.hideLoading;
        var fakeLoading = options.fakeLoading;
        
        if(!hideLoading && !fakeLoading) {
          $.outback.loading('show');
        }
        if(fakeLoading){
            $.outback.fakeLoading('show');  
        }

        // default는 post
        options.method = options.method || 'post';

        return $.ajax(options)
	      .fail(function() {
	        $.outback.loading('hide', true);
	        if(fakeLoading){
	            $.outback.fakeLoading('hide');    
	        }
	      })
	      .always(function() {
	          if(!hideLoading && !fakeLoading) {
	              $.outback.loading('hide');
	          }
	          if(fakeLoading){
	              $.outback.fakeLoading('done');  
	          }
	      });
      },
      formSubmit: function(obj) {
    	  $('body').append('<form id="formForOutback" method="post" action="' + obj.url + '"></form>');
    	  
    	  var strHtml = '';
    	  for(var name in obj.data) {
    		  var value = obj.data[name];
    		  strHtml += '<input type="hidden" name="' + name + '" value="' + value + '" />';
    	  }
		  $('#formForOutback').html(strHtml);
		  $('#formForOutback').submit();    	  
      },
      log: function(tag, message, level) {
        console.log(message);
      },
      getCurrentPageInstance: function() {
        return $('[data-role="page"]').page('instance');
      }
    });

    $(function() {
      $(document).trigger('outbackinit');
      $.outback.initializePage();
    });
  }( jQuery, this ));

  /**
   * popup Widget
   */
  (function( $, undefined ) {

    // TODO: alert 같은 popup이 중첩되어야 할 경우 현재 지원 안됨.
    // popup의 tag를 template으로 생성하여 항상 instance를 생성하도록 기능 추가해야함. 
    $.outback.popupOpen = function(id, options) {
    	var $popup;
    	options = options || {};
    	if(id.constructor.name == 'Object') {
    		options = id;
    		id = null;
    	}
      
  	  	if ( options.url ) {
		    $.outback.ajax({
		    	url: options.url,
		    	data: options.data,
		    	method: 'post'
		    }).done(function(text) {
		        if(typeof text != "string") {
                    // 문자열이 아닐경우 에러임.
		            console.error(text);
		            return;
		        }
		        
		        var role;
		    	if(id) {
					$popup = $(id);
					$popup.find('.ob-popup-content').html(text);

					role = $popup.data('role');
					
					if (!$popup[role]('instance')) {
						$popup[role](options).enhanceWithin();
					}
					else {
						$popup[role]('option', options);
						$popup.find('.ob-popup-content').enhanceWithin();
					}
					$popup[role]('open');
		    	}
		    	else {
		    		$('body').append(text);
		    		$popup = $('[data-role^=popup]').last();

		    		role = $popup.data('role');
		    		
		    		$popup[role]($.extend({alwaysDestroy: true}, options)).enhanceWithin();
		    		$popup[role]('open');		    	  
		    	}
		    });
  	  	}
  	  	else if(id) {
  	  		$popup = $(id);
  	  		
  	  		// open되어 있는 popup이 새로 띄울 popup과 같은 게 있으면 close한다.  
  	  		for(var n=0; n < popupArray.length; n++) {
  	  		    if(popupArray[n].element.is($popup)) {
  	  		        $.outback.popupClose( $popup );
  	  		    }
  	  		}
  	  		
  	  	    if($popup.length > 1) {
  	  	        $popup.each(function(i) {
  	  	            if(i > 0) {
  	  	                $(this).remove();
  	  	            }
  	  	        });
  	  	        $popup = $(id);
  	  	    }
  	  		if(options.html) {
  	  			$popup.find('.ob-popup-content').html(options.html);
  	  		}

            var role = $popup.data('role');
      	  	if (!$popup[role]('instance')) {
                $popup[role](options).enhanceWithin();
            }
            else {
                $popup[role](options);
                if(options.html) {
                    $popup.find('.ob-popup-content').enhanceWithin();
                }
            }
            $popup[role]('open');
  	  	}
	};

    $.outback.popupClose = function(id, retVal) {
      var $popup = $(id);
      if ($popup && ($popup.is('[data-role^=popup]'))) {
        var role = $popup.data('role');
        $popup[role]('close', retVal);
      }
    };

    $(function() {
      $('.on-popup-btn-open').on('click', function(e) {
        var popupId = $(e.target).closest('.ob-popup-btn-open').data('popupId');
        $.outback.popupOpen('#' + popupId)

        return false;
      });
    });

    var popupArray = [];
    var zIndexDefaultBackground = 10000;
    var zIndexDefaultPopup = zIndexDefaultBackground + 1;

    $.widget('outback.popup', {
      options: {
        modal: true,
        backgroundOpacity: 0.8,
        animation: false,
        beforeopened: null,
        opened: null,
        closing: null,
        closed: null,
        inAnimation: 'fadeIn',
        outAnimation: 'fadeOut fast',
        vcenter: true,
        hcenter: true,
        url: '',
        data: '',
        alwaysDestroy: false,
        focusDisable: false,
        zIndexOfBackground: null
      },

      _create: function() {
        var $el = this.element, self = this, o = this.options;
        
        $el.addClass('ob-popup');

        // Android 4.3이하는 팝업 에니메이션이 안되도록 수정.
        if(bowser.android && parseFloat(bowser.osversion) <= 4.3) {
          o.animation = false;
        }

        $(document).on('click', '.ob-popup-bg', function(e) {
          if (popupArray.length > 0) {
            var topPopup = popupArray[popupArray.length - 1];
            if (!topPopup.options.modal) {
              topPopup.close();
            }
          }
          return false;
        });

        this._on({
          'click .ob-popup-btn-close': function(e) {
            self._delay(function() {
              self.close();
            },100);

            e.stopImmediatePropagation();
            return false;
          },
          'click button:not(.ob-popup-btn-close)': function(e) {
        	  var retVal = $(e.currentTarget).data('result');
        	  if(retVal) {
	        	  self._delay(function() {
	        		  self.close(retVal);
	              },100);
	        	  
	        	  e.stopImmediatePropagation();
	              return false;	        	  
        	  }
          },
          'change .ob-popup-radio-result': function(e) {
        	  var retVal = $(e.currentTarget).find('input[type=radio]:checked').val();
        	  if(retVal) {
	        	  self._delay(function() {
	        		  self.close(retVal);
	              },100);
	        	  
	        	  e.stopImmediatePropagation();
	              return false;	        	  
        	  }
          }
        });
        
        // image 로드되면 resize해야함. load event는 bubbling이 안됨.
        this.element[0].addEventListener('load', function(e) {
            // load된 후에 popup이 보이게 한다.
            self.asyncCompleted();
        }, true);
      },
      
      asyncCompleted: function() {
        var $el = this.element;
        var left = $el.data('left');        // open시에 저장
        $el.css('left', left);
        this.resize();
      },
      
      resize: function() {
        var $el = this.element, o = this.options;
        if(o.vcenter) {
          if(o.vcenter) {
            var vAlign = ($.outback.getScreenHeight() - $el.height()) / 2;
            $el.css({
              marginTop: 0,
              top: vAlign
            });            
          }
        }
      },

      open: function() {
        var $el = this.element, self = this, o = this.options;

        if ( popupArray.length ) {
            for ( var i; i < popupArray.length; i++ ) {
                if ( popupArray[i].element.is( this.element ) ) {
                    return;
                }
            }
        }
        
        this._trigger( 'beforeopened' );

        // 수직 가운데 정렬
        if(o.vcenter) {
          var vAlign = ($.outback.getScreenHeight() - $el.height()) / 2;
          $el.css({
            marginTop: 0,
            top: vAlign
          });            
        }

        // 수평 가운데 정렬
        if(o.hcenter) {
          var hAlign = ($el.parent().outerWidth(true) - $el.outerWidth(true)) / 2;
          $el.css('left', hAlign);
        }
        
        if($el.hasClass('ob-popup-async') && $el.find('img').length > 0 || this.isAsyncHtml) {
          var left = $el.css('left');
          $el.data('left', left);
          $el.css('left', '-10000px');
        }
        
        if(o.animation) {
          $el.addClass('ob-popup-active animated '+ o.inAnimation);
        }
        else {
          $el.addClass('ob-popup-active');
        }
        
        var $background;
        if (popupArray.length === 0) {
          $background = $('<div id="outbackPopupBg" class="ob-popup-bg"/>');
          $background.css('z-index', o.zIndexOfBackground || zIndexDefaultBackground);
          $background.appendTo( $('body') );
          $background.css('opacity', o.backgroundOpacity);
          $('#outbackPopupBg').on('touchmove', function(e) { return false; }); // 팝업 뒤가 scroll되지 않도록 막는다.
        } else {
          $background = $('#outbackPopupBg');
          $background.css({
            opacity: o.backgroundOpacity,
            zIndex: o.zIndexOfBackground || (zIndexDefaultBackground + (2 * popupArray.length))
          });
        }

        if(o.zIndexOfBackground) {
            $el.css('z-index', o.zIndexOfBackground + 1);   
        } else {
            $el.css('z-index', zIndexDefaultPopup + (2 * popupArray.length));    
        }        

        popupArray.push( this );

        this._trigger( 'opened' );

        // popup으로 focus이동
        this.oldFocusEl = document.activeElement;
        
        // popup 뒤가 스크롤되지 않도록 막음.
        $('body').css('overflow', 'hidden');
        $el.scrollTop(0);
        if ( !o.focusDisable ) {
            $el.focus(300);
        }
      },

      close: function(retVal) {
        var $el = this.element, self = this, o = this.options;
        var $background = $('#outbackPopupBg');

        var _close = function() {
          var index = popupArray.indexOf(self);
          popupArray.splice(index, 1);

          if (popupArray.length === 0) {
            $background.remove();
          } else {
            $background.css({
              opacity: popupArray.valueOf()[ popupArray.length -1 ].options.backgroundOpacity,
              zIndex: popupArray.valueOf()[ popupArray.length -1 ].options.zIndexOfBackground || (zIndexDefaultBackground + (2 * (popupArray.length - 1)))
            });
          }
          
          $('body').css('overflow', '');

          self._trigger( 'closed', null, [retVal] );

          if ( !o.focusDisable ) {
        	  $( self.oldFocusEl ).focus( 300 );
          }
          if ( o.alwaysDestroy ) {
        	  $el.remove();
          }
        };

        // 호출후 close안되게 하면
        self._trigger( 'closing', null, [retVal]);
        if($el.data('cancelClose') === true) {
          return;
        }
        
        if (o.animation) {
          $el.removeClass(o.inAnimation).addClass(o.outAnimation);
          $el.animationComplete(function() {
            // animation 이 모두 끝나면..
            $el.removeClass('ob-popup-active animated ' + o.outAnimation);
            _close();
          });
        }
        else {
          $el.removeClass('ob-popup-active');
          _close();
        }
      }
    });
  })( jQuery );
  
}
)
);

