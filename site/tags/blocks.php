<?php

/**
 * Block Plugin
 * modified from :
 * Columns Plugin
 * @author Bastian Allgeier <bastian@getkirby.com>
 * @version 1.0.0
 */
kirbytext::$pre[] = function($kirbytext, $text) {

  $text = preg_replace_callback('!\(blocks(…|\.{3})\)(.*?)\((…|\.{3})blocks\)!is', function($matches) use($kirbytext) {

    $blocks  = preg_split('!(\n|\r\n)\+{4}\s+(\n|\r\n)!', $matches[2]);
    $html    = array();

    foreach($blocks as $block) {
      $field = new Field($kirbytext->field->page, null, trim($block));
      $html[] = '<div class="block">' . kirbytext($field) . '</div>';
    }

    return '<div class="blocks blocks-' . count($blocks) . '">' . implode($html) . '</div>';

  }, $text);

  return $text;

};
