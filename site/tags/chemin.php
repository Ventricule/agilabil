<?php
kirbytext::$tags['chemin'] = array(
  'html' => function($tag) {

    switch ($tag->attr('chemin')):
      case "rouge":
        return "<span class='chemin voie-a' markdown='1'>";
        break;
      case "bleu":
        return "<span class='chemin voie-b' markdown='1'>";
        break;
      case "vert":
        return "<span class='chemin voie-c' markdown='1'>";
        break;
      case "fin":
        return "</span>";
        break;
      default:
        return;
    endswitch;

  }
);
