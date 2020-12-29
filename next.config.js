module.exports = {
  env: {
    APP_NAME: "Barangay",
    BASEPATH: "http://localhost:3000",
    NEO4J_URI: "bolt://54.90.54.66:38317",
    NEO4J_USER: "neo4j",
    NEO4J_PASSWORD: "volts-proposes-finger",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.module.rules.push({
      test: /\.worker\.ts$/,
      use: [
        {
          loader: "comlink-loader",
          options: {
            singleton: true,
            name: "static/[hash].worker.js",
            publicPath: "/_next/",
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  },
};
