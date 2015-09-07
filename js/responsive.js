// Wrap an HTMLElement around each element in an HTMLElement array.
HTMLElement.prototype.wrap = function(elms) {
    // Convert `elms` to an array, if necessary.
    if (!elms.length) elms = [elms];

    // Loops backwards to prevent having to clone the wrapper on the
    // first element (see `child` below).
    for (var i = elms.length - 1; i >= 0; i--) {
        var child = (i > 0) ? this.cloneNode(true) : this;
        var el    = elms[i];

        // Cache the current parent and sibling.
        var parent  = el.parentNode;
        var sibling = el.nextSibling;

        // Wrap the element (is automatically removed from its current
        // parent).
        child.appendChild(el);

        // If the element had a sibling, insert the wrapper before
        // the sibling to maintain the HTML structure; otherwise, just
        // append it to the parent.
        if (sibling) {
            parent.insertBefore(child, sibling);
        } else {
            parent.appendChild(child);
        }
    }
};

/*
    Usage
    ------
    Four parameters you can use:
    'parent'     = parent element object or id
    'wrapper_id' = the attribute that you need this innerwrapped element to have

    Example
    -------
    wrapInner(parent, 'wrapper_id');
*/

function wrapInner(parent, wrapperID) {
    wrapper = document.createElement('div');
    if (typeof parent === "string") { parent = document.getElementById(parent); }
    var div = parent.appendChild(wrapper).setAttribute('id', wrapperID);
    while (parent.firstChild !== wrapper) {
        wrapper.appendChild(parent.firstChild);
    }
}

function initResponsiveHeader() {
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
    headerContainer = $('#header');
    responsiveHeader.insertAfter(headerContainer);
}

function initResponsiveContainers() {
    scrollerContainerID = "scroller";
    naviPusherID = "navi-pusher";
    responsiveContainerID = "responsive-container";
    // initiate contstruction
    wrapInner(document.body, responsiveContainerID);
    wrapInner(responsiveContainerID, scrollerContainerID);
    wrapInner(scrollerContainerID, naviPusherID);

    $('<nav id ="responsive-menu" class="navi-menu navi-cover"></nav>').insertBefore("#scroller");
    $('<div class="' + scrollerContainerID + '"></div>').insertAfter()
}

function isKorean(){
    return $('body').hasClass('EXLCurrentLang_ko_KR');
}

function convertResponsiveMenu(desktopMenu) {
    // Initial Variables
    responsiveMenu   = desktopMenu.clone();
    menuLevelDiv     = '<div class="navi-level"></div>';
    firstLevelItems  = responsiveMenu.children('li');
    submenuTitleDiv  = '<h2 class="submenu-title"></h2>';
    backButtonAnchor = '<a class="navi-back" href="#">back</a>';

    // Responsive id and navi menu class
    responsiveMenu.attr('id', "navi-" + responsiveMenu.attr('id'));
    responsiveMenu.addClass('navi-menu');

    // First level
    $('<h2 class="main-responsive-menu-header">Main Menu</h2>').insertBefore(firstLevelItems.first());
    responsiveMenu.wrapInner(menuLevelDiv);

    // Second level
    firstLevelItems.each(function(index) {
        title = $(this).children('a').first();
        $(backButtonAnchor).insertAfter(title);
        title.wrap(submenuTitleDiv);
        $(this).wrapInner(menuLevelDiv);
    });

    return responsiveMenu;
}

function createResponsiveMenu() {
    if (isKorean()) {
        return convertResponsiveMenu($('#korean-main-navigation'));
    } else {
        return convertResponsiveMenu($('#english-main-menu'));
    }
}

var responsiveMenu = {};

$(document).ready(function () {
    // Responsive Header
    initResponsiveHeader();
    // Responsive Containers
    initResponsiveContainers();
    // Responsive Menu
    responsiveMenu = createResponsiveMenu();
});