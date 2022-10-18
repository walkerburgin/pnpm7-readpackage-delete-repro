# pnpm7-readpackage-delete-repro

## Repro

This should install cleanly with pnpm@6 and fail with pnpm@7 with an error like this:

```
/Volumes/git/walkerburgin/pnpm7-readpackage-delete-repro/packages/foo-app:
 ERROR  Cannot read properties of undefined (reading 'startsWith')

This error happened while installing the dependencies of @blueprintjs/core@1.40.0

pnpm: Cannot read properties of undefined (reading 'startsWith')
    at resolveDependency (/opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:134193:74)
    at resolveDependenciesOfDependency (/opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:133979:45)
    at /opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:133871:72
    at Array.map (<anonymous>)
    at resolveDependencies (/opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:133871:45)
    at resolveChildren (/opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:134046:54)
    at postponedResolution (/opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:134013:57)
    at /opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:133808:106
    at Array.map (<anonymous>)
    at /opt/homebrew/Cellar/pnpm/7.13.4/libexec/dist/pnpm.cjs:133808:77
```

## Notes

See `.pnpmfile.cjs`: 

```
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
```

This logs out:

```json
 {
  name: '@blueprintjs/core',
  version: '1.40.0',
  dependencies: {
    '@types/dom4': '^1.5.20',
    '@types/tether': '^1.1.27',
    classnames: '^2.2',
    dom4: '^1.8',
    'normalize.css': '4.1.1',
    'pure-render-decorator': '^1.1',
    tether: '^1.4',
    tslib: '^1.5.0',
    'react-addons-css-transition-group': undefined
  },
  devDependencies: {
    '@blueprintjs/karma-build-scripts': '^0.2.0',
    '@blueprintjs/node-build-scripts': '^0.2.0',
    bourbon: '^4.3.4',
    enzyme: '~2.9.1',
    karma: '^1.7.1',
    mocha: '^4.0.1',
    'node-sass': '^4.7.2',
    'npm-run-all': '^4.1.1',
    react: '^15.6.1',
    'react-addons-css-transition-group': '^15.6.1',
    'react-dom': '^15.6.1',
    'react-test-renderer': '^15.6.1',
    tslint: '^5.8.0',
    typescript: '~2.4.2',
    webpack: '^3.9.1'
  },
  peerDependencies: {
    react: '^16.0.0 || ^15.0.1 || ^0.14',
    'react-dom': '^16.0.0 || ^15.0.1 || ^0.14'
  },
  dist: {
    integrity: 'sha512-5qXiFLOZwKzKZFi+IVgiMictOfZPpkclgdpzte2BpZ4ptlNitFiK79aRmDu1O7rnA1iiR0EJRrE8p9gr95USRw==',
    shasum: '72db1bc2f161d34b7f4ab270bd84979b25f703ca',
    tarball: 'https://registry.npmjs.org/@blueprintjs/core/-/core-1.40.0.tgz',
    fileCount: 574,
    unpackedSize: 4699726,
    'npm-signature': '-----BEGIN PGP SIGNATURE-----\r\n' +
      'Version: OpenPGP.js v3.0.4\r\n' +
      'Comment: https://openpgpjs.org\r\n' +
      '\r\n' +
      'wsFcBAEBCAAQBQJbrAC+CRA9TVsSAnZWagAAjl0P/ijWC8bsqxT9qUwu0sqX\n' +
      'x8K40aMADk172TtSQ8ksmRdWsL5T695jdCtg7qYGbpislATk01DjsKhhDdd1\n' +
      'Dqlp3zovmrxs0VqnMr2DQ2scdCsx0waQGzSDNlisQ684JP3VMTkPKL3X0N0d\n' +
      'gvgUM7MnQk00jp+CotwPZQWcOEYRkg4kyC2gW+7U6mHyNNa7YwE79K4eTRwG\n' +
      'wk5WC4sYw5WVsJTOAUUVm43zwzsZZU3yYUacL6/24tiFydKn7a1c/Xaao+HK\n' +
      'ExVrqIOq2xvwRlwGnJlUrmBbZAJ3u6pQWALrHfUpmU3T768FEjgWJ3v6JV+s\n' +
      'riY2xso92UtK/fK6g/Q8ou4enCLTjriVf5gy1QhBXPasbjGZoCtxeT+ANHI/\n' +
      '1ilLckFDl8meebIbT82xr7QSTto9Q3hvGFFx8ZAQNITxUnoZQ8nKbv7Lr7Va\n' +
      'k3YWy/d9Lf4y2856UXyVTeYwHjIZBYwf35ajUPKn9m5Sri7sEyL9JGCaMA06\n' +
      'Aa5l/jGJrPeQm0w4il9zj9IuNyXgzXlLfPWsMXovmu9l0BWo9d+CMDJEcmgQ\n' +
      'riEf+ffwV/htQmiYxAm6Tqt+aXTK4PG65p9rq9watPkkZiwULt1bjE+rm415\n' +
      '5X/ox88ttiP5ulGD0HtHQh8lmChoO5C5a5NJQuQ+/7n+QrjwRVUExF95hyhV\n' +
      'JKLa\r\n' +
      '=xyfy\r\n' +
      '-----END PGP SIGNATURE-----\r\n',
    signatures: [ [Object] ]
  },
  optionalDependencies: {}
}
```

Note that `dependencies["react-addons-css-transition-group"]` is `undefined`!

