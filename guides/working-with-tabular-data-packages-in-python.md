---
title: Working with Data Packages in Python
---

This tutorial will show you how to install the Python libraries for
working with Data Packages, load a Data Package from the Open
Knowledge "Core" Datasets repository, and push the Data Package into a
local SQL database.

## Setup 

For this tutorial, we will need the main Python Data Package library:

<https://github.com/frictionlessdata/datapackage-py>

You can install it as follows:

{% highlight bash %}
# you may want to create a virtual environment first
# see https://docs.python.org/3/library/venv.html
pip install git+git://github.com/frictionlessdata/datapackage-py.git
{% endhighlight %}

**Note:** *The `datapackage` package on PyPI as of 30 April is out of date so
you have to install from source. This will soon be fixed and you can install
the package from PyPI.*

## Reading Basic Metadata

You can start using the library by importing `datapackage` and load a
published Data Package using its URL.  In this case, we are using the
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

Now that you have your Data Package loaded, you can get access general
information about it (e.g. title, source, description) using the
`metadata` dict attribute.  Note that these fields are optional and
may not be specified for all Data Packages.  For more information on
which fields are supported, see
[the full Data Package standard](http://dataprotocols.org/data-packages/#metadata).

{% highlight python %}
print(dp.metadata['title'])
> Standard and Poors (S&P) 500 Index Data including Dividend, Earnings and P/E Ratio 

print(dp.metadata['description'])
> S&P 500 index data including level, dividend, earnings and P/E ratio on a monthly basis since 1870. The S&P 500 (Standard and Poors 500) is a free-float, capitalization-weighted index of the top 500 publicly listed stocks in the US (top 500 by market cap).
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
push_datapackage(descriptor=dp.metadata,backend='sql',engine=engine)
{% endhighlight %}

All the schema information (e.g. types, constraints, and relations between tables) in the [JSON Table Schema](/guides/json-table-schema/) for each resource will be used. You can see this if you inspect your newly created database using the `sqlite3` command:

{% highlight sql %}
$ sqlite3 datapackage.db 
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

