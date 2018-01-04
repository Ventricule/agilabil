<?php
kirbytext::$tags['cartouche'] = array(
  'attr' => array(
    'titre',
    'texte'
  ),
  'html' => function($tag) {

    $type    = $tag->attr('cartouche');
    $titre   = $tag->attr('titre');
    $texte   = $tag->attr('texte');

    return "<div class='cartouche'><div><p>$type</p><p>$texte</p></div><h5>$titre</h5></div>";

  }
);
