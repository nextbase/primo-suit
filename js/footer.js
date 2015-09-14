// Replace CSS
function smothReplaceCSS() {
    oldCSS = $('link[href*="primo_library_wro"]');
    newCSS = oldCSS.clone();
    newCSS.attr("href", "http://nextbase.github.io/primo-suit/css/build/main.css");
    newCSS.insertAfter(oldCSS);
    setTimeout(function() {
        console.log("JS: Replaced Primo Default CSS with SNUL Theme Stylesheet");
        oldCSS.remove();
    }, 800);
}

function smothReplaceOldCSS() {
    oldCSS = $('link[href*="main.css"]');
    newCSS = oldCSS.clone();
    newCSS.attr("href", "../wro/primo_library_wro_82SNU_en_US.css?");
    newCSS.insertAfter(oldCSS);
    setTimeout(function() {
        console.log("JS: Bringing back the default Primo CSS.");
        oldCSS.remove();
    }, 800);
}

$(document).ready(function () {
    // Sitemap Expand
    var sitemap_toggle = $('#sitemap-button');
    var sitemap_block = $('#footer');

    sitemap_toggle.click(function (e) {
        e.preventDefault();
        sitemap_block.toggleClass('sitemap-expanded');
    });

    function expandableFacet(trigger_query, parent_query) {
        $(trigger_query).bind('click', function (e) {
            $(this).closest(parent_query).toggleClass('expanded');
            e.preventDefault();
        });
    };

    function expandBlocks(selectors) {
        if (selectors.constructor === Array) {
            $.each((selectors), function (index, value) {
                $(value).addClass('expanded');
            });
        } else {
            $(value).addClass('expanded');
        }
    };
    // Replace CSS
    smothReplaceCSS();

    // Search Facets Expand
    expandableFacet("#facetListTopLevel h3", ".EXLFacetList");

    // Secondary Facets Expand
    expandableFacet("#facetList .EXLFacetContainer h4", ".EXLFacetContainer");

    // Initialize with expanded blocks
    var $blocks = ["#facetListTopLevel", "#exlidFacet0", "#exlidFacet1"];
    expandBlocks($blocks);

});