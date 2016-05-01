---
title: Working with Data Packages in Python
---

This tutorial will show you how to install the Python libraries for
working with Data Packages, load a Data Package from the Open
Knowledge "Core" Datasets repository, and push the Data Package into a
local SQL database.

## Setup 

For this tutorial, we will need both the main
[Data Package library](https://github.com/frictionlessdata/datapackage-py)
library and the
[JSON Table Schema SQL Storage library](https://github.com/frictionlessdata/jsontableschema-sql-py).
In addition, we will provide the SQL storage backend using
[SQLAlchemy](http://www.sqlalchemy.org/).

**Note:** *The `datapackage` package on PyPI as of 30 April is
  deprecated and
  [is being replaced](https://github.com/trickvi/datapackage/issues/70). Until
  then, the library can be installed directly from its
  [GitHub repository](https://github.com/frictionlessdata/datapackage-py).*

You can create a
[Python virtual environment](https://docs.python.org/3/library/venv.html)
using your preferred method and install the relevant libraries.

{% highlight bash %}
pip install git+git://github.com/frictionlessdata/datapackage-py.git
pip install jsontableschema_sql
pip install sqlalchemy
{% endhighlight %}

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

One of the key benefits of
[Tabular Data Package](/guides/tabular-data-package/) format is that
that schema information, as specified using
[JSON Table Schema](/guides/json-table-schema/) is also specified with
the data.  Now you can easily import your Data Package into the SQL
backend of your choice.  In this case, we are creating an
[SQLite](http://sqlite.org/) database in a new file named
`datapackage.db` using the [SQLAlchemy](http://www.sqlalchemy.org/)
library.

{% highlight python %}
from sqlalchemy import create_engine
engine = create_engine('sqlite:///datapackage.db')
{% endhighlight %}

With the SQL database connection created, we can now "push" the Data
Package into the database.  Schema information (e.g. types,
constraints, and relations between tables) is specified using
[JSON Table Schema](/guides/json-table-schema/) and provided for each
resource in the Data Package.

{% highlight python %}
from datapackage import push_datapackage
push_datapackage(descriptor=dp.metadata,backend='sql',engine=engine)
{% endhighlight %}

You can inspect your newly created database using the `sqlite3` command:

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

