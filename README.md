<h1 align="center">Welcome to es-pocket-search 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/sc0ttwad3/es-pocket-search#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/sc0ttwad3/es-pocket-search/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/sc0ttwad3/es-pocket-search/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

Made with ☕️ by [sc0ttwad3](http://www.sc0ttwad3.com)

> Node server for interacting with Pocket data as searchable elasticsearch indexes

### 🏠 [Homepage](https://github.com/sc0ttwad3/es-pocket-search#readme)

## Install

```sh
npm install
```

## Notes

### Access to local Docker/Kubernetes resources from WSL 2

UPDATE: localhost now works in WSL 2

Because of the way WSL 2 runs, it has a different IP than the Windows 10 host, so from the command line when accessing localhost (the windows) you must use the IP address:

```
# example query
$ curl -XGET http://192.168.1.100:9200/pocket/_search d '{"query":{"terms":{"_id":["323752906","325344783"]}}}' | jq .
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Scott Wade &lt;sc0ttwad3@gmail.com&gt; (http://sc0ttwad3.com)**

- Github: [@sc0ttwad3](https://github.com/sc0ttwad3)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/sc0ttwad3/es-pocket-search/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Scott Wade &lt;sc0ttwad3@gmail.com&gt; (http://sc0ttwad3.com)](https://github.com/sc0ttwad3).<br />
This project is [MIT](https://github.com/sc0ttwad3/es-pocket-search/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
