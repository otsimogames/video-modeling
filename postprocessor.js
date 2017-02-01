var fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};

function replaceAsync(fileName, target, to) {
	fs.readFile(fileName, 'utf-8', function(err, data) {
		if (err)
			throw err;

		var newValue = data.replaceAll(target, to);

		fs.writeFile(fileName, newValue, 'utf-8', function(err) {
			if (err)
				throw err;
			console.log(fileName + ' complete');
		});
	});
}

fs.readdir("public", (err, files) => {
	files.forEach(file => {
		if (file.includes(".css")) {
			replaceAsync("public/" + file, 'url("/img', 'url("img');
			return false;
		}
	});
});

fs.readdir("public", (err, files) => {
	files.forEach(file => {
		if (file.includes(".json")) {
			replaceAsync("public/" + file, '"/img', '"img');
			return false;
		}
	});
});

fs.readdir("public", (err, files) => {
	files.forEach(file => {
		if (file.includes(".html")) {
			replaceAsync("public/" + file, /<!--StartDevelopment-->[\s\S]*<!--CloseDevelopment-->/g, '');
			return false;
		}
	});
});
