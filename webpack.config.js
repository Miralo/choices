var path = require('path')
var webpack = require('webpack')
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	entry: {
		shared: './public/src/shared.js',
		register: './public/src/pages/register.js',
		login: './public/src/pages/login.js',
		index: './public/src/pages/index.js',
		dashboard: './public/src/pages/dashboard.js',
		projects: './public/src/pages/projects.js',
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