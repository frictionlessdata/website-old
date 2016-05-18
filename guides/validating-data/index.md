---
title: Validating Data
---

Tabular data (e.g. data stored in [CSV](/guides/csv/) and Excel worksheets) is one of the most common forms of data available on the web. This guide will walk through validating tabular data using Frictionless Data tooling.

This guide show how you can validate your tabular data and check both:

* Structure: are there too many rows or columns in some places?
* Schema: does the data fit its schema. Are the values in the date column actually dates? Are all the numbers greater than zero?

We will walk through two methods of performing validation:

* Webservice: an online service called GoodTables. This option requires no technical knowledge or expertise.
* Using the Python GoodTables library. This allows you full control over the validation process but requires knowledge of Python.

* ToC
{:toc}

## Good Tables

[Good Tables](http://goodtables.okfnlabs.org/) is a free, open-source, hosted
service for validating tabular data. Good Tables checks your data for
its *structure*, and, optionally, its adherence to a specified *schema*.
Good Tables will give quick and simple feedback on where your tabular
data may not yet be quite perfect.

![Good Tables screenshot](/img/good-tables-screenshot.png)

To start, all you need to do is upload or provide a link to a CSV
file and hit the "Validate" button.

![Good Tables Provide URL](/img/good-tables-provide-data.png)

![Good Tables Validate button](/img/good-tables-validate.png)

If your data is structurally valid, you should receive the following
result:

![Good Tables Valid](/img/good-tables-valid.png)

If not...

![Good Tables Invalid](/img/good-tables-invalid.png)

The report should highlight the structural issues found in your data
for correction.  For instance, a poorly structured tabular dataset may
consist of a header row with too many (or too few) columns when
compared to of data rows with an equal amount of columns. 

You can also provide a schema for your tabular data defined using JSON
Table Schema. 

![Good Tables Provide Schema](/img/good-tables-provide-schema.png)

Briefly, the format allows users to specify not only
the types of information within each column in a tabular dataset, but
also expected values.  For more information, see the
[JSON Table Schema guide](/guides/json-table-schema/) or
[the full standard](http://dataprotocols.org/json-table-schema/).

## Python + GoodTables

GoodTables is also available as a Python library.  The following short
snippets demonstrate examples of loading and validating data in a file
called `data.csv`.

### Validating Structure

{% highlight python %}
{% include_relative validate_structure.py %}
{% endhighlight %}

### Validating Schema

{% highlight python %}
{% include_relative validate_schema.py %}
{% endhighlight %}

## Continuous Data Integration

We can build on the existing Good Tables service and Python tooling to
build the equivalent of "continuous integration" service for data.  In
this model, on every update, data can be validated for its structure
and for adherence to a schema.  Behind the scenes, this is just a normal
Travis CI configuration.

![Data Valid](/img/data_ci_travis.png)

We have an example running here:

<https://github.com/frictionlessdata/ex-continuous-data-integration>

See the `README.md` for more information.
