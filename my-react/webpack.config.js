var webpack = require('webpack');

module.exports = {
 //   entry: './src/index.js',
	entry: {
		index: './src/main/js/index.js',
		login: './src/main/js/components/login/index.js',
	},

  output: {
		// path: __dirname + '/public/',
  	path: __dirname + '/src/main/resources/static/built/',
    // filename: 'bundle.js'
		filename: '[name].js',
  },
	mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
		// 만약 두개 옵션을 모두 지정할 경우 “Hot Module Reloading”이 처음 발생한다.
		// 그리고 “Hot Module Reloading”이 안되면 전체 페이지 로딩을 한다.
    hot: true, // 컴포넌트가 수정 될 경우 그 수정된 부분만 리로드 해주는 부분 모듈 리로딩(“Hot Module Reloading”) 옵션
    inline: true, //전체 페이지에 대한 실시간 리로딩(“Live Reloading”) 옵션
    host: '0.0.0.0',
    port: 3000,
/*     contentBase: __dirname + '/src/main/resources/static/built/',*/
    publicPath: '/built/',
    proxy: {
      "**": "http://localhost:8080"
    }
  },

  module: {
  	rules: [
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
				// loader: 'babel-loader',
				use: {
          loader: "babel-loader",
					options: {
						presets: [
							// [
							// 	'@babel/preset-env', {
							// 		targets: { node: 'current' }, // 노드일 경우만
							// 		modules: 'false'
							// 	}
							// ],
							'@babel/preset-env',
							'@babel/preset-react',
		          // '@babel/preset-stage-0'
							// 'module:@babel/plugin-proposal-decorators',
						],
						plugins: [
							// "@babel/plugin-transform-runtime",
							// ["@babel/preset-stage-2", { decoratorsBeforeExport: true }],
							["@babel/plugin-proposal-decorators", { legacy: true }],
							["@babel/plugin-proposal-class-properties", { loose: true }]
						],
					}
        },
				// query: {
  			// 	// presets: ['react', 'es2015', 'stage-0'],
				// 	presets: ['@babel/react', '@babel/preset-es2015'],
  			// 	// plugins: ['transform-class-properties', 'transform-decorators-legacy'],
				// 	plugins: ['@babel/proposal-class-properties'],
				// },
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
