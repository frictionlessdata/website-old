---
title: Tabular Data Resource
layout: spec
authors:
 - Paul Walsh
 - Rufus Pollock
mediatype: application/vnd.dataresource+json
version: 1.0-rc.2
updated: 2 May 2017
created: 15 December 2017
descriptor: dataresource.json
abstract: 'A simple format to describe a single tabular data resource such as a CSV file. It includes support both for metadata such as author and title and a schema to describe the data, for example the types of the fields/columns in the data.'
implementations:
  - title: Python
    link: https://github.com/frictionlessdata/tableschema-py
  - title: JavaScript
    link: https://github.com/frictionlessdata/tableschema-js
---

# Introduction

A **Tabular Data Resource** is a type of [Data Resource][dr] specialized for describing tabular data like CSV files or spreadsheets.

Tabular Data Resource extends [Data Resource][dr] in following key ways:

* The `schema` property MUST follow the [Table Schema][ts] specification
* A new `dialect` property to describe the CSV dialect. This property follows the [CSV Dialect][cd] specification.

[dr]: /data-resource/
[ts]: /table-schema/
[cd]: /csv-dialect/

## Examples

A minimal Tabular Data Resource looks as follows.

```javascript
// with data and a schema accessible via the local filesystem
{
  "name": "resource-name",
  "path": [ "resource-path.csv" ],
  "schema": "tableschema.json"
}

// with data accessible via http
{
  "name": "resource-name",
  "path": [ "http://example.com/resource-path.csv" ],
  "schema": "http://example.com/tableschema.json"
}
```

A minimal Tabular Data Resource example using the data property to inline data looks as follows.

```javascript
{
  "name": "resource-name",
  "data": [
    {
      "id": 1,
      "first_name": "Louise"
    },
    {
      "id": 2,
      "first_name": "Julia"
    }
  ],
  "schema": {
    "fields": [
      {
        "name": "id",
        "type": "integer"
      },
      {
        "name": "first_name",
        "type": "string"
      }
    ],
    "primaryKey": "id"
  }
}
```

A comprehensive Tabular Data Resource example with all required, recommended and optional properties looks as follows.

```javascript
{
  "name": "solar-system",
  "path": "http://example.com/solar-system.csv",
  "title": "The Solar System",
  "description": "My favourite data about the solar system.",
  "format": "csv",
  "mediatype": "text/csv",
  "encoding": "utf-8",
  "bytes": 1,
  "hash": "",
  "schema": {
    "fields": [
      {
        "name": "id",
        "type": "integer"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      }
    ],
    "primaryKey": "id"
  },
  "sources": "",
  "licenses": ""
}
```


# Specification

A Tabular Data Resource MUST be a [Data Resource][dr], that is it MUST conform to the [Data Resource specification][dr].

In addition:

* The Data Resource `schema` property MUST follow the [Table Schema][ts] specification
* The data the Data Resource describes MUST:
  * If non-inline: Be a CSV file
  * If inline data: be "JSON tabular data" that is array of data rows where each row is an `array` or `object` (see below)


## CSV file requirements

CSV files in the wild come in a bewildering array of formats. There is a standard for CSV files described in [RFC 4180](https://tools.ietf.org/html/rfc4180), but unfortunately this standard does not reflect reality. In Tabular Data Resource, CSV files `MUST` follow RFC 4180 with the following important exceptions allowed:

### File encoding

Files MUST:

* EITHER be encoded as UTF-8 (the default)
* OR the Tabular Data Resource MUST include an `encoding` property and the files `MUST` follow that encoding

NB: the RFC requires 7-bit ASCII encoding.

### CSV Dialect

The line terminator character `MUST` be LF or CRLF (the RFC allows CRLF only).

If the CSV differs from this or the RFC in any other way regarding dialect (e.g. line terminators, quote charactors, field delimiters), the Tabular Data Resource MUST contain a `dialect` property describing its dialect. The `dialect` property MUST follow the [CSV Dialect][cd] specification.

## JSON Tabular Data

JSON Tabular Data MUST be an `array` where each item in the array MUST be:

* EITHER: an array where each entry in the array is the value for that cell in the table
* OR: an object where each key corresponds to the header for that row and the value corresponds to the cell value for that row for that header

### Row Arrays

```javascript
[
  [ "A", "B", "C" ],
  [ 1, 2, 3 ],
  [ 4, 5, 6 ]
]
```

### Row Objects

```javascript
[
  { "A": 1, "B": 2, "C": 3 },
  { "A": 4, "B": 5, "C": 6 }
]
```
