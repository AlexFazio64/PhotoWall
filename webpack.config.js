module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: require("path").resolve(__dirname, "docs"),
        filename: "app.js",
    },
    devServer: {
        static: {
            directory: require("path").join(__dirname, "docs"),
        },
    }
};