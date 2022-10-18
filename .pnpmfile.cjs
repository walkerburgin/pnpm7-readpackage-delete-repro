function readPackage(pkg) {
  if (pkg.name === "@blueprintjs/core" && pkg.version === "1.40.0") {
      // In later versions of Blueprint this moved from a peer dependency to a direct dependency
      pkg.dependencies["react-addons-css-transition-group"] = pkg.peerDependencies["react-addons-css-transition-group"];
      delete pkg.peerDependencies["react-addons-css-transition-group"];

      console.log("@blueprintjs/core@1.40.0: \n\n",  pkg, "\n\n");
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
