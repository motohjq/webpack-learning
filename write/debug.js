//webpack\lib\webpack.js
const webpack = require('./webpack/lib/webpack');
const config = require('./webpack.config.js');
const compiler = webpack(config);
debugger
compiler.run((err, stats) => {
	console.log(err);
	console.log(stats);
	for (const module of stats.modules) {
		console.log(module);
	}
});