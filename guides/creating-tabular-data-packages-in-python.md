---
title: Creating Data Packages in Python
---

This tutorial will show you how to install the Python library for
working with Data Packages and JSON Table Schema, load a CSV file,
infer its schema, and write a Tabular Data Package.

## Setup 

For this tutorial, we will need the
[Data Package library](https://github.com/frictionlessdata/datapackage-py)
([PyPI](https://pypi.python.org/pypi/datapackage)) library.

{% highlight bash %}
pip install datapackage
{% endhighlight %}

## Creating Basic Metadata

You can start using the library by importing `datapackage`.  You can
add useful metadata by adding keys to metadata dict attribute.  Below,
we are adding the required `name` key as well as a human-readable
`title` key.  For the keys supported, please consult the full
[Data Package standard](http://specs.frictionlessdata.io/data-packages/#metadata).
Note, we will be creating the required `resources` key further down
below.

{% highlight python %}
import datapackage
dp = datapackage.DataPackage()
dp.metadata['name'] = 'period-table'
dp.metadata['title'] = 'Periodic Table'
{% endhighlight %}

## Inferring a CSV Schema 

Let's say we have a file called `data.csv`
([download](https://github.com/frictionlessdata/example-data-packages/blob/master/periodic-table/data.csv)) in our working
directory that looks like this:

|  atomic number | symbol | name          | atomic mass | metal or nonmetal?    |
|----------------+--------+---------------+----------------------------+-----------------------|
|  1             | H      | Hydrogen      | 1.00794                 | nonmetal              |
|  2             | He     | Helium        | 4.002602                | noble gas             |
|  3             | Li     | Lithium       | 6.941                   | alkali metal          |
|  4             | Be     | Beryllium     | 9.012182                | alkaline earth metal  |
|  5             | B      | Boron         | 10.811                  | metalloid             |

We can guess at our CSV's [schema](/guides/json-table-schema/) by
using `infer` from the JSON Table Schema library.  We open the path as
a stream, separating the headers from the rest of the file.  We then
pass the headers and values to infer.  The result of which is an
inferred schema.  For example, if the processor detects only integers
in a given column, it will assign `integer` as a column type.

Once we have a schema, we are now ready to add a `resource` key to the
Data Package which points to the resource path and its newly created
schema.

{% highlight python %}
import io
import csv
from jsontableschema import infer

filepath = './data.csv'

with io.open(filepath) as stream:
    headers = stream.readline().rstrip('\n').split(',')
    values = csv.reader(stream)
    schema = infer(headers, values)
    dp.metadata['resources'] = [
        {
            'name': 'data',
            'path': filepath,
            'schema': schema
        }
    ]
{% endhighlight %}

Now we are ready to write our `datapackage.json` file.

{% highlight python %}
with open('datapackage.json', 'w') as f:
  f.write(dp.to_json())
{% endhighlight %}

The `datapackage.json`
([download](https://github.com/frictionlessdata/example-data-packages/blob/master/periodic-table/datapackage.json)) is
inlined below.  Note that atomic number has been correctly inferred as
an `integer` and atomic mass as a `number` (float) while every other
column is a `string`.

{% highlight json %}
{
  "title": "Periodic Table",
  "resources": [
    {
      "schema": {
        "fields": [
          {
            "title": "",
            "type": "integer",
            "description": "",
            "format": "default",
            "name": "atomic number"
          },
          {
            "title": "",
            "type": "string",
            "description": "",
            "format": "default",
            "name": "symbol"
          },
          {
            "title": "",
            "type": "string",
            "description": "",
            "format": "default",
            "name": "name"
          },
          {
            "title": "",
            "type": "number",
            "description": "",
            "format": "default",
            "name": "atomic mass"
          },
          {
            "title": "",
            "type": "string",
            "description": "",
            "format": "default",
            "name": "metal or nonmetal?"
          }
        ]
      },
      "path": "./data.csv",
      "name": "data"
    }
  ],
  "name": "period-table"
}
{% endhighlight %}

## Publishing

Now that you have created your Data Package, you might want to
[publish your data online](/guides/publish/online/) so that you can
share it with others.
