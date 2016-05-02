---
title: Developer Guide
---

This guide will introduce you to some the Frictionless Data tool stack and how you can contribute to it.

## Pre-requisites

This will assume you already have some high-level familiarity with the [Data Package family of specifications][dp-main].

## Implementing a Data Package Tool Stack

Here's a diagram that illustrates some of the core components of a full Data Package implementation. The JSON Table Schema items are only needed if you are planning support for [Tabular Data Packages][tdp] -- probably you will want to support tabular so you will need it!

<img src="https://docs.google.com/drawings/d/1VdcWNb-PnP9QyrlMlvMWBBvSGTy_Rfdcr77Xn1HpUOI/pub?w=646&h=793" />

### Python

The main Python library for working with Data Packages is `datapackage`:

See <http://github.com/frictionlessdata/datapackage-py>

Additional functionality such as JTS and JTS integration:

* <https://github.com/frictionlessdata/jsontableschema-py>
* <https://github.com/frictionlessdata/jsontableschema-sql-py>
* <https://github.com/frictionlessdata/jsontableschema-bigquery-py>

`tabulator` is a utility library that provides a consistent interface for reading tabular data:

https://github.com/frictionlessdata/tabulator-py

Here's an overview of the Python libraries available:

<img src="https://docs.google.com/drawings/d/1akNQUw1xOmdMOFAaJd-83O2gbB5kWcqg5lSYzmo0M5o/pub?w=646&h=793" alt="Python libraries">

### Javascript

Following "Node" style we have partitioned the Javascript library into pieces, see this list of libraries:

* <https://github.com/frictionlessdata?utf8=%E2%9C%93&query=js>

{%include markdown-link-refs.html %}

And here's an overview of the Python libraries available:

<img src="{{ site.baseurl }}/img/python-libraries.svg" alt="Python libraries">
