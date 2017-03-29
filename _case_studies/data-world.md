---
name: Data.world
title: data.world
site: http://data.world
authors: Bryon Jacob
logo: data-world-logo.png
forum_topic: https://discuss.okfn.org/t/new-frictionless-data-case-study-published-data-world/4942
short_description: Allow users to download a version of a data.world dataset that retains the structured metadata and schema for offline analysis
---

## How do you use the specs and what advantages did you find in using the Data Package[^datapackage] approach?

We deal with a great diversity of data, both in terms of content and in terms of source format - most people working with data 
are emailing each other spreadsheets or CSVs, and not formally defining schema or semantics for what’s contained in these data files.  

When data.world ingests tabular data, we “virtualize” the tables away from their source format, 
and build layers of type and semantic information on top of the raw data. What this allows us to do is to produce a clean Tabular Data Package[^Package] for any dataset, whether the input is CSV files, Excel Spreadsheets, JSON data, SQLite Database files - any format that we know how to extract tabular information from - we can present it as cleaned-up CSV data with a datapackage.json that describes the schema and metadata of the contents.

![Available Data](/img/case-studies/data-world-1.png)

## What else would you like to see developed?

Graph data packages, or “Universal Data Packages” that can encapsulate both tabular and graph data.  It would be great to be able to present tabular and graph data in the same package and develop tools that know how to use these things together. 

To elaborate on this, it makes a lot of sense to normalize tabular data down to clean, well-formed CSVs.or data that more graph-like, it would also make sense to normalize it to a standard format.  RDF[^rdf] is a well-established and standardized format, with many serialized forms that could be used interchangeably (RDF XML, Turtle, N-Triples, or JSON-LD, for example).  The metadata in the datapackage.json would be extremely minimal, since the schema for RDF data is encoded into the data file itself.  It might be helpful to use the datapackage.json descriptor to catalog the standard taxonomies and ontologies that were in use, for example it would be useful to know if a file contained SKOS vocabularies, or OWL classes.

## What are the next things you are going to be working on yourself?

We want to continue to enrich the metadata we include in Tabular Data Packages exported from data.world, and we’re looking  into using datapackage.json as an import format as well as export.

## How do the Frictionless Data specifications compare to existing proprietary and nonproprietary specifications for the kind of data you work with?

data.world works with lots of data across many domains - what’s great about the Frictionless Data specs is that it’s a lightweight content standard that can be a starting point for building domain-specific content standards - it really helps with the “first mile” of standardizing data and making it interoperable.

![Available Data](/img/case-studies/data-world-2.png)

## What do you think are some other potential use cases?

In a certain sense, a Tabular Data Package is sort of like an open-source, cross-platform, accessible replacement for spreadsheets that can act as a “binder” for several related tables of data.  I could easily imagine web or desktop-based tools that look and function much like a traditional spreadsheet, but  use Data Packages as their serialization format.

## Who else do you think we should speak to?

Data science IDE (Interactive Development Environment) producers - [RStudio](https://www.rstudio.com/), [Rodeo](http://rodeo.yhat.com/) (python), [anaconda](https://www.continuum.io/Anaconda-Overview), [Jupyter](http://jupyter.org/) - anything that operates on Data Frames as a fundamental object type should provide first-class tool and API support for Tabular Data Packages.

## What should the reader do after reading this Case Study?

To read more about Data Package integration at data.world, read our post: [Try This: Frictionless data.world](https://meta.data.world/try-this-frictionless-data-world-ad36b6422ceb#.rbbf8k40t).  Sign up, and starting playing with data.

[^package]: Tabular Data Package: <http://frictionlessdata.io/guides/tabular-data-package/>
[^datapackage]: Data Packages: <http://frictionlessdata.io/data-packages/>
[^rdf]: RDF: <https://www.w3.org/RDF/>
