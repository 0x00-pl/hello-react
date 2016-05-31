import path from 'path'

export default {
    entry: {
        bundle: './src/main.js',
        scss: './src/scss/scss.js',
        'center-pop': './src/scss/center-pop.js',
        'model': './src/scss/model.js',
        'baidu': './src/scss/baidu.js',
        'pages': './src/scss/pages.js',
    },
    output: {
        path: path.resolve(__dirname, 'build/Release'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.sass$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
}