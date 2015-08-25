$(document).ready(function () {
    var sitemap_toggle = $('#sitemap-button');
    var sitemap_block = $('#footer');

    sitemap_toggle.click(function (e) {
        e.preventDefault();
        sitemap_block.toggleClass('sitemap-expanded');
    });

    var trigger_query   = ".EXLFacetList h3"; // Expand Trigger
    var parent_query    = ".EXLFacetList"; // Parent Block

    $(trigger_query).bind('click', function (e){
        $(this).closest(parent_query).toggleClass('expanded');
        e.preventDefault();
    });
});
