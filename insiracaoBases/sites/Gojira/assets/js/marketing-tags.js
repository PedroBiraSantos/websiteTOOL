// Adobe Launch data layer + vendor tag rules it injected at runtime (Adobe Analytics, GA, Meta, TikTok, Reddit, Pinterest, etc.)
digitalData={"settings":{"reportSuites":"wmggojira.com,wmgrrglobal,wmg"},"content":{"artist":"Gojira","label":"Elektra Music Group","sublabel":"Roadrunner Records"},"page":{"pageInfo":{"pageName":"Gojira:Homepage","server":"Gojira:Site","devTeam":"WMAS","platform":"Drupal 10"},"category":{"primaryCategory":"Gojira:Home","pageType":"homepage"}}}
_satellite["_runScript1"](function(event, target, Promise) {
executionStartTime = performance.now();
Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    res.length = c; // shrink down array to proper size
    return res;
  };
});
let AOC = adobe.OptInCategories;
var CCM_Array = {
  isOneTrustPerformanceCookiesAllowed: [AOC.ANALYTICS, AOC.MEDIA_ANALYTICS, AOC.TARGET, AOC.ECID], //C0002
  isOneTrustFunctionalCookiesAllowed: [AOC.LIVEFYRE], //C0003
  isOneTrustAdvertisingCookiesAllowed: [AOC.ADCLOUD, AOC.ECID, AOC.AAM, AOC.CAMPAIGN] //C0004
};
var CCM_Delim = ":";
//"LastWins" - if initially ECID is approved, but later value is denied - denied wins
//"ApproveWins" - if ECID is approved and also denied - approval wins
var LastWins = "LW", ApproveWins = "AD", chosenResolutionStrategy = ApproveWins;
var CCM_ValsStorage = localStorage, CCM_StorageKey = 'CCM_CurVals';
var OptIn_PrevPermStorage = localStorage, OptIn_PrevPermKey = 'OptIn_PreviousPermissions';
var satelliteWhichExecutedPerfLogic, satelliteWhichExecutedAdvLogic;
var custE = 'core.custom-event', spaE = 'SPAPageTriggered';
function isOneTrustAllowing(val,isAllowedforUS){
if (getDE('shouldEnableOptIn')) {
    let consentval = ''
    if (typeof(OnetrustActiveGroups) == 'undefined' && s.cookieRead('OptanonConsent') == '') {
    } else if (typeof(OnetrustActiveGroups) == 'undefined' && s.cookieRead('OptanonConsent') != '') {
      let OTcookieval = s.cookieRead('OptanonConsent').split('groups=')[1].split('&')[0].split(',');
      for (i=0; i < OTcookieval.length; i++) {
        val = OTcookieval[i].split(':');
        if (val[1] == '1')
            consentval = consentval + ',' + val[0] + ',';
      };
    } else {
      consentval = OnetrustActiveGroups;
    };
    return getDE('isOnetrustThere')?consentval.includes(val):(isAllowedforUS && getDE('User Country').countryCode == 'US' && getDE('arePoliciesPresent'));
  };
  return true;
}
function areAdvertisingCookiesAllowed(){
  return isApprovedByOptIn('isOneTrustAdvertisingCookiesAllowed');
}
function arePerformanceCookiesAllowed(){
  return isApprovedByOptIn('isOneTrustPerformanceCookiesAllowed');
}
function isApprovedByOptIn(key){
  return adobe.optIn.isApproved(CCM_Array[key][0]);
}
function syncUpOptIn(ccmCurValsAr){
 console.log('In syncUpOptIn');
 var actionMap = CCM_Cats(ccmCurValsAr), prevPermissions = {};
 for (var bool in actionMap) {
   var actionStr = actionMap[bool];
   if (actionStr.length == 0)
     continue;
   bFlag = (bool == 'true');
   bFlag?adobe.optIn.approve(actionStr):adobe.optIn.deny(actionStr);
   for (var i = 0; i < actionStr.length; i++)
     prevPermissions[actionStr[i]] = bFlag;
 }
 console.log('In syncUpOptIn: ' + JSON.stringify(prevPermissions) + '; actionMap:' + actionMap);
 return JSON.stringify(prevPermissions);
}
function shouldIgnoreOneTrustEvent(event){
  return event.target == document && event.$type == custE && event.nativeEvent.type == 'OneTrustGroupsUpdated';
}
function isSPAEvent(event){
  return (event.$type == custE && event.nativeEvent.type == spaE)
    || (event.$type == 'core.direct-call' && event.identifier == 'page view');
}
function CCM_Cats(ccmCurValsAr){
  return chosenResolutionStrategy==LastWins?CCM_CatsForLW(ccmCurValsAr):CCM_CatsForAW(ccmCurValsAr);
}
function CCM_CatsForLW(ccmCurVals){
  //var resultM=new Map(), 
  var approveA = [], denyA = [], i = 0; 
  for (var key in CCM_Array){
    for (j = 0; CCM_Array[key].length > j; j++)
      resultM.set(CCM_Array[key][j], ccmCurVals[i]);
    i++;
  }
  //resultM.forEach(forEachMapEntry);
  return {true: approveA, false: denyA};
}
function CCM_CatsForAW(ccmCurVals){
  var approveA = [], denyA = [], i = 0;
  for (var key in CCM_Array){
    (ccmCurVals[i]=="true")?approveA = approveA.concat(CCM_Array[key]):denyA = denyA.concat(CCM_Array[key]);
    i++;
  }
  return {true: approveA, false: denyA.filter(function(el){return !approveA.includes(el)})};
}
function forEachMapEntry(value, key, map){
  (value=="true"?approveA:denyA).push(key);
}
function getCCM_CurVals(){
 var result = [];
 for (var key in CCM_Array) 
  result.push(eval("_satellite.getVar('"+key + "')"));
 return result.join(CCM_Delim);
}
function setCCM_CurVals(val){
  return setStorageVal(CCM_ValsStorage, CCM_StorageKey, val);
}
function getCCM_StorageVals(){
  return getStorageVal(CCM_ValsStorage, CCM_StorageKey);
}
function setOptIn_PrevPerms(val){
  return setStorageVal(OptIn_PrevPermStorage, OptIn_PrevPermKey, val);
}
function getStorageVal(storage, key){
  return storage.getItem(key); //CCM_StorageKey
}
function setStorageVal(storage, key, val){
  return storage.setItem(key, val); //CCM_StorageKey
}
function pinterestLogic(){
  if(passDomainAndDate('beberexha', '2022-05-04')){
	accountID = '2613109734513';
    s_dtm.pixelList.push('Pinterest:Warner Records:' + accountID);
	executePinterestPixel(accountID);
  }
}
function executePinterestPixel(accountID){
	!function(e){if(!window.pintrk){window.pintrk = function () {
	window.pintrk.queue.push(Array.prototype.slice.call(arguments))};
	var	n=window.pintrk;n.queue=[],n.version='3.0';
	var	t=document.createElement('script');t.async=!0,t.src=e;
	var	r=document.getElementsByTagName('script')[0];
	r.parentNode.insertBefore(t,r)}}('https://s.pinimg.com/ct/core.js');
	pintrk('load', accountID);
	pintrk('page');
}
const myParams = getAllParms();
function getAllParms(){
  let obj = Object.fromEntries(new URLSearchParams(location.search.replace(/amp;/g,'').replace(/%3F/g,'')));
  let obj2 = {};
  for (const key in obj)
    obj2[key.toLowerCase()] = obj[key];
  return obj2;
}
function getParam(key){
  return myParams.hasOwnProperty(key)?myParams[key]:'';
}
///Utilities
function urlWithoutWWW(url){
 return (url.startsWith('www.')?url.substring(4, url.length):url);
}
///Performance Tracking
var executionStartTime, executionEndTime;
///Functions and variables related to Domain and Date checking - Pixel rules 
var todayDateString = new Date().toISOString().slice(0,10);
function passDomainAndDate(dmn, dateStr){
  return passDomain(dmn) && passDate(dateStr);
}
function passDomain(dmn){
  return _satellite.getVar('Domain').indexOf(dmn) > -1;
}
function passDate(dateStr){
  return todayDateString <= dateStr;
}
function getDeVal(dE){
  return _satellite.getVar(dE);
}
function getDE(dE){
  return _satellite.getVar(dE);
}
///Load script async
function loadScriptAsync(url, async) {
  var script = document.createElement('script');
  script.src = url;
  script.async = async;
  document.getElementsByTagName('head')[0].appendChild(script);
  return getPromise(url, script);
}
function getPromise(url, script) {
  return new Promise(function(resolve, reject) {
    script.onload = function() {resolve(script)};
    script.onerror = function() {reject(new Error('Failed to load script ' + url))};
  });
}
/// All Pixel Rules
function retrieveConditionBased(rules){
  var curArr = new Array();
  for (var key in rules)
    if (_satellite.getVar(key))
      curArr = curArr.concat(rules[key].rules);
  return curArr;
}
function retrieveDomainBased(rules){
  return retrieveRulesForKey('DomainOnly', rules).concat(retrieveRulesForKey('SubDomainOnly', rules), 
                                                         retrieveRulesForKey('DomainWithTopLevel', rules), retrieveRulesForKey('DomainInFull', rules));
}
function retrieveRulesForKey(key, rules){
  var obj = rules[_satellite.getVar(key)];
  return (typeof obj !== 'undefined' && typeof obj.rules !== 'undefined')?obj.rules:[];
}
function arrayOfUniqueRules(inArr){
  return (inArr.length < 2)?inArr:[...new Set(inArr)];
  /*
  if (inArr.length < 2)
    return inArr;
  var aSet = new Set(inArr);
  var outArr = [];
  for (var it = aSet.values(), val= null; val = it.next().value;)
    outArr.push(val);
  return outArr;
*/
}
/// Other Global Functions
var executionStartTime = 0;
function getDicOfCookies(){
  var cookies = document.cookie.split('; '), rv = {};
  for (var i = 0; i < cookies.length; ++i){
    arr = cookies[i].split('=');
	rv[arr[0]] = arr[1];
  }
  return rv;
}
function getCookieVal(name){
  var val = cD[name];
  return val == null?'':val;
}
/// Cleaning after beacon calls - eVars/props/events set by a given rule will be removed from trackLinkVars
/*
function cleanUpAfterAnalyticsBeaconCall(ev, appm){
 var theRule = getExecutedRule(ev.$rule.id);
 if (theRule == null)
  return;
 var ruleActions = theRule.actions;
 for (i = 0; ruleActions.length > i; i++)
  if (ruleActions[i].settings.trackerProperties)
    cleanupAfterTracker(ruleActions[i].settings.trackerProperties, appm);
}
function cleanupAfterTracker(trackerProperties, appm){
  if (trackerProperties.eVars)
    cleanupLinkTrackVars(trackerProperties.eVars, appm);
  if (trackerProperties.props)
    cleanupLinkTrackVars(trackerProperties.props, appm);
  if (trackerProperties.events)
    cleanupLinkTrackEvents(trackerProperties.events, appm);
}
// rfl - plugin from Adobe which removes from list - opposite of apl function - https://docs.adobe.com/content/help/en/analytics/implementation/vars/plugins/removefromlist.html 
function cleanupLinkTrackVars(arr, appm){
 for (i = 0; arr.length > i; i++){
  appm.linkTrackVars = appm.rfl(appm.linkTrackVars, arr[i].name);
  eval("appm." + arr[i].name + "=''");
 }
}
function cleanupLinkTrackEvents(arr, appm){
 for (i = 0; arr.length > i; i++){
  appm.linkTrackEvents = appm.rfl(appm.linkTrackEvents, arr[i].name);
  appm.events = appm.rfl(appm.events, arr[i].name);
 }
}
function getExecutedRule(ruleID){
 var rules = _satellite._container.rules;
 for (i = 0; rules.length > i; i++)
  if (rules[i].id == ruleID)
    return rules[i];
  return null; 
}
*/
// End
//Global - 'YouTube API Page Top'
var videoSwitch = digitalData.content.artist, customVideo = digitalData.content.customVideo;
window.ytPlayers = {}; // Object where keys will be playerID, value - player
if (customVideo != 'true' && videoSwitch != 'Rudimental' && videoSwitch != 'Blur')
  enableYoutubeAPI();
