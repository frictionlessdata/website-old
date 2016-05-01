---
title: Creating Data Packages in Python
---

This tutorial will show you how to install the Python libraries for
working with Data Packages and JSON Table Schema, load a CSV file,
infer its schema, and write a Tabular Data Package.

## Setup 

For this tutorial, we will need both the main
[Data Package library](https://github.com/frictionlessdata/datapackage-py)
library and `infer` from 
[JSON Table Schema](https://github.com/frictionlessdata/jsontableschema-sql-py).

**Note:** *The `datapackage` package on PyPI as of 30 April is
  deprecated and
  [is being replaced](https://github.com/trickvi/datapackage/issues/70). Until
  then, the library can be installed directly from its
  [GitHub repository](https://github.com/frictionlessdata/datapackage-py).*

{% highlight bash %}
pip install git+git://github.com/frictionlessdata/datapackage-py.git
pip install jsontableschema
{% endhighlight %}

## Creating Basic Metadata

You can start using the library by importing `datapackage`.  You can
add useful metadata by adding keys to metadata dict attribute.  For
the keys supported, please consult the full
[Data Package standard](http://dataprotocols.org/data-packages/#metadata).
Note, we will be creating the required `resources' key below.

{% highlight python %}
import datapackage
dp = datapackage.DataPackage()
dp.metadata['name'] = 'country-codes-usd-gbp'
dp.metadata['title'] = 'Country Codes (USD & GBP)'
{% endhighlight %}

## Inferring a CSV Schema 

To do this, we will read in our CSV file as a stream.  Let's say we
have a file called pt-data1.csv in our working directory that looks
like this:

|  atomic number | symbol | name          | atomic mass | metal or nonmetal?    |
|----------------+--------+---------------+----------------------------+-----------------------|
|  1             | H      | Hydrogen      | 1.00794                 | nonmetal              |
|  2             | He     | Helium        | 4.002602                | noble gas             |
|  3             | Li     | Lithium       | 6.941                   | alkali metal          |
|  4             | Be     | Beryllium     | 9.012182                | alkaline earth metal  |
|  5             | B      | Boron         | 10.811                  | metalloid             |

We need to use `infer` from the JSON Table Schema library.  We open
the path as a stream, separating the headers from the rest of the
file.  We than pass the headers and values to infer.  The result of
which is an inferred schema.  For example, if the processor detects
only integers in a given column, it will assign `integer` as a column
type.

Once we have a schema, we are now ready to add a "resource" to the
Data Package which points to the resource path and its newly created
schema.

{% highlight python %}
import io
import csv
from jsontableschema import infer

with io.open(filepath) as stream:
    headers = stream.readline().rstrip('\n').split(',')
    values = csv.reader(stream)
    schema = infer(headers, values)
    dp.metadata['resources'] = [
        {
            'name': 'data',
            'path': 'pt-data1.csv',
            'schema': schema
        }
    ]
{% endhighlight %}

Now we are ready to write our `datapackage.json` file.

{% highlight python %}
with open('datapackage.json', 'w') as f:
  f.write(dp.to_json())
{% endhighlight %}

The `datapackage.json` is inlined below.  Note that atomic number has
been correctly inferred as an `integer` and atomic mass as a `number`
(float) while every other column is a `string`.

{% highlight json %}
{
  "name": "country-codes-usd-gbp",
  "title": "Country Codes (USD & GBP)",
  "resources": [
    {
      "name": "data",
      "path": "pt-data1.csv",
      "schema": {
        "fields": [
          {
            "name": "atomic number",
            "type": "integer",
            "title": "",
            "description": "",
            "format": "default"
          },
          {
            "name": "symbol",
            "type": "string",
            "title": "",
            "description": "",
            "format": "default"
          },
          {
            "name": "name",
            "type": "string",
            "title": "",
            "description": "",
            "format": "default"
          },
          {
            "name": "atomic mass in au or g/mol",
            "type": "number",
            "title": "",
            "description": "",
            "format": "default"
          },
          {
            "name": "metal or nonmetal?",
            "type": "string",
            "title": "",
            "description": "",
            "format": "default"
          }
        ]
      }
    }
  ]
}
{% endhighlight %}
