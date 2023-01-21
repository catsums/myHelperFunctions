const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== "production";

const DEFAULT = {
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
	entry: {
		"cjs/index": "./lib/cjs/index.js",
		"esm/index": "./lib/esm/index.js",
		"min/esm/index.min": "./lib/esm/index.mjs",
		"min/cjs/index.min": "./lib/cjs/index.js",
	},
	output:{
		path: path.resolve(__dirname, './lib/dist'),
		publicPath: '/',
		filename: "[name].js",
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


var config = {
	resolve: DEFAULT.resolve,
	entry: {
	"cjs/index": "./lib/cjs/index.js",
	"esm/index": "./lib/esm/index.mjs",
	},
	output:{
		path: path.resolve(__dirname, './lib/dist'),
		publicPath: '/',
		filename: "[name].js",
		globalObject: 'this',
		library: {
			name: "MY",
			type: "umd"
		},
	},	
	mode: "development",
	module: DEFAULT.module,
	plugins: DEFAULT.plugins,
};

var configMin = {
	resolve: DEFAULT.resolve,
	entry: {
		"cjs/index": "./lib/cjs/index.js",
		"esm/index": "./lib/esm/index.mjs",
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
	module: DEFAULT.module,
	plugins: DEFAULT.plugins,
};

module.exports = [
	config, configMin
];