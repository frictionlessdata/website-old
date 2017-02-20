---
title: Tools and Integrations
---

This page lists user-friendly tools for creating and working with Data Packages.  It also lists integrations for working with Data Packages using popular existing tools.  If you are a developer, you can find software libraries to load and manage Data Packages in your language of choice.

* ToC
{:toc}

## Quick Start Tools for Data Packages

### View

[Online Data Package viewer app][viewer-app] -- provides a nice human-friendly view of a Data Package in seconds.

[viewer-app]: http://data.okfn.org/tools/view

### Create

[Data Package your data by creating a `datapackage.json`][create-app] -- the online datapackage.json maker creates the <code>datapackage.json</code> file needed to turn data into a Data Package.

[create-app]: http://datapackagist.okfnlabs.org/

### Validate

[Online validator][validate-app] that checks your <code>datapackage.json</code> and Data Package are good to go.

[validate-app]: http://data.okfn.org/tools/validate

## Guides

* Creating and using Data Packages in Python *coming soon*
* Creating and using Data Packages in R *coming soon*

## Libraries

### Javascript and NodeJS

A comprehensive set of Javascript / NodeJS libraries are available.

* <a href="https://github.com/frictionlessdata/dpm">data package manager (dpm)</a> - overall library and command line
* <a href="https://github.com/frictionlessdata/datapackage-init-js">datapackage-init</a> - create Data Packages by creating <code>datapackage.json</code> files
* <a href="https://github.com/frictionlessdata/datapackage-read-js">datapackage-read</a> - load and access Data Packages (<code>datapackage.json</code>)
* <a href="https://github.com/frictionlessdata/datapackage-validate-js">datapackage-validate</a> - validate Data Packages (<code>datapackage.json</code>)
* <a href="https://github.com/frictionlessdata/datapackage-render-js">datapackage-render</a> - render Data Packages and their views to embeddable HTML, images (png) and more

### Python

A comprehensive Python library is available:

<https://github.com/frictionlessdata/datapackage-py>

### Ruby Library

Two libraries are available:

* <https://github.com/textkit/datapak> - work with tabular data packages (lets you download, load or query datasets using SQL via ActiveRecord - thus, works with any SQL database; defaults to an in-memory SQLite database).
* <https://github.com/theodi/datapackage.rb> -- parse and validate both data packages and tabular data packages. (May be obsolete as no updated since Feb 2014)

### PHP

A validator and storage library for working with [JSON Table Schema](http://frictionlessdata.io/guides/json-table-schema/) is available here:

* <https://github.com/FootworkSolutions/json_table> 

### Go

<https://github.com/the42/datapackage> - provides struct specifications for Data Package as well as a command line tool to create Data Packages.

### R

* <a href="https://github.com/ropenscilabs/datapkg">R Data Package Library</a> - by rOpenSci
* <a href="https://github.com/christophergandrud/dpmr">R Data Package Manager</a> - by Christopher Gandrud
* <a href="https://github.com/QBRC/RODProt">R Open Data Protocols Library</a> - by QRBC 

### MATLAB

A function to read data from a Tabular Data Package is available for <a href="http://www.mathworks.com/matlabcentral/fileexchange/47506-read-tabular-data-package">
        download from MATLAB Central's File Exchange</a>.

To contribute to the library, see the project's <a href="https://github.com/KrisKusano/datapackage">GitHub repository</a>.

### Command Line

Data Package Manager (dpm) -- https://github.com/okfn/dpm. Comprehensive command line tool.

## Use Data Packages with ...

These "Using with" examples usually require [Tabular Data Packages][tdp] where the data in the Data Package is stored in CSV.

[tdp]: /guides/tabular-data-package/

### Relational Databases

#### Generic

* <https://github.com/frictionlessdata/jsontableschema-sql-py> - generic JSON Table Schema to SQL library in Python
* <https://github.com/frictionlessdata/datapackage-py> - general Python library can be used to automate import of Tabular Data Packages into SQL
* You can also use the Ruby datapak library (see Ruby library section)

#### SQLite

In addition to the generic option there is a simple <a href="https://github.com/okfn/dptools/blob/master/bin/load-sqlite.py">python script (no dependencies) to load a Tabular Data Packages into SQLite</a>.

#### Postgresql

In addition to the generic options There is a <a href="https://github.com/okfn/dptools/blob/master/bin/load-postgresql.py">python script (with no dependencies) to load a Tabular Data Package into Postgresql</a>

#### SQL Server

There is a BIML project <a href="https://github.com/bimlscript/BETDPI"> that uses datapackage.json to generate SSIS packages that can load the contents of a Tabular Data Package into a SQL Server database</a>. Find out more about <a href="http://en.wikipedia.org/wiki/SQL_Server_Integration_Services">SQL Server Integration Services (SSIS)</a>.

### Excel

*In progress*: fully automated Data Package support (see [this issue for updates][excel-support]).

In the meantime you can just open the CSV file by hand!

[excel-support]: https://github.com/frictionlessdata/ideas/issues/41

### Google Spreadsheets

*In progress*: Fully automated Data Package support (see [this issue for updates][gdocs-support]).

In the meantime you can just import the CSV files in the Data Package directly.

[gdocs-support]: https://github.com/okfn/data.okfn.org/issues/24

### BigQuery

* <https://github.com/frictionlessdata/jsontableschema-bigquery-py> - generic JSON Table Schema to BigQuery library in Python
* <https://github.com/frictionlessdata/datapackage-py> - general Python library can be used to automate import of Tabular Data Packages into BigQuery

---

## Catalog of Tools and Integrations

<table>
  <tr><th>Tool</th><th>Type</th><th>Language</th><th>Maintainer</th></tr>
  {% for tool in site.data.tools %}
  {% capture github_url %}http://github.com/{{ tool.github_org }}/{{ tool.github_repo }}{% endcapture %}
  <tr>
    <td><a href="{% if tool.url %}{{tool.url}}{% else %}{{ github_url }}{% endif %}">{{ tool.title }}</a></td>
    <td>{{ tool.type }}</td>
    <td>{{ tool.language }}</td>
    <td><a href="{% if tool.maintainer_url %}{{ tool.maintainer_url }}{% else %}http://github.com/{{ tool.github_org }}{% endif %}">{% if tool.maintainer %}{{ tool.maintainer }}{% else %}{{ tool.github_org }}{% endif %}</a></td>
  </tr>
  {% endfor %}
</table>

