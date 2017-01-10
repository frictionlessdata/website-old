---
title: Data Package
section: guides
---

A Data Package is a simple way of "packaging" up and describing data so that it can be easily shared and used. The format is **very simple**, **web friendly** and **extensible**.

Creating a Data Package is very easy: all you need to do is put a `datapackage.json` "descriptor" file in the top-level directory of your set of data files.

<div class="row">
<div class="span2">
<h3>Full Spec</h3>
There is a full **<a href="http://specs.frictionlessdata.io/data-packages/">RFC-style specification of Data Package format</a>**
on the Data Protocols website to complement this quick introduction.
</div>
<div class="span2">
<h3>Tabular Data</h3>
**<a href="/guides/tabular-data-package/">Tabular Data Package</a>** extends Data Packages for tabular data. It supports providing additional information such as data types
of columns.
</div>
<div class="span2">
<h3>Tools</h3>
There is a growing set of <a href="/tools/">online and offline tools</a> for working with Data
Packages including for creating, viewing and validating.
</div>
</div>

* ToC
{:toc}

## Getting Started

A minimal example Data Package would look like this on disk:

```
datapackage.json
# a data file (CSV in this case but could be any type of data)
data.csv
# (Optional!) A README (in markdown format)
README.md
```

Any number of additional files such as more data files, scripts (for processing
or analyzing the data) and other material may be provided but are not required.

## datapackage.json

`datapackage.json` is the file that makes a Data Package a Data Package and is
the only required file. It provides:

* General metadata such as the name of the package, its license, its publisher
  etc
* A "manifest" in the the form of a list of the data resources (data files)
  included in this data package along with information on those files (e.g.
  size and schema)

As its file extension indicates it must be a [JSON][json] file. Here's a very
minimal example of a `datapackage.json` file:

```json
{
  "name": "a-unique-human-readable-and-url-usable-identifier",
  "title": "A nice title",
  "resources": [{
    // see below for what a resource descriptor looks like
  }]
}
```

Here is a much more extensive example of a datapackage JSON file:

<div class="alert alert-info">
**Note:** a complete list of potential attributes and their meaning can be found in the
[full Data Package spec][spec].
</div>

[spec]: http://specs.frictionlessdata.io/data-packages/

<div class="alert alert-info">
**Note:** the Data Package format is **extensible**: publishers may add their own additional metadata as well as constraints on the format and type of data by adding their own attributes to the `datapackage.json`.
</div>

```json
{
  "name": "a-unique-human-readable-and-url-usable-identifier",
  "datapackage_version": "1.0-beta",
  "title": "A nice title",
  "description": "...",
  "version": "2.0",
  "keywords": ["name", "My new keyword"],
  "licenses": [{
    "url": "http://opendatacommons.org/licenses/pddl/",
    "name": "Open Data Commons Public Domain",
    "version": "1.0",
    "id": "odc-pddl"
  }],
  "sources": [{
    "name": "World Bank and OECD",
    "web": "http://data.worldbank.org/indicator/NY.GDP.MKTP.CD"
  }],
  "contributors":[ {
    "name": "Joe Bloggs",
    "email": "joe@bloggs.com",
    "web": "http://www.bloggs.com"
  }],
  "maintainers": [{
    // like contributors
  }],
  "publishers": [{
    // like contributors
  }],
  "dependencies": {
    "data-package-name": ">=1.0"
  },
  "resources": [
    {
      // ... see below ...
    }
  ],
  // extend your datapackage.json with attributes that are not
  // part of the data package spec
  // we add a views attribute to display Recline Dataset Graph Views
  // in our Data Package Viewer
  "views" : [
    {
      ... see below ...
    }
  ],
  // you can add your own attributes to a datapackage.json, too
  "my-own-attribute": "data-packages-are-awesome",
}
```

<h3 id="resources">Resources</h3>

You list data files in the resources entry of the datapackage.json.

```json
  {
    // one of url or path should be present
    "path": "relative-path-to-file", // e.g. data/mydata.csv
    "url": "online url" // e.g http://mysite.org/some-data.csv
  }
```

<h3 id="views">Views</h3>

The [Data Package Viewer](http://data.okfn.org/tools/view) will display a [Recline Dataset Graph View](http://okfnlabs.org/recline/docs/views.html) when a `views` entry is provided in the datapackage.json.

* Include the `resourceName` property if you have more than one resource and want to display a graph for a resource other than the first resource

* In the `state` property
  * the `group` property is the name of the resource field whose values will be used on the y axis in the `bars` graph type and the x axis in all other graph types
  * the `series` property is an array of one or more names of resource fields whose values will be used on the x axis in the `bars` graph type and the y axis in all other graph types
  * the `graphType` may be one of `lines-and-points`, `lines`, `points`, `bars`, or `columns`

```json
{
  "id": "graph",
  "label": "Graph",
  "resourceName": "a-resource-name",
  "type": "Graph",
  "state": {
    "group": "a-resource-field-name",
    "series": [
      "another-resource-field-name"
    ],
    "graphType": "lines-and-points"
  }
}
```

## Tools

There is a growing set of [online and offline tools][tools] for working with Data
Packages including tools for creating, viewing, validating, publishing and
managing Data Packages. See the [Data Package tools page for more][tools].


## Examples

Many exemplar data packages can be found in the [datasets organization on
github][datasets]. Specific examples:

### World GDP

A Data Package which includes the data locally in the repo (data is CSV).

<https://github.com/datasets/gdp>

Here's the `datapackage.json`:

<script src="http://gist-it.appspot.com/github/datasets/gdp/blob/master/datapackage.json"></script>

### S&P 500 Companies Data

This is an example with more than one resource in the data package.

<https://github.com/datasets/s-and-p-500-companies>

Here's the `datapackage.json`:

<script src="http://gist-it.appspot.com/github/datasets/s-and-p-500-companies/blob/master/datapackage.json"></script>

### TopoJSON example

This data package has TopoJSON and the data is external to the repo.

<https://github.com/datasets/ex-topojson>

Here's the `datapackage.json`:

<script src="http://gist-it.appspot.com/github/datasets/ex-topojson/blob/master/datapackage.json"></script>

[datasets]: https://github.com/datasets
[ISO 3166-2 country codes]: https://github.com/datasets/country-codes

{%include markdown-link-refs.html %}
