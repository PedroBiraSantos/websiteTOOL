// Tour: moves each Bandsintown .bit-location after its .bit-venue once the widget renders (re-runs after XHR/resize)
(function () {
    const send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener("load", function () {
            //console.log('global handler', this.responseText)
            // add your global handler here
            //console.info("AJAX call");
            setTimeout(function () {
                appendDiv();
            }, 1000);
        });
        return send.apply(this, arguments);
    };
})();
function appendDiv() {
    var mainDiv = document.querySelectorAll("#block-bartik-reskintourblockdom .bit-event");
    if (typeof mainDiv != "undefined" && mainDiv != null) {
        var elements = document.querySelectorAll(".bit-event");
        elements.forEach((item, index) => {
            let bitlocation = item.querySelector(".bit-location");
            let venueNode = item.querySelector(".bit-venue");
            insertAfterfn(bitlocation, venueNode);
        });
    }
}
function insertAfterfn(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
(function () {
    //equalHeight(false, ".view-music-section .albumTitle");
    setTimeout(function () {
        appendDiv();
    }, 1000);
})();
window.addEventListener('load', function () {
    setTimeout(function () {
        appendDiv();
    }, 1000);
});
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        appendDiv();
    }, 1000);
});
window.onresize = function () {
    setTimeout(function () {
        appendDiv();
    }, 1000);
};
