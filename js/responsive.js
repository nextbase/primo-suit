// .exists function for jQuery
$.fn.exists = function(callback) {
    var args = [].slice.call(arguments, 1);
    if (this.length) {
        callback.call(this, args);
    }
    return this;
};

$.fn.isMissing = function(callback) {
    var args = [].slice.call(arguments, 1);
    if (!this.length) {
        callback.call(this, args);
    }
    return this;
};

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
    $("#responsive-header").isMissing(function() {
        responsiveHeaderHTML = '\
        <header id="responsive-header" class="js-generated"> \
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
    });
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
}

function isKorean(){
    return $('body').hasClass('EXLCurrentLang_ko_KR');
}

function convertResponsiveMenu(desktopMenu) {
    // Initial Variables
    menuContainer    = $('#responsive-menu');
    responsiveMenu   = desktopMenu.clone();
    menuLevelOneDiv  = '<div class="navi-level"></div>';
    menuLevelTwoDiv  = '<div class="navi-level" data-level="2"></div>';
    firstLevelItems  = responsiveMenu.children('li');
    submenuTitleDiv  = '<h2 class="submenu-title"></h2>';
    backButtonAnchor = '<a class="navi-back" href="#">back</a>';

    // First level
    menuContainer.append($('<h2 class="main-responsive-menu-header">Main Menu</h2>'));

    // Second level
    firstLevelItems.each(function(index) {
        title = $(this).children('a').first();
        $(backButtonAnchor).insertAfter(title);
        $(submenuTitleDiv).append(title.text()).insertAfter(title);
        $(this).wrapInner(menuLevelTwoDiv);
        $(this).prepend(title);
    });

    // Combine Levels
    menuContainer.append(responsiveMenu);
    menuContainer.wrapInner(menuLevelOneDiv);

    return menuContainer;
}

function initResponsiveMenu(callback) {
    if (isKorean()) {
        convertResponsiveMenu($('#korean-main-navigation'));
    } else {
        convertResponsiveMenu($('#english-main-menu'));
    }

    callback();
}

$(document).ready(function () {
    // Responsive Header
    initResponsiveHeader();
    // Responsive Containers
    initResponsiveContainers();
    // Responsive Menu
    initResponsiveMenu(function() {
        new pushMenu(document.getElementById('responsive-menu'), document.getElementById('responsive-menu-trigger'), {
            type: 'cover'
        });
    });
});