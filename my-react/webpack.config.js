var webpack = require('webpack');

module.exports = {
 //   entry: './src/index.js',
	entry: {
		index: './src/main/js/index.js',
		login: './src/main/js/components/login/index.js',
	},

    output: {
//        path: __dirname + '/public/',
    	path: __dirname + '/src/main/resources/static/built/',
        // filename: 'bundle.js'
				filename: '[name].js',
    },

    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 3000,
   /*     contentBase: __dirname + '/src/main/resources/static/built/',*/
        publicPath: '/built/',
        proxy: {
            "**": "http://localhost:8080"
        }
    },

    module: {
    	loaders: [
            {
                test: /\.js$/,
              /*  loaders: ['react-hot-loader','babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],*/
                /*loaders: [
                    'react-hot-loader',
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
                  ], */
								loader: 'babel-loader',
        				query: {
          				presets: ['react', 'es2015', 'stage-0'],
          				plugins: ['transform-class-properties', 'transform-decorators-legacy'],
        				},
                exclude: /node_modules/,

            },
            {
            	test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
            	test: /\.css$/,
            	loader: "style-loader!css-loader"
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