function enableYoutubeAPI(){
  var ytScript = document.createElement('SCRIPT');
  ytScript.src = 'https://www.youtube.com/iframe_api';
  document.getElementsByTagName('head')[0].appendChild(ytScript);
//Start for use case #5 - will be moved to each site going forward
  //This block is here for backward compatibility
  var playerInfoList = new Array();
  var playerStorage = document.getElementsByTagName('iframe');
  var YT, players = new Array();
  window.onYouTubeIframeAPIReady = function() {
    YT = window.YT;
    for (var j=0; j<playerStorage.length; j++)
      if(playerStorage[j].id.indexOf('player') > -1)
        playerInfoList.push(playerStorage[j].id);
    for (x = 0; x < playerInfoList.length; x++)
      players[x] = new YT.Player(playerInfoList[x], {events: {'onStateChange': onPlayerStateChange}});
  }
// End of code for use case #5
  window.onPlayerStateChange = function(event){
    video_name = event.target.getVideoData().title;
    video_length = event.target.getDuration();
    curTime = event.target.getCurrentTime();
    if ((event.data == 1 || event.data < 0) && window.YT.PlayerState.PLAYING == 1){
      if (curTime == 0){
        s.Media.open(video_name, video_length, 'Youtube Object Embed');
        s.Media.play(video_name, curTime);
      } else
        s.Media.play(video_name, curTime);
      return;
    }
    if (event.data == 2 || event.data == 3){ //*-* SKIPPING
      s.Media.stop(video_name, curTime); //this will cause the monitor to have media.event='STOP'
      return;
    }
    if (event.data == 0){ //*-* Completed
      s.Media.stop(video_name, curTime);
      s.Media.close(video_name);
    }
  }
  window.formYoutubePlayerLaunch = function(playerID, youtubeID){
    var isList = youtubeID.length > 11;
    player = new YT.Player(playerID, {
      height: isList?'360':'315',
      width: isList?'640':'560',
      videoId: isList?null:youtubeID,
      playerVars: isList?{listType:'playlist', list:youtubeID}:{},
      host: 'https://www.youtube-nocookie.com',
      events: {
        'onReady': playCurrentVideo, // impl by each solution
        'onStateChange': onPlayerStateChange // impl in Launch
      }
    });
    window.ytPlayers[playerID] = player;
  }
}
function linkedinLogic(){
  if (passDomain('warnerchappellpm')){
    accountId = '3088618';
	s_dtm.pixelList.push('LinkedIn:Warner Chappell PM:' + accountId);
	executeLinkedInPixel(accountId);
  }
}
function executeLinkedInPixel(accountId){
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(accountId);
  (function(){var ss = document.getElementsByTagName('script')[0];
    var b = document.createElement('script');
    b.type = 'text/javascript';b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    ss.parentNode.insertBefore(b, ss);}
  )();
}
/*jshint maxerr: 100000 */
//Rules facing
function executeVendorTypeTL(eVarVal, linkName){
  s.eVar78 = eVarVal;
  executeGlobalTL('event60', 'eVar78,events', linkName);
}
function executeSocialMediaTL(eVarVal, linkName){
  s.eVar79 = eVarVal;
  executeGlobalTL('event61', 'eVar79,events', linkName);
}
function executeTicketTL(dateVal, locVal, suffix){
  s.eVar90 = dateVal, s.eVar91 = locVal;
  executeGlobalTL('event67', 'eVar90,eVar91,events', dateVal + ', ' + locVal + ' - ' + suffix);
}
function executeLinkOnlyTL(linkName){
  executePlainTL(linkName, true);
}
function executeLinkOnlyTL_NoPN(linkName){
  executePlainTL(linkName, false);
}
function executePlainTL(linkName, includePN){
  if (includePN){
    var pageName = getDE('DDO:Page Name');
	if (pageName != '')
	  linkName = pageName + ':' + linkName;
  }
  s.tl(true, 'o', linkName);
  originateLinkTrackingVars();
}
function doubleClickOnEmerge_forSocialButtons(appM, linkName){
  if (getDE('isOneTrustAdvertisingCookiesAllowed') && getDE('isAtlanticrecordsEmerge')){
    acntID = 'DC-8174078';
    appM.pixelList = ['Google DoubleClick Emerge:' + linkName + ':' + acntID];
    appM.linkTrackVars = appM.apl(appM.linkTrackVars, 'list2');
    groupTag = 'socia0', tag = 'emerg0';
    gtag_w('config', acntID);
    gtag_w('event', 'conversion', {
      'allow_custom_scripts': true,
      'send_to': acntID + '/' + groupTag + '/' + tag + '+standard'
     });
  }
}
//hidden
function executeGlobalTL(trackEvs, trackVars, linkName){
  s.events = s.linkTrackEvents = trackEvs;
  s.linkTrackVars = s.apl(s.linkTrackVars, trackVars);
  var includePN = getDE('DDO:Page Name')==''?false:true;
  executePlainTL(linkName, includePN);
}
function originateLinkTrackingVars(){
  s.linkTrackVars='server,channel,events,eVar4,eVar5,eVar8,eVar13,eVar14,eVar21,eVar49,eVar88,eVar96,eVar141,eVar142,eVar143,prop1,prop2,prop6,prop13,prop21,prop49,prop52,prop61,prop67';
  s.linkTrackEvents='event14,event15,event31,event32';
}
//function: load time
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}
function getTimeParting(tzOff){
	lng='long', num='numeric';
	a=(new Date).toLocaleDateString('en-US', {timeZone:tzOff, minute:num, hour:num, weekday:lng, day:num, year:num, month:lng});
	a=/([a-zA-Z]+).*?([a-zA-Z]+).*?([0-9]+).*?([0-9]+).*?([0-9]+).*?([:]).*?([0-9]+).*?([ ])(.*)/.exec(a);
	return [a[0], a[5]+':'+(a[7]>30?'30':'00')+a[9], a[1], ((a[1]=='Saturday'||a[1]=='Sunday')?'Weekend':'Weekday')];
}
/* Timestamp Function */
// GMT Timestamp
function addZero(i) {
    if (i < 10)
        i = "0" + i;
    return i;
}
function timeStamp() {
    var d = new Date();
    var hour = addZero(d.getUTCHours());
    var minute = addZero(d.getUTCMinutes());
    var second = addZero(d.getUTCSeconds());
  	var offset = d.getTimezoneOffset()/60;  
  	var local = hour - offset;
    var alt = local<0?(local+24):local;
    return hour +":"+ minute +":"+ second +" GMT | "+offset+" | "+alt +":"+ minute +":"+ second;
}
/* Module: Integrate */
function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}
/* Module: Media */
function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
(f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
!0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
!0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
"s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
"OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
(a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
"_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var twGlobalRules = [];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var twDomainBasedRules = {
"baileyzimmermanmusic": {rules:[{"expDate": "2026-04-26","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},
"bensonboone": {rules:[{"expDate": "2025-06-20","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},  
"officialkaleo": {rules:[{"expDate": "2020-12-13","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"edsheeran": {rules:[{"expDate": "2026-05-03","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"dualipa": {rules:[{"expDate": "2020-12-31","owner":"Gupta","acntID":"nw41d","trackCommerce":false},
                  {"expDate": "2024-11-11","owner":"Seven Stars","acntID":"o9294","trackCommerce":false},]},
"fitzandthetantrums": {rules:[{"expDate": "2020-12-31","owner":"I'm In Music","acntID":"nzb2z","trackCommerce":false},]},
"joshgroban": {rules:[{"expDate": "2021-06-30","owner":"Tour D Force","acntID":"o4ej7","trackCommerce":true},
 {"expDate": "2021-03-04","owner":"Ciceron","acntID":"o5fka","trackCommerce":false},]},
"gavinadcockmusic": {rules:[{"expDate": "2025-12-31","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},  
"grandsonmusic": {rules:[{"expDate": "2023-06-26","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"illenium": {rules:[{"expDate": "2023-08-01","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"ingridandress": {rules:[{"expDate": "2021-11-09","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"morganevansmusic": {rules:[{"expDate": "2023-09-30","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},  
"blakeshelton": {rules:[{"expDate": "2023-08-04","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"creepercon": {rules:[{"expDate": "2020-12-31","owner":"Seven Stars","acntID":"o48iv","trackCommerce":false},]},
"thecamwhitcomb": {rules:[{"expDate": "2026-04-30","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},    
"twentyonepilots": {rules:[{"expDate": "2022-04-06","owner":"Seven Stars","acntID":"o5qn3","trackCommerce":false},]},
"benplattmusic": {rules:[{"expDate": "2022-07-01","owner":"AEG Presents","acntID":"nxa0d","trackCommerce":false},]},
"wallowsmusic": {rules:[{"expDate": "2022-09-28","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},
"portugaltheman": {rules:[{"expDate": "2022-08-26","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"redferrin": {rules:[{"expDate": "2025-12-31","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},  
"officialgriff": {rules:[{"expDate": "2024-09-30","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},  
"ovosound": {rules:[{"expDate": "2023-04-07","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"sombrmusic":{rules:[{"expDate": "2027-01-28","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},  
"thebandcamino": {rules:[{"expDate": "2023-07-23","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},
"ellahenderson": {rules:[{"expDate": "2022-04-05","owner":"Seven Stars","acntID":"o7u1u","trackCommerce":false},]},
"muse": {rules:[{"expDate": "2023-04-20","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"warrenzeiders": {rules:[{"expDate": "2025-11-22","owner":"AEG Presents","acntID":"nygj9","trackCommerce":false},]},
"willowavalonmusic": {rules:[{"expDate": "2026-04-30","owner":"AEG Presents","acntID":"o2a2q","trackCommerce":false},]},    
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var twConditionBasedRules = {};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var tdGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var tdDomainBasedRules = {
'aboogiehbtl': {rules:[{'expDate': '2024-02-29','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-02-29','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'avamax': {rules:[{'expDate': '2026-06-08','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2026-06-08','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'baileyzimmermanmusic': {rules:[{'expDate': '2026-06-21','owner':'Live Nation','acntID':'wed77s2'},
                               {'expDate': '2026-06-21','owner':'Live Nation','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'blakeshelton': {rules:[{'expDate': '2025-04-30','owner':'Live Nation','acntID':'ae867y5','pixelAcntID':'8ywqkqq'}]},  
'bretteldredge': {rules:[{'expDate': '2023-09-10','owner':'Live Nation','acntID':'wed77s2'}]},
'brunomars': {rules:[{'expDate': '2026-11-01','owner':'Live Nation','acntID':'wed77s2'},
                    {'expDate': '2026-11-01','owner':'Live Nation','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'cardib': {rules:[{'expDate': '2026-04-30','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2026-04-30','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},    
'charlieputh': {rules:[{'expDate': '2026-11-06','owner':'Live Nation','acntID':'wed77s2'}]},
'charlixcx': {rules:[{'expDate': '2025-04-08','owner':'Live Nation','acntID':'wed77s2'}]},  
'coheedandcambria': {rules:[{'expDate': '2022-06-07','owner':'Live Nation','acntID':'wed77s2'}]},
'coldplay': {rules:[{'expDate': '2024-11-09','owner':'Live Nation','acntID':'wed77s2'},
                    {'expDate': '2024-11-19','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'coleswindell': {rules:[{'expDate': '2024-08-01','owner':'Live Nation','acntID':'wed77s2'}]},  
'danandshay': {rules:[{'expDate': '2026-11-03','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2026-11-03','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'deftones': {rules:[{'expDate': '2025-09-17','owner':'Live Nation','acntID':'wed77s2'},
                    {'expDate': '2025-09-17','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'disturbed1': {rules:[{'expDate': '2025-10-07','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-10-07','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'dontolivermusic': {rules:[{'expDate': '2025-06-20','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-06-20','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'earlsweatshirt': {rules:[{'expDate': '2026-05-19','owner':'Live Nation','acntID':'wed77s2'},
                    {'expDate': '2026-05-19','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'fosterthepeople': {rules:[{'expDate': '2025-04-01','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-04-01','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'fredagain': {rules:[{'expDate': '2025-10-19','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-10-19','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},      
'halestormrocks': {rules:[{'expDate': '2025-02-27','owner':'Live Nation','acntID':'wed77s2'}]},    
'hayleykiyokoofficial': {rules:[{'expDate': '2023-06-03','owner':'Live Nation','acntID':'wed77s2'}]},
'hilaryduff': {rules:[{'expDate': '2026-12-31','owner':'Live Nation','acntID':'wed77s2'},
                               {'expDate': '2026-12-31','owner':'Live Nation','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'googoodolls': {rules:[{'expDate': '2025-10-01','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'gorillaz': {rules:[{'expDate': '2026-11-04','owner':'Live Nation','acntID':'wed77s2'},
                   {'expDate': '2026-11-04','owner':'Live Nation','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'jackharlow': {rules:[{'expDate': '2023-09-09','owner':'Live Nation','acntID':'wed77s2'},
                      {'expDate': '2026-09-20','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'},
                      {'expDate': '2026-09-20','owner':'Live Nation','acntID':'wed77s2','pixelAcntID':'q684oyg'}]},
'jmonae': {rules:[{'expDate': '2024-05-30','owner':'Live Nation','acntID':'wed77s2'}]},
'joshgroban': {rules:[{'expDate': '2023-01-02','owner':'Hello RPM','acntID':'nitbybc','pixelAcntID':'byoyfng'},
                     {'expDate': '2026-07-03','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2026-07-03','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'joshuatbassett': {rules:[{'expDate': '2024-09-03','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-09-03','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'karanaujlamusic': {rules:[{'expDate': '2025-08-28','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-08-28','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'kehlani': {rules:[{'expDate': '2025-07-23','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-07-23','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'kvngates': {rules:[{'expDate': '2023-07-14','owner':'Live Nation','acntID':'wed77s2'}]},    
'liluziofficial': {rules:[{'expDate': '2023-11-09','owner':'Live Nation','acntID':'wed77s2'}]},
'mahaliamusic': {rules:[{'expDate': '2024-03-26','owner':'Live Nation','acntID':'wed77s2'}]},    
'melaniemartinezmusic': {rules:[{'expDate': '2024-11-09','owner':'Live Nation','acntID':'wed77s2'}]},
'missy-elliott': {rules:[{'expDate': '2024-08-23','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-08-23','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'mothermothersite': {rules:[{'expDate': '2024-02-29','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-02-29','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'motionlessinwhite': {rules:[{'expDate': '2026-12-19','owner':'Live Nation','acntID':'wed77s2'},
                             {'expDate': '2026-12-19','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'mychemicalromance': {rules:[{'expDate': '2025-11-10','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-11-10','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'nlechoppa': {rules:[{'expDate': '2024-09-21','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-09-21','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'nocap': {rules:[{'expDate': '2025-02-24','owner':'Live Nation','acntID':'wed77s2'}]},
'officialkodakblack': {rules:[{'expDate': '2023-09-15','owner':'Live Nation','acntID':'wed77s2'}]},    
'officialkaleo': {rules:[{'expDate': '2024-11-01','owner':'Live Nation','acntID':'wed77s2'}]},  
'olivertreemusic': {rules:[{'expDate': '2024-02-17','owner':'Live Nation','acntID':'wed77s2'}]},  
'paramore': {rules:[{'expDate': '2023-07-15','owner':'Live Nation','acntID':'wed77s2'}]},
'realluhtyler': {rules:[{'expDate': '2024-06-24','owner':'Live Nation','acntID':'wed77s2'}]},
'rufusdusol': {rules:[{'expDate': '2023-09-01','owner':'Live Nation','acntID':''}]},    
'onaspaceship': {rules:[{'expDate': '2024-10-24','owner':'Live Nation','acntID':'wed77s2'}]},
'orvillepeck': {rules:[{'expDate': '2024-10-01','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2024-10-01','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'shinedown': {rules:[{'expDate': '2026-01-27','owner':'Live Nation','acntID':'wed77s2'}]},  
'theamericandreamiskillingme': {rules:[{'expDate': '2024-09-29','owner':'Live Nation','acntID':'wed77s2'}]}, 
'thetrilogytour': {rules:[{'expDate': '2024-11-09','owner':'Live Nation','acntID':'wed77s2'}]},
'trivium': {rules:[{'expDate': '2025-05-19','owner':'Live Nation','acntID':'wed77s2'},
                           {'expDate': '2025-05-19','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},  
'twentyonepilots': {rules:[{'expDate': '2025-10-25','owner':'Live Nation','acntID':'wed77s2'},
                          {'expDate': '2025-10-25','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},      
'wallowsmusic': {rules:[{'expDate': '2025-03-10','owner':'Live Nation','acntID':'wed77s2'},
                       {'expDate': '2025-03-10','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},
'warrenzeiders': {rules:[{'expDate': '2026-11-03','owner':'Live Nation','acntID':'wed77s2'},
                       {'expDate': '2026-11-03','owner':'Live Nation Canada','acntID':'x5bdt2r','pixelAcntID':'w905znw'}]},      
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var tdConditionBasedRules = {
'isWarnerConnectBensonBooneIndonesia': {rules:[{'expDate': '2023-07-31','owner':'Forward 3D HK Limited','acntID':'qnrjie7','pixelAcntID':'c8hsih5'}]},  
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var fbGlobalRules = [
  {"expDate": "","owner":"WMAS","acntID":"651625628320982","trackCommerce":true},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var fbDomainBasedRules = {
"100gecs": {rules:[{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},]},
"22gzofficial": {rules:[{"expDate": "2022-08-23","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},]},
"aboogiehbtl": {rules:[{"expDate": "2024-09-30","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2024-09-30","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},  
"ada-music": {rules:[{"expDate": "","owner":"ADA","acntID":"1708168276124575","trackCommerce":false},]},
"adtr": {rules:[{"expDate": "2022-07-30","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]}, 
"ag-lessaules": {rules:[{"expDate": "2021-12-31","owner":"Warner Music France","acntID":"836431913629127","trackCommerce":false},]},
"alecbenjamin": {rules:[{"expDate": "2025-04-05","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
  {"expDate": "2025-04-05","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]},
"alexwarrenofficial": {rules:[{"expDate": "2026-07-15","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2026-07-15","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},  
"aligatie": {rules:[{"expDate": "2021-06-11","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},
                   {"expDate": "2022-12-17","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2022-12-17","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"amaalnuux": {rules:[{"expDate": "2023-05-20","owner":"The Click Team","acntID":"591094027720147","trackCommerce":false},]},  
"antiupmusic": {rules:[{"expDate": "2022-03-04","owner":"Up The Anti Records, LLC","acntID":"880581972784707","trackCommerce":false},]},
"ashleymcbryde": {rules:[{"expDate": "2024-01-27","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"ashnikko": {rules:[{"expDate": "2021-09-07","owner":"Seven Stars","acntID":"1630355510585015","trackCommerce":false},]},
"asylumrecords": {rules:[{"expDate": "","owner":"Asylum Records","acntID":"1792138377536379","trackCommerce":false},]},
"austinsnell": {rules:[{"expDate": "2026-06-15","owner":"Peachtree Ent","acntID":"415623903444260","trackCommerce":false}]},  
"avamax": {rules:[{"expDate": "2026-06-08","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2026-06-08","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},    
"baileyzimmermanmusic": {rules:[{"expDate": "2026-06-21","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                                {"expDate": "2026-06-21","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},
                                {"expDate": "2026-03-07","owner":"Peachtree Ent","acntID":"1109737437406732","trackCommerce":false},
                               {"expDate": "2026-04-26","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.baileyzimmermanmusic.com/","artistName":"Bailey Zimmerman","genre":"music","host":"www.baileyzimmermanmusic.com"}]},  
"bazziofficial":{rules: [{"expDate":"2023-07-25", "owner":"Live Nation", "acntID": "386920928936604","trackCommerce":false},
   {"expDate":"2023-07-25", "owner":"Live Nation", "acntID": "336617377178130","trackCommerce":false}]},
"bdlmradio": {rules:[{"expDate": "","owner":"Atlantic Records","acntID":"407946838916095","trackCommerce":false},]},  
"beaandher.business": {rules:[{"expDate": "2024-09-30","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},]},
"benabrahammusic": {rules:[{"expDate": "2023-05-21","owner":"Embrace Entertainment Inc.","acntID":"386920928936604","trackCommerce":false},]},
"bendigofletcher": {rules:[{"expDate": "2024-05-03","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},
"benplattmusic": {rules:[{"expDate": "2022-07-01","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},]},
"bensonboone": {rules:[{"expDate": "2024-05-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
  {"expDate": "2024-05-01","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},
                      {"expDate": "2025-06-20","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Pop","funnelStep":"https://www.bensonboone.com/","artistName":"Benson Boone","genre":"music","host":"www.bensonboone.com"}]},  
"biffyclyro": {rules:[{"expDate": "2020-09-30","owner":"Nostromo","acntID":"322849381993383","trackCommerce":false},
 {"expDate": "2020-12-31","owner":"Seven Stars","acntID":"878385648909330","trackCommerce":false},
 {"expDate": "2022-06-06","owner":"DF Concerts Limited","acntID":"546703972374383","trackCommerce":false},
 {"expDate": "2026-05-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2026-05-07","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},   
"billytalent": {rules:[{"expDate": "2022-04-07","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"blakeshelton": {rules:[{"expDate": "2025-04-30","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"country","funnelStep":"https://www.blakeshelton.com/","artistName":"Blake Shelton","genre":"music","host":"www.blakeshelton.com"},
                      {"expDate": "2025-02-15","owner":"Live Nation","acntID":"733366670102540","trackCommerce":false},]},  
"brandicarlile": {rules:[{"expDate": "2022-10-21","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"brandyclarkmusic": {rules:[{"expDate": "2024-06-03","owner":"Brandy Clark","acntID":"780011950316068","trackCommerce":false},
                           {"expDate": "2024-07-29","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"country","funnelStep":"https://www.brandyclarkmusic.com/","artistName":"Brandy Clark","genre":"music","host":"www.brandyclarkmusic.com"},
                           {"expDate": "2027-07-06","owner":"Gellman Management LLC","acntID":"1058545970039312","trackCommerce":false}]},
"bretteldredge": {rules:[{"expDate": "2021-03-15","owner":"CAA","acntID":"217011611820041","trackCommerce":false},
 {"expDate": "2023-09-10","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"brunomars": {rules:[{"expDate": "2022-10-16","owner":"Ticketek Pty Ltd","acntID":"1615462762065567","trackCommerce":false},
                    {"expDate": "2026-11-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                    {"expDate": "2026-11-01","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"budjerah": {rules:[{"expDate": "2022-05-07","owner":"Lemon Tree Music Management","acntID":"138686424902653","trackCommerce":false},]},
"cardib": {rules:[{"expDate": "2020-12-31","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},
                         {"expDate": "2026-04-30","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2026-04-30","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]},
"charlieputh": {rules:[{"expDate": "2026-11-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2026-11-01","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},
"charlieworsham": {rules:[{"expDate": "2024-12-31","owner":"RIVIDIA","acntID":"376725509779871","trackCommerce":false},]},
"charlixcx":{rules: [{"expDate":"2025-04-08", "owner":"Live Nation", "acntID": "386920928936604","trackCommerce":false},
   {"expDate":"2025-04-08", "owner":"Live Nation", "acntID": "336617377178130","trackCommerce":false}]},  
"charlottecardin": {rules:[{"expDate": "2024-02-11","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},   
"chelseacutler": {rules:[{"expDate": "2022-06-08","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]}, 
"christmasthree": {rules:[{"expDate": "","owner":"Warner Music Sweden","acntID":"550565082510285","trackCommerce":false},]},
"codeorangetoth": {rules:[{"expDate": "2022-12-14","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]}, 
"coheedandcambria": {rules:[{"expDate": "2022-06-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},  
"coldplay": {rules:[{"expDate": "2024-11-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2024-11-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"coleswindell": {rules:[{"expDate": "2024-08-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2024-08-01","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},  
"creepercon": {rules:[{"expDate": "2020-12-31","owner":"Seven Stars","acntID":"878385648909330","trackCommerce":false},]},
"creepercult": {rules:[{"expDate": "2020-12-31","owner":"Seven Stars","acntID":"771683616213096","trackCommerce":false},]},
"danandshay": {rules:[{"expDate": "2026-11-03","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                     {"expDate": "2026-11-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"dead.net": {rules:[{"expDate": "2027-04-13","owner":"Nugs.net Enterprises Inc.","acntID":"1479300443849390","trackCommerce":false}]},
"deftones": {rules:[{"expDate": "2025-09-17","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                    {"expDate": "2025-09-17","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},    
"disturbed1": {rules:[{"expDate": "2025-10-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                     {"expDate": "2025-10-07","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"dontolivermusic": {rules:[{"expDate": "2025-06-20","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                          {"expDate": "2025-06-20","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"dualipa": {rules:[{"expDate": "2022-03-30","owner":"Merch Traffic","acntID":"544381862952851","trackCommerce":false},]},
"dualipaclubfn.warnermusicasia.com": {rules:[{"expDate": "2020-12-31","owner":"Warner Music Asia","acntID":"1513669905500087","trackCommerce":false},]},
"earlsweatshirt": {rules:[{"expDate": "2026-05-19","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                          {"expDate": "2026-05-19","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                          {"expDate": "2026-05-19","owner":"WAVO","acntID":"1332665088073557","trackCommerce":false}]},  
"edsheeran": {rules:[{"expDate": "","owner":"Warner Music Australia","acntID":"408764485979609","trackCommerce":false},
 {"expDate": "2022-08-06","owner":"CMS Music Media","acntID":"1554156728115986","trackCommerce":false},
 {"expDate": "2026-05-03","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Pop","funnelStep":"https://www.edsheeran.com/","artistName":"Ed Sheeran","genre":"music","host":"www.edsheeran.com"},]}, 
"ekalimusic": {rules:[{"expDate": "2020-11-11","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},]},
"fever333": {rules:[{"expDate": "2022-06-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"fitzandthetantrums": {rules:[{"expDate": "2020-12-31","owner":"I'm In Music","acntID":"166414397125738","trackCommerce":false},]},
//"florsounds": {rules:[{"expDate": "2022-12-19","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"flyanaboss": {rules:[{"expDate": "2024-02-27","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
 "foals": {rules:[{"expDate": "2020-12-31","owner":"Ciceron","acntID":"282641428553005","trackCommerce":false},
 {"expDate": "2022-11-07","owner":"Q Prime Entertainment","acntID":"1731859343712720","trackCommerce":false},]},  
"faouziaofficial": {rules:[{"expDate": "2023-07-12","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"forestblakk": {rules:[{"expDate": "2024-12-31","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"fosterthepeople": {rules:[{"expDate": "2025-04-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                          {"expDate": "2025-04-01","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                          {"expDate": "2025-08-01","owner":"Jet MGMT","acntID":"1407728173715882","trackCommerce":false}]},  
"fredagain": {rules:[{"expDate": "2024-10-19","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                     {"expDate": "2024-10-19","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"funkydivassweepstakes.wmx.co": {rules:[{"expDate": "","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false},]},
"gabbybarrett": {rules:[{"expDate": "2026-08-25","owner":"Red Light Management","acntID":"750790724333985","trackCommerce":false},]},
"gavinadcockmusic": {rules:[{"expDate": "2026-09-16","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.gavinadcockmusic.com/","artistName":"Gavin Adcock","genre":"music","host":"www.gavinadcockmusic.com"},    
                     {'expDate': '2027-06-08','owner':'Ad Parlor','acntID':'1489104979224508','trackCommerce':false},]},
"gayleofficial": {rules:[{"expDate": "2023-07-05","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"ghetts": {rules:[{"expDate": "2021-03-28","owner":"Seven Stars","acntID":"878385648909330","trackCommerce":false},]},
"gojira-music": {rules:[{"expDate": "2020-10-18","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"googoodolls": {rules:[{"expDate": "2025-10-01","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},    
"gorillaz": {rules:[{"expDate": "2026-11-04","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                    {"expDate": "2026-11-04","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                    {"expDate": "2026-04-01","owner":"Sine Digital","acntID":"1781700452411603","trackCommerce":false},]},  
//"goldenfeatures": {rules:[{"expDate": "2023-07-07","owner":"Ninja Tune HQ","acntID":"490295047775358","trackCommerce":false},]},
"grandsonmusic": {rules:[{"expDate": "2023-06-26","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"alternative","funnelStep":"https://www.grandsonmusic.com/","artistName":"grandson","genre":"music","host":"www.grandsonmusic.com"},]},    
"hakunamatoma": {rules:[{"expDate": "2021-08-06","owner":"Milton Archer Management","acntID":"2690047527930315","trackCommerce":false},]},
"halestormrocks": {rules:[{"expDate": "2025-02-28","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2025-02-28","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"hauteandfreddy": {"rules":[{"expDate": "2026-12-31","owner":"Jet MGMT","acntID":"919784760568035","trackCommerce":false}]},
"hayleykiyokoofficial": {rules:[{"expDate": "2023-06-03","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2023-06-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"highwayhomeofficial": {rules:[{"expDate": "2026-12-01","owner":"Peachtree Ent","acntID":"1522123644995705","trackCommerce":false}]},      
"hilaryduff": {rules:[{"expDate": "2026-12-31","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2026-12-31","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},
"houseofkong.gorillaz.com": {rules:[{"expDate": "2026-11-01","owner":"Eleven Mgmt","acntID":"1887961651872046","trackCommerce":false}]},
"hudsonwestbrook": {rules:[{"expDate": "2026-03-09","owner":"Peachtree Ent","acntID":"1109737437406732","trackCommerce":false}]},    
"iamannemarie": {rules:[{"expDate": "2024-05-05","owner":"Seven Stars","acntID":"651625628320982","trackCommerce":false},]},
"iamlights": {rules:[{"expDate": "2023-02-17","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},
"ikkymusic": {rules:[{"expDate": "2023-12-24","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]},
"illenium": {rules:[{"expDate": "2023-08-01","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},]},
"jackharlow.us": {rules:[{"expDate": "2025-02-13","owner":"Private Garden","acntID":"228718050298405","trackCommerce":false},
                        {"expDate": "2023-09-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}, 
                         {"expDate": "2023-09-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"jadelemac": {rules:[{"expDate": "2026-01-30","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},  
"jessiejamesdecker": {rules:[{"expDate": "2022-06-05","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},]},
"jmonae": {rules:[{"expDate": "2024-05-30","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2024-05-30","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},  
"joshconway.us": {rules:[{"expDate": "2027-07-20","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false}]},
 "joshgroban": {rules:[{"expDate": "2023-01-02","owner":"Hello RPM","acntID":"348861853991055","trackCommerce":false},
                     {"expDate": "2026-07-03","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2026-07-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},   
"joshuatbassett": {rules:[{"expDate": "2022-10-13","owner":"Foundations Music Management","acntID":"3271415186313207","trackCommerce":false},
                          {"expDate": "2024-09-03","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                          {"expDate": "2024-09-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"karanaujlamusic": {rules:[{"expDate": "2025-08-28","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                           {"expDate": "2026-06-30","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]},    
"karlbenjamin.world": {rules:[{"expDate": "2021-11-13","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},]},
"kehlani": {rules:[{"expDate": "2025-07-23","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2025-07-23","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},  
"kornofficial": {rules:[{"expDate": "2022-05-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2021-09-01","owner":"Danny Wimmer Presents","acntID":"151032226850292","trackCommerce":false},]},
"kvngates": {rules:[{"expDate": "2023-07-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"lauramvula": {rules:[{"expDate": "2021-07-02","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},]},
"laurendaigle": {rules:[{"expDate": "2024-03-11","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Christian","funnelStep":"ARTIST SITE","artistName":"Lauren Daigle","genre":"music","host":"laurendaigle.com"},]},  
//"levelmusic": {rules:[{"expDate": "","owner":"Level Music","acntID":"336508553505539","trackCommerce":false},]},  
"liluziofficial": {rules:[{"expDate": "2024-06-24","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2023-11-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]}, 
"lilyisthatyou": {rules:[{"expDate": "2023-03-10","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]}, 
"lindseylomis": {rules:[{"expDate": "2023-06-28","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},  
"lizzomusic": {rules:[{"expDate": "2022-11-20","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
 {"expDate": "2022-11-20","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"luntunes": {rules:[{"expDate": "2024-01-25","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},]},   
"lukasgraham": {rules:[{"expDate": "2022-09-01","owner":"United Stage Danmark","acntID":"529170974361240","trackCommerce":false},]},
"mahaliamusic": {rules:[{"expDate": "2024-03-26","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                           {"expDate": "2024-03-26","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},  
"madelineedwardsmusic": {rules:[{"expDate": "2023-10-05","owner":"mTheory","acntID":"47266777491472","trackCommerce":false},]},
"masonramsey": {rules:[{"expDate": "2024-12-15","owner":"Good Luck Have Fun","acntID":"502846603457620","trackCommerce":false},]},     
"maisiepeters": {rules:[{"expDate": "2022-03-27","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"mattmaeson": {rules:[{"expDate": "2025-07-01","owner":"Matt Maeson, Inc.","acntID":"1217673219653905","trackCommerce":false},
                     {"expDate": "2025-12-31","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}]},   
"maxmusicofficial": {rules:[{"expDate": "2023-07-11","owner":"Live Nation Worldwide, Inc.","acntID":"336617377178130","trackCommerce":false},
                            {"expDate": "2023-07-11","owner":"Live Nation Worldwide, Inc.","acntID":"386920928936604","trackCommerce":false}]},
"meetmeatthealtar": {rules:[{"expDate": "2024-02-21","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]}, 
"melaniemartinezmusic": {rules:[{"expDate": "2024-11-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                            {"expDate": "2024-11-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"missy-elliott": {rules:[{"expDate": "2024-08-23","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                            {"expDate": "2024-08-23","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]}, 
"miarodriguezofficial": {rules:[{"expDate": "2022-08-11","owner":"Chugg Music Pty Ltd.","acntID":"587641342618888","trackCommerce":false},]},
"michaelbuble": {rules:[{"expDate": "2022-12-21","owner":"Gupta Media","acntID":"490394296164402","trackCommerce":false},]},
"monkees": {rules:[{"expDate": "2024-07-26","owner":"UNDRCVR","acntID":"989720992219803","trackCommerce":false},]},  
"morganevansmusic": {rules:[{"expDate": "2023-09-30","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"country","funnelStep":"https://www.morganevansmusic.com/","artistName":"Morgan Evans","genre":"music","host":"www.morganevansmusic.com"},]},  
"mothermothersite": {rules:[{"expDate": "2024-04-29","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false},
                           {"expDate": "2024-04-29","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"motionlessinwhite": {rules:[{"expDate": "2026-12-19","owner":"Live Nation Worldwide, Inc.","acntID":"336617377178130","trackCommerce":false},
                             {"expDate": "2026-12-19","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]},
"muse": {rules:[{"expDate": "2023-04-20","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false}]},
"mychemicalromance": {rules:[{"expDate": "2020-11-24","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},
                            {"expDate": "2025-11-10","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                            {"expDate": "2025-11-10","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"nathandawemusic": {rules:[{"expDate": "2021-11-25","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},]},
"needtobreathe": {rules:[{"expDate": "2022-06-11","owner":"Foundations Music Management","acntID":"1318272434917122","trackCommerce":false},
 {"expDate": "2022-09-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2022-09-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"ninesofficial": {rules:[{"expDate": "2020-12-06","owner":"Seven Stars","acntID":"878385648909330","trackCommerce":true},]},
"nlechoppa": {rules:[{"expDate": "2024-09-21","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}, 
                         {"expDate": "2024-09-21","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"nocap": {rules:[{"expDate": "2025-02-24","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}]},
"officialgriff": {rules:[{"expDate": "2022-03-17","owner":"Seven Stars","acntID":"878385648909330","trackCommerce":true},
                        {"expDate": "2024-09-30","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false}]},
"officialkaleo": {rules:[{"expDate": "2020-12-13","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},
 {"expDate": "2024-11-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2024-11-01","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
 {'expDate': '2025-10-10','owner':'Firebird Music','acntID':'860334995981626','trackCommerce':false}]},
"officialkodakblack": {rules:[ {"expDate": "2023-09-16","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2023-09-16","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"olivertreemusic": {rules:[ {"expDate": "2024-02-17","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2024-02-17","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},  
"omahlay": {rules:[{"expDate": "2023-06-23","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                  {"expDate": "2023-06-23","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"onaspaceship": {rules:[{"expDate": "2024-10-24","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                        {"expDate": "2024-10-24","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                       {"expDate": "2023-06-22","owner":"Whytelion","acntID":"358449764573831","trackCommerce":false},
                       {"expDate": "2023-06-22","owner":"Robomagic Live","acntID":"864160034594475","trackCommerce":false},]},
"oneokrock": {rules:[{"expDate": "2022-09-13","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"orvillepeck": {rules:[{"expDate": "2024-10-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
  {"expDate": "2024-10-01","owner":"Live Nation Canada","acntID":"386920928936604","trackCommerce":false}]}, 
"outloud-wmf": {rules:[{"expDate": "","owner":"Warner Music France","acntID":"825601591664911","trackCommerce":false},]},  
"ovosound": {rules:[{"expDate": "2023-04-07","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                   {"expDate": "2023-04-07","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2023-04-07","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false}]},  
"patrickdroneymusic": {rules:[{"expDate": "2022-12-15","owner":"Mick Management","acntID":"500286504549116","trackCommerce":false},]},
"paramore": {rules:[{"expDate": "2023-07-15","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                   {"expDate": "2023-07-15","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"planetmvula": {rules:[{"expDate": "2021-12-31","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},]},
"portugaltheman": {rules:[{"expDate": "2022-08-26","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},]},
"putaindejeu": {rules:[{"expDate": "2021-12-31","owner":"Warner Music France","acntID":"825601591664911","trackCommerce":false},]}, 
"redferrin": {rules:[{"expDate": "2021-12-31","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                    {"expDate": "2025-12-31","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.redferrin.com/","artistName":"Redferrin","genre":"music","host":"www.redferrin.com"}]},
"realluhtyler": {rules:[{"expDate": "2024-06-24","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"riconastymusic": {rules:[{"expDate": "2026-06-09","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"hip hop","funnelStep":"https://www.riconastymusic.com/","artistName":"Rico Nasty","genre":"music","host":"www.riconastymusic.com"},]},      
"rickymontgomery": {rules:[{"expDate": "2022-12-17","owner":"Foundations Music Management","acntID":"546207777318849","trackCommerce":false},]},
"rksband": {rules:[{"expDate":"2026-12-11","owner": "WAVO","acntID": "1087269522934177","trackCommerce": false},]},
"roddyricch": {rules:[{"expDate": "2021-01-07","owner":"The Shalizi Group","acntID":"543543502899223","trackCommerce":false},]},
"royalbloodband": {rules:[{"expDate": "2020-12-11","owner":"Wildlife Entertainment","acntID":"878385648909330","trackCommerce":false},
 {"expDate": "2022-02-03","owner":"Wildlife Entertainment","acntID":"374997099966044","trackCommerce":false},]}, 
"rudimental": {rules:[{"expDate": "2021-07-18","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":false},]}, 
"rufusdusol": {rules:[{"expDate": "2020-10-01","owner":"Lesiurely","acntID":"2535651530087678","trackCommerce":false},
 {"expDate": "2023-09-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2023-09-01","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},                     
 {"expDate": "2022-11-07","owner":"Bolster Presents","acntID":"177993627832512","trackCommerce":false},]},  
"runoutgroove": {rules:[{"expDate": "","owner":"Rhino","acntID":"252787732215220","trackCommerce":false},]},
"runoutgroovevinyl": {rules:[{"expDate": "","owner":"Rhino","acntID":"366036044826050","trackCommerce":false},
 {"expDate": "","owner":"Rhino","acntID":"1543864162457759","trackCommerce":false},]},
"sabrinaclaudio": {rules:[{"expDate": "2022-10-31","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
 {"expDate": "2022-10-31","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]}, 
"samgellaitry": {rules:[{"expDate": "2022-04-13","owner":"Seven Stars","acntID":"1630355510585015","trackCommerce":false},]},
"saweetieofficial": {rules:[{"expDate": "2022-08-04","owner":"Top Growth Marketing","acntID":"1286321178119941","trackCommerce":false},]}, 
"serenaryder": {rules:[{"expDate": "2020-11-19","owner":"Pandyamonium","acntID":"2861014693909105","trackCommerce":false},]},
"shinedown": {rules:[{"expDate": "2021-12-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
 {"expDate": "2026-01-27","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"shutupandgotobed": {rules:[{"expDate": "2023-05-11","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
 {"expDate": "2023-05-11","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},  
"silvyofficial": {rules:[{"expDate": "","owner":"Warner Music Asia","acntID":"489027005122008","trackCommerce":false},]},
"sombrmusic":{rules:[{"expDate": "2027-01-28","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Pop","funnelStep":"https://www.sombrmusic.com/","artistName":"sombr","genre":"music","host":"sombrmusic.com"},]},     
"teddyswims": {rules:[{"expDate": "2027-04-10","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"r&b","funnelStep":"https://www.teddyswims.com/","artistName":"Teddy Swims","genre":"music","host":"www.teddyswims.com"},]},
"theamericandreamiskillingme": {rules:[{"expDate": "2024-09-29","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                                      {"expDate": "2024-09-29","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                                      {"expDate": "2024-09-29","owner":"Live Nation","acntID":"672921584564034","trackCommerce":false},
                                      {"expDate": "2024-09-29","owner":"Live Nation","acntID":"618922910175029","trackCommerce":false},
                                      {"expDate": "2024-09-29","owner":"Live Nation","acntID":"674739088091164","trackCommerce":false},
                                      {"expDate": "2024-09-29","owner":"Crush Management","acntID":"852798706476903","trackCommerce":false}]},    
"thebandcamino": {rules:[{"expDate": "2023-07-23","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false},]},
"thecamwhitcomb": {rules:[{"expDate": "2026-04-30","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.thecamwhitcomb.com/","artistName":"Cameron Whitcomb","genre":"music","host":"www.thecamwhitcomb.com"},
                          {"expDate":"2026-07-31","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}]},       
"thecreekersband": {rules:[{"expDate": "2026-12-31","owner":"Peachtree Ent","acntID":"445121061614413","trackCommerce":false},]},
"thefrontbottoms": {rules:[{"expDate": "2020-11-27","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"theheadandtheheart": {rules:[{"expDate": "2020-12-01","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"theolawrencemusic": {rules:[{"expDate": "2027-03-30","owner":"Theo Lawrence Industries LLC","acntID":"921587893784201","trackCommerce":false},]},
"thetrilogytour": {rules:[{"expDate": "2024-11-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                            {"expDate": "2024-11-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]}, 
"thisisarizonamusic": {rules:[{"expDate": "2023-06-14","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"thisisdig": {rules:[{"expDate": "2021-09-07","owner":"Seven Stars","acntID":"771683616213096","trackCommerce":false},]},
"thomasheadon": {rules:[{"expDate": "2023-04-30","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"touteslesetoiles": {rules:[{"expDate": "","owner":"Warner Music France","acntID":"1851875195643356","trackCommerce":false},]},  
"trivium": {rules:[{"expDate": "2025-05-19","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                             {"expDate": "2025-05-19","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}]},
"turnstilehardcore": {rules:[{"expDate": "2022-11-17","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                             {"expDate": "2022-11-17","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false}]},
"twentyonepilots": {rules:[{"expDate": "2022-07-15","owner":"Seven Stars","acntID":"2426507284308740","trackCommerce":true},
                           {"expDate": "2025-10-25","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                           {"expDate": "2025-10-25","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                           {"expDate": "2025-05-27","owner":"Live Nation Australia","acntID":"358352304684801","trackCommerce":false},
                           {"expDate": "2025-03-27","owner":"Live Nation New Zealand","acntID":"174962059971097","trackCommerce":false},]},
"vancejoy": {rules:[{"expDate": "2023-06-23","owner":"Liberation Records","acntID":"2057458161232440","trackCommerce":false},
 {"expDate": "2024-12-31","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"vanesamartin7.es": {rules:[{"expDate": "","owner":"Warner Music Spain","acntID":"837944149591094","trackCommerce":false},]}, 
"wallowsmusic": {rules:[{"expDate": "2024-09-13","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                       {"expDate": "2024-09-13","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},  
"warnerclassics": {rules:[{"expDate": "","owner":"Warner Classics","acntID":"541534956339924","trackCommerce":false},]},
"warnermusicfollow.nl": {rules:[{"expDate": "","owner":"Warner Music Netherlands","acntID":"517891198414848","trackCommerce":false},]},
"warnermusic.be": {rules:[{"expDate": "2021-09-24","owner":"ODB - Brand Communication Agency","acntID":"320403242621976","trackCommerce":false},]},
//"store.warnermusic.ca": {rules:[{"expDate": "2023-05-31","owner":"The Click Team","acntID":"591094027720147","trackCommerce":false},]},
"warnermusic.nl": {rules:[{"expDate": "2021-09-24","owner":"ODB - Brand Communication Agency","acntID":"320403242621976","trackCommerce":false},]},
"warrenzeiders": {rules:[{"expDate": "2026-11-03","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2026-11-03","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},
                         {"expDate": "2025-11-22","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.warrenzeiders.com/","artistName":"Warren Zeiders","genre":"music","host":"www.warrenzeiders.com"},
                        {"expDate": "2026-01-14","owner":"Underscore Works","acntID":"1975987539531963","trackCommerce":false}]},
"waterparksband": {rules:[{"expDate": "2023-08-09","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
                         {"expDate": "2023-08-09","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false}]},
"willowavalonmusic": {rules:[{"expDate": "2026-04-30","owner":"AEG Presents","acntID":"217011611820041","trackCommerce":false,"custom":true,"subGenre":"Country","funnelStep":"https://www.willowavalonmusic.com/","artistName":"Willow Avalon","genre":"music","host":"www.willowavalonmusic.com"},]},         
"wizkhalifa": {rules:[{"expDate": "2022-09-30","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},]},
"whydontwemusic": {rules:[{"expDate": "2022-08-24","owner":"Live Nation","acntID":"336617377178130","trackCommerce":false},
 {"expDate": "2022-04-29","owner":"Live Nation","acntID":"386920928936604","trackCommerce":false},]},
"youasidepiece": {rules:[{"expDate": "2024-01-23","owner":"Area 25, LLC & Sidepiece Ricky, LLC","acntID":"5789243641122993","trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var fbConditionBasedRules = {
  "isAmaalCAStore": {
  rules: [
   {"expDate": "2023-05-31", "owner":"The Click Team", "acntID": "591094027720147","trackCommerce": false},   
  ]
 }, 
  "isCanadaMadonnaFlyawayPage": {rules: [{"expDate": "2023-06-30", "owner":"Warner Music Canada", "acntID": "1222156408489392","trackCommerce": false}]},
  "isFranceConnectPages": {rules: [{"expDate": "", "owner":"Warner Music France", "acntID": "4010123582640504","trackCommerce": false}]},    
  "isLabelAtlantic": {
  rules: [
   {"expDate": "", "owner":"ATL US", "acntID": "437263696447236","trackCommerce": false},   
  ]
 },  
  "isLabelWarnerAustralia": {
  rules: [{"expDate": "", "owner":"Warner Music Australia", "acntID": "408764485979609","trackCommerce": false},
 ]
},
  "isLabelElektra": {
  rules: [
   {"expDate": "", "owner":"Elektra", "acntID": "412816479293706","trackCommerce": false},   
  ]
 },
  "isWarnerCanadaHiphop50Page": {
  rules: [
   {"expDate": "2023-09-01", "owner":"Warner Music Canada", "acntID": "3398274723756729","trackCommerce": false},  
  ]
 },
 "isWarnerConnectCanadaCampaign": {
  rules: [
   {"expDate": "", "owner":"Warner Music Canada", "acntID": "251274508569401","trackCommerce": false},  
  ]
 },
  "isWarnerCanadaMotherMotherGriefChapterBonusEntry": {
  rules: [
   {"expDate": "", "owner":"Warner Music Canada", "acntID": "251274508569401","trackCommerce": false},  
  ]
 },   
  "isLabelWarnerNashville": {
  rules: [
   {"expDate": "", "owner":"Warner Music Nashville", "acntID": "1055261007874309","trackCommerce": false},  
  ]
 },      
  "isLabelWarnerRecords": {
  rules: [
   {"expDate": "", "owner":"Warner Records", "acntID": "282641428553005","trackCommerce": false},  
   {"expDate": "", "owner":"Warner Music Australia", "acntID": "408764485979609","trackCommerce": false}, 
  ]
 },  
  "isLabelRhino": {
  rules: [
   {"expDate": "", "owner":"Rhino", "acntID": "668980723483661","trackCommerce": false},
   {"expDate": "", "owner":"Rhino", "acntID": "758542727565427","trackCommerce": false},
   {"expDate": "", "owner":"Warner Music Australia", "acntID": "408764485979609","trackCommerce": false}, 
  ]
 },   
  "isLigabueGenerator": {
  rules: [
   {"expDate": "", "owner":"Warner Music Italy", "acntID": "448863798629056","trackCommerce": false},   
  ]
 },
    "isAustraliaConnectPages": {
  rules: [
   {"expDate": "", "owner":"Warner Music Australia", "acntID": "408764485979609","trackCommerce": false},   
  ]
 },
  "isWarnerRussiaTrackedSite": {
  rules: [
   {"expDate": "", "owner":"Warner Music Russia", "acntID": "344727542366642","trackCommerce": false},  
  ]
 }, 
  "isLabelWarnerSpain": {
  rules: [
   {"expDate": "", "owner":"Warner Music Spain", "acntID": "837944149591094","trackCommerce": false},  
  ]
 }, 
  "isLabelWarnerBenelux": {
  rules: [
   {"expDate": "", "owner":"Warner Music Benelux", "acntID": "517891198414848","trackCommerce": false},  
  ]
 },
  "isWMCABoogieMerchSweeps": {rules: [{"expDate": "2024-02-29", "owner":"Warner Music Canada", "acntID": "251274508569401","trackCommerce": false}]},    
  "isWarnerConnectBensonBooneSingapore": {rules: [{"expDate": "2023-07-31", "owner":"Forward 3D HK Limited", "acntID": "3429858450664094","trackCommerce": false}]},    
  "isWarnerConnectBensonBooneMalaysia": {rules: [{"expDate": "2023-07-31", "owner":"Forward 3D HK Limited", "acntID": "3429858450664094","trackCommerce": false}]},    
  "isWarnerConnectBensonBooneThailand": {rules: [{"expDate": "2023-07-31", "owner":"Forward 3D HK Limited", "acntID": "3429858450664094","trackCommerce": false}]},    
  "isWarnerConnectBensonBooneIndonesia": {rules: [{"expDate": "2023-07-31", "owner":"Forward 3D HK Limited", "acntID": "3429858450664094","trackCommerce": false}]},    
   "isWarnerSandboxPage": {
  rules: [
   {"expDate": "", "owner":"WMI", "acntID": "1197906564326960","trackCommerce": false},  
  ]
 }, 
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var qcGlobalRules = [
 // {"expDate": "","owner":"WMG","acntID":"p-73t-O7FWprUTo"},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var qcDomainBasedRules = {};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var qcConditionBasedRules = {};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var vzGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var vzDomainBasedRules = {
'officialbirdy': {rules:[{'expDate': '2021-12-31','owner':'Seven Stars','acntID':'10150618'}]},
'warnermusic.se': {rules:[{'expDate': '','owner':'Warner Music Sweden','acntID':'10067062'}]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var vzConditionBasedRules = {};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var ttGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var ttDomainBasedRules = {
'austinsnell': {rules:[{'expDate': '2026-06-15','owner':'Peachtree Ent','acntID':'CSHSTEBC77U6ERKKG6CG'}]},    
'baileyzimmermanmusic': {rules:[{'expDate': '2023-09-19','owner':'WAVO','acntID':'CCHQE2BC77U42CKVF3UG'},
                                {'expDate': '2026-03-07','owner':'Peachtree Ent','acntID':'CT87UB3C77U9L9BMNP9G'},
                               {'expDate': '2026-04-26','owner':'AEG Presents','acntID':'CPJR80RC77U5SPBHJF30'}]},
'bensonboone': {rules:[{'expDate': '2025-06-20','owner':'AEG Presents','acntID':'C2T72MSAJ6IAHR393GU0'}]},
'brandyclarkmusic': {rules:[{'expDate': '2027-07-06','owner':'Gellman Management LLC','acntID':'D92IMJBC77U9DNPPPQ2G'}]},
'covernation': {rules:[{'expDate': '','owner':'WMG - O&O','acntID':'C0HA6DKP76SVVJ0US5CG'}]},
'dualipa': {rules:[{'expDate': '2024-11-11','owner':'Seven Stars','acntID':'CDD62UBC77UDIEHUNVQG'},]},  
//'rhino': {rules:[{'expDate': '','owner':'WMG - O&O','acntID':'CG89RJ3C77U573C8RUPG'}]},
'edsheeran': {rules:[{'expDate': '2026-05-03','owner':'AEG Presents','acntID':'C2T72MSAJ6IAHR393GU0'}]},    
'euromusictrip': {rules:[{'expDate': '','owner':'WMAS','acntID':'C9FCRNRC77U12DDTI4JG'}]},
'gavinadcockmusic': {rules:[{'expDate': '2025-12-31','owner':'AEG Presents','acntID':'CPJR80RC77U5SPBHJF30'},
                           {'expDate': '2027-06-08','owner':'Ad Parlor','acntID':'D75BK63C77UBIUFTU3F0'}]},
'highwayhomeofficial': {rules:[{'expDate': '2026-12-01','owner':'Peachtree Ent','acntID':'CSH5MGJC77UAC5GFFCKG'}]},      
'hudsonwestbrook': {rules:[{'expDate': '2026-03-09','owner':'Peachtree Ent','acntID':'CT87UB3C77U9L9BMNP9G'}]},      
'laurendaigle': {rules:[{'expDate': '2024-03-11','owner':'AEG Presents','acntID':'C2T72MSAJ6IAHR393GU0'}]},
'mattmaeson': {rules:[{'expDate': '2025-07-01','owner':'Matt Maeson, Inc.','acntID':'CQL5P73C77UE89C5MPV0'}]},
'redferrin': {rules:[{'expDate': '2025-12-31','owner':'AEG Presents','acntID':'CPJR80RC77U5SPBHJF30'}]},
'royalbloodband': {rules:[{'expDate': '2023-06-23','owner':'Deviate Digital','acntID':'CAJGKPRC77U4QM345EU0'}]},
'teddyswims': {rules:[{'expDate': '2027-04-10','owner':'AEG Presents','acntID':'C2T72MSAJ6IAHR393GU0'}]},
'theamericandreamiskillingme': {rules:[{'expDate': '2024-09-29','owner':'Live Nation','acntID':'CKAOEH3C77U2JMMIP2V0'}]},
'thecamwhitcomb': {rules:[{'expDate': '2026-04-30','owner':'AEG Presents','acntID':'CPJR80RC77U5SPBHJF30'}]}, 
'thecreekersband': {rules:[{'expDate': '2026-12-31','owner':'Peachtree Ent','acntID':'CSRC30JC77U450RN10MG'},]},
'thesnuts': {rules:[{'expDate': '2023-08-20','owner':'Parlophone','acntID':'CBC248BC77U9N02IH7SG'}]},
'twentyonepilots': {rules:[{'expDate': '2025-03-27','owner':'Live Nation Australia','acntID':'C7TL6UF6ARQ7U6A0TFL0'},
                    {'expDate': '2025-03-27','owner':'Live Nation New Zealand','acntID':'C7SV8K39OPOOJ4K42FCG'}]},
'warrenzeiders': {rules:[{'expDate': '2025-11-22','owner':'AEG Presents','acntID':'C2T72MSAJ6IAHR393GU0'}]},
'willowavalonmusic': {rules:[{'expDate': '2026-04-30','owner':'AEG Presents','acntID':'CPJR80RC77U5SPBHJF30'}]},      
//'goldenfeatures': {rules:[{'expDate': '2023-07-07','owner':'Ninja Tune HQ','acntID':'BTRMSS8RQH54JI5RHF80'}]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var ttConditionBasedRules = {
'isBiffyClyroEuroTourWarnerConnectPage':{rules:[{'expDate':'2023-09-25','owner':'WMAS','acntID':'CC3P9BJC77UFTO4NJV9G'}]},
'isCanadaMadonnaFlyawayPage':{rules:[{'expDate':'2023-06-30','owner':'Warner Music Canada','acntID':'CHR4FURC77UFB57TE9C0'}]},
'isHouseOfKong':{rules:[{'expDate': '2026-05-20','owner':'SINE Digital','acntID':'CVUIC6RC77U4UUTUM3NG'}]},    
'isPetShopBoysDreamworldWarnerConnectPage':{rules:[{'expDate':'2024-02-27','owner':'WMX','acntID':'CFU97FJC77U92D2F62O0'}]}, 
'isOfenbachWarnerConnectPage': {rules:[{'expDate': '','owner':'WMAS','acntID':'C8BNST0B3BVP1792BED0'}]},
'isNewOrderBundleWarnerConnectPage': {rules:[{'expDate': '2023-09-23','owner':'WMAS','acntID':'CC29G3JC77U26CFASM0G'}]},
'isNewOrderWarnerConnectPage': {rules:[{'expDate': '','owner':'WMAS','acntID':'C9A2JR3C77U12DDT9JKG'}]},
'isGriffWarnerConnectPage': {rules:[{'expDate': '','owner':'WMAS','acntID':'C9L9I1BC77UDNJM2EHV0'}]},
'isTapBonnarooTikTokCampaign' : {rules:[{'expDate': '','owner':'WMAS','acntID':'C9TU8NRC77U4F2PS30AG'}]},
'isWarnerSandboxPage':{rules:[{'expDate':'2023-08-01','owner':'WMI','acntID':'CBHRNMJC77UFMFRPP0V0'}]},
'isWarnerConnectAyaParisPage':{rules:[{'expDate':'2023-04-22','owner':'WMX','acntID':'CGDN7TRC77U734TI2P60'}]}, 
'isWarnerConnectCharlieUSGPresavePage':{rules:[{'expDate':'2022-08-28','owner':'WMI','acntID':'C9UF3MJC77U07L7Q8GF0'}]},
'isWarnerConnectBubleF2WPage':{rules:[{'expDate':'','owner':'WMX','acntID':'CG7HI7RC77UCLSGQPOCG'}]},
'isWarnerConnectNLEChoppaPresavePage':{rules:[{'expDate':'2023-04-15','owner':'WMAS','acntID':'CG7OIC3C77U573C8PH70'}]},
'isWarnerConnectBurnaBoyF2WPage':{rules:[{'expDate':'2023-05-14','owner':'WMAS','acntID':'CGSO2QBC77U6U2VB2JHG'}]},
'isWarnerConnectBensonBooneSingapore': {rules: [{'expDate': '2023-07-31', 'owner':'Forward 3D HK Limited', 'acntID':'CHQPT4RC77UBJAEBAJR0'}]},  
'isWarnerConnectBensonBooneMalaysia': {rules: [{'expDate': '2023-07-31', 'owner':'Forward 3D HK Limited', 'acntID':'CHQPONRC77U0O25EORGG'}]},
'isWarnerConnectBensonBooneThailand': {rules: [{'expDate': '2023-07-31', 'owner':'Forward 3D HK Limited', 'acntID':'CHQQ1GBC77U0O25EORPG'}]},  
'isWarnerConnectBensonBooneIndonesia': {rules: [{'expDate': '2023-07-31', 'owner':'Forward 3D HK Limited', 'acntID':'CHQQ3IRC77U8RIVT3CEG'}]},
'isWarnerConnectAndLabelWarnerSpain':{rules:[{'expDate':'','owner':'WMI','acntID':'CCKUF2JC77U42CKVJTU0'},
                                            {'expDate':'','owner':'WMI','acntID':'C9UF3MJC77U07L7Q8GF0'}]},
'isLabelWarnerSpain':{rules:[{'expDate':'','owner':'WMI','acntID':'CCM3QU3C77U2DQ2A6VB0'},
                            {'expDate':'','owner':'WMI','acntID':'C9UF3MJC77U07L7Q8GF0'}]},
'isLabelWarnerGermany': {rules:[{'expDate': '','owner':'Warner Music Germany','acntID':'CJRF30BC77U5TJETPHR0'}]},
};
/* Rules: "expDate" - leave it "" if there is no expiration*/
var dcGlobalRules = [];
/* Rules: 
1. "expDate" - leave it "" if there is no expiration
2. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var dcDomainBasedRules = {
  'baileyzimmermanmusic':{rules:[{'expDate': '2026-04-26','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Bailey Zimmerman]','u18':'[www.baileyzimmermanmusic.com]','u19':'[music]','u20':'[Country]','u8':'[Bailey Zimmerman]'},]},
  'bensonboone':{rules:[{'expDate': '2025-06-20','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Benson Boone]','u18':'[www.bensonboone.com]','u19':'[music]','u20':'[Pop]','u8':'[Benson Boone]'},]},
  'biffyclyro':{rules:[{'expDate': '2020-09-10','owner': 'Seven Stars','acntID': 'DC-4978543','groupTag': 'homep0','tag': 'biffy0'},]},
  'brandyclarkmusic':{rules:[{'expDate': '2024-07-29','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Brandy Clark]','u18':'[www.brandyclarkmusic.com]','u19':'[music]','u20':'[country]','u8':'[Brandy Clark]'},]},
  'officialprincemusic':{rules:[{'expDate': '2020-09-21','owner': 'Ciceron','acntID': 'DC-6236743','groupTag': 'remark','tag': 'wbr_p000'},]},
  'charlieputh':{rules:[{'expDate': '2023-09-15','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'charl0'},]},
  'edsheeran':{rules:[{'expDate': '2026-05-03','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg'},]},
  'coleswindell':{rules:[{'expDate': '2024-08-01','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'coles0'},]},
  'gavinadcockmusic':{rules:[{'expDate': '2026-09-16','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Gavin Adcock]','u18':'[www.gavinadcockmusic.com]','u19':'[music]','u20':'[Country]','u8':'[Gavin Adcock]'},]},
  'grandsonmusic':{rules:[{'expDate': '2023-06-26','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[grandson]','u18':'[www.grandsonmusic.com]','u19':'[music]','u20':'[alternative]','u8':'[grandson]'},]},
  'illenium':{rules:[{'expDate': '2023-08-01','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard'},]},
  'mychemicalromance':{rules:[{'expDate': '2020-11-24','owner': 'AEG Presents','acntID': 'DC-6719212','groupTag': 'retarget','tag': 'bruno001'},]},
  'officialkaleo':{rules:[{'expDate': '2020-12-13','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg'},]},
  'foals':{rules:[{'expDate': '2020-12-31','owner': 'Ciceron','acntID': 'DC-6236743','groupTag': 'remark','tag': 'wbr_f0'},]},
  'dead':{rules:[{'expDate': '2021-06-05','owner': 'Ciceron','acntID': 'DC-6639188','groupTag': 'rem','tag': 'rhino000'},]},
  'ingridandress':{rules:[{'expDate': '2021-11-09','owner': 'AEG Presents','acntID': 'DC-6719212','groupTag': 'retarget','tag': 'retarg0'},]},
  'blakeshelton':{rules:[{'expDate': '2025-04-30','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Blake Shelton]','u18':'[blakeshelton.com]','u19':'[music]','u20':'[country]','u8':'[Blake Shelton]'},]},
  'vancejoy':{rules:[{'expDate': '2022-05-18','owner': 'Liberation Records','acntID': 'DC-6737146','groupTag': 'allpa0','tag': 'lp21rema'},
                     {'expDate': '2023-06-12','owner': 'Millmaine Entertainment','acntID': 'DC-4830101','groupTag': 'retarget','tag': 'retarg'}]},
  'benplattmusic':{rules:[{'expDate': '2022-07-01','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg'},]},
  'laurendaigle':{rules:[{'expDate': '2024-03-11','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Lauren Daigle]','u18':'[laurendaigle.com]','u19':'[music]','u20':'[Christian]','u8':'[Lauren Daigle]'},]},
  'morganevansmusic':{rules:[{'expDate': '2023-09-30','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Morgan Evans]','u18':'[morganevansmusic.com]','u19':'[music]','u20':'[country]','u8':'[Morgan Evans]'},]},
  'wallowsmusic':{rules:[{'expDate': '2022-09-28','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0'},]},
  'ovosound':{rules:[{'expDate': '2023-04-07','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard'},]},
  'officialgriff':{rules:[{'expDate': '2024-09-30','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard'},]},
  'olivertreemusic':{rules:[{'expDate': '2024-02-17','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'olive0'},]},
  'portugaltheman':{rules:[{'expDate': '2022-08-26','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0'},]},
  'redferrin':{rules:[{'expDate': '2025-12-31','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Redferrin]','u18':'[www.redferrin.com]','u19':'[music]','u20':'[Country]','u8':'[Redferrin]'},]},
  'riconastymusic':{rules:[{'expDate': '2026-06-09','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Rico Nasty]','u18':'[riconastymusic.com]','u19':'[music]','u20':'[hip hop]','u8':'[Rico Nasty]'},]},
  'rufusdusol':{rules:[{'expDate': '2023-09-01','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'rufus0'},]},
  'sombrmusic':{rules:[{'expDate': '2027-01-28','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Sombr]','u18':'[www.sombrmusic.com]','u19':'[music]','u20':'[pop]','u8':'[Sombr]'},]},
  'jessiejamesdecker':{rules:[{'expDate': '2022-06-05','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0'},]},
  'brunomars':{rules:[{'expDate': '2022-09-01','owner': 'Ticketek Pty Ltd','acntID': 'DC-5164505','groupTag': 'retar0','tag': 'au20200e'},]},
  'muse':{rules:[{'expDate': '2023-04-20','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard'},]},
  'teddyswims':{rules:[{'expDate': '2027-04-10','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Teddy Swims]','u18':'[www.teddyswims.com]','u19':'[music]','u20':'[r&b]','u8':'[Teddy Swims]'},]},
  'thebandcamino':{rules:[{'expDate': '2023-07-23','owner':'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[The Band Camino]','u18':'[thebandcamino.com]','u19':'[Music]','u20':'[Alternative Rock]','u8':'[The Band Camino]'},]},
  'theamericandreamiskillingme':{rules:[{'expDate': '2024-09-29','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'green0+standard'},]},
  'jmonae':{rules:[{'expDate': '2024-05-30','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'janel0'},]},
  'thecamwhitcomb':{rules:[{'expDate': '2026-04-30','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Cameron Whitcomb]','u18':'[www.thecamwhitcomb.com]','u19':'[music]','u20':'[Country]','u8':'[Cameron Whitcomb]'},]},
  'twentyonepilots':{rules:[{'expDate': '2024-11-29','owner': 'Live Nation','acntID': 'DC-10536747','groupTag': 'rtg','tag': 'twent0'},]},
  'warrenzeiders':{rules:[{'expDate': '2025-11-22','owner':'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Warren Zeiders]','u18':'[warrenzeiders.com]','u19':'[Music]','u20':'[Country]','u8':'[Warren Zeiders]'},]},
  'willowavalonmusic':{rules:[{'expDate': '2026-04-30','owner': 'AEG Presents','acntID': 'DC-9382130','groupTag': 'retarget','tag': 'retarg0+standard','custom':true,'u1':'[Willow Avalon]','u18':'[www.willowavalonmusic.com]','u19':'[music]','u20':'[Country]','u8':'[Willow Avalon]'},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
var dcConditionBasedRules = {
'isHouseOfKong':{rules:[{'expDate': '2026-05-21','owner': 'SINE Digital','acntID': 'DC-15454585','groupTag': 'pagev_0','tag': 'grlz_0'},]},
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var fxGlobalRules = [
 // {"expDate": "","owner":"","acntID":""},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var fxDomainBasedRules = {
"warnerchappellpm": {rules:[{"expDate": "","owner":"WCM","acntID":"20006","trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var fxConditionBasedRules = {
// "isServerUproxxSite": {rules:[{"expDate": "","owner":"UPROXX","acntID":"8430760","trackCommerce":false},]},
};
// Used for accounts that should fire on ALL websites with no specific conditions
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "IPAnonym" - set to "true" if needed otherwise leave ""
*/
var gaGlobalRules = [];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "IPAnonym" - set to "true" if needed otherwise leave ""
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var gaDomainBasedRules = {
  "artistsunfold": {rules: [{"expDate": "","owner": "Warner Music Benelux","acntID": "UA-163215254-1","IPAnonym": "","trackClicks": ""}]},
  "ashleymcbryde": {rules: [{"expDate": "2025-02-28","owner": "Q Prime","acntID": "G-4Q98DQMEE0","IPAnonym": "","trackClicks": "true"}]},  
  "auth.wmgconnect.com": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-16","IPAnonym": "","trackClicks": "true"}]},
  "campaigns.wmgconnect.com": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-18","IPAnonym": "","trackClicks": ""}]},
  "coolaccidents": {rules: [{"expDate": "","owner": "Warner Music Australia","acntID": "UA-102101686-1","IPAnonym": "","trackClicks": ""}]},
  "covernation": {rules: [{"expDate": "","owner": "WMG - O&O","acntID": "G-PCYVFL7KJ2","IPAnonym": "","trackClicks": ""}]},
  "disturbed1": {rules: [{"expDate": "2023-07-31","owner": "Q Prime","acntID": "G-YBK5RKHZF8","IPAnonym": "","trackClicks": ""}]},
  "dualipaclubfn.warnermusicasia.com": {rules: [{"expDate": "","owner": "Warner Music Asia","acntID": "UA-88221857-19","IPAnonym": "","trackClicks": ""}]},
  "foyvance": {rules: [{"expDate": "2022-03-31","owner": "Foundations","acntID": "UA-32982459-12","IPAnonym": "","trackClicks": ""}]},
  "fpt.fm": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-10","IPAnonym": "","trackClicks": ""}]},
  "ilikeyouroldstuff": {rules: [{"expDate": "","owner": "Warner Music Australia","acntID": "UA-102096592-1","IPAnonym": "","trackClicks": ""}]},
  "imgn.media": {rules: [{"expDate": "","owner": "IMGN Media","acntID": "UA-115654631-1","IPAnonym": "","trackClicks": ""}]},
  "insights.wmgconnect.com": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-21","IPAnonym": "","trackClicks": ""}]},
  "joshgroban": {rules: [{"expDate": "2021-06-30","owner": "Tour D Force","acntID": "UA-175908825-1","IPAnonym": "","trackClicks": "true"}]},
  "joshuatbassett": {rules: [{"expDate": "2022-10-13","owner": "Foundations Music Management","acntID": "UA-32982459-46","IPAnonym": "","trackClicks": ""}]},
  "levelmusic": {rules: [{"expDate": "","owner": "ADA","acntID": "G-2482XEK2QF","IPAnonym": "","trackClicks": ""}]},
  "madelineedwardsmusic": {rules: [{"expDate": "2023-10-05","owner": "mTheory","acntID": "G-5DC7LGFB33","IPAnonym": "","trackClicks": ""}]},
  "maniacsonline": {rules: [{"expDate": "","owner": "Warner Music Australia","acntID": "UA-102096592-2","IPAnonym": "","trackClicks": ""}]},
  "mattmaeson": {rules: [{"expDate": "2025-07-01","owner": "Matt Maeson, Inc.","acntID": "G-8FHSLRB1CN","IPAnonym": "","trackClicks": ""}]},
  "motionlessinwhite": {rules: [{"expDate": "2022-08-31","owner": "King Friday XIII, Inc.","acntID": "UA-147977941-1","IPAnonym": "","trackClicks": ""}]},
  "needtobreathe": {rules: [{"expDate": "2022-08-17","owner": "Foundations","acntID": "UA-32982459-26","IPAnonym": "","trackClicks": ""}]},
  "nma-wmf": {rules: [{"expDate": "","owner": "Warner Music France","acntID": "G-45WQMH99TE","IPAnonym": "","trackClicks": ""}]},
  "nonesuch": {rules: [{"expDate": "","owner": "Nonesuch Records","acntID": "UA-2530838-55","IPAnonym": "","trackClicks": "true"}]},
  "notifier.wmgconnect.com": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-19","IPAnonym": "","trackClicks": ""}]},
  "pabloalboran.es": {rules: [{"expDate": "","owner": "Warner Music Spain","acntID": "UA-54620473-1","IPAnonym": "","trackClicks": "true"}]},
  "playlists.net": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-1","IPAnonym": "","trackClicks": ""}]},
  "rickymontgomery": {rules: [{"expDate": "2022-12-17","owner": "Foundations Music Management","acntID": "G-VDX7KKTGBP","IPAnonym": "","trackClicks": "true"}]},
  "royalbloodband": {rules: [{"expDate": "2022-02-03","owner": "Wildlife Entertainment","acntID": "UA-188664773-1","IPAnonym": "","trackClicks": ""}]},
  "stonesour": {rules: [{"expDate": "2024-01-25","owner": "5B Artist + Media, LLC","acntID": "G-EELL5QT7ET","IPAnonym": "","trackClicks": "true"}]},
  "theamericandreamiskillingme": {rules: [{"expDate": "2024-09-29","owner": "Crush Management","acntID": "G-T1WSCJ6G0Y","IPAnonym": "","trackClicks": "true"}]},
  "theregrettes": {rules: [{"expDate": "2024-01-09","owner": "Q Prime","acntID": "G-662NB62PZG","IPAnonym": "","trackClicks": "true"}]},
  "thisisdig": {rules: [{"expDate": "","owner": "WMI","acntID": "G-06M4PX1LSZ","IPAnonym": "","trackClicks": ""}]},  
  "tools.wmgconnect.com": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-17","IPAnonym": "","trackClicks": ""}]},
  "topsify": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "UA-21138983-9","IPAnonym": "","trackClicks": ""}]},
  "trivium": {rules: [{"expDate": "2024-01-25","owner": "5B Artist + Media, LLC","acntID": "G-01G8HTMDTL","IPAnonym": "","trackClicks": "true"}]},
  "vanesamartin7.es": {rules: [{"expDate": "","owner": "Warner Music Spain","acntID": "UA-54899090-25","IPAnonym": "","trackClicks": "true"}]},
  "vertigo.pabloalboran.es": {rules: [{"expDate": "","owner": "Warner Music Spain","acntID": "UA-54620473-11","IPAnonym": "","trackClicks": "true"}]},
  "vertigoenlasalturas": {rules: [{"expDate": "","owner": "Warner Music Spain","acntID": "UA-54620473-12","IPAnonym": "","trackClicks": "true"}]},
  "uk.warnerchappellpm.com": {rules: [{"expDate": "","owner": "Warner Chappell","acntID": "G-MSGFY4GBZR","IPAnonym": "","trackClicks": "true"}]},
  "de.warnerchappellpm.com": {rules: [{"expDate": "","owner": "Warner Chappell","acntID": "G-S0V7L3TN4R","IPAnonym": "","trackClicks": "true"}]},
  "fr.warnerchappellpm.com": {rules: [{"expDate": "","owner": "Warner Chappell","acntID": "G-54W5MH7XYZ","IPAnonym": "","trackClicks": "true"}]},
  "es.warnerchappellpm.com": {rules: [{"expDate": "","owner": "Warner Chappell","acntID": "G-25FWXRJKK8","IPAnonym": "","trackClicks": "true"}]},
  "warnermusic.co.za": {rules: [{"expDate": "","owner": "Warner Music South Africa","acntID": "UA-106403716-1","IPAnonym": "","trackClicks": ""}]},
  "warnermusic.com.au": {rules: [{"expDate": "","owner": "Warner Music Australia","acntID": "G-1NHKGY3JQB","IPAnonym": "","trackClicks": "true"}]},
  "warnermusic.ie": {rules: [{"expDate": "","owner": "Warner Music Ireland","acntID": "UA-107216093-1","IPAnonym": "","trackClicks": ""}]},
  "warnermusicfollow.nl": {rules: [{"expDate": "","owner": "Warner Music Netherlands","acntID": "UA-147618841-1","IPAnonym": "","trackClicks": ""}]},
  "wct.live": {rules: [{"expDate": "","owner": "Warner Connect","acntID": "G-392522811","IPAnonym": "","trackClicks": ""}]},
  "wearethepit": {rules: [{"expDate": "","owner": "WMG - O&O","acntID": "UA-134834197-1","IPAnonym": "","trackClicks": "true"},
                         {"expDate": "","owner": "WMG - O&O","acntID": "G-99N7NV9JT1","IPAnonym": "","trackClicks": "true"}]},
  "wizkhalifa": {rules: [{"expDate": "2020-07-31","owner": "Taylor Gang Entertainment","acntID": "UA-48362775-6","IPAnonym": "","trackClicks": ""}]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
var gaConditionBasedRules = {
"isWarnerChappellProductionMusicWWW": {rules: [{"expDate": "","owner": "Warner Chappell","acntID": "G-E3XNS55VZE","IPAnonym": "","trackClicks": "true"}]},  
"isLabelWarnerGermany": {
  rules: [{"expDate": "", "owner": "Warner Music Germany", "acntID": "UA-26900561-96", "IPAnonym": "true", "trackClicks": "true"},
   {"expDate": "", "owner": "Warner Music Germany", "acntID": "UA-26900561-97", "IPAnonym": "true", "trackClicks": "true"},
   {"expDate": "", "owner": "Warner Music Germany", "acntID": "G-K0K19TQXQC", "IPAnonym": "true", "trackClicks": "true"},       
   {"expDate": "", "owner": "Warner Music Germany", "acntID": "UA-26900561-100", "IPAnonym": "true", "trackClicks": "true"}]},
"isServerUproxxSite": {rules: [{"expDate": "","owner": "UPROXX","acntID": "G-NBY06PC4X6","IPAnonym": "","trackClicks": "true"}]},  
"isLabelWarnerFinland": {
  rules: [{"expDate": "", "owner": "Warner Music Finland", "acntID": "UA-85537233-1", "IPAnonym": "", "trackClicks": ""}]},
"isLabelWarnerCanada": {
  rules: [{"expDate": "", "owner": "Warner Music Canada", "acntID": "UA-28322484-15", "IPAnonym": "true", "trackClicks": "true"},
   {"expDate": "", "owner": "Warner Music Canada", "acntID": "UA-28322484-64", "IPAnonym": "true", "trackClicks": "true"},
   {"expDate": "", "owner": "Warner Music Canada", "acntID": "G-XNWYQLKEEF", "IPAnonym": "true", "trackClicks": "true"}]},
"isLabelWarnerNewZealand": {
  rules: [{"expDate": "", "owner": "Warner Music New Zealand", "acntID": "UA-182336341-1", "IPAnonym": "", "trackClicks": ""}]},
"isLabelWarnerAustralia": {
  rules: [{"expDate": "", "owner": "Warner Music Australia", "acntID": "UA-102171525-42", "IPAnonym": "", "trackClicks": "true"},
   {"expDate": "", "owner": "Warner Music Australia", "acntID": "UA-102171525-41", "IPAnonym": "", "trackClicks": "true"}]},
"isLabelWarnerSpain": {
  rules: [{"expDate": "", "owner": "Warner Music Spain", "acntID": "UA-54899090-1", "IPAnonym": "", "trackClicks": "true"},
         {"expDate": "", "owner": "Warner Music Spain", "acntID": "G-YRW6J2Q5VT", "IPAnonym": "", "trackClicks": "true"}]},
};
/* Rules: "expDate" - leave it "" if there is no expiration*/
var awGlobalRules = [
   /*{
    "expDate": "2020-07-31",
    "owner": "Warner Music Germany",
    "acntID": "26900561"
   },
   {
    "expDate": "",
    "owner": "",
    "acntID": ""
   },*/
];
/* Rules: 
1. "expDate" - leave it "" if there is no expiration
2. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var awDomainBasedRules = {
'austinsnell': {rules: [{'expDate': '2026-06-15', 'owner': 'Peachtree Ent', 'acntID': 'AW-16768414658'},]},  
'benplattmusic': {rules: [
  {'expDate': '2022-07-01', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},
  {'expDate': '2022-07-01', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'},]},
'baileyzimmermanmusic': {rules:[{'expDate': '2023-09-19','owner':'WAVO','acntID':'AW-720389650'},
                                {'expDate': '2026-03-07','owner':'Peachtree Ent','acntID':'AW-16709244362'},
                               {'expDate': '2026-04-26', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Bailey Zimmerman'}]},
'bensonboone': {rules: [{'expDate': '2025-06-20', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'Pop','artistname':'Benson Boone'}]},         
'biffyclyro': {rules: [{'expDate': '2020-09-30', 'owner': 'Nostromo', 'acntID': 'AW-735598385'},]},
'blakeshelton': {rules: [{'expDate': '2025-04-30', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'country','artistname':'Blake Shelton'},
                        {'expDate': '2025-02-15','owner':'Live Nation','acntID':'AW-821707117'}]},
'brandyclarkmusic': {rules: [{'expDate': '2024-07-29', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'country','artistname':'Brandy Clark'}]},       
'creepercon': {rules: [{'expDate': '2020-12-31', 'owner': 'Seven Stars', 'acntID': 'AW-693036365'},]},
'dead': {rules: [{'expDate': '2020-10-25', 'owner': 'Rhino', 'acntID': 'AW-708432579'},
                {'expDate': '2024-03-17', 'owner': 'WAVO', 'acntID': 'AW-11070687990'},]},
'dualipa': {rules: [{'expDate': '2020-12-31', 'owner': 'Gupta', 'acntID': 'AW-1011005779'},]},
'edsheeran': {rules: [
  {'expDate': '', 'owner': 'ATL US', 'acntID': 'AW-732919829'},
  {'expDate': '2022-08-06', 'owner': 'CMS Music Media', 'acntID': 'AW-1031663084'},
  {'expDate': '2026-05-03', 'owner': 'AEG Presents', 'acntID': 'AW-854631222','custom':true,'genre':'music','subgenre':'Pop','artistname':'Ed Sheeran'},
  {'expDate': '2026-05-03', 'owner': 'AEG Presents', 'acntID': 'AW-760537739','custom':true,'genre':'music','subgenre':'Pop','artistname':'Ed Sheeran'}]},
'fitzandthetantrums': {rules: [{'expDate': '2020-12-31', 'owner': 'Paradigm', 'acntID': 'AW-876737109'},]},
'foals': {rules: [{'expDate': '2022-10-28', 'owner': 'CMS Music Media', 'acntID': 'AW-1031663084'},]},
'gavinadcockmusic': {rules:[{'expDate': '2026-09-16', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Gavin Adcock'}]},
'goldenfeatures': {rules: [{'expDate': '2023-07-07', 'owner': 'Ninja Tune HQ', 'acntID': 'AW-965190572'},]},
'grandsonmusic': {rules: [{'expDate': '2023-06-26', 'owner': 'AEG Presents', 'acntID': 'AW-854631222','custom':true,'genre':'music','subgenre':'alternative','artistname':'grandson'}]},  
'hellohonne': {rules: [{'expDate': '2021-12-31', 'owner': 'CMS Music Media', 'acntID': 'AW-1031663084'},]},
'highwayhomeofficial': {rules: [{'expDate': '2026-12-01', 'owner': 'Peachtree Ent', 'acntID': 'AW-16768592926'},]},      
'hudsonwestbrook': {rules: [{'expDate': '2026-03-09', 'owner': 'Peachtree Ent', 'acntID': 'AW-16709244362'},]},    
'iamannemarie': {rules: [{'expDate': '2022-05-06', 'owner': 'CMS Music Media', 'acntID': 'AW-1031663084'},]},  
'illenium': {rules: [{'expDate': '2023-08-01', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'},]},  
'ingridandress': {rules: [
  {'expDate': '2021-11-09', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'},
  {'expDate': '2021-11-09', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},]},
'jessiejamesdecker': {rules: [{'expDate': '2022-06-05', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},]},
'laurendaigle': {rules: [{'expDate': '2024-03-11', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},
                        {'expDate': '2024-03-11', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'Christian','artistname':'Lauren Daigle'}]},   
'michaelbuble': {rules: [{'expDate': '2020-11-14', 'owner': 'Seven Stars', 'acntID': 'AW-779098424'},
  {'expDate': '2022-12-21', 'owner': 'Gupta Media', 'acntID': 'AW-1011005779'},]},
'monkees': {rules: [{'expDate': '', 'owner': 'Rhino', 'acntID': 'AW-1061469494'},]},
'morganevansmusic': {rules: [{'expDate': '2023-09-30', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'country','artistname':'Morgan Evans'}]},     
'mychemicalromance': {rules: [
  {'expDate': '2021-01-16', 'owner': 'SJM Concerts', 'acntID': 'AW-1031663084'},
  {'expDate': '2020-11-24', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'},]},
'muse':{rules: [
  {'expDate': '2022-09-15', 'owner': 'CMS Music Media', 'acntID': 'AW-1031663084'},
  {'expDate': '2023-04-20', 'owner': 'AEG Presents','acntID':'AW-854631222'},
  {'expDate': '2023-04-20', 'owner': 'AEG Presents','acntID':'AW-760537739'}]},
'needtobreathe': {rules: [{'expDate': '2022-06-11', 'owner': 'Foundations', 'acntID': 'AW-832733621'},]},
'officialgriff': {rules: [{'expDate': '2024-09-30', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},]},  
'officialkaleo': {rules: [{'expDate': '2020-12-13', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},]}, 
'ovosound': {rules: [{'expDate': '2023-04-07', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'},]},
'portugaltheman': {rules: [
  {'expDate': '2022-08-26', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},
  {'expDate': '2022-08-26', 'owner': 'AEG Presents', 'acntID': 'AW-854631222'}]},
'redferrin': {rules:[{'expDate': '2025-12-31', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Redferrin'}]},  
'riconastymusic': {rules: [{'expDate': '2026-06-09', 'owner': 'AEG Presents', 'acntID': 'AW-854631222','custom':true,'genre':'music','subgenre':'hip hop','artistname':'Rico Nasty'},
                          {'expDate': '2026-06-09', 'owner': 'AEG Presents', 'acntID': 'AW-760537739','custom':true,'genre':'music','subgenre':'hip hop','artistname':'Rico Nasty'}]},    
'rockschoolpodcast': {rules: [{'expDate': '', 'owner': 'WMG - O&O', 'acntID': 'AW-806576281'},]},
'royalbloodband': {rules: [{'expDate': '2021-06-30', 'owner': 'SJM Concerts', 'acntID': 'AW-1031663084'},]},
'rudimental': {rules: [{'expDate': '2021-07-18', 'owner': 'Seven Stars', 'acntID': 'AW-952224977'},]}, 
'sombrmusic':{rules: [{'expDate': '2027-01-28', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'pop','artistname':'sombr'}]}, 
'teddyswims': {rules: [{'expDate': '2027-04-10', 'owner': 'AEG Presents', 'acntID': 'AW-854631222', 'custom':true,'genre':'music','subgenre':'r&b','artistname':'Teddy Swims'},]},
'theamericandreamiskillingme': {rules: [{'expDate': '2024-10-11', 'owner': 'CMS Music Media Ltd', 'acntID': 'AW-1031663084','convLbl':'uJwTCMfGmecYEOzb9-sD'}]},    
'thebandcamino': {rules: [{'expDate': '2023-07-23', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Alternative Rock','artistname':'The Band CAMINO'},]},
'thecamwhitcomb': {rules:[{'expDate': '2026-04-30', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Cameron Whitcomb'}]},    
'thecreekersband': {rules:[{'expDate': '2026-12-31','owner':'Peachtree Ent','acntID':'AW-11406959899','convLbl':'gs9hCL6-kr0ZEJvKob8q'},]},
'twentyonepilots': {rules: [{'expDate': '2025-03-27', 'owner': 'Live Nation Australia', 'acntID': 'AW-644447657'},
                           {'expDate': '2025-03-27', 'owner': 'Live Nation New Zealand', 'acntID': 'AW-319118546'}]},  
'vancejoy': {rules: [{'expDate': '2022-02-17', 'owner': 'Liberation Records', 'acntID': 'AW-1007259279'},]}, 
'wallowsmusic': {rules: [{'expDate': '2022-09-28', 'owner': 'AEG Presents', 'acntID': 'AW-760537739'},]},
'warnermusicexperience': {rules: [{'expDate': '', 'owner': 'WMAS', 'acntID': 'AW-10806067350'},]},
'warrenzeiders': {rules: [{'expDate': '2025-11-22', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Warren Zeiders'},]},   
'willowavalonmusic': {rules:[{'expDate': '2026-04-30', 'owner': 'AEG Presents', 'acntID': 'AW-760537739', 'custom':true,'genre':'music','subgenre':'Country','artistname':'Cameron Whitcomb'}]},      
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
var awConditionBasedRules = {
  'isLabelWarnerRecords':{rules:[
    {'expDate': '','owner': 'Warner Records','acntID': 'AW-1015047010'},
    {'expDate': '','owner': 'Warner Music Australia','acntID': 'AW-1003568402'},
  ]},
  'isEMPGoogleAdWordsPixelAllowed':{rules:[
    {'expDate': '','owner': 'EMP','acntID': 'AW-718724791'},
  ]},
  'isLabelWarnerAustralia':{rules:[
    {'expDate': '','owner': 'Warner Music Australia','acntID': 'AW-1003568402'},
  ]},
  'isLabelRhino':{rules:[
    {'expDate': '','owner': 'Warner Music Australia','acntID': 'AW-1003568402'},
  ]},
   'isWMXContactSuccess':{rules:[
    {'expDate': '','owner': 'WMAS','acntID': 'AW-10806067350', 'convLbl': 'xnV3CK2a4YMDEJaB3qAo'},
  ]}
};
//{"expDate": "2021-12-31","owner":"WMAS","acntID":"c2be4e50-6beb-4713-97fe-556216d85f22","trackCommerce":false}
var snapGlobalRules = [
//{"expDate": "","owner":"","acntID":"","trackCommerce":false},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var snapDomainBasedRules = {
//"dualipa": {rules:[{"expDate": "2020-12-31","owner":"Gupta","acntID":"3fd4a69b-c6fd-49ce-be0f-3f9459b62435","trackCommerce":false},]},
"austinsnell": {rules:[{"expDate": "2026-06-15","owner":"Peachtree Ent","acntID":"41f910d9-b3a5-40e8-9820-0eb523ca5464","trackCommerce":false},]},    
"baileyzimmermanmusic": {rules:[{"expDate": "2026-03-07","owner":"Peachtree Ent","acntID":"e40df7cc-2798-491d-9824-105d62254ba8","trackCommerce":false},]},  
"edsheeran": {rules:[{"expDate": "2025-04-30","owner":"AEG Presents","acntID":"a7a227c1-0b44-4e48-84b7-f7f0223087f2","trackCommerce":false},]},
"highwayhomeofficial": {rules:[{"expDate": "2026-12-31","owner":"Peachtree Ent","acntID":"aeb028f4-011a-47ee-95bd-2e75cdc3417a","trackCommerce":false},]},  
"hudsonwestbrook": {rules:[{"expDate": "2026-03-09","owner":"Peachtree Ent","acntID":"e40df7cc-2798-491d-9824-105d62254ba8","trackCommerce":false},]},  
'thecreekersband': {rules:[{'expDate': '2026-12-31','owner':'Peachtree Ent','acntID':'a3985f88-9778-474a-962e-a0a3e150bd7c',"trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var snapConditionBasedRules = {
"isLabel3rdParty": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "0f320632-ca6a-4f6b-a380-0a151aa6c84f","trackCommerce": false},]},  
"isLabelAtlantic": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "c2be4e50-6beb-4713-97fe-556216d85f22","trackCommerce": false},]}, 
"isLabelElektra": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "12f8c09f-6c3d-4e8f-bdf0-72f43492ffc8","trackCommerce": false},]},
"isLabelRhino": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "4e40d34d-cf57-4ac4-9bea-82d695691898","trackCommerce": false},
         {"expDate": "", "owner":"Warner Music Australia", "acntID": "ba51f530-4694-444f-8443-600bff2a5ab6","trackCommerce": false},]},      
"isLabelWarnerNashville": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "030e7e07-9982-49bd-bab7-de94f2b53ea0","trackCommerce": false},]},  
"isLabelWarnerRecords": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "7dfe8a54-11f0-4536-aefc-dcabe0b83544","trackCommerce": false},
         {"expDate": "", "owner":"Warner Music Australia", "acntID": "ba51f530-4694-444f-8443-600bff2a5ab6","trackCommerce": false},]},  
"isLabelWarnerAustralia": {
  rules: [{"expDate": "", "owner":"Warner Music Australia", "acntID": "ba51f530-4694-444f-8443-600bff2a5ab6","trackCommerce": false},]},  
"isLabelWarnerCanada": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "920cc570-e64d-4ae2-b468-fa7f8f1a05f4","trackCommerce": false},]},
"isLabelWarnerInternational": {
  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "beb563a0-c9f8-4325-8821-7e492544fd58","trackCommerce": false},]},    
"isLabelWarnerSweden": {
  rules: [{"expDate": "", "owner":"Warner Music Sweden", "acntID": "1469d1bd-0084-420a-a9ac-d8848b79b9e6","trackCommerce": false},]}, 
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var adGlobalRules = [];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var adDomainBasedRules = {
"tompetty": {rules:[{"expDate": "2024-06-21","owner":"Big Machine Label Group","acntID":"139"},]}
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var adConditionBasedRules = {
//"isOwnedandOperatedSitesOTT": {rules:[{"expDate": "","owner":"WMX OTT","acntID":"679"},]},
//"isNotOwnedandOperatedSitesOTT":{rules:[{"expDate": "","owner":"WMX","acntID":"14"},]}
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var csGlobalRules = [
  {"expDate": "","owner":"","acntID":""},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var csDomainBasedRules = {
"wmx": {rules:[{"expDate": "2033-05-04","owner":"UPROXX","acntID":"8430760","trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var csConditionBasedRules = {
"isServerUproxxSite": {rules:[{"expDate": "","owner":"UPROXX","acntID":"8430760","trackCommerce":false},]},
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var parselyGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var parselyDomainBasedRules = {
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var parselyConditionBasedRules = {
  'isServerUproxxSite': {rules:[{'expDate': '','owner':'UPROXX','site':'uproxx.com'}]},
};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var hjGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var hjDomainBasedRules = {
'ashnikko': {rules:[{'expDate': '','owner':'Parlophone Records','acntID':'1878423'}]},
'biffyclyro': {rules:[{'expDate': '','owner':'Warner Records UK','acntID':'838776'}]},
'thisisdig': {rules:[{'expDate': '','owner':'Rhino UK','acntID':'1974058'}]},
'heatmap.elderbrookofficial.com': {rules:[{'expDate': '','owner':'Parlophone Records','acntID':'2002519'}]},
'muse.mu': {rules:[{'expDate': '','owner':'Warner Records UK','acntID':'838780'}]},
'warnerclassics': {rules:[{'expDate': '','owner':'Parlophone Records','acntID':'1407671'}]},
'campaigns.wmgconnect.com': {rules:[{'expDate': '','owner':'Warner Music Connect','acntID':'982731'}]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var hjConditionBasedRules = {};
//{"expDate": "2021-02-28","owner":"WAVO","acntID":"1024129180947932","trackCommerce":false}
var mmGlobalRules = [];
/* Rules: 
Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var mmDomainBasedRules = {
'wizkhalifa': {rules:[{'expDate': '2020-08-01','owner':'Live Nation','acntID':'936006'}]},
'kornofficial': {rules:[{'expDate': '2020-11-01','owner':'Live Nation','acntID':'936008'}]},
'thefrontbottoms': {rules:[{'expDate': '2020-11-27','owner':'Live Nation','acntID':'1467727'}]},
'theheadandtheheart': {rules:[{'expDate': '2020-12-01','owner':'Live Nation','acntID':'1123028'}]},
'disturbed1': {rules:[{'expDate': '2021-01-15','owner':'Live Nation','acntID':'892487'}]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var mmConditionBasedRules = {};
function twitterLogic(){
  var allRulesTW = arrayOfUniqueRules(getAllRulesTW());
  _satellite.notify("in TW all rules");
  if (allRulesTW.length > 0){
    initializeTwitterScript();
    allRulesTW.forEach(handleRuleTW);
  }
}
function handleRuleTW(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push("Twitter:" + rule.owner + ":" + rule.acntID);
  twq('init', rule.acntID);
  twq('track','PageView');
  if(rule.trackCommerce)
    trackCommerceTW(rule.acntID);
}
function trackCommerceTW(acntID){
 if (typeof paywall === "object") {
  var paywallData;
  paywall.on('payment', function(e, data) {
        paywallData = data;
        var totalPrice = paywallData.payment.amount;
        twttr.conversion.trackPid(acntID,  { tw_sale_amount: totalPrice, tw_order_quantity: 1});
      });
 }
}
function getAllRulesTW(){
  return twGlobalRules.concat(retrieveDomainBasedRulesTW(), retrieveConditionBasedRulesTW());
}
function retrieveDomainBasedRulesTW(){
  return retrieveDomainBased(twDomainBasedRules);
}
function retrieveConditionBasedRulesTW(){
  return retrieveConditionBased(twConditionBasedRules);
}
function initializeTwitterScript(){
 !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
 },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
 a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
}
function parselyLogic(){
  var allRulesParsely = arrayOfUniqueRules(getAllRulesParsely());
  if (allRulesParsely.length > 0)
    allRulesParsely.forEach(handleRuleParsely);
}
function handleRuleParsely(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('Parsely:' + rule.owner);
  var parselyconfigdiv = document.createElement('div');
      parselyconfigdiv.id = 'parsely-root';
      parselyconfigdiv.setAttribute('style','display: none');
  var parselyconfigspan = document.createElement('span');
      parselyconfigspan.id = 'parsely-cfg';
      parselyconfigspan.setAttribute('data-parsely-site',rule.site);
   document.head.appendChild(parselyconfigdiv);
   document.head.appendChild(parselyconfigspan);
    window.PARSELY = window.PARSELY || {
    autotrack: false,
    onload: function () {
      PARSELY.setConfigOptions({
        track_ip_addresses: false
      });
      PARSELY.beacon.trackPageView({
        url: location.href,
        urlref: document.referrer,
        js: 1
      });
    }
  };
  (function (s, p, d) {
    var h = d.location.protocol, i = p + "-" + s,
    e = d.getElementById(i), r = d.getElementById(p + "-root"),
    u = h === "https:" ? "d1z2jf7jlzjs58.cloudfront.net"
    : "static." + p + ".com";
    if (e) return;
    e = d.createElement(s);
    e.id = i;
    e.async = true;
    e.src = h + "//" + u + "/p.js";
    r.appendChild(e);
})("script", "parsely", document);
}
function getAllRulesParsely(){
  return parselyGlobalRules.concat(retrieveDomainBasedRulesParsely(), retrieveConditionBasedRulesParsely());
}
function retrieveDomainBasedRulesParsely(){
  return retrieveDomainBased(parselyDomainBasedRules);
}
function retrieveConditionBasedRulesParsely(){
  return retrieveConditionBased(parselyConditionBasedRules);
}
function tikTokLogic(){
  var allRulesTT = arrayOfUniqueRules(getAllRulesTT());
  if (allRulesTT.length > 0)
    allRulesTT.forEach(handleRuleTT);
}
function handleRuleTT(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('TikTok:' + rule.owner + ':' + rule.acntID);
  !function (w, d, t){
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load(rule.acntID);
    ttq.page();
  }(window, document, 'ttq');
  if (getDE('isHouseOfKongShows')) {
    ttq.track('ViewContent');}
}
function getAllRulesTT(){
  return ttGlobalRules.concat(retrieveDomainBasedRulesTT(), retrieveConditionBasedRulesTT());
}
function retrieveDomainBasedRulesTT(){
  return retrieveDomainBased(ttDomainBasedRules);
}
function retrieveConditionBasedRulesTT(){
  return retrieveConditionBased(ttConditionBasedRules);
}
//{"expDate": "2021-12-31","owner":"WMAS","acntID":"c2be4e50-6beb-4713-97fe-556216d85f22","trackCommerce":false}
var springServeGlobalRules = [
//{"expDate": "","owner":"","acntID":"","trackCommerce":false},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var springServeDomainBasedRules = {
//"warnermusic.com.au": {rules:[{"expDate": "","owner":"Warner Music Australia","acntID":"t2_51huhk9r","trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var springServeConditionBasedRules = {
"isOwnedandOperatedSitesOTT": {rules: [{"expDate": "", "owner":"WMX OTT", "hc":"23159614","segment_id":"13111"},]},     
};
function comscoreLogic(){
  var allRulesCS = arrayOfUniqueRules(getAllRulesCS());
  if (allRulesCS.length == 0){
    return;
  } else if (allRulesCS.length == 1) {
    // if only global rule exists, handle global rule
    handleRuleCS(allRulesCS[0])
  } else if (allRulesCS.length > 1) {
    // if any other condition/domain rule exists, run the last
    handleRuleCS(allRulesCS[allRulesCS.length-1])       
  }
}
function handleRuleCS(rule){
  if (rule.expDate != "" && !passDate(rule.expDate)){
    return;
  } else {
  s_dtm.pixelList.push("ComScore" + (rule.owner==""?"":(":" + rule.owner)) + (rule.acntID==""?"":(":" + rule.acntID)));
  var _comscore = _comscore || [];
  if (rule.acntID != ""){
    _comscore.push({ c1: "2", c2: rule.acntID});
      if (rule.owner=="UPROXX"){
        var content = 'var COMSCORE_ACCOUNT_ID = '+rule.acntID+';'
        var script = document.createElement('script');
        script.type = 'text/javascript'
        script.innerHTML = content;
        document.head.appendChild(script);}
  } else {
    _comscore.push({ c1: "2", c2: "3005648" });
  }
    (function() {
    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
  })();
}
}
function getAllRulesCS(){
  return csGlobalRules.concat(retrieveDomainBasedRulesCS(), retrieveConditionBasedRulesCS());
}
function retrieveDomainBasedRulesCS(){
  return retrieveDomainBased(csDomainBasedRules);
}
function retrieveConditionBasedRulesCS(){
  return retrieveConditionBased(csConditionBasedRules);
}
function verizonLogic(){
  var allRulesVZ = arrayOfUniqueRules(getAllRulesVZ());
  if (allRulesVZ.length > 0)
    allRulesVZ.forEach(handleRuleVZ);
}
function handleRuleVZ(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('Verizon Media:' + rule.owner + ':' + rule.acntID);
  (function(w,d,t,r,u){w[u]=w[u]||[];w[u].push({'projectId':'10000','properties':{'pixelId':rule.acntID}});
  var s=d.createElement(t);s.src=r;s.async=true;s.onload=s.onreadystatechange=function(){var y,rs=this.readyState,c=w[u];
  if(rs&&rs!="complete"&&rs!="loaded"){return}try{y=YAHOO.ywa.I13N.fireBeacon;w[u]=[];w[u].push=function(p){y([p])};y(c)}catch(e){}};
  var scr=d.getElementsByTagName(t)[0],par=scr.parentNode;par.insertBefore(s,scr)})(window,document,"script","https://s.yimg.com/wi/ytc.js","dotq");
  }
function getAllRulesVZ(){
  return vzGlobalRules.concat(retrieveDomainBasedRulesVZ(), retrieveConditionBasedRulesVZ());
}
function retrieveDomainBasedRulesVZ(){
  return retrieveDomainBased(vzDomainBasedRules);
}
function retrieveConditionBasedRulesVZ(){
  return retrieveConditionBased(vzConditionBasedRules);
}
var isSumCalculated = false;
var products = [], totalPrice = 0.0, owner, acntID, shouldTrackCommerce;
function snapLogic(){
  var allRulesSnap = arrayOfUniqueRules(getAllRulesSnap());
  _satellite.notify("in Snap all rules");
  if (allRulesSnap.length > 0){
    initializeSnapScript();
    allRulesSnap.forEach(handleRuleSnap);
  }
}
function getAllRulesSnap(){
  return snapGlobalRules.concat(retrieveDomainBasedRulesSnap(), retrieveConditionBasedRulesSnap());
}
function handleRuleSnap(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  owner = rule.owner, acntID = rule.acntID, shouldTrackCommerce = rule.trackCommerce;
  s_dtm.pixelList.push("Snap:"+owner+":"+acntID);
  snaptr('init', acntID);
  snaptr('track', acntID, 'PAGE_VIEW');
  if(shouldTrackCommerce)
    trackCommerceSnap();
}
function trackCommerceSnap(){
  switch(_satellite.getVar("DDO:Page Type").toLowerCase()) {
    case "store:product":
      handleContentViewSnap();
      break;
    case "store:checkout":
      handleInitiateCheckoutSnap();
      break;
    case "store:order":
      handlePurchaseSnap();
  }
}
function handleContentViewSnap(){
  calculateProductsProductView();
  snaptr('track', acntID, 'VIEW_CONTENT', {'item_ids': digitalData.product[0].productInfo.productID});
}
function calculateProductsCheckout(){
  if (!isSumCalculated){
    for (var i = 0; i < digitalData.cart.item.length; i++)
		products.push(digitalData.cart.item[i].productInfo.productID);
    isSumCalculated = true;
  }
}
function calculateProductsAndTotalPrice(){
  if (!isSumCalculated){
    for (var i = 0; i < digitalData.transaction.item.length; i++){
      item = digitalData.transaction.item[i];
      totalPrice += (item.price.basePrice * item.quantity);
      products.push(item.productInfo.productID);
    }
    isSumCalculated = true;
  }
}
function handleInitiateCheckoutSnap(){
  calculateProductsCheckout();
  snaptr('track', acntID, 'START_CHECKOUT');
}
function handlePurchaseSnap(){
  calculateProductsAndTotalPrice();
  snaptr('track', acntID, 'PURCHASE',{
    'currency': _satellite.getVar("currency code"), 
    'transaction_id': _satellite.getVar("DDO:Purchase ID"),
    'price': totalPrice, 
    'item_ids': products
  });
}
function retrieveDomainBasedRulesSnap(){
  return retrieveDomainBased(snapDomainBasedRules);
}
function retrieveConditionBasedRulesSnap(){
  return retrieveConditionBased(snapConditionBasedRules);
}
function initializeSnapScript(){
  (function(win, doc, sdk_url){
  if(win.snaptr) return;
  var tr=win.snaptr=function(){
  tr.handleRequest? tr.handleRequest.apply(tr, arguments):tr.queue.push(arguments);
 };
  tr.queue = [];
  var s='script';
  var new_script_section=doc.createElement(s);
  new_script_section.async=!0;
  new_script_section.src=sdk_url;
  var insert_pos=doc.getElementsByTagName(s)[0];
  insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
})(window, document, 'https://sc-static.net/scevent.min.js')};
function hotjarLogic(){
  var allRulesHJ = arrayOfUniqueRules(getAllRulesHJ());
  if (allRulesHJ.length > 0)
    allRulesHJ.forEach(handleRuleHJ);
}
function handleRuleHJ(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('Hotjar:' + rule.owner + ':' + rule.acntID);
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:rule.acntID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}
function getAllRulesHJ(){
  return hjGlobalRules.concat(retrieveDomainBasedRulesHJ(), retrieveConditionBasedRulesHJ());
}
function retrieveDomainBasedRulesHJ(){
  return retrieveDomainBased(hjDomainBasedRules);
}
function retrieveConditionBasedRulesHJ(){
  return retrieveConditionBased(hjConditionBasedRules);
}
function audigentLogic(){
  var allRulesAD = arrayOfUniqueRules(getAllRulesAD());
  if (allRulesAD.length > 0)
    allRulesAD.forEach(handleRuleAD);
}
function handleRuleAD(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push("Audigent" + (rule.owner==""?"":(":" + rule.owner)) + (rule.acntID==""?"":(":" + rule.acntID)));
	(function(w,d,t,u){
	 var a=d.createElement(t);a.async=1;a.src=u+"?url="+escape(w.location.href)+"&ref="+escape(d.referrer);
	 var s=d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(a,s);
	})(window, document, 'script', 'https://a.ad.gt/api/v1/u/matches/'+rule.acntID)
}
function getAllRulesAD(){
  return adGlobalRules.concat(retrieveDomainBasedRulesAD(), retrieveConditionBasedRulesAD());
}
function retrieveDomainBasedRulesAD(){
  return retrieveDomainBased(adDomainBasedRules);
}
function retrieveConditionBasedRulesAD(){
  return retrieveConditionBased(adConditionBasedRules);
}
var runLinkTrackingSetup = true;
var lTD = {};
function googleAnalyticsLogic(){
  var allRulesGA = arrayOfUniqueRules(getallRulesGA());
  _satellite.notify("in GA all rules");
  if (allRulesGA.length > 0){
    if (!_satellite.getVar('isOneTrustAdvertisingCookiesAllowed'))
      gtag_w('set', 'allow_google_signals', false);
	allRulesGA.forEach(handleRuleGA);
  }
}
function getallRulesGA(){
  return gaGlobalRules.concat(retrieveDomainBasedRulesGA(), retrieveConditionBasedRulesGA());
}
function handleRuleGA(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  var acntID = rule.acntID;
  s_dtm.pixelList.push('Google Analytics:'+rule.owner+':'+acntID);
  if (rule.trackClicks == "true"){
    if (runLinkTrackingSetup)
     clickTracking();
    lTD[acntID] = "";
  }
  gtag_w('config', acntID, {'anonymize_ip': true});
}
function retrieveDomainBasedRulesGA(){
  return retrieveDomainBased(gaDomainBasedRules);
}
function retrieveConditionBasedRulesGA(){
  return retrieveConditionBased(gaConditionBasedRules);
}
function clickTracking() {
  var lnksBtns = Array.prototype.slice.call(document.querySelectorAll('a')).concat(Array.prototype.slice.call(document.querySelectorAll('button')));
  lnksBtns.forEach(function(elm){
    elm.addEventListener('click', handleClick);
  });
  runLinkTrackingSetup = false;
}
function handleClick(event){
  var tgt = event.target;
  if (tgt.tagName == 'I' || tgt.tagName == 'IMG')
    tgt = tgt.parentElement;
  var clName = clickName(tgt);
  if (Boolean(clName))
    for(var acntID in lTD)
      gtag_w('event', 'click', {
	    'event_category': 'Clicks',
        'event_label': clName,
        'send_to': acntID}
	  );
}
function clickName(elm){
  switch(elm.tagName) {
    case 'A': // href
      if (Boolean(elm.innerText))
       return elm.innerText;
      if (Boolean(elm.id))
       return elm.id;
      if (Boolean(elm.href))
       return elm.href;
    break;
    case 'BUTTON':
      if (Boolean(elm.innerText))
       return elm.innerText;
      if (Boolean(elm.id))
       return elm.id;
      if (Boolean(elm.value))
       return elm.value;
  }
  return '';
}
function tradeDeskLogic(){
  var allRulesTD = arrayOfUniqueRules(getAllRulesTD());
  if (allRulesTD.length > 0)
    allRulesTD.forEach(handleRuleTD);
}
function handleRuleTD(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('The Trade Desk:' + rule.owner + ':' + rule.acntID);
  if (typeof TTDUniversalPixelApi === 'undefined'){
    loadScriptAsync('https://js.adsrvr.org/up_loader.1.1.0.js', true).then(function() {
      window.universalPixelApi = new TTDUniversalPixelApi();
      executeTradeDeskPixel(rule.acntID,rule.pixelAcntID);
    });
  }
  else
    executeTradeDeskPixel(rule.acntID,rule.pixelAcntID);
}
function executeTradeDeskPixel(acntID,pixelAcntID){
  if (typeof pixelAcntID === 'undefined') 
    universalPixelApi.init(acntID, ["q684oyg"], "https://insight.adsrvr.org/track/up");
  else
    universalPixelApi.init(pixelAcntID,[acntID],"https://insight.adsrvr.org/track/up");
}
function getAllRulesTD(){
  return tdGlobalRules.concat(retrieveDomainBasedRulesTD(), retrieveConditionBasedRulesTD());
}
function retrieveDomainBasedRulesTD(){
  return retrieveDomainBased(tdDomainBasedRules);
}
function retrieveConditionBasedRulesTD(){
  return retrieveConditionBased(tdConditionBasedRules);
}
function redditLogic(){
  var allRules = arrayOfUniqueRules(getAllRulesReddit());
  if (allRules.length > 0){
    initializeRedditScript();
    allRules.forEach(handleRuleReddit);
 }
}
function handleRuleReddit(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  var owner = rule.owner, acntID = rule.acntID, shouldTrackCommerce = rule.trackCommerce;
  s.pixelList.push('Reddit:' + owner + ':' + acntID);
  rdt('init',acntID);
  rdt('track','PageVisit');
    if (getDE('isHouseOfKongShows')) {
    rdt('track', 'ViewContent');}
}
function getAllRulesReddit(){
  return redditGlobalRules.concat(retrieveDomainBasedRulesReddit(), retrieveConditionBasedRulesReddit());
}
function retrieveDomainBasedRulesReddit(){
  return retrieveDomainBased(redditDomainBasedRules);
}
function retrieveConditionBasedRulesReddit(){
  return retrieveConditionBased(redditConditionBasedRules);
}
function initializeRedditScript(){
!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[]; var t=d.createElement("script");t.src='https://www.redditstatic.com/ads/pixel.js',t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}
(window,document);
}
function quantcastLogic(){
  if (!getDE('User Country').isEUTerritory){
    var allRulesQC = arrayOfUniqueRules(getAllRulesQC());
    if (allRulesQC.length > 0)
      allRulesQC.forEach(handleRuleQC);
  }
}
function handleRuleQC(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  var _qacct = window._qacct = rule.acntID;
  var _qevents = window._qevents = _qevents || [];
  s_dtm.pixelList.push('Quantcast' + (rule.owner==''?'':(':' + rule.owner)) + (_qacct==''?'':(':' + _qacct)));
  loadScriptAsync((location.protocol == 'https:' ? 'https://secure' : 'http://edge') + '.quantserve.com/quant.js');
}
function getAllRulesQC(){
  return qcGlobalRules.concat(retrieveDomainBasedRulesQC(), retrieveConditionBasedRulesQC());
}
function retrieveDomainBasedRulesQC(){
  return retrieveDomainBased(qcDomainBasedRules);
}
function retrieveConditionBasedRulesQC(){
  return retrieveConditionBased(qcConditionBasedRules);
}
function mediaMathLogic(){
  var allRulesMM = arrayOfUniqueRules(getAllRulesMM());
  if (allRulesMM.length > 0)
    allRulesMM.forEach(handleRuleMM);
}
function handleRuleMM(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push('Media Math:' + rule.owner + ':' + rule.acntID);
  (function(w,d,t,u){
	var a=d.createElement(t);a.async=1;a.src=u+"?url="+escape(w.location.href);
       var s=d.getElementsByTagName(t)[0]; s.parentNode.insertBefore(a,s);
  })(window, document, 'script', '//pixel.mathtag.com/event/js?mt_id='+rule.acntID+'&mt_adid=149635&mt_exem=&mt_excl=&v1=&v2=&v3=&s1=&s2=&s3=')
}
function getAllRulesMM(){
  return mmGlobalRules.concat(retrieveDomainBasedRulesMM(), retrieveConditionBasedRulesMM());
}
function retrieveDomainBasedRulesMM(){
  return retrieveDomainBased(mmDomainBasedRules);
}
function retrieveConditionBasedRulesMM(){
  return retrieveConditionBased(mmConditionBasedRules);
}
//{"expDate": "2021-12-31","owner":"WMAS","acntID":"c2be4e50-6beb-4713-97fe-556216d85f22","trackCommerce":false}
var redditGlobalRules = [
//{"expDate": "","owner":"","acntID":"","trackCommerce":false},
];
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no experation
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. Domain Control:
 a. "mikesinger" - generic for all under "mikesinger"
 b. "mikesinger.de" - in case if specific country is needed
*/
var redditDomainBasedRules = {
//"warnermusic.com.au": {rules:[{"expDate": "","owner":"Warner Music Australia","acntID":"t2_51huhk9r","trackCommerce":false},]},
//"maniacsonline": {rules:[{"expDate": "","owner":"Warner Music Australia","acntID":"t2_pzbts84s","trackCommerce":false},]},
};
// Use this for scripts that execute based on other values being true (such as label). Checks for data elements to be true.
// Used for all scripts that need to execute on a very specific web domain
/* Rules: 
1. "expDate" - leave it "" if there no expiration
2. "trackCommerce"
  a. false - only "PageView" will be send
  b. true - "PageView" + "InitiateCheckout", "ProductView", "Purchase"
3. condition - needs to be implemented as a "is" Data Element:
*/
var redditConditionBasedRules = {
//"isLabel3rdParty": {
//  rules: [{"expDate": "", "owner":"Warner Music Artist Services", "acntID": "0f320632-ca6a-4f6b-a380-0a151aa6c84f","trackCommerce": true},]},
"isHouseOfKong": {rules:[{"expDate": "2026-05-20","owner":"SINE Digital","acntID":"a2_gtyyqmkrmdcx","trackCommerce":false},]},
};
function springServeLogic(){
  var allRules = arrayOfUniqueRules(getAllRulesSpringServe());
  if (allRules.length > 0){
    allRules.forEach(handleRuleSpringServe);
 }
}
function handleRuleSpringServe(rule){
  if (rule.expDate != '' && !passDate(rule.expDate))
    return;
  var owner = rule.owner, hc = rule.hc, segment_id = rule.segment_id;
  s.pixelList.push('SpringServe:' + owner + ':' + hc + '-'+ segment_id);
  var img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.border = 0
    img.style = 'display:none'
    img.alt = '';
    img.src = 'https://pixel.springserve.com/segments?segment_id='+segment_id+'&hc='+hc;
    document.body.appendChild(img);
}
function getAllRulesSpringServe(){
  return springServeGlobalRules.concat(retrieveDomainBasedRulesSpringServe(), retrieveConditionBasedRulesSpringServe());
}
function retrieveDomainBasedRulesSpringServe(){
  return retrieveDomainBased(springServeDomainBasedRules);
}
function retrieveConditionBasedRulesSpringServe(){
  return retrieveConditionBased(springServeConditionBasedRules);
}
var isSumCalculated = false;
var products = [], totalPrice = 0.0, owner, acntID, shouldTrackCommerce;
function facebookLogic(){
  fb_CAPI_event_id = "".concat(s_dtm.visitor.getMarketingCloudVisitorID(),Date.now());
  s_dtm.eVar118 = fb_CAPI_event_id
  var allRulesFB = arrayOfUniqueRules(getAllRulesFB());
  _satellite.notify("in FB all rules");
  if (allRulesFB.length > 0){
    initializeFacebookScript();
    allRulesFB.forEach(handleRuleFB);
  }
}
function getAllRulesFB(){
  return fbGlobalRules.concat(retrieveDomainBasedRulesFB(), retrieveConditionBasedRulesFB());
}
function handleRuleFB(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  owner = rule.owner, acntID = rule.acntID, shouldTrackCommerce = rule.trackCommerce; custom = rule.custom
  s_dtm.pixelList.push("Facebook:"+owner+":"+acntID);
  fbq('init', acntID);
  fbq('trackSingle', acntID, 'PageView',{},{eventID: fb_CAPI_event_id});
  if(shouldTrackCommerce)
    trackCommerceFB();
  if(custom)
    fbq('trackSingle', acntID, 'ViewContent', 
        {subGenre: rule.subGenre, 
         funnelStep: rule.funnelStep,
         artistName: rule.artistName,
         genre: rule.genre,
         host: rule.hostname
        },
        {eventID: fb_CAPI_event_id});
   if (getDE('isHouseOfKongShows')) {
   fbq('track','ViewContent');
  }
   if (getDE('isEdAsiaQuizResults')) {
   fbq('trackSingleCustom', acntID, 'resultsPage')
   }
}
function trackCommerceFB(){
  switch(_satellite.getVar("DDO:Page Type").toLowerCase()) {
    case "store:product":
      handleProductViewFB();
      break;
    case "store:checkout":
      handleInitiateCheckoutFB();
      break;
    case "store:order":
      handlePurchaseFB();
      console.log('handlePurchaseFB() triggered');
      break;
    default:
      console.log('no commerce');
  }
}
function handleProductViewFB(){
  calculateProductsProductView();
  fbq('trackSingle', acntID,'ProductView',{},{eventID: fb_CAPI_event_id});
  fbq('trackSingle', acntID, 'ViewContent', {content_type: 'product', content_ids: products},{eventID: fb_CAPI_event_id});
}
function calculateProductsProductView(){
  if (!isSumCalculated){
    for (var i = 0; i < digitalData.product.length; i++)
      products.push(digitalData.product[i].productInfo.productID);
    isSumCalculated = true;
  }
}
function calculateProductsCheckout(){
  if (!isSumCalculated){
    for (var i = 0; i < digitalData.cart.item.length; i++)
		products.push(digitalData.cart.item[i].productInfo.productID);
    isSumCalculated = true;
  }
}
function calculateProductsAndTotalPrice(){
  if (!isSumCalculated){
    for (var i = 0; i < digitalData.transaction.item.length; i++){
      item = digitalData.transaction.item[i];
      totalPrice += (item.price.basePrice * item.quantity);
      products.push(item.productInfo.productID);
    }
    isSumCalculated = true;
  }
}
function handleInitiateCheckoutFB(){
  calculateProductsCheckout();
  fbq('trackSingle', acntID, 'InitiateCheckout',{content_type: 'product',  content_ids: products},{eventID: fb_CAPI_event_id});
}
function handlePurchaseFB(){
  calculateProductsAndTotalPrice();
  fbq('trackSingle', acntID, 'Purchase',{
    value: totalPrice,
    currency: _satellite.getVar('currency code'),
    content_type: 'product',
    content_ids: products
  },
  {eventID: fb_CAPI_event_id});
}
function retrieveDomainBasedRulesFB(){
  return retrieveDomainBased(fbDomainBasedRules);
}
function retrieveConditionBasedRulesFB(){
  return retrieveConditionBased(fbConditionBasedRules);
}
function initializeFacebookScript(){
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
}
function doubleClickLogic(){
  var allRules = arrayOfUniqueRules(getAllRulesDC());
  if(allRules.length > 0)
    allRules.forEach(handleRule);
}
function getAllRulesDC(){
  return retrieveGlobalRulesDC().concat(retrieveDomainBasedRulesDC(), retrieveConditionBasedRulesDC());
}
function handleRule(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  var acntID = rule.acntID;
  s_dtm.pixelList.push("Google DoubleClick:"+rule.owner+":"+acntID);
  gtag_w('config', acntID);
  if(rule.custom){
      gtag_w('event', 'conversion', 
             {'allow_custom_scripts': true,
              'u1': rule.u1,
              'u18': rule.u18,
              'u19': rule.u19,
              'u20': rule.u20,
              'u8': rule.u8,
              'u9': rule.u9,
              'send_to': acntID + '/' + rule.groupTag + '/' + rule.tag + '+standard'
  });
  } else {
   gtag_w('event', 'conversion', {
    'allow_custom_scripts': true,
    'send_to': acntID + '/' + rule.groupTag + '/' + rule.tag + '+standard'
  });
 }
}
function retrieveGlobalRulesDC(){
  return dcGlobalRules;
}
function retrieveConditionBasedRulesDC(){
  return retrieveConditionBased(dcConditionBasedRules);
}
function retrieveDomainBasedRulesDC(){
  return retrieveDomainBased(dcDomainBasedRules);
}
function webfxLogic(){
  var allRulesFX = arrayOfUniqueRules(getAllRulesFX());
  if (allRulesFX.length > 0)
    allRulesFX.forEach(handleRuleFX);
}
function handleRuleFX(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  s_dtm.pixelList.push("WebFX" + (rule.owner==""?"":(":" + rule.owner)) + (rule.acntID==""?"":(":" + rule.acntID)));
  (function (w,d,o,a,m) {
    w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);
    },w[o].e=1*new Date();a=d.createElement('script'),
    m=d.getElementsByTagName('script')[0];a.async=1;
    a.src='https://agent.marketingcloudfx.com/mcfx.js';m.parentNode.insertBefore(a, m);
  })(window, document, 'mcfx');
  mcfx('create', rule.acntID);
  (function() {
    if (typeof jQuery != 'undefined') {
      console.log("jQuery is available.");
      jQuery(document).ready(function() {
        jQuery('button[type="submit"], a[data-name*="[submit]"]').on('click', function(event) {
        console.log('MCFX capture success');
        mcfx('capture', jQuery(this).closest('form').get(0));
        });
      });
    } else {
      console.log("jQuery is not available.");
    }
  })();
} 
function getAllRulesFX(){
  return fxGlobalRules.concat(retrieveDomainBasedRulesFX(), retrieveConditionBasedRulesFX());
}
function retrieveDomainBasedRulesFX(){
  return retrieveDomainBased(fxDomainBasedRules);
}
function retrieveConditionBasedRulesFX(){
  return retrieveConditionBased(fxConditionBasedRules);
}
function adWordsLogic(){
  var allRulesAW = arrayOfUniqueRules(getAllRulesAW());
  _satellite.notify("in AD all rules");
  if(allRulesAW.length > 0)
	allRulesAW.forEach(handleRuleAW);
}
function getAllRulesAW(){
  return awGlobalRules.concat(retrieveDomainBasedRulesAW(), retrieveConditionBasedRulesAW());
}
function handleRuleAW(rule){
  if (rule.expDate != "" && !passDate(rule.expDate))
    return;
  var acntID = rule.acntID;
  s_dtm.pixelList.push("Google AdWords:"+rule.owner+":"+acntID);
  gtag_w('config', acntID);
  if (rule.convLbl)
    gtag_w('event', 'conversion', {'send_to': acntID + '/'+ rule.convLbl});
  if(rule.custom)
   gtag_w('event', 'page_view', 
        {'send_to': rule.acntID,
         'genre': rule.genre,
         'subgenre': rule.subgenre,
         'artistname': rule.artistname
      });
}
function retrieveConditionBasedRulesAW(){
  return retrieveConditionBased(awConditionBasedRules);
}
function retrieveDomainBasedRulesAW(){
  return retrieveDomainBased(awDomainBasedRules);
}
//Global
function adobeAnalyticsLogic(isSPA){
  if(isSPA)
    s_dtm.clearVars()
  setGlobalVars();
  s_dtm.list2=s.pixelList.join('|');
  s_dtm.t();
  console.log('Call to run all rules took: ' + (performance.now() - executionStartTime)/1000 + ' seconds.');
}
function setGlobalVars(){
  s_dtm.eVar4 = getDE('DDO:Artist Name');
  s_dtm.eVar13 = getDE('DDO:Sub Label Name');
  s_dtm.eVar14 = getDE('DDO:Page Type');
  s_dtm.eVar21 = s_dtm.prop18 = getDE('DDO:Page Name');
  s_dtm.eVar49 = getDE('DDO:Platform');
  s_dtm.prop75 = s_dtm.eVar75 = getDE('RSID');
  s_dtm.eVar88 = getDE('DomainWithTopLevel');
  s_dtm.prop1 = getDE('DDO:Artist Name');
  s_dtm.eVar5 = s_dtm.prop2 = getDE('DDO:Label Name');
  s_dtm.prop6 = getDE('DDO:Sub Label Name');
  s_dtm.prop12 = getDE('DDO:User ID');
  s_dtm.eVar141 = getDE('DDO:User Teams');
  s_dtm.eVar142 = getDE('DDO:User Role');
  s_dtm.eVar143 = getDE('DDO:User Territory');
  s_dtm.pageURL = s_dtm.prop13 = s.eVar8 = getDE('Page URL');
  s_dtm.prop21 = getDE('DDO:Page Type');
  s_dtm.prop49 = getDE('DDO:Platform');
  s_dtm.prop52 = getDE('DDO:Development Team');
  s_dtm.prop61 = getDE('DomainWithTopLevel');
  s_dtm.prop67 = 'Launch:Global';
  s_dtm.pageName = getDE('DDO:Page Name');
  s_dtm.server = getDE('DDO:Servers');
  s_dtm.channel = getDE('DDO:Page Primary Category');
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  s_dtm.eVar92 = dd;
  s_dtm.eVar93 = mm;
  s_dtm.eVar94 = yyyy;
  s_dtm.eVar96 = getDE('OnetrustActiveGroups');
  // Collect FB _fbp cookie value
  cD = getDicOfCookies();
  s_dtm.linkTrackVars = s_dtm.apl(s_dtm.linkTrackVars, 's_dtm.eVar119');
  //s_dtm.eVar111 = getDE('Cookie Policy URL');
  s_dtm.eVar119 = getCookieVal('_fbp');
  // Search page variables
  if (getDE('DDO:Page Type') == 'search:results'){
    s_dtm.eVar7 = s_dtm.prop7 = getDE('DDO:Search Term');
    s_dtm.prop8 = getDE('DDO:Search Results');
    s_dtm.eVar61 = 'search';
    if(s_dtm.prop8 == '0'){
      s_dtm.events = s_dtm.apl(s_dtm.events,'event6');
      s_dtm.prop8 = 'zero';
    }
    //set search event only if previous page was also a search results page with this search term
    if(document.referrer.toLowerCase().indexOf('q='+s_dtm.prop7)==-1)
      s_dtm.events=s_dtm.apl(s_dtm.events,'event4',',')
  }
  // Signup Success Page event
  if(getDE('DDO:Page Name').endsWith(':Signup Success' || ':Save Success'))
    s_dtm.events = s_dtm.apl(s_dtm.events, 'event3');
  // Tracks article tags if present
  if(getDE('DDO:Tags').length > 0) {
    s_dtm.linkTrackVars = s_dtm.apl(s_dtm.linkTrackVars, s_dtm.list1);
    s_dtm.list1 = getDE('DDO:Tags');
  }
}
/*function handleUUID(){
  if (getDE('visit: page count') == 1 && _satellite.getVisitorId().getMarketingCloudVisitorID() != ''){
    fetch('https://dpm.demdex.net/event?d_rtbd=json&d_mid=' + _satellite.getVisitorId().getMarketingCloudVisitorID())
    .then(
      function(response) {
        if (response.status !== 200)
         console.log('FETCH: Looks like there was a problem. Status Code: ' + response.status);
        else
          response.json().then(function(data) {_satellite.cookie.set('visit_uuid', data.uuid);});
      }
    )
  }
}*/
