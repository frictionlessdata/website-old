---
title: Quick Start in Python
redirect_from: 
  - ./working-with-tabular-data-packages-in-python/
---

This tutorial will show you how to install the core Python libraries
for working with Tabular Data Packages and demonstrate a very simple
example of loading a Tabular Data Package from the web and pushing it
directly into a local SQL database.

## Setup 

For this tutorial, we will need both the main
[Data Package library](https://github.com/frictionlessdata/datapackage-py)
which provides a model for working with Data Packages and the
[JSON Table Schema SQL Storage library](https://github.com/frictionlessdata/jsontableschema-sql-py),
which provides an interface for generating and loading SQL tables
based on their JSON Table Schema definition.  These libraries support
both Python 2 and 3.

{% highlight bash %}
pip install datapackage
pip install jsontableschema_sql
{% endhighlight %}

## Reading Basic Metadata

You can start using the library by importing `datapackage`.  Data
Packages can be loaded either from a local path or directly from the
web.  In this case, we are using the
[S&P 500 Index Data](http://data.okfn.org/data/core/s-and-p-500)
dataset from the
[Open Knowledge "Core" Datasets repository](http://data.okfn.org/data),
a community effort to build a set of important, commonly-used datasets
in high quality, easy-to-use, and open form.  In particular, this
dataset includes dividend, earnings and P/E ratio data on a monthly
basis since 1870.

{% highlight python %}
import datapackage
url = 'http://data.okfn.org/data/core/s-and-p-500/datapackage.json'
dp = datapackage.DataPackage(url)
{% endhighlight %}

At the most basic level, Data Packages provide a standardized format
for general metadata (for example, the dataset title, source, author,
and/or description) about your dataset.  Now that you have loaded this
Data Package, you have access to this metadata using the `metadata`
dict attribute.  Note that these fields are optional and may not be
specified for all Data Packages.  For more information on which fields
are supported, see
[the full Data Package standard](http://dataprotocols.org/data-packages/#metadata).

{% highlight python %}
print(dp.metadata['title'])
> "Standard and Poors (S&P) 500 Index Data including Dividend, Earnings and P/E Ratio" 

print(dp.metadata['description'])
> "S&P 500 index data including level, dividend, earnings and P/E ratio on a monthly basis since 1870. The S&P 500 (Standard and Poors 500) is a free-float, capitalization-weighted index of the top 500 publicly listed stocks in the US (top 500 by market cap)."
{% endhighlight %}

## Loading into an SQL database 

For data that exists in *tables*, specifically, CSV files, the
[Tabular Data Package](/guides/tabular-data-package/) format provides
schema information specified in a format called
[JSON Table Schema](/guides/json-table-schema/).  This schema
information (e.g. types, constraints, and relations between tables)
makes it easy to import your Data Package into the SQL backend of your
choice.  In this case, we can automatically create and push the tables
in the Data Package into an [SQLite](http://sqlite.org/) database.

{% highlight python %}
from sqlalchemy import create_engine
engine = create_engine('sqlite:///s-and-p-datapackage.db')
{% endhighlight %}

With the SQL database connection created, we can now "push" the Data
Package into the database. 

{% highlight python %}
from datapackage import push_datapackage
push_datapackage(descriptor=dp.metadata,backend='sql',engine=engine)
{% endhighlight %}

If you have `sqlite3` installed, you can inspect and play with your
newly created database.  Note that column type information has been
translated from the JSON Table Schema format to native SQLite types.

### JSON Table Schema

{% highlight json %}
{
  "fields": [{
  	"type": "date",
  	"name": "Date"
  }, {
  	"type": "number",
  	"name": "SP500"
  }, {
  	"type": "number",
  	"name": "Dividend"
  }, {
  	"type": "number",
  	"name": "Earnings"
  }, {
  	"type": "number",
  	"name": "Consumer Price Index"
  }, {
  	"type": "number",
  	"name": "Long Interest Rate"
  }, {
  	"type": "number",
  	"name": "Real Price"
  }, {
  	"type": "number",
  	"name": "Real Dividend"
  }, {
  	"type": "number",
  	"name": "Real Earnings"
  }, {
  	"type": "number",
  	"name": "PE10"
  }]
}  
{% endhighlight %}

### SQLite .schema

{% highlight sql %}
$ sqlite3 s-and-p-datapackage.db 
SQLite version 3.8.10.2 2015-05-20 18:17:19
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE data__data___data (
	"Date" DATE, 
	"SP500" FLOAT, 
	"Dividend" FLOAT, 
	"Earnings" FLOAT, 
	"Consumer Price Index" FLOAT, 
	"Long Interest Rate" FLOAT, 
	"Real Price" FLOAT, 
	"Real Dividend" FLOAT, 
	"Real Earnings" FLOAT, 
	"PE10" FLOAT
);
{% endhighlight %}

