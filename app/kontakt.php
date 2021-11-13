<?php $pageId = 'contact' ?>
<!doctype html>
<html class="no-js" lang="en">
	<head>
		<meta charset="utf-8">
		<title>Silvia Mohadjer - Praxis für Psychoanalyse und Psychotherapie in Freiburg</title>
		<meta name="description" content="Silvia Mohadjer - Psychologische Psychotherapeutin und Psychoanalytikerin in Freiburg">
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- build:css resources/css/styles.min.css -->
		<link rel="stylesheet" href="../.tmp/resources/css/helper.css">
		<link rel="stylesheet" href="../.tmp/resources/css/hamburgers.css">
		<link rel="stylesheet" href="../.tmp/resources/css/styles.css">
		<!-- endbuild -->
	</head>
	<body>
    <div id="overall-wrapper">
      <?php include('include/header.php'); ?>
      <div class="content <?= $pageId ?>">
        <div id="menu"><span>Menu</span></div>
        <header>
          <p><span>Dipl.-Psych.</span> Silvia Mohadjer-Chouaf</p>
          <h1>Psychologische Psychotherapeutin <span>und</span> Psychoanalytikerin (DGPT) in Freiburg</h1>
        </header>
        <?php include('content/html/contact.html'); ?>
        <?php include('content/html/footer.html'); ?>
      </div>
    </div>
		<script>
			var myApp = {};
		</script>
		<!-- build:js resources/js/bundle.js -->
		<script type="module" src="resources/js/main.js"></script>
		<!-- endbuild -->
	</body>
</html>

