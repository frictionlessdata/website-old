---
title: Data Packages
redirect_from: /standards/
---

At its core, Frictionless Data is driven by the
[Data Package specification][dp], a simple format for packaging data
for sharing between tools and people. Associated specifications
include [Tabular Data Package][tdp], a format for packaging tabular
data, and [JSON Table Schema][jts], a standard for defining a *schema*
for tabular data.

## How do these specifications relate?

A **Data Package** can "contain" any type of file.  A **Tabular Data
Package** is a special type of Data Package that "contains" one or
more CSV files.  In a Tabular Data Package, each CSV must have
*schema* defined using **JSON Table Schema**.  An application or
library that consumes Tabular Data Packages therefore must be able to
understand not only the full Data Package specification, but also JSON
Table Schema.

<img src="https://docs.google.com/drawings/d/19DTSTlxkOdTgieTWhnTNLAZtxn_ie63DV-vEGW_TP_E/pub?w=960&amp;h=720">

For more information on each standard, see below:

## Data Package

- [Overview][dp]
- [Full Standard][spec-dp]

## Tabular Data Package

- [Overview][tdp]
- [Full Standard][spec-tdp]

## JSON Table Schema

- [Overview][jts]
- [Full Standard][spec-jts]

{%include markdown-link-refs.html %}

