$(document).ready(function() {
	var sitemap_toggle = $('#sitemap-button');
    var sitemap_block  = $('#footer');

    sitemap_toggle.click(function(e) {
        e.preventDefault();
        sitemap_block.toggleClass('expanded');
    });
});