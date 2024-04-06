    const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            },
            { 
                test: /\.css$/, 
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ] 
            },
            { 
                test: /\.(ts|tsx|js)$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'ts-loader', 
                    options: {
                        compilerOptions: {
                            noEmit: false, 
                        },
                    } 
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },

    devServer: {
        hot: true, 
        port: 8080,
        historyApiFallback: true,
        proxy: [{
            context: ['/user', '/note'],
            target: 'http://localhost:4000',
        }],
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}
