---
title: Developer Guide
---

This guide introduces you to the Frictionless Data tool stack and how you can contribute to it.

* ToC
{:toc}


## Asking questions and getting help

If you have a question or want help the best way to get assistance is to join our public chat channel and ask there -- prompt responses are guaranteed:

<https://gitter.im/frictionlessdata/chat>


## Pre-requisites

This guide assumes you already have some high-level familiarity with the [Data Package family of specifications][dp-main]. Please a take a few minutes to take a look at the [overview][dp-main] if you are not yet familiar with those specs.


## Implementing a Data Package Tool Stack

Here's a diagram that illustrates some of the core components of a full Data Package implementation.

JSON Table Schema support is needed only if you are planning support for [Tabular Data Packages][tdp]. Since most implementations will want to support them we have included it in the diagram.

<img src="https://docs.google.com/drawings/d/1VdcWNb-PnP9QyrlMlvMWBBvSGTy_Rfdcr77Xn1HpUOI/pub?w=331&h=400" alt="" />

### General Introduction

The main things you want to do are:

* Import data (and metadata) in a Data Package into your tool
* Export data (and metadata) from your tool to a Data Package 

In addition you may want to do things like:

* Create a Data Package from scratch
* Validate the data in a Data Package (is the data how it says it should be)
* Validate the metadata in a Data Package
* Visualize the Data Package
* Publish the Data Package

### Programming Language

This is example pseudo-code for a Data Package library in a programming language like Python or Javascript.

**Importing a Data Package**

```
# location of Data Package e.g. URL or path on disk
var location = /my/data/package/
var myDataPackage = new DataPackage(location)
var myDataResource = myDataPackage.getResource(indexOrName)

# this would return an iterator over row objects if the data was in rows
# optional support for casting data to the right type based on JSON Table Schema
var dataStream = myDataResource.stream(cast=True)

# instead of an iterator you may want simply to convert to native structured data type
# for example, in R where you have a dataframe you would do something like
var dataframe = myDataResource.asDataFrame()
```

**Accessing metadata**

```
# you may also want access to Data Package metadata
# the exact accessor structure is up to you
print myDataPackage.metadata.title

# this would return the datapackage.json for the Data Package
myDataPackage.dataPackageJSON()
```

**Exporting a Data Package**

```
var myDataPackage = export_data_package(nativeDataObject)

# if the native data is more like a table a data then you might have
var myDataPackage = new DataPackage()
myDataPackage.addResourceFromNativeDataObject(nativeDataObject)
myDataPackage.saveToDisk(path)
```

**Creating a Data Package from scratch**

```
var myMetadata = {
  title: 'My Amazing Data'
}
var myDataPackage = new DataPackage(myMetadata)
```

**Data Validation**

This is Tabular Data specific.

```
var resource = myDataPackage.getResource()
# check the data conforms to the JSON Table Schema
resource.validate()

# more explicit version might look like
var schema = resource.schemaAsJSON()
var jtsValidator = new JTSValidator(schema)
# validate a data stream
schema.validate(resource.stream())
```

### Specific Tool

For a particular tool or platform often all you need is simple import or export:

```
# import into SQL (implemented in some language)
import_datapackage_into_sql(pathToDataPackage, sqlDatabaseInfo)

# import into Google BigQuery
import_datapackage_into_bigquery(pathToDataPackage, bigQueryInfo)
```


## Examples

### Python

The main Python library for working with Data Packages is `datapackage`:

See <http://github.com/frictionlessdata/datapackage-py>

Additional functionality such as JTS and JTS integration:

* <https://github.com/frictionlessdata/jsontableschema-py>
* <https://github.com/frictionlessdata/jsontableschema-sql-py>
* <https://github.com/frictionlessdata/jsontableschema-bigquery-py>

`tabulator` is a utility library that provides a consistent interface for reading tabular data:

<https://github.com/frictionlessdata/tabulator-py>

Here's an overview of the Python libraries available and how they fit together:

<img src="https://docs.google.com/drawings/d/1akNQUw1xOmdMOFAaJd-83O2gbB5kWcqg5lSYzmo0M5o/pub?w=646&h=793" alt="Python libraries">

### Javascript

Following "Node" style we have partitioned the Javascript library into pieces, see this list of libraries:

* <https://github.com/frictionlessdata?utf8=%E2%9C%93&query=js>

### SQL Integration

*Coming soon: walk-through of Python SQL integration*.


{%include markdown-link-refs.html %}



