var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: {
		register: './public/src/register.js'
	},
	output: {
		path: path.resolve(__dirname, './public/dist'),
		publicPath: '/public/dist/',
		filename: '[name].entry.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/	
			}
		]
	},
};