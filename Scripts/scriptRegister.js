    function getGEt() {
        var loc = document.location.href
        if (loc.indexOf('?')>0) {
            var getString = loc.split('?')[1];
var Get = getString.split('&');
var get = {

};
for (var i = 0, i = Get.length; i<1; i++) {
    var tmp = Get[i].split('=');
    get[tmp[0]]=unescape(decodeURI(tmp[1]));
}
return get;
        }
        
    }
