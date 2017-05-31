---
title: Tools, Integrations, Libraries, and Platforms
---

**New! Apply by 31st July 2017 to the
 [Frictionless Data Tool Fund](http://toolfund.frictionlessdata.io/):**

> The Frictionless Data Tool Fund, supported by the Sloan Foundation,
> is providing a number of minigrants of $5,000 to support individuals
> or organisations in bootstrapping the implementation of libraries
> for the Frictionless Data specifications in a range of programming
> languages.

---

- [Tools and Integrations](#tools-and-integrations)
- [Libraries](#libraries)
- [Platforms](#platforms)
- [Other](#other)
- [Representations](#representations)
- [Directory](#directory)

## Tools and Integrations

Tools listed here are new apps or integrations with existing apps that
create or consume
[Data Packages](https://specs.frictionlessdata.io/data-package/) or
[Table Schema](http://specs.frictionlessdata.io/table-schema/).

### Data Package Viewer (service)

*View Data Package metadata in human-readable form.*

<http://data.okfn.org/tools/view>

Repository: <https://github.com/okfn/data.okfn.org-new>

### Good Tables (service)

*Continuous data validation, as a service: <http://goodtables.io/>*

Repository: <https://github.com/frictionlessdata/goodtables.io>

### Good Tables (service)

*A web service to validate and process tabular data: <http://goodtables.okfnlabs.org/>*

Repository: <https://github.com/frictionlessdata/goodtables-web>

### Data Quality Dashboard

*Data Quality Dashboards display statistics on a collection of
published data.*

Repository: <https://github.com/frictionlessdata/data-quality-dashboard>

### Data Package Pipelines

*Framework for processing data packages in pipelines of modular
components.*

Repository: <https://github.com/frictionlessdata/datapackage-pipelines>

### Data Package Manager (dpm)

*Data Package Manager.*

Repository: <https://github.com/okfn/dpm>

### DataPackagist

*DataPackagist is a webservice for creating Data Packages:
 <http://datapackagist.openknowledge.io/>*

Repository: <https://github.com/frictionlessdata/datapackagist>

### Comma Chameleon

*A desktop CSV editor for data publishers:
 <http://comma-chameleon.io/>*

Repository: <https://github.com/theodi/comma-chameleon>

### datapackage-m

*A set of functions written in M for working with Tabular Data
Packages in Power BI Desktop and Power Query (also known as 'Get &
Transform') in Excel.*

Repository: <https://github.com/nimblelearn/datapackage-m>

### Metatab

*Python language parser for a tabular format for structured metadata:
 <http://metatab.org/>*

Repository: <https://github.com/CivicKnowledge/metatab-py>

### CSV Lint

*CSV Lint is a webservice for validating tabular data:
 <http://csvlint.io/>*

Repository: <https://github.com/theodi/csvlint.rb>

### Datapaka

*An easy interface for documenting data packages.*

Repository: <https://github.com/centraldedados/datapaka>

### SmartCSV.fx

*A simple JavaFX application to load, save and edit a CSV file and
provide a JSON configuration for columns to check the values in the
columns: <http://frosch95.github.io/SmartCSV.fx/>*

Repository: <https://github.com/frosch95/SmartCSV.fx>

### Mira

*Create simple APIs from CSV files.*

Repository: <https://github.com/davbre/mira>

### Data Retriever

*The Data Retriever uses the Data Package format internally.  It is a
 package manager for data. It downloads, cleans, and stores publicly
 available data, so that analysts spend less time cleaning and
 managing data, and more time analyzing it:
 <http://www.data-retriever.org/>*

Repository: <https://github.com/weecology/retriever>


### BIML Enabled Tabular Data Package Importer

*BIML (Business Intelligence Markup Language) project that uses
datapackage.json to generate SSIS packages that can load the contents
of a Tabular Data Package into a SQL Server database.*

Repository: <https://github.com/bimlscript/BETDPI>

---

## Libraries

The following libraries at least a subset of the Frictionless Data
stack: <http://specs.frictionlessdata.io/implementation/>.

### Python

#### datapackage-py

*A Python library for working with Data Packages.*

Repository: <https://github.com/frictionlessdata/datapackage-py>

#### jsontableschema-py

*A Python library for working with Table Schema.*

Repository: <https://github.com/frictionlessdata/jsontableschema-py>

#### jsontableschema-sql-py

*Table Schema to SQL module for jsontableschema-py.*

Repository: <https://github.com/frictionlessdata/jsontableschema-sql-py>

#### jsontableschema-biqquery-py

*Table Schema to BigQuery module for jsontableschema-py.*

Repository: <https://github.com/frictionlessdata/jsontableschema-bigquery-py>

#### jsontableschema-pandas-py

*Table Schema to Pandas module for jsontableschema-py.*

Repository: <https://github.com/frictionlessdata/jsontableschema-pandas-py>

#### goodtables-py

*Validate and process tabular data in Python.*

Repository: <https://github.com/frictionlessdata/goodtables-py>

#### tabulator-py

*Consistent interface for stream reading and writing tabular data
 (csv/xls/json/etc).*

Repository: <https://github.com/frictionlessdata/tabulator-py>

#### pandas-datapackage-reader

*Data Package reader for Pandas.*

Repository: <https://github.com/rgieseke/pandas-datapackage-reader>

#### JTS ERD

*Create an ERD for a database given as Table Schema.*

Repository: <http://github.com/iburadempa/jts_erd>

#### PG JTS

*Create Table Schema from a live PostgreSQL database.*

Repository: <https://github.com/iburadempa/pg_jts>

#### CSVDDF-Python

*CSVDDF support for Python.*

Repository: <https://github.com/mk270/csvddf-python>

### R

#### datapkg

*R Data Package Library.*

Repository: <https://github.com/ropenscilabs/datapkg>

#### dpmr

*R Data Package Manager.*

Repository: <https://github.com/christophergandrud/dpmr>

#### RODProt

*R Open Data Protocols Library.*

Repository: <https://github.com/QBRC/RODProt>

### JavaScript

#### datapackage-js

*Official JavaScript library for Data Packages in Node and the browser.*

Repository: <https://github.com/frictionlessdata/datapackage-js>

#### jsontableschema-js

*A utility library for working with Table Schema in Javascript.*

Repository: <https://github.com/frictionlessdata/jsontableschema-js>

### Ruby

#### datapackage.rb

*Ruby library and tools for working with Data Packages.*

Repository: <https://github.com/theodi/datapackage.rb>

#### jsontableschema.rb

*A Ruby library for working with Table Schema.*

Repository: <https://github.com/theodi/jsontableschema.rb>

#### csvlint.rb

*A ruby gem to support validating CSV files to check their syntax and contents.*

Repository: <https://github.com/theodi/csvlint.rb>

#### datapak

*Work with tabular data packages (lets you download, load or query
datasets using SQL via ActiveRecord - thus, works with any SQL
database; defaults to an in-memory SQLite database).*

Repository: <https://github.com/textkit/datapak>

### PHP

#### json_table

*A validator and storage library for working with Table Schema.*

Repository: <https://github.com/FootworkSolutions/json_table>

### Go

#### Datapackage

*Provides struct specifications for Data Package as well as a command
line tool to create Data Packages.*

Repository: <https://github.com/the42/datapackage>

### MATLAB

#### datapackage

*A function to read data from a Tabular Data Package is available for
download from MATLAB Central’s File Exchange:
<http://www.mathworks.com/matlabcentral/fileexchange/47506-read-tabular-data-package>*

Repository: <https://github.com/KrisKusano/datapackage>

---

## Platforms

Data Packages are currently being published by the following
repositories:

### OpenSpending

The
[Fiscal Data Package](https://specs.frictionlessdata.io/fiscal-data-package/)
is the native format for datasets published on OpenSpending.

<http://next.openspending.org/>

### data.world

[Data.world](https://data.world/) provides all datasets as Data
Packages.

<https://data.world/>

### Open Power System Data

[Open Power System Data](http://open-power-system-data.org/) develops
a free-of-charge platform for open data dedicated to electricity
system researchers.

<http://data.open-power-system-data.org/>

Case Study: <http://frictionlessdata.io/case-studies/open-power-system-data/>

Repository: <https://github.com/Open-Power-System-Data>

### datahub.io (and other CKAN instances)

All datasets on [datahub.io](https://datahub.io/) can be exported as
Data Packages.  Other CKAN instances can install the `datapackager`
extension to gain this feature.

<https://datahub.io/>

Repository: <https://github.com/ckan/ckanext-datapackager/issues>

### Central de Dados

[Central de Dados](http://centraldedados.pt/) is a repository of Open
Data in Portugal.

<http://centraldedados.pt/>

Repository: <https://github.com/centraldedados/centraldedados.pt>

### Octopub

[Octopub](https://octopub.io/) provides a platform to publish CSV data
on an automatically created webpage.

<https://octopub.io/>

Repository: <https://github.com/theodi/octopub>

### HarvestChoice

[HarvestChoice](http://harvestchoice.org) publishes its bulk
agricultural data as zipped Data Packages.

<http://harvestchoice.org/page/bulk>

### Dataship

[Dataship](https://dataship.io/) is a way to share data and analysis,
from simple charts to complex machine learning, with anyone in the
world easily and for free.

<https://dataship.io/>

Case Study: <http://frictionlessdata.io/case-studies/dataship/>

Repository: <https://github.com/dataship/dataship>

## Other

### Tesera

[Tesera](http://tesera.com/) publishes a variety of Data Package-aware
tools.

<http://tesera.com/>

Case Study: <http://frictionlessdata.io/case-studies/tesera/>

Repository: <http://github.com/tesera>

### Python Test Suite

Repository: <https://github.com/frictionlessdata/testsuite-py>

### Perl module (preliminary)

<https://gist.github.com/icklecows/1ba84a5cd5f0ecb5f30ac480cc9de8db>

### Import for Google Spreadsheets

Import Tabular Data Packages into Google Spreadsheets:

Repository: <https://github.com/frictionlessdata/datapackage-to-google-spreadsheet>

---

## Representations

The default representation of a Data Package is JSON.  However, for
convenience, users may wish to represent Data Package metadata in other formats.

All the tools, libraries, and platforms above assume the JSON
representation.

### JSON (default)

JSON media types registered with [IANA](https://www.iana.org/).

- <http://www.iana.org/assignments/media-types/application/vnd.tableschema+json>
- <http://www.iana.org/assignments/media-types/application/vnd.dataresource+json>

### YAML

CSVY uses a YAML version of the Table Schema convention.

<http://csvy.org>

### Metatab

Metatab uses a tabular representation for metadata (which can be
 translated to Data Package metadata).

<http://metatab.org>

## Directory

* ToC
{:toc}
