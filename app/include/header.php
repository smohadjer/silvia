<nav>
	<ul>
		<li <?php if ($pageId == 'home') {echo 'class="selected"';}?>><a href="index.php">Home</a></li>
		<li <?php if ($pageId == 'psycho') {echo 'class="selected"';}?>><a href="psychotherapie.php">Weg zur Psychotherapie</a></li>
		<li <?php if ($pageId == 'about') {echo 'class="selected"';}?>><a href="ueber-mich.php">Über mich</a></li>
		<li <?php if ($pageId == 'contact') {echo 'class="selected"';}?>><a href="kontakt.php">Kontakt</a></li>
		<li <?php if ($pageId == 'links') {echo 'class="selected"';}?>><a href="links.php">Links</a></li>
	</ul>
</nav>
