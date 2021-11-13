var fs = require("fs-extra");
var concat = require("concat");

fs.mkdirSync('dist/resources/css', { recursive: true }, (err) => {
	if (err) throw err;
});

fs.mkdirSync('dist/resources/js', { recursive: true }, (err) => {
	if (err) throw err;
});

concat('.tmp/resources/css', 'dist/resources/css/styles.min.css');
concat('.tmp/resources/js', 'dist/resources/js/bundle.js');

copyFile('app/apple-touch-icon.png', 'dist/apple-touch-icon.png');
copyFile('app/.htaccess', 'dist/.htaccess');

copyFolder('app/assets', 'dist/assets');
copyFolder('app/include', 'dist/include');
copyFolder('app/content', 'dist/content');
copyFolder('app/resources/img', 'dist/resources/img');
copyFolder('app/resources/fonts', 'dist/resources/fonts');

function copyFile(source, destination) {
	fs.pathExists(source, (err, exists) => {
    if (err) {
      console.log(err, source) // => null
    }

		if (exists) {
			fs.copy(source, destination, function (err) {
				if (err){
					console.log('An error occured while copying the folder.')
					return console.error(err)
				}
				console.log(source, ' copy completed!')
			});
		}
	});
}

function copyFolder(source, destination) {
	if (fs.existsSync(source)) {
		fs.copy(source, destination, function (err) {
			if (err){
				console.log('An error occured while copying the folder.')
				return console.error(err)
			}
			console.log(source, ' copy completed!')
		});
	}
}
