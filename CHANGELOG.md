# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.2](https://github.com/kasthor/dataset-sync/compare/v1.4.1...v1.4.2) (2019-07-02)


### Bug Fixes

* use parsed objects on checksum ([46d2798](https://github.com/kasthor/dataset-sync/commit/46d2798))
* using custom version of node-object-hash ([2cefd76](https://github.com/kasthor/dataset-sync/commit/2cefd76))



### [1.4.1](https://github.com/kasthor/dataset-sync/compare/v1.4.0...v1.4.1) (2019-07-02)



## [1.4.0](https://github.com/kasthor/dataset-sync/compare/v1.3.4...v1.4.0) (2019-06-29)


### Bug Fixes

* ensure key is ObjectId for set, and string when read ([91d89ce](https://github.com/kasthor/dataset-sync/commit/91d89ce))


### Features

* use object-hash to generate checksums ([05a9f22](https://github.com/kasthor/dataset-sync/commit/05a9f22))



### [1.3.4](https://github.com/kasthor/dataset-sync/compare/v1.3.3...v1.3.4) (2019-06-29)


### Bug Fixes

* findOne with Object Id ([a13c83d](https://github.com/kasthor/dataset-sync/commit/a13c83d))



### [1.3.3](https://github.com/kasthor/dataset-sync/compare/v1.3.2...v1.3.3) (2019-06-29)


### Bug Fixes

* convert mongo response array to key-value pair object ([ce2cc78](https://github.com/kasthor/dataset-sync/commit/ce2cc78))



### [1.3.2](https://github.com/kasthor/dataset-sync/compare/v1.3.1...v1.3.2) (2019-06-29)


### Bug Fixes

* checksums tolerant to empty objects ([f75f580](https://github.com/kasthor/dataset-sync/commit/f75f580))



### [1.3.1](https://github.com/kasthor/dataset-sync/compare/v1.3.0...v1.3.1) (2019-06-28)


### Bug Fixes

* reads as a role but not as a restriction ([fdb799e](https://github.com/kasthor/dataset-sync/commit/fdb799e))



## [1.3.0](https://github.com/kasthor/dataset-sync/compare/v1.2.10...v1.3.0) (2019-06-28)


### Features

* specify client type explicitly ([eeb80c7](https://github.com/kasthor/dataset-sync/commit/eeb80c7))



### [1.2.10](https://github.com/kasthor/dataset-sync/compare/v1.2.9...v1.2.10) (2019-06-28)


### Bug Fixes

* properly recognize Mongo connection ([112c94a](https://github.com/kasthor/dataset-sync/commit/112c94a))



### [1.2.9](https://github.com/kasthor/dataset-sync/compare/v1.2.8...v1.2.9) (2019-06-28)


### Bug Fixes

* properly recognize Mongo connection ([fb9678b](https://github.com/kasthor/dataset-sync/commit/fb9678b))



### [1.2.8](https://github.com/kasthor/dataset-sync/compare/v1.2.7...v1.2.8) (2019-06-28)


### Bug Fixes

* retreive data with toArray from mongo ([2cf64b4](https://github.com/kasthor/dataset-sync/commit/2cf64b4))



### [1.2.7](https://github.com/kasthor/dataset-sync/compare/v1.2.6...v1.2.7) (2019-06-28)


### Bug Fixes

* JSON.stringify to convert value to string ([82531a3](https://github.com/kasthor/dataset-sync/commit/82531a3))



### [1.2.6](https://github.com/kasthor/dataset-sync/compare/v1.2.5...v1.2.6) (2019-06-28)


### Bug Fixes

* compatibility with node 6 ([1785c5b](https://github.com/kasthor/dataset-sync/commit/1785c5b))



### [1.2.5](https://github.com/kasthor/dataset-sync/compare/v1.2.4...v1.2.5) (2019-06-28)


### Bug Fixes

* compatibility with node 6 ([bc84295](https://github.com/kasthor/dataset-sync/commit/bc84295))



### [1.2.4](https://github.com/kasthor/dataset-sync/compare/v1.2.3...v1.2.4) (2019-06-28)


### Bug Fixes

* compatibility with node 6 ([996fd63](https://github.com/kasthor/dataset-sync/commit/996fd63))



### [1.2.3](https://github.com/kasthor/dataset-sync/compare/v1.2.2...v1.2.3) (2019-06-28)


### Bug Fixes

* compatibility with node 6 ([3058d6b](https://github.com/kasthor/dataset-sync/commit/3058d6b))



### [1.2.2](https://github.com/kasthor/dataset-sync/compare/v1.2.1...v1.2.2) (2019-06-28)


### Bug Fixes

* compatibility with node 6 ([c2fe920](https://github.com/kasthor/dataset-sync/commit/c2fe920))



### [1.2.1](https://github.com/kasthor/dataset-sync/compare/v1.2.0...v1.2.1) (2019-06-28)


### Bug Fixes

* make main class fully accesible ([0a84b16](https://github.com/kasthor/dataset-sync/commit/0a84b16))



## [1.2.0](https://github.com/kasthor/dataset-sync/compare/v1.1.0...v1.2.0) (2019-06-27)


### Features

* allow to send client with custom options ([b2de513](https://github.com/kasthor/dataset-sync/commit/b2de513))



## [1.1.0](https://github.com/kasthor/dataset-sync/compare/v1.0.0...v1.1.0) (2019-06-27)


### Features

* items allow or deny reads or writes ([489b42b](https://github.com/kasthor/dataset-sync/commit/489b42b))
* mirrors are filtered by read/write allowance ([f5669bc](https://github.com/kasthor/dataset-sync/commit/f5669bc))



## 1.0.0 (2019-06-27)


### Features

* syncs a dataset from one datasource to multiple datasources 9f547e8
