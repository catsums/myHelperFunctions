const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	resolve: {
		extensions: ['*', '.js'],
		fallback: {
			"fs": false,
			"url": false,
			"tls": false,
			"net": false,
			"path": false,
			"zlib": false,
			"http": false,
			"https": false,
			"stream": false,
			"crypto": false,
			"assert": false,
			"os": false,
		},
	},
//	 entry: ["./lib/esm/index.mjs"],
	entry: {
	"esm/index": "./lib/esm/index.mjs",
	"cjs/index": "./lib/cjs/index.js",
	},
	output:{
		path: path.resolve(__dirname, './lib/min'),
		publicPath: '/',
		filename: "[name].min.js",
		globalObject: 'this',
		library: {
			name: "MY",
			type: "umd"
		},
	},	
	mode: "production",
	module:{
		rules:[
			{
				test:/\.(js|jsx|mjs)/, 
				exclude: /node_modules/, 
				use:{ loader:"babel-loader" } 
			},
		],
	},
	plugins: [],
};