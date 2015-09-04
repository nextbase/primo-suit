// // Wrap an HTMLElement around each element in an HTMLElement array.
// HTMLElement.prototype.wrap = function(elms) {
//     // Convert `elms` to an array, if necessary.
//     if (!elms.length) elms = [elms];
    
//     // Loops backwards to prevent having to clone the wrapper on the
//     // first element (see `child` below).
//     for (var i = elms.length - 1; i >= 0; i--) {
//         var child = (i > 0) ? this.cloneNode(true) : this;
//         var el    = elms[i];
        
//         // Cache the current parent and sibling.
//         var parent  = el.parentNode;
//         var sibling = el.nextSibling;
        
//         // Wrap the element (is automatically removed from its current
//         // parent).
//         child.appendChild(el);
        
//         // If the element had a sibling, insert the wrapper before
//         // the sibling to maintain the HTML structure; otherwise, just
//         // append it to the parent.
//         if (sibling) {
//             parent.insertBefore(child, sibling);
//         } else {
//             parent.appendChild(child);
//         }
//     }
// };

function getLanguage() {
    isKorean = $('body').hasClass('EXLCurrentLang_ko_KR');
    if (isKorean) { return 'ko'; }
    else { return 'en' };
}

function createResponsiveStructure() {
    responsiveMenuResponsiveContainer = $("<div></div>").addClass('responsive-container');
    responsiveMenuNaviPusher = $("<div></div>").addClass('navi-pusher').attr('id', 'navi-pusher');
    responsiveMenuScroller = $("<div></div>").addClass('scroller').attr('id', 'navi-pusher');
    responsiveHeaderHTML = '\
    <header id="responsive-header"> \
        <div class="responsive-header-container"> \
            <div class="logo-container"> \
                <div id="mobile-logo"><a href="http://library.snu.ac.kr">SNUL</a></div> \
            </div> \
            <div class="menu-container"> \
                <div class="responsive-menu-trigger-container"> \
                    <a href="#" id="responsive-menu-trigger"><span></span></a> \
                </div> \
                <div class="responsive-login-trigger-container"><a id="responsive-login-trigger" class="login-popup" href="http://library.snu.ac.kr/user">User Login</a></div> \
            </div> \
        </div> \
    </header>';
    responsiveHeader = $(responsiveHeaderHTML);
    responsiveMenuLanguage  = getLanguage();

    // Primo Element that contains everything
    mainContentElement = $('#contentEXL');
    mainContentElement.wrap(responsiveMenuScroller);
}

$(document).ready(function() {
    // Responsive Menu
});

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
    }

    // Search Facets Expand
    expandableFacet("#facetListTopLevel h3", ".EXLFacetList");

    // Secondary Facets Expand
    expandableFacet("#facetList .EXLFacetContainer h4", ".EXLFacetContainer");

    // Initialize with expanded blocks
    var $blocks = ["#facetListTopLevel", "#exlidFacet0", "#exlidFacet1"];
    expandBlocks($blocks);

});
