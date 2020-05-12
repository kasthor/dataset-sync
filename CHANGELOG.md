# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.12.0](https://github.com/kasthor/dataset-sync/compare/v1.11.0...v1.12.0) (2020-05-12)


### Features

* ability to sync a collection, or an item within a collection ([abd6506](https://github.com/kasthor/dataset-sync/commit/abd6506))



## [1.11.0](https://github.com/kasthor/dataset-sync/compare/v1.10.5...v1.11.0) (2020-05-10)


### Bug Fixes

* improving parameters in colletion sync ([8a47e83](https://github.com/kasthor/dataset-sync/commit/8a47e83))


### Features

* report when data is found in the source but not in the mirror ([6336707](https://github.com/kasthor/dataset-sync/commit/6336707))


### Tests

* report when data is found in the source but not in the mirror ([8359f59](https://github.com/kasthor/dataset-sync/commit/8359f59))



### [1.10.5](https://github.com/kasthor/dataset-sync/compare/v1.10.3...v1.10.5) (2020-05-09)


### Bug Fixes

* return source result if any exception ([3761ae9](https://github.com/kasthor/dataset-sync/commit/3761ae9))
* styling ([ddf7606](https://github.com/kasthor/dataset-sync/commit/ddf7606))



### [1.10.4](https://github.com/kasthor/dataset-sync/compare/v1.10.3...v1.10.4) (2020-05-09)


### Bug Fixes

* return source result if any exception ([3761ae9](https://github.com/kasthor/dataset-sync/commit/3761ae9))



### [1.10.3](https://github.com/kasthor/dataset-sync/compare/v1.10.2...v1.10.3) (2020-05-09)


### Bug Fixes

* params issue when skipping promisify ([8012397](https://github.com/kasthor/dataset-sync/commit/8012397))



### [1.10.2](https://github.com/kasthor/dataset-sync/compare/v1.10.1...v1.10.2) (2020-05-09)


### Bug Fixes

* rethrow error from redis cache ([519d699](https://github.com/kasthor/dataset-sync/commit/519d699))



### [1.10.1](https://github.com/kasthor/dataset-sync/compare/v1.10.0...v1.10.1) (2020-05-09)



## [1.10.0](https://github.com/kasthor/dataset-sync/compare/v1.8.2...v1.10.0) (2020-05-09)


### Features

* if redis client already supports promises skip promisify step ([43a2c46](https://github.com/kasthor/dataset-sync/commit/43a2c46))


### Tests

* passing ([32eb438](https://github.com/kasthor/dataset-sync/commit/32eb438))



## [1.9.0](https://github.com/kasthor/dataset-sync/compare/v1.8.2...v1.9.0) (2020-05-09)


### Features

* if redis client already supports promises skip promisify step ([43a2c46](https://github.com/kasthor/dataset-sync/commit/43a2c46))


### Tests

* passing ([32eb438](https://github.com/kasthor/dataset-sync/commit/32eb438))



### [1.8.2](https://github.com/kasthor/dataset-sync/compare/v1.8.1...v1.8.2) (2020-05-08)



### [1.8.1](https://github.com/kasthor/dataset-sync/compare/v1.8.0...v1.8.1) (2020-05-08)



## [1.8.0](https://github.com/kasthor/dataset-sync/compare/v1.7.0...v1.8.0) (2020-05-08)


### Features

* if any error on the mirror, go to the source ([cd02ebd](https://github.com/kasthor/dataset-sync/commit/cd02ebd))



## [1.7.0](https://github.com/kasthor/dataset-sync/compare/v1.6.0...v1.7.0) (2020-04-23)


### Bug Fixes

* disabling reject reads ([583181c](https://github.com/kasthor/dataset-sync/commit/583181c))


### Features

* resolves to null if data not found ([6caa2b5](https://github.com/kasthor/dataset-sync/commit/6caa2b5))



## [1.6.0](https://github.com/kasthor/dataset-sync/compare/v1.5.0...v1.6.0) (2020-04-21)


### Bug Fixes

* tests green ([ccc7376](https://github.com/kasthor/dataset-sync/commit/ccc7376))


### Features

* if item not found in mirror it asks source ([c12a16d](https://github.com/kasthor/dataset-sync/commit/c12a16d))
* mongo rejects if null found ([73b1710](https://github.com/kasthor/dataset-sync/commit/73b1710))
* when item not found in redis it throws an exception ([aa1d01d](https://github.com/kasthor/dataset-sync/commit/aa1d01d))



## [1.5.0](https://github.com/kasthor/dataset-sync/compare/v1.4.3...v1.5.0) (2020-02-27)


### Features

* use source as a fail over on get ([c12d5a7](https://github.com/kasthor/dataset-sync/commit/c12d5a7))



### [1.4.3](https://github.com/kasthor/dataset-sync/compare/v1.4.2...v1.4.3) (2019-07-03)


### Bug Fixes

* when collection doesn't exists replace with empty object ([9ef0916](https://github.com/kasthor/dataset-sync/commit/9ef0916))



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
