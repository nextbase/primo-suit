// Use Primo Method to Check if this is a mobile device
window.onload = function()
{
    try {
        (function(a) {
            (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
        })(navigator.userAgent || navigator.vendor || window.opera);
        if (($(window).width() <= 500 && jQuery.browser.mobile) || ('true' == getRequestParameterByName('debug_mobile'))) {
            $('body').addClass('mobile-device');
        }
    } catch (mobileErr) {
        log('JS changes for mobile failed:' + mobileErr);
    }
}

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

function convertResponsiveUserMenu(userMenu) {
    containerParent = $('#responsive-menu > .navi-level');
    userMenuResponsive = userMenu.clone();
    userMenuResponsive.attr('id', 'userMenuResponsive');
    userMenuResponsive.each(function() {
        $(this).attr('id', $(this).attr('id') + 'Responsive');
    });
    // Language Link
    langLink = $("#exlidLanguages li.EXLLanguageLinkHide").first().clone();
    langLink.attr('id', 'responsiveLanguageLink');
    langLink.insertAfter(userMenuResponsive.children('.EXLMyAccount'));
    // Let's stick it
    containerParent.append(userMenuResponsive);
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

function updateLoginButton() {
    responsiveLoginButton = $('#responsive-login-trigger');
    loginButton = $('#exlidSignIn a');
    logoutButton = $('#exlidSignOut a');
    logoutText = logoutButton.html();


    if ($('#exlidSignOut').hasClass('EXLHidden')) {
        responsiveLoginButton.attr('href', loginButton.attr('href'));
        responsiveLoginButton.attr('onclick', loginButton.attr('onclick'));
    } else {
        responsiveLoginButton.attr('href', logoutButton.attr('href'));
        responsiveLoginButton.attr('onclick', logoutButton.attr('onclick'));
        responsiveLoginButton.attr('id', "responsive-logout-trigger");
        responsiveLoginButton.html(logoutButton.html());
    }
}

function initResponsiveMenu(callback) {
    if (isKorean()) {
        convertResponsiveMenu($('#korean-main-navigation'));
    } else {
        convertResponsiveMenu($('#english-main-menu'));
    }

    // User Menu
    convertResponsiveUserMenu($("#exlidUserAreaRibbon"));

    callback();
}

function expandableMobileFacet(trigger_query, parent_query) {
    $(trigger_query).bind('click', function (e) {
        $(this).closest(parent_query).toggleClass('expanded-for-mobile');
        e.preventDefault();
    });
};

function initFilterExpand() {
    $("#exlidFacetTile").exists(function() {
        if (isKorean()) {
            $(this).prepend('<div class="filters-expand-title"><h2 class="filters-title">검색 필터</h2></div>');
        } else {
            $(this).prepend('<div class="filters-expand-title"><h2 class="filters-title">Search Filters</h2></div>');
        }
        expandableMobileFacet($(this).find(".filters-expand-title"), $(this));
    });
}

function removeAltFromMissingImages() {
    $('img.EXLBriefResultsCover').attr("alt", "");
}

function responsiveTables() {
    /* Make tables responsive */
    $('#requestList').stacktable({myClass:'stacktable small-only'});
    $('.EXLMyAccountTable').stacktable({myClass:'stacktable small-only'});
}

$(document).ready(function () {
    // Responsive Containers
    initResponsiveContainers();
    // Pick the right login / logout button
    updateLoginButton();
    // Responsive Menu
    initResponsiveMenu(function() {
        new pushMenu(document.getElementById('responsive-menu'), document.getElementById('responsive-menu-trigger'), {
            type: 'cover'
        });
    });

    // Remove alt property from missing images
    removeAltFromMissingImages();

    // Responsive Search Filters
    initFilterExpand();

    // Make tables Responsive
    responsiveTables();
});

/& Stackable Solution for Tables */
;(function($) {
    $.fn.cardtable = function(options) {
        var $tables = this,
            defaults = {id:'stacktable small-only',hideOriginal:true,headIndex:0},
            settings = $.extend({}, defaults, options);

        // checking the "headIndex" option presence... or defaults it to 0
        if(options && options.headIndex)
            headIndex = options.headIndex;
        else
            headIndex = 0;

        return $tables.each(function() {
            $table = $(this);
            if ($table.hasClass('stacktable')) {
                return;
            }
            var table_css = $(this).prop('class');
            var $stacktable = $('<div></div>');
            if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
            var markup = '';


            $table.addClass('stacktable large-only');
            $caption = $table.find("caption").clone();
            $topRow = $table.find('tr').eq(0);

            // using rowIndex and cellIndex in order to reduce ambiguity
            $table.find('tbody tr').each(function(rowIndex,value) {

                // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
                headMarkup = '';
                bodyMarkup = '';
                tr_class = $(this).prop('class');
                // for the first row, "headIndex" cell is the head of the table
                // for the other rows, put the "headIndex" cell as the head for that row
                // then iterate through the key/values
                $(this).find('td,th').each(function(cellIndex,value) {
                    if ($(this).html() !== ''){
                        bodyMarkup += '<tr class="' + tr_class +'">';
                        if ($topRow.find('td,th').eq(cellIndex).html()){
                            bodyMarkup += '<td class="st-key">'+$table.find('thead th').eq(cellIndex).html()+'</td>';
                        } else {
                            bodyMarkup += '<td class="st-key"></td>';
                        }
                        bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                        bodyMarkup += '</tr>';
                    }
                });

                markup += '<table class=" '+ table_css +' '+settings.id+'"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
            });

            $table.find('tfoot tr td').each(function(rowIndex,value) {
                if ($.trim($(value).text()) !== '') {
                    markup += '<table class="'+ table_css + ' ' +settings.id+'"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
                }
            });

            $stacktable.prepend($caption);
            $stacktable.append($(markup));
            $table.before($stacktable);
            if (!settings.hideOriginal) $table.show();
        });
    };

    $.fn.stacktable = function(options) {
        var $tables = this,
            defaults = {id:'stacktable small-only',hideOriginal:true,headIndex:0},
            settings = $.extend({}, defaults, options);

        // checking the "headIndex" option presence... or defaults it to 0
        if(options && options.headIndex)
            headIndex = options.headIndex;
        else
            headIndex = 0;

        return $tables.each(function() {
            var table_css = $(this).prop('class');
            var $stacktable = $('<table class="'+ table_css +' '+settings.id+'"><tbody></tbody></table>');
            if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
            var markup = '';

            $table = $(this);
            $table.addClass('stacktable large-only');
            $caption = $table.find("caption").clone();
            $topRow = $table.find('tr').eq(0);

            // using rowIndex and cellIndex in order to reduce ambiguity
            $table.find('tr').each(function(rowIndex,value) {

                // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
                headMarkup = '';
                bodyMarkup = '';
                tr_class = $(this).prop('class');
                // for the first row, "headIndex" cell is the head of the table
                if (rowIndex === 0) {
                    // the main heading goes into the markup variable
                    markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').eq(headIndex).html()+'</th></tr>';
                }
                else {
                    // for the other rows, put the "headIndex" cell as the head for that row
                    // then iterate through the key/values
                    $(this).find('td,th').each(function(cellIndex,value) {
                        if (cellIndex === headIndex) {
                            headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
                        } else {
                            if ($(this).html() !== ''){
                                bodyMarkup += '<tr class="' + tr_class +'">';
                                if ($topRow.find('td,th').eq(cellIndex).html()){
                                    bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
                                } else {
                                    bodyMarkup += '<td class="st-key"></td>';
                                }
                                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                                bodyMarkup += '</tr>';
                            }
                        }
                    });

                    markup += headMarkup + bodyMarkup;
                }
            });

            $stacktable.prepend($caption);
            $stacktable.append($(markup));
            $table.before($stacktable);
            if (!settings.hideOriginal) $table.show();
        });
    };

    $.fn.stackcolumns = function(options) {
        var $tables = this,
            defaults = {id:'stacktable small-only',hideOriginal:true},
            settings = $.extend({}, defaults, options);

        return $tables.each(function() {
            $table = $(this);
            var num_cols = $table.find('tr').eq(0).find('td,th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
            if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
                return;

            var $stackcolumns = $('<table class="'+settings.id+'"></table>');
            if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
            $table.addClass('stacktable large-only');
            var tb = $('<tbody></tbody>');
            var col_i = 1; //col index starts at 0 -> start copy at second column.

            while (col_i < num_cols) {
                $table.find('tr').each(function(index,value) {
                    var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
                    if(index === 0) tem.addClass("st-head-row st-head-row-main");
                    first = $(this).find('td,th').eq(0).clone().addClass("st-key");
                    var target = col_i;
                    // if colspan apply, recompute target for second cell.
                    if ($(this).find("*[colspan]").length) {
                        var i =0;
                        $(this).find('td,th').each(function(index,value) {
                            var cs = $(this).attr("colspan");
                            if (cs) {
                                cs = parseInt(cs, 10);
                                target -= cs-1;
                                if ((i+cs) > (col_i)) //out of current bounds
                                    target += i + cs - col_i -1;
                                i += cs;
                            }
                            else
                                i++;

                            if (i > col_i)
                                return false; //target is set; break.
                        });
                    }
                    second = $(this).find('td,th').eq(target).clone().addClass("st-val").removeAttr("colspan");
                    tem.append(first, second);
                    tb.append(tem);
                });
                ++col_i;
            }

            $stackcolumns.append($(tb));
            $table.before($stackcolumns);
            if (!(settings.hideOriginal)) {
                $table.show();
            }
        });
    };

}(jQuery));