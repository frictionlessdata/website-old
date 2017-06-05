---
title: Implementation
layout: specs
---

## Overview

This document is meant to serve as an introduction and an entry point into writing a library that implements a Frictionless Data specification. The focus is on two libraries in particular - Data Package and Table Schema - as implementing these libraries essentially implements the whole family of specifications.

The reader, being an implementer/maintainer of such libraries, should get a clear understanding of the reference material available for undertaking work, and the minimal set of **actions** that such libraries must enable for their users.

We prefer to focus on **actions** rather than features, feature sets, user stories, or more formal API specifications as we want to leave enough flexibility for implementations that follow the idioms of the host language, yet we do want to ensure a common base of *what can be done* with an implementation in any language.

## Context

While OKI and various other 3rd parties have been using the [Data Package family of specifications](http://specs.frictionlessdata.io) with great success for several years, it has mostly been over the last 12 months that we are starting to see more mature libraries to implement the specifications at a "low level" for ease of reuse.

At present, we consider the libraries maintained by Open Knowledge International in both Python and JavaScript to be reference implementations that serve as a guide for how to approach the specifications in code, and the type of actions that are enabled for users of the libraries. Further, we make extensive use of [JSON Schema](http://json-schema.org) to validate `descriptors` that are passed to these libraries. This enables significant reuse across implementations for descriptor validation logic.

## High-level requirements

Here we will describe the minimal requirements for implementing Frictionless Data specifications in a given programming language. Based on the Python and JavaScript implementations, the implementations are split across two packages: `Data Package` and `Table Schema`.

Also, see the [stack reference](https://github.com/frictionlessdata/stack/blob/master/README.md) section below for some naming conventions we use, and that ideally should be followed in new implementations.

### Data Package library

The Data Package library can load and validate any `descriptor` for a **Data Package Profile**, allow the creation and modification of `descriptors`, and expose methods for reading and streaming data in the package. When a `descriptor` is a Tabular Data Package, it uses the Table Schema library, and exposes its functionality, for each `resource` object in the `resources` array.

#### References

- [Data Package specification](http://specs.frictionlessdata.io/data-package/)
- [Data Package Profiles](http://specs.frictionlessdata.io/data-package/#profiles)
- [Tabular Data Package specification (the most commonly used and useful Profile)](http://specs.frictionlessdata.io/tabular-data-package/)
- [JSON Schema Registry](http://specs.frictionlessdata.io/schemas/registry.json)
- [JavaScript implementation](https://github.com/frictionlessdata/datapackage-js)
- [Python implementation](https://github.com/frictionlessdata/datapackage-py)

#### Actions

- read an existing Data Package descriptor
- validate an existing Data Package descriptor, including profile-specific validation via the registry of JSON Schemas
- create a new Data Package descriptor
- edit an existing Data Package descriptor
- as part of editing a descriptor, helper methods to add and remove resources from the resources array
- validate edits made to a data package descriptor
- save a Data Package descriptor to a file path
- zip a Data Package descriptor and its co-located references (more generically: "zip a data package")
- read a zip file that "claims" to be a data package
- save a zipped Data Package to disk

#### Examples

- [Datapackage](https://github.com/frictionlessdata/datapackage-js/blob/master/src/datapackage.js)
- [Resource](https://github.com/frictionlessdata/datapackage-js/blob/master/src/resource.js)
- [validate](https://github.com/frictionlessdata/datapackage-js/blob/master/src/validate.js)

### Table Schema library

The Table Schema library can load and validate any Table Schema `descriptor`, allow the creation and modification of `descriptors`, expose methods for reading and streaming data that conforms to a Table Schema via the Tabular Data Resource abstraction.

#### References

- [Table Schema specification](http://specs.frictionlessdata.io/table-schema/)
- [Tabular Data Resource specification](http://specs.frictionlessdata.io/tabular-data-resource/)
- [JSON Schema Registry](http://specs.frictionlessdata.io/schemas/registry.json)
- [JavaScript implementation](https://github.com/frictionlessdata/tableschema-js)
- [Python implementation](https://github.com/frictionlessdata/tableschema-py)

#### Actions

- read an existing Table Schema descriptor
- validate an existing Table Schema descriptor using the JSON Schema spec
- create a new Table Schema descriptor
- edit an existing Table Schema descriptor
- provide a model-type interface to interact with a descriptor
- infer a Table Schema descriptor from a supplied sample of data
- validate a data source against the Table Schema descriptor, including in response to editing the descriptor
- enable streaming and reading of a data source *through* a Table Schema (cast on iteration)

#### Examples

- [Table](https://github.com/frictionlessdata/jsontableschema-py/blob/master/jsontableschema/table.py)
- [Schema](https://github.com/frictionlessdata/jsontableschema-py/blob/master/jsontableschema/schema.py)
- [Field](https://github.com/frictionlessdata/jsontableschema-py/blob/master/jsontableschema/field.py)
- [validate](https://github.com/frictionlessdata/jsontableschema-py/blob/master/jsontableschema/validate.py)
- [infer](https://github.com/frictionlessdata/jsontableschema-py/blob/master/jsontableschema/infer.py)

### On URI dereferencing and validation

Some properties in the Frictionless Data specifications allow a URI that resolves to an object. This does not refer to the `uri` property itself, but rather other properties where a URI may be allowed to reference the actual value of the property.

The most prominent example of this is the `schema` property on Tabular Data Resource descriptors.

While allowing for such references has pratical use for publishers - for example, allowing schema reuse - it does introduce difficulties in the validation of such properties. Validating a URI "as is", in such cases, does little to guarantee the integrity of the value that is referenced, and so the JSON Schemas used for descriptor validation expect, and validate for, the resolved value, not the reference (the URI).

Implementors `MUST` dereference such properties before attempting to validator a descriptor. At present, this requirement applies to the following properties in Tabular Data Package and Tabular Data Resource:

- `schema`
- `dialect`

### Other libraries

Data Package and Table Schema implement the core Frictionless Data specifications. The JavaScript implementations maintained by Open Knowledge International essentially follow the above requirements as is. However, our Python toolchain has some additional libraries - `goodtables` and `tabulator` - which are an important part of the Frictionless Data stack, and we would be delighted to see them implemented in other languages either as standalone libraries, or, as part of a wider effort in implementing Data Package and Table Schema.

#### tabulator

tabulator provides a consistent interface for streaming reading and writing of tabular data. It supports CSV, which is required for Table Schema, Tabular Data Resource, and Tabular Data Package, and also supports Excel, JSON, newline delimited JSON, Google Sheets, and ODS.

##### References

- [Python implementation](https://github.com/frictionlessdata/tabulator-py)

#### goodtables

goodtables validates tabular data, checking for structural and schematic errors, and producing reports that can be used to iterate on data file sources as part of common data publication work flows. goodtables uses `tabulator`, `tableschema`, and `datapackage` internally, as well as implementing `data-quality-spec`.

It may be of general interest that `goodtables` is also avaiable as a service - [`goodtables.io`](https://goodtables.io) - providing continuous data validation in the style of CI solutions for code.

##### References

- [Python implementation](https://github.com/frictionlessdata/goodtables-py)
- [Data Quality Spec](https://github.com/frictionlessdata/data-quality-spec)

## Work process

Open Knowledge International [coding standards can be found here](https://github.com/okfn/coding-standards). While some of the standards document refers to idioms in JavaScript and Python, much of it is about more general standards around using git, testing requirements and so on. These need to be adhered to.

We have some small example code repositories in Python and JavaScript that demonstrate these coding standards.

- [Python Package Example](https://github.com/okfn/oki-py)
- [JavaScript Package Example](https://github.com/okfn/oki-js)

If you would *like* to contribute sections based on idioms in your target language, that would be great: it will serve as a further reference to others, and also have the added benefit of enabling our team to learn from you.
