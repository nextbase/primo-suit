$(document).ready(function () {
    // Sitemap Expand
    var sitemap_toggle = $('#sitemap-button');
    var sitemap_block = $('#footer');

    sitemap_toggle.click(function (e) {
        e.preventDefault();
        sitemap_block.toggleClass('sitemap-expanded');
    });

    // Search Facets Expand
    var trigger_query   = ".EXLFacetList h3";
    var parent_query    = ".EXLFacetList";

    $(trigger_query).bind('click', function (e){
        $(this).closest(parent_query).toggleClass('expanded');
        e.preventDefault();
    });
});
