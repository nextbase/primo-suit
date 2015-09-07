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
    wrapper.setAttribute('id', wrapperID);
    wrapper.className = wrapperID
    if (typeof parent === "string") { parent = document.getElementById(parent); }
    var div = parent.appendChild(wrapper);
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
    wrapInner(responsiveContainerID, naviPusherID);
    wrapInner(naviPusherID, scrollerContainerID);

    $('<nav id ="responsive-menu" class="navi-menu"></nav>').insertBefore("#" + scrollerContainerID);
    //$('#responsive-container').addClass('responsive-container');
    //$('#navi-pusher').addClass('navi-pusher');
    //$('#scroller').addClass('scroller');
}

function isKorean(){
    return $('body').hasClass('EXLCurrentLang_ko_KR');
}

function convertResponsiveMenu(desktopMenu) {
    // Initial Variables
    menuContainer    = $('#responsive-menu');
    responsiveMenu   = desktopMenu.clone();
    menuLevelDiv     = '<div class="navi-level"></div>';
    firstLevelItems  = responsiveMenu.children('li');
    submenuTitleDiv  = '<h2 class="submenu-title"></h2>';
    backButtonAnchor = '<a class="navi-back" href="#">back</a>';

    // Responsive id and navi menu class
    responsiveMenu.attr('id', "responsive-menu-main");

    // First level
    menuContainer.append($('<h2 class="main-responsive-menu-header">Main Menu</h2>'));

    // Second level
    firstLevelItems.each(function(index) {
        title = $(this).children('a').first();
        $(backButtonAnchor).insertAfter(title);
        title.wrap(submenuTitleDiv);
        $(this).wrapInner(menuLevelDiv);
        $(this).prepend(title.clone());
        title.replaceWith(title.text());
    });

    // Combine Levels
    menuContainer.append(responsiveMenu);
    menuContainer.wrapInner(menuLevelDiv);

    return menuContainer;
}

function createResponsiveMenu() {
    if (isKorean()) {
        convertResponsiveMenu($('#korean-main-navigation'));
    } else {
        convertResponsiveMenu($('#english-main-menu'));
    }
}

function initResponsiveMenu() {
    createResponsiveMenu();

    new pushMenu(document.getElementById('responsive-menu'), document.getElementById('responsive-menu-trigger'), {
        type: 'cover'
    });
}

var responsiveMenu = {};

$(document).ready(function () {
    // Responsive Header
    initResponsiveHeader();
    // Responsive Containers
    initResponsiveContainers();
    // Responsive Menu
    initResponsiveMenu();
});