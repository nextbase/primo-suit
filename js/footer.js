$(document).ready(function () {
    // Sitemap Expand
    var sitemap_toggle = $('#sitemap-button');
    var sitemap_block = $('#footer');

    sitemap_toggle.click(function (e) {
        e.preventDefault();
        sitemap_block.toggleClass('sitemap-expanded');
    });

    function expandableFacet(trigger_query, parent_query) {
        $(trigger_query).bind('click', function (e){
            $(this).closest(parent_query).toggleClass('expanded');
            e.preventDefault();
        });
    };

    // Search Facets Expand
    expandableFacet(".EXLFacetList h3", ".EXLFacetList");

    // Secondary Facets Expand
    expandableFacet("#facetList .EXLFacetContainer h4", ".EXLFacetContainer");


});
