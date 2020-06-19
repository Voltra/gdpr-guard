const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
	const mode = argv.mode || "development";
	console.log("running webpack with mode:", mode);

	const config = {
		mode,

		entry: {
			gdpr_guard: "./src/gdpr_guard.ts",
		},

		output: {
			filename: "[name].js",
			path: path.resolve(__dirname, "dist"),
			libraryTarget: "umd",
			library: "gdprGuard",
			umdNamedDefine: true,
		},

		resolve: {
			extensions: [".ts", ".tsx", ".js"],
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
	};

	if (mode === "development") {
		config.devtool = "inline-source-map";
	}

	return config;
};
