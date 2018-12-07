<?php

/**
 * @package Social Space
 */
/*
Plugin Name: Social Space
Plugin URI: http://wordpress.org/plugins/social-space/
Description: Social Space provides a way to show links to your social networking profiles using simple widget, so people can connect with you more easily.
Version: 4.0.1
Author: Shah Rishabh
Author URI: http://profiles.wordpress.org/rishabh_19/
License: GPLv2 or later
*/

class social_space extends WP_Widget {

    function social_space() {
        parent::WP_Widget(false, $name = __('Social Space', 'wp_widget_plugin') );
    }

    function form($instance) {
        $social = array('Facebook','Twitter','LinkedIn','GooglePlus','Pinterest','Flickr','RSS','Skype','YouTube','Vimeo','Dribble');
        ?>
        <link rel="stylesheet" type="text/css" href="<?php echo plugins_url( 'social-space/assets/social-space-form.css') ?>">
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Widget Title', 'wp_widget_plugin'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo ( $instance ) ? esc_attr($instance['title']) : '' ?>" placeholder="This will be visible to the users"/>
        </p>

        <p class="default-icon">
            <legend>Default Icon:</legend>
            <?php
            // 3 being the default value or "no rating set (yet)"
            $defaultIcon = ( isset( $instance['defaultIcon'] ) && is_numeric( $instance['defaultIcon'] ) ) ? (int) $instance['defaultIcon'] : 3;
            for( $n = 1; $n <= 3; $n++ ) {
                echo '<input type="radio" id="'.$this->get_field_id( 'defaultIcon' ) . '-' . $n . '" name="' . $this->get_field_name( 'defaultIcon' ) . '" value="' . $n . '" ' . checked( $defaultIcon == $n, true, false ) . '><label for="' . $this->get_field_id( 'defaultIcon' ) . '-' . $n . '">  <img src="'.plugins_url( 'social-space/assets/type'.$n.'.png' ).'"> </label>';
            }
            ?>
        </p>
        <p class="rollover-icon">
            <legend>Rollover Icon: &nbsp;&nbsp;( Icon on mouse hover )</legend>
            <?php
            // 2 being the default value or "no rating set (yet)"
            $rolloverIcon = ( isset( $instance['rolloverIcon'] ) && is_numeric( $instance['rolloverIcon'] ) ) ? (int) $instance['rolloverIcon'] : 2;
            for( $m = 1; $m <= 3; $m++ ) {
                echo '<input type="radio" id="'.$this->get_field_id( 'rolloverIcon' ) . '-' . $m . '" name="' . $this->get_field_name( 'rolloverIcon' ) . '" value="' . $m . '" ' . checked( $rolloverIcon == $m, true, false ) . '><label for="' . $this->get_field_id( 'rolloverIcon' ) . '-' . $m . '">  <img src="'.plugins_url( 'social-space/assets/type'.$m.'.png' ).'"> </label>';
            }
            ?>
        </p>
        <p class="icon-shape">
            <legend>Icon Shape:</legend>
            <?php
            // 3 being the default value or "no rating set (yet)"
            $iconShape = ( isset( $instance['iconShape'] ) && is_numeric( $instance['iconShape'] ) ) ? (int) $instance['iconShape'] : 3;

            echo '<input type="radio" id="'.$this->get_field_id( 'iconShape' ) . '-1" name="' . $this->get_field_name( 'iconShape' ) . '" value="1" ' . checked( $iconShape == 1, true, false ) . '><label for="' . $this->get_field_id( 'iconShape' ) . '-1">  <img src="'.plugins_url( 'social-space/assets/type3.png' ).'" class="icon-circle"> </label>';
            echo '<input type="radio" id="'.$this->get_field_id( 'iconShape' ) . '-2" name="' . $this->get_field_name( 'iconShape' ) . '" value="2" ' . checked( $iconShape == 2, true, false ) . '><label for="' . $this->get_field_id( 'iconShape' ) . '-2">  <img src="'.plugins_url( 'social-space/assets/type3.png' ).'" class="icon-curve"> </label>';
            echo '<input type="radio" id="'.$this->get_field_id( 'iconShape' ) . '-3" name="' . $this->get_field_name( 'iconShape' ) . '" value="3" ' . checked( $iconShape == 3, true, false ) . '><label for="' . $this->get_field_id( 'iconShape' ) . '-3">  <img src="'.plugins_url( 'social-space/assets/type3.png' ).'"> </label>';
            ?>
        </p>

        <p><b>Note:</b> Please enter the URL by starting with 'http://' or 'https://' in order to link the social icon properly with your profile.</p>
        <?php
        foreach ($social as $social_item)
        {
            ?>
            <p>
                <label for="<?php echo $this->get_field_id($social_item); ?>"><?php _e($social_item, 'wp_widget_plugin'); ?></label>
                <input class="widefat" id="<?php echo $this->get_field_id($social_item); ?>" name="<?php echo $this->get_field_name($social_item); ?>" type="text" value="<?php echo ( $instance ) ? esc_attr($instance[$social_item]) : '' ?>" placeholder=" http://www.example.com" />
            </p>
            <?php
        }
        echo '<p>Would you like to <a href="https://wordpress.org/support/view/plugin-reviews/social-space" target="_blank">Write a review</a> about this?</p>';
    }

    function update($new_instance, $old_instance) {
        $social = array('Facebook','Twitter','LinkedIn','GooglePlus','Pinterest','Flickr','RSS','Skype','YouTube','Vimeo','Dribble');
        $instance = $old_instance;
        $instance['title'] = strip_tags($new_instance['title']);
        foreach ($social as $social_item) {
            $instance[$social_item] = strip_tags($new_instance[$social_item]);
        }
        $instance['defaultIcon'] = strip_tags( $new_instance['defaultIcon'] );
        $instance['rolloverIcon'] = strip_tags( $new_instance['rolloverIcon'] );
        $instance['iconShape'] = strip_tags( $new_instance['iconShape'] );
        return $instance;
    }

    function widget($args, $instance)
    {
        ?>
        <link rel="stylesheet" type="text/css" href="<?php echo plugins_url( 'social-space/assets/social-space.css') ?>">
        <?php
        extract( $args );
        $social = array('Facebook','Twitter','LinkedIn','GooglePlus','Pinterest','Flickr','RSS','Skype','YouTube','Vimeo','Dribble');

        // these are the widget options
        $title = apply_filters('widget_title', $instance['title']);
        echo $before_widget;

        // Display the widget
        echo '<div class="widget-text wp_widget_plugin_box social">';

        $defaultIcon = $instance['defaultIcon'];
        $rolloverIcon = $instance['rolloverIcon'];
        $iconShape = $instance['iconShape'];
        $icons = 't'.$defaultIcon.''.$rolloverIcon;

        // Check if title is set
        if ( $title )
        {
            echo $before_title . $title . $after_title;
        }

        if ($iconShape == 1){
            $shape = 'icon-circle';
        }
        elseif ($iconShape == 2){
            $shape = 'icon-curve';
        }
        else{
            $shape = '';
        }

        foreach ($social as $social_item)
        {
            // Check if $instance is set for each social item and
            // if it is set then only show on front-end
            if( $instance[$social_item]){
                echo '<a href="'.$instance[$social_item].'" target="_blank" class="'.$icons.'"><div id="'.$social_item.'" class="'.$shape.'"></div></a>';
            }
        }
        echo '</div>';
        echo $after_widget;
    }
}

// register the widget
add_action('widgets_init', create_function('', 'return register_widget("social_space");'));
?>