const remotes = {
  content: {
    scope: "content",
    module: "./index",
    url: "//localhost:3001/remoteEntry.js",
  },
  footer: {
    scope: "footer",
    module: "./index",
    url: "//localhost:3002/remoteEntry.js",
  },
  header: {
    scope: "header",
    module: "./index",
    url: "//localhost:3003/remoteEntry.js",
  },
  helpCenter: {
    scope: "helpCenter",
    module: "./src/index",
    url: "//localhost:3004/remoteEntry.js",
    props: { buttonDirection: "bottom-right" },
  },
};

const webpackFormat = Object.keys(remotes)
  .map((name) => ({ [name]: `${name}@${remotes[name].url}` }))
  .reduce((prev, current) => ({ ...prev, ...current }), {});
module.exports = {
  remotes,
  webpackFormat,
};
