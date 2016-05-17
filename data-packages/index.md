---
title: Data Packages
redirect_from: /standards/
---

At its core, Frictionless Data is driven by the
[Data Package specification][dp], a simple format for packaging data
for sharing between tools and people. Associated specifications
include [Tabular Data Package][tdp], a format for packaging tabular
data, [JSON Table Schema][jts], a specification for defining a
*schema* for tabular data, and
[CSV Dialect Description Format][spec-csvddf] (CSV-DDF), a
specification for defining a *dialect* for CSV data.

## How do these specifications relate?

A **Data Package** can "contain" any type of file.  A **Tabular Data
Package** is a special type of Data Package that "contains" one or
more CSV files.  In a Tabular Data Package, each CSV must have
*schema* defined using **JSON Table Schema** and, optionally, a
*dialect* defined using **CSV-DDF**.  An application or library that
consumes Tabular Data Packages therefore must be able to understand
not only the full Data Package specification, but also JSON Table
Schema and CSV-DDF.

<img src="https://docs.google.com/drawings/d/19DTSTlxkOdTgieTWhnTNLAZtxn_ie63DV-vEGW_TP_E/pub?w=960&amp;h=720">

For more information on each specification, see below:

## Data Package

- [Overview][dp]
- [Full Specification][spec-dp]

## Tabular Data Package

- [Overview][tdp]
- [Full Specification][spec-tdp]

## JSON Table Schema

- [Overview][jts]
- [Full Specification][spec-jts]

## CSV Dialect Description Format

- [Full Specification][spec-csvddf]

{%include markdown-link-refs.html %}

