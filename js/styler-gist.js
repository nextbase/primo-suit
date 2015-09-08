// I used this method to add a JS using Styler Plugin for Chrome
setTimeout(function() {
    var example = document.createElement('script');
    example.src = "http://nextbase.github.io/primo-suit/js/example.js";
    document.body.appendChild(example);
}, 4000);

// To delete the current stylesheets do this
setTimeout(function() {
    $('link[rel=stylesheet]').remove();
}, 1000);