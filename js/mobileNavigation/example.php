<div class="container">
     <!-- Push Wrapper -->
        <div class="navi-pusher" id="navi-pusher">

            <!-- navi-menu -->
            <nav class="navi-menu">

                <div class="navi-level">
                <?php
                    // Navigation output comes here 
                    $user_menu_output = menu_tree_output(menu_tree_all_data('main-menu'));
                    print drupal_render($user_menu_output);
                ?>
                </div><!-- end .navi-level -->

            </nav>
            <!-- /navi-menu -->

            <!-- Place this trigger where it's needed -->
            <div class="scroller">

                <!-- this is for emulating position fixed of the nav -->
                <div class="scroller-inner">
                    <div class="content clearfix">
                        <div class="block block-40 clearfix">
                            <p><a href="#" id="trigger" class="menu-trigger">Menu</a></p>
                        </div>
                    </div>
                </div>
                <!-- /scroller-inner -->

            </div>
            <!-- /scroller -->
            <!-- Place the code above, the trigger where it's needed -->

        </div>
        <!-- /pusher -->
    </div>
<!-- /container -->

<script src="js/mlpushmenu.js"></script>
<script>
new pushMenu(document.getElementById('navi-menu'), document.getElementById('trigger'), {
    type: 'cover'
});
</script>