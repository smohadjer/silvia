var fse = require("fs-extra");
var path = require('path');
var content = fse.readFileSync("projectConfig.json");
var jsonContent = JSON.parse(content);

function copyDependencies(type) {
  if (jsonContent.dependencies[type]) {
    jsonContent.dependencies[type].forEach(function(source) {
      var filename = path.basename(source);
      var destination = `.tmp/resources/${type}/${filename}`;
  
      fse.copy(source, destination, function (err) {
          if (err){
              console.log('An error occured while copying the folder.')
              return console.error(err)
          }
      });
    }); 
  }
}

function copyResources(folder) {
	const srcDir = './app/resources/' + folder;
	const destDir = './.tmp/resources/' + folder;

	//https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js
	try {
		fse.copySync(srcDir, destDir, {overwrite: true});
		console.log("success!");
	}
	catch (err) {
		console.error('error: ', err);
	}
}

copyDependencies('css');
copyDependencies('js');
copyResources('img');
copyResources('fonts');