---
title:  Changelog
layout: changelog
log:
  - title: 'consolidated'
    changes:
    - '`1.0.0-rc1`: Massive refactoring for v1.'

  - title: 'table-schema'
    changes:
    - '`1.0.0-pre15`: add calendar units `gyear` and `gyearmonth` ([#105](https://github.com/dataprotocols/dataprotocols/issues/105)), tweak pattern support for date/time types [#260](https://github.com/frictionlessdata/specs/issues/260)'
    - '`1.0.0-pre14`: add support for `missingValue` ([#97](https://github.com/dataprotocols/dataprotocols/issues/97))'
    - '`1.0.0-pre13`: remove `null` datatype ([#262](https://github.com/dataprotocols/dataprotocols/issues/262))'
    - '`1.0.0-pre12`: add support for new number properties such as `decimalChar`([#246](https://github.com/dataprotocols/dataprotocols/issues/246))'
    - '`1.0.0-pre11`: add new field property: rdfType ([#217](https://github.com/dataprotocols/dataprotocols/issues/217))'
    - '`1.0.0-pre10`: add new field types: duration ([#210](https://github.com/dataprotocols/dataprotocols/issues/210))'
    - '`1.0.0-pre9`: make date formats stricter for default [issue](https://github.com/dataprotocols/dataprotocols/issues/104). Define value of fmt:PATTERN for dates [issue](https://github.com/dataprotocols/dataprotocols/issues/200)'
    - '`1.0-pre8`: Rename contraints.oneOf to contraints.enum [issue](https://github.com/dataprotocols/dataprotocols/issues/191)'
    - '`1.0-pre7`: Add contraints.oneOf [issue](https://github.com/dataprotocols/dataprotocols/issues/175)'
    - '`1.0-pre6`: clarify types and formats [issue](https://github.com/dataprotocols/dataprotocols/issues/159)'
    - '`1.0-pre5`: add type validation [issue](https://github.com/dataprotocols/dataprotocols/issues/95)'
    - '`1.0-pre4`: add foreign key support - see this [issue](https://github.com/dataprotocols/dataprotocols/issues/23)'
    - '`1.0-pre3.2`: add primary key support (see this [issue](https://github.com/dataprotocols/dataprotocols/issues/21))'
    - '`1.0-pre3.1`: breaking changes. `label` (breaking) changed to `title` - see [Closer alignment with JSON Schema](https://github.com/dataprotocols/dataprotocols/issues/46). `id` changed to `name` (with slight alteration in semantics - i.e. SHOULD be unique but no longer MUST be unique)'

  - title: 'tabular-data-package'
    changes:
    - '`1.0-beta-4`: no substantive changes but clarify schema referencing ([#264](https://github.com/frictionlessdata/specs/issues/264)'
    - '`1.0-beta-3`: no substantive changes but clarify where we differ from CSV RFC ([#204](https://github.com/dataprotocols/dataprotocols/issues/204))'
    - '`1.0-beta-2`: renamed from Simple Data Format to Tabular Data Package'

  - title: 'data-package'
    changes:
    - '`1.0.0-beta.18`: (!) merge resource property url with path [issues #250](https://github.com/frictionlessdata/specs/issues/250), allow for multiple data files per resource [issue #228](https://github.com/frictionlessdata/specs/issues/228)'
    - '`1.0.0-beta.17`: make resources property required as per [issues #253](https://github.com/dataprotocols/dataprotocols/issues/253)'
    - '`1.0.0-beta.16`: description is markdown formatted as per [issue #152](https://github.com/dataprotocols/dataprotocols/issues/152); MimeType for Data Packages is vnd.datapackage [issue #245](https://github.com/dataprotocols/dataprotocols/issues/245)'
    - '`1.0.0-beta.15`: only one of `url`, `path`, `data` present on as per [issue #223](https://github.com/dataprotocols/dataprotocols/issues/223); remove `base` property as per [issue #232](https://github.com/dataprotocols/dataprotocols/issues/232)'
    - '`1.0.0-beta.14`: drop `licenses` in favour of `license` as per [issue #214](https://github.com/dataprotocols/dataprotocols/issues/214)'
    - '`1.0.0-beta.13`: add support for sharing schemas across resources via schema references as per [issue #71](https://github.com/dataprotocols/dataprotocols/issues/71)'
    - '`1.0.0-beta.12`: remove `datapackage_version` as per [issue #140](https://github.com/dataprotocols/dataprotocols/issues/140)'
    - '`1.0.0-beta.11`: introduce `author`, integrate with `contributors` and remove `maintainers` and `publishers` as per this [issue](https://github.com/dataprotocols/dataprotocols/issues/130)'
    - '`1.0.0-beta.10`: `license` introduced and `licenses` updated as per this [issue](https://github.com/dataprotocols/data-packages/issues/1)'
    - '`1.0.0-beta.8`: `last_modified` and `modified` removed following this [issue](https://github.com/dataprotocols/dataprotocols/issues/83)'
    - '`1.0.0-beta.7`: `dependencies` renamed to `dataDependencies` following this [issue](https://github.com/dataprotocols/dataprotocols/issues/75)'
    - '`1.0.0-beta.5` -> `1.0-beta.6`: Moved `resources` from MUST to MAY'

  - title: 'csv-dialect'
    changes:
    -  '`1.2.1`: [case-sensitive header](https://github.com/dataprotocols/dataprotocols/issues/193#issuecomment-99774395)'
    -  '`1.2`: (breaking) - for details see this [issue](https://github.com/dataprotocols/dataprotocols/issues/99). Remove dialect attribute moving all other attributes up one level up one level. Specify defaults for most attributes.'
---

Prior to v1, the changelog for each specification was distinct. See [pre-v1.frictionlessdata.io](https://pre-v1.frictionlessdata.io/)
