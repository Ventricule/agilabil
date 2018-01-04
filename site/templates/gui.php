<!DOCTYPE HTML>
<html lang="fr" class="normal">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>

  <?= css('assets/css/gui.css', 'screen'); ?>

  <?= js(array(
    "/assets/lib/jquery.min.js",
    "/assets/js/gui.js"
  ));
  ?>

</head>
<body>
    <div id="viewport">
        <iframe src="/document.html"></iframe>
    </div>

    <?= snippet('toolbar') ?>

</body>
</html>
