---
title: Quick Start in Python
redirect_from: 
  - ./working-with-tabular-data-packages-in-python/
---

This tutorial will show you how to install the Python libraries for
working with Tabular Data Packages and demonstrate a very simple
example of loading a Tabular Data Package from the web and pushing it
directly into a local SQL database.  A short example of pushing your
dataset to Google's BigQuery follows.

## Setup 

For this tutorial, we will need the main Python Data Package library:

<https://github.com/frictionlessdata/datapackage-py>

You can install it as follows:

{% highlight bash %}
pip install datapackage
{% endhighlight %}

## Reading Basic Metadata

In this case, we are using an example Data Package
([datapackage.json](http://frictionlessdata.io/example-datasets/periodic-table/datapackage.json),
[data.csv](http://frictionlessdata.io/example-datasets/periodic-table/data.csv))
containing the periodic table.  This dataset includes the atomic
number, symbol, element name, atomic mass, and the metallicity of the
element.

|  atomic number | symbol | name          | atomic mass | metal or nonmetal?    |
|----------------+--------+---------------+----------------------------+-----------------------|
|  1             | H      | Hydrogen      | 1.00794                 | nonmetal              |
|  2             | He     | Helium        | 4.002602                | noble gas             |
|  3             | Li     | Lithium       | 6.941                   | alkali metal          |
|  4             | Be     | Beryllium     | 9.012182                | alkaline earth metal  |
|  5             | B      | Boron         | 10.811                  | metalloid             |

You can start using the library by importing `datapackage`.  Data
Packages can be loaded either from a local path or directly from the
web.

{% highlight python %}
import datapackage
url = 'http://frictionlessdata.io/example-datasets/periodic-table/datapackage.json'
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
> "Periodic Table" 
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
engine = create_engine('sqlite:///periodic-table-datapackage.db')

# now push the data to the database
from datapackage import push_datapackage
push_datapackage(descriptor=url,backend='sql',engine=engine)
{% endhighlight %}

If you have `sqlite3` installed, you can inspect and play with your
newly created database.  Note that column type information has been
translated from the JSON Table Schema format to native SQLite types:

{% highlight sql %}
$ sqlite3 periodic-table-datapackage.db 
SQLite version 3.8.10.2 2015-05-20 18:17:19
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE ___data___data (
	"atomic number" INTEGER, 
	symbol TEXT, 
	name TEXT, 
	"atomic mass" FLOAT, 
	"metal or nonmetal?" TEXT
);
{% endhighlight %}

{%include markdown-link-refs.html %}

## Loading into BigQuery

Loading into BigQuery requires some setup on Google's infrastructure,
but once that is completed, loading data can be just as frictionless.
Here are the steps to follow:

1. Create a new project - [link](https://console.cloud.google.com/iam-admin/projects)
2. Create a new service account key - [link](https://console.developers.google.com/apis/credentials)
3. Download credentials as JSON and save as `.credentials.json` 
4. Create dataset for your project - [link](https://bigquery.cloud.google.com/welcome/) (e.g. "dataset")

To load the data into BigQuery using Python, we will need the JSON
Table Schema BigQuery Storage library:

<https://github.com/frictionlessdata/jsontableschema-bigquery-py>

You can install it as follows:

{% highlight bash %}
pip install jsontableschema_bigquery
{% endhighlight %}

The code snippet below should be enough to push your dataset into the cloud!

{% highlight python %}
import io
import os
import json
from apiclient.discovery import build
from oauth2client.client import GoogleCredentials
from jsontableschema_bigquery import Storage

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '.credentials.json'
credentials = GoogleCredentials.get_application_default()
service = build('bigquery', 'v2', credentials=credentials)
project = json.load(io.open('.credentials.json', encoding='utf-8'))['project_id']
push_datapackage(descriptor=url,backend='bigquery',project=project,service=service,
    dataset='dataset')
{% endhighlight %}

If everything is in place, you should now be able to inspect your
dataset on BigQuery.

![BigQuery Schema](/img/bigquery-schema.png)

![BigQuery Preview](/img/bigquery-preview.png)
