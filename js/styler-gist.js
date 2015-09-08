// I used this method to add a JS using Styler Plugin for Chrome
setTimeout(function() {
    var example = document.createElement('script');
    example.src = "http://nextbase.github.io/primo-suit/js/example.js";
    document.body.appendChild(example);
}, 4000);

removeAllStylesheetLinks();

function removeAllStylesheetLinks() {
    var stylesheets = document.getElementsByTagName('link'), i, sheet;

    for(i in stylesheets) {
        sheet = stylesheets[i];

        if(sheet.getAttribute('type').toLowerCase() == 'text/css')
            sheet.parentNode.removeChild(sheet);
    }
}