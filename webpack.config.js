var path = require('path')
var webpack = require('webpack')
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	entry: {
		shared: ['babel-polyfill', './public/src/shared.js'],
		register: ['babel-polyfill', './public/src/pages/register.js'],
		login: ['babel-polyfill', './public/src/pages/login.js'],
		index: ['babel-polyfill', './public/src/pages/index.js'],
		dashboard: ['babel-polyfill', './public/src/pages/dashboard.js'],
		projects: ['babel-polyfill', './public/src/pages/projects.js'],
		single_project: ['babel-polyfill', './public/src/pages/single_project.js'],
	},
	output: {
		path: path.resolve(__dirname, './public/dist'),
		publicPath: '/public/dist/',
		filename: '[name].entry.js'
	},
	devtool: 'cheap-source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/	
			}
		]
	},
	plugins: [
		new MinifyPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common' // Specify the common bundle's name.
		})
	]
};