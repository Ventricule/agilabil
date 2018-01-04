<!DOCTYPE HTML>
<html lang="fr" class="normal">
<head>
    <meta charset="utf-8">
    <title>HTML2print</title>

    <?= css(array(
      "https://fonts.googleapis.com/css?family=Archivo+Narrow:400,400i,600,600i|Concert+One|Nunito:800,800i,900,900i&amp;subset=latin-ext",
      "/assets/css/main.css"
    ));
    ?>

    <?= js(array(
      "/assets/lib/jquery.min.js",
      "/assets/js/html2print.js"
    ));
    ?>

</head>
<body>
    <!-- PAGES -->
    <div id="pages">
        <div id="master-page" class="paper">
            <div class="page">
                <div class="header"></div>

                <div class="body recipient"></div>

                <div class="footer">
                    <div class="chapter"></div>
                </div>
            </div>
        </div>
				<div id="master-page-columns" class="paper">
            <div class="page">
                <div class="header"></div>

                <div class="body two-columns-layout recipient"></div>
                <div class="body two-columns-layout recipient"></div>

                <div class="footer">
                    <div class="chapter"></div>
                </div>
            </div>
        </div>
    </div>


    <div id="stories">
        <article id="my-story">
          <?= $page->text()->kirbytext() ?>
        </article>
    </div>

</body>
</html>
