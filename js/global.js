function applyStyle(element, styles) {
    for (var style in styles) {
        element.style[style] = styles[style];
    }
}

var $ = function(id) {
    return document.getElementById(id);
}