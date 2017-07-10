---
title: Data Packages
redirect_from: /standards/
---

Data Package is a simple **container** format used to describe and package a collection of data. The format provides a simple contract for data interoperability that supports frictionless delivery, installation and management of data.

Data Packages can be used to package any kind of data. At the same time, for specific common data types such as tabular data it has support for providing important additional descriptive metadata -- for example, describing the columns and data types in a CSV. 

The following core principles inform our approach:

* Simplicity
* Extensibility and customisation by design
* Metadata that is human-editable and machine-usable
* Reuse of existing standard formats for data
* Language, technology and infrastructure agnostic

## The Data Package Suite of Specifications

Over time the single Data Package spec has evolved into a suite of specs -- partly through componentization whereby the original spec is in several components and partly through extension.

The main specifications are:

* [Data Package specification][dp], a simple format for packaging data
for sharing between tools and people
* [Tabular Data Package][tdp], a format for packaging tabular
data that builds on Data Package and which uses:
  * [JSON Table Schema][jts], a specification for defining a *schema* for tabular data
  *  [CSV Dialect Description Format][spec-csvddf] (CSV-DDF), a specification for defining a *dialect* for CSV data.

### How do these specifications relate?

A **Data Package** can "contain" any type of file.  A **Tabular Data
Package** is a type of Data Package specialized for tabular data and which "contains" one or
more CSV files.  In a Tabular Data Package, each CSV must have a
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

