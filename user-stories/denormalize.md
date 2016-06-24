---
title: Denormalize
section: user-stories
as-a: User
want: a simple tool that will denormalize any normalized files in my Data Package
so-that: I can load my data into tools that don’t support multiple tables
---

## User Story

*As a {{ page.as-a }}, I want {{ page.want }} so that {{ page.so-that }}*

As an example, I have two files: `spending.csv` and `supplier.csv`
that I have Data Packaged.  In the `datapackage.json` (see
[below](#original-data-package)), I have defined a
[foreign key](http://specs.frictionlessdata.io/json-table-schema/#foreign-keys)
relationship between these two resources.

`# spending.csv`

| Amount | SupplierID |
|---|---|
| 100 | 1 |

`# supplier.csv`

| ID | Name |
|---|---|
| 1 | Jones Ltd |

[DPM](https://github.com/okfn/dpm) is a command line tool for working
with Data Packages.  At the simplest level, it would be ideal for `dpm
merge mydatapackage` to generate the following CSV data on standard
output.  This would be roughly equivalent to the output of the
following `csvsql` (see
[csvkit](http://csvkit.readthedocs.org/en/latest/scripts/csvsql.html))
command:

```
csvsql --query 'SELECT Amount,SupplierID,Name AS supplier_Name            \\
                FROM spending                                             \\
                INNER JOIN supplier                                       \\ 
                ON spending.SupplierID=supplier.ID'                       \\
spending.csv supplier.csv 

```

| Amount |  SupplierID | supplier_Name |
|---|---|---|
| 100 | 1 | Jones Ltd |

Here are some options for the command:

- `--datapackage PATH` 

  Given that we are starting with a Data Package, we should also be
  able to generate a new Data Package at a given `PATH`.  All fields
  from the original Data Package should be carried over, but it should
  have no `foreignkeys` and should consist of only one resource.

## Original Data Package

`# datapackage.json`

```
{
  "name": "spending-supplier",
  "resources": [
    {
      "name": "spending",
      "path": "spending.csv",
      "schema": {
        "fields": [
          {
            "name": "Amount",
            "type": "integer"
          },
          {
            "name": "SupplierID",
            "type": "integer"
          }
        ],
        "foreignKeys": [
          {
            "fields": "SupplierID",
            "reference": {
              "resource": "supplier",
              "fields": "ID"
            }
          }
        ]
      }
    },
    {
      "name": "supplier",
      "path": "supplier.csv",
      "schema": {
        "fields": [
          {
            "name": "ID",
            "type": "integer"
          },
          {
            "name": "Name",
            "type": "string"
          }
        ]
      }
    }
  ]
}

```

## Reference

- [csv-join](https://github.com/maxogden/csv-join) by Max Ogden
- [csvjoin](http://csvkit.readthedocs.org/en/latest/scripts/csvjoin.html) by Christopher Groskopf
