import path from 'path'

export default {
    entry: { bundle:['./src/main.js', './src/scss/scss.js'] },
    output: {
        path: path.resolve(__dirname, 'build/Release'),
        filename: 'bundle.js'
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