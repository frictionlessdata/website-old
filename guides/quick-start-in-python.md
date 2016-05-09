---
title: Quick Start in Python
redirect_from: 
  - ./working-with-tabular-data-packages-in-python/
---

This tutorial will show you how to install the Python libraries
for working with Tabular Data Packages and demonstrate a very simple
example of loading a Tabular Data Package from the web and pushing it
directly into a local SQL database.

## Setup 

For this tutorial, we will need the main Python Data Package library:

<https://github.com/frictionlessdata/datapackage-py>

You can install it as follows:

{% highlight bash %}
pip install datapackage
{% endhighlight %}

## Reading Basic Metadata

You can start using the library by importing `datapackage`.  Data
Packages can be loaded either from a local path or directly from the
web.

In this case, we are using the
[S&P 500 Index Data](http://data.okfn.org/data/core/s-and-p-500)
dataset from the
[Open Knowledge "Core" Datasets repository](http://data.okfn.org/data).
This dataset includes dividend, earnings and P/E ratio data on a
monthly basis since 1870. The S&P 500 (Standard and Poor's 500) is a
free-float, capitalization-weighted index of the top 500 publicly
listed stocks in the US.

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
[the full Data Package standard][dp-spec].

{% highlight python %}
print(dp.metadata['title'])
> "Standard and Poors (S&P) 500 Index Data including Dividend, Earnings and P/E Ratio" 

print(dp.metadata['description'])
> "S&P 500 index data including level, dividend, earnings and P/E ratio on a monthly basis since 1870. The S&P 500 (Standard and Poors 500) is a free-float, capitalization-weighted index of the top 500 publicly listed stocks in the US (top 500 by market cap)."
{% endhighlight %}

## Loading into an SQL database 

[Tabular Data Packages][tdp] contains schema information about its data using [JSON Table Schema][jts]. This means you can easily import your Data Package into the SQL backend of your choice. In this case, we are creating an [SQLite](http://sqlite.org/) database in a new file named `datapackage.db`.

To load the data into SQL we will need the JSON Table Schema SQL Storage library:

<https://github.com/frictionlessdata/jsontableschema-sql-py>

You can install it by doing:

{% highlight bash %}
pip install jsontableschema_sql
{% endhighlight %}

Now you can load your data as follows:

{% highlight python %}
# create the database connection (using SQLAlchemy)
from sqlalchemy import create_engine
engine = create_engine('sqlite:///datapackage.db')

# now push the data to the database
from datapackage import push_datapackage
push_datapackage(descriptor=url,backend='sql',engine=engine)
{% endhighlight %}

If you have `sqlite3` installed, you can inspect and play with your
newly created database.  Note that column type information has been
translated from the JSON Table Schema format to native SQLite types:

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

{%include markdown-link-refs.html %}

