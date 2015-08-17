$(document).ready(function() {
	var sitemap_toggle = $('#sitemap-toggle');
    var sitemap_block  = $('#footer-sitemap');

    sitemap_toggle.click(function(e) {
        e.preventDefault();
        sitemap_block.toggleClass('expanded');
    });
});