---
title: Fiscal Data Package
layout: specs
authors:
 - Paul Walsh
 - Rufus Pollock
 - Tryggvi Björgvinsson
 - Steve Bennett
 - Adam Kariv
 - Dan Fowler
version: 0.3.0
jsonschema: https://schemas.frictionlessdata.io/fiscal-data-package.json
updated: 28 January 2016
created: 14 March 2014
abstract: 'Fiscal Data Package is a lightweight and user-oriented format for publishing and consuming fiscal data. Fiscal data packages are made of simple and universal components. They can be produced from ordinary spreadsheet software and used in any environment.'
implementations:
  - title: Python
    link: https://github.com/frictionlessdata/datapackage-py
  - title: JavaScript
    link: https://github.com/frictionlessdata/datapackage-js
---

<div class="note" markdown="block">
<h6>NOTE</h6>

This is a draft specification and still under development. If you have comments
or suggestions please file them in the [issue tracker][issues]. If you have
explicit changes please fork the [git repo][repo] and submit a pull request.
</div>

[issues]: https://github.com/openspending/budget-data-package/issues
[repo]: https://github.com/openspending/budget-data-package/issues

# Changelog

- `0.3.0`: incorporates all changes up to `0.3.0-alpha9`
- `0.3.0-alpha9`: (!) rename mapping to model. Remove 'ocdid' as recommended attribute for location dimension.
- `0.3.0-alpha8`: remove transaction identifier
- `0.3.0-alpha7`: remove quality level guidance
- `0.3.0-alpha6`: dimension fields -> attributes, revert measures/dimensions/attributes to objects, add `parent` and `labelfor` keys on dimension attributes
- `0.3.0-alpha5`: variety of improvements and corrections including #35, #37 etc
- `0.3.0-alpha4`: reintroduce a lot of the content of data recommendations from v0.2
- `0.3.0-alpha3`: rework mapping structure in various ways
- `0.3.0-alpha2`: rename Budget Data Package to Fiscal Data Package
- `0.3.0-alpha`: very substantial rework of spec to use "mapping" approach between physical and logical model. Core framework, based on Tabular Data Package, is unchanged.
- [`0.2.0`](./0.2/): large numbers of changes and clarifications for particular fields but no substantive change to the overall spec
- [`0.1.0`](./0.1/): first complete version of the specification

# Overview

Data on government budgets and spending is becoming available in unprecedented quantities. The practice of publishing budget information as machine-readable and openly licensed data is spreading rapidly and will become increasingly standard.

Fiscal Data Package is an open specification for quantitative fiscal data, especially data generated during the planning and execution of budgets. It supports both data on expenditures and revenues, and also supports publishing both highly aggregated and highly granular data, for example individual transactions.

The specification is both simple and easy for publishers to use and, at the same time, sufficiently rich and structured to be useful and processable - especially machine processable - by consumers. In particular, Fiscal Data Packages are:

* Made from lightweight and easily made components (CSV data, JSON metadata)
* Structured according to a simple open standard
* Self-documented with metadata
* Including sufficient information to allow for automated and standardized processing and analysis

Fiscal Data Package specifies the *form* for fiscal data and offers a standardized framework for the *content*. By giving a common *form* to budget data, Fiscal Data Package frees data users from the artificial obstacles created by the lack of a standard structure. By clarifying the *content* of budget data and recommending standard information that fiscal data should contain, Fiscal Data Package helps make data releases more comparable and useful. The Fiscal Data Package specification provides support for:

* A simple and standard way to provide rich metadata about fiscal information - where it came from, who produced it, how it is licensed, what time period it covers etc
* Mapping the raw "physical" model, as represented by columns in the data files, to a standardized "logical" model based around basic fiscal concepts: amounts spent, suppliers, administrative and functional classifications etc
* Progressive enhancement of data via a range of *recommended*, but not *required* metadata, in order to establish a clear path for data providers to enhance data quality, and to address new use cases going forward.

Fiscal Data Package builds on the [Data Packages specifications][dp]. It defines a "profile" that adds some additional constraints.  It also extends the [Tabular Data Package][tdp] profile (`tabular`) which itself extends the `base` Data Package format.  Thus, any Fiscal Data Package is also a [Tabular Data Package][tdp], and is also a [Data Package][dp].

# Form and Structure

A Fiscal Data Package contains revenue and/or expenditure data for one or more entities, over one or more financial periods. It has a simple structure:

* Data files: one or more CSV files, which `SHOULD` be placed in a `data/` subdirectory.
* Descriptor: there `MUST` be a single `datapackage.json` file, which describes the structure of the data files and provides additional metadata.

The data files and descriptor are generally bundled together. For example:

File  | Comment
------|-------
`datapackage.json`            | Descriptor file
`README.md`                   | Optional, extra files are ignored.
`data/my-financial-data.csv`  | Actual data, referred to by descriptor.
`data/my-list-of-entities-receiving-money.csv`              | Data that augment the spend data, linked by foreign key.
`archive/my-original-data.xls` | Directory for original sources and "archival" material (optional)
`scripts/scrape-and-clean-the-data.py `| Scripts used in preparing the data package (optional)

## Data files

Data files in a Fiscal Data Package `MUST`:

* Be in CSV format.
* Meet the requirements of [Tabular Data Package][tdp]: a header row, no blank rows, etc.

Each row of each file describes some kind of movement of money, and may contain several amounts in different columns. With those basic constraints, several ways of arranging data are supported by this specification. We will focus on the following simple model:

```
+--------+------+------------+------------+
| Amount | Year | Department | Spend Type |
+--------+------+------------+------------+
| 1500   | 2014 | Education  |   Capital  |
+--------+------+------------+------------+
| ....
+-----
```

*Note: you can store other files in your data package - for example, you may want to archive the original xls or data files you used. However, we do not consider these data for the purposes of this specification.*

## Descriptor – `datapackage.json`

The `datapackage.json` describes:

* Package Metadata - title, author etc
* Resources - the name and type of each column of each data file
* Model - links each column to semantic meanings defined within the Fiscal Data Package logical data model

## Package Metadata

This follows [Data Package][dp] (DP). In particular, the following properties `MUST` be on the top-level descriptor:

```javascript
{

  // REQUIRED (DataPackage): a url-compatible short name ("slug")
  // for the package
  "name": "Australia2014",

  // REQUIRED (DataPackage): a human readable title for the package
  "title": "Australian annual budget 2013-14",

  // RECOMMENDED (DataPackage): the license for the data in this
  // package.
  "license": "cc-by 3.0",

  // RECOMMENDED: other properties such as description, homepage,
  // version, sources, author, contributors, keywords, as specified
  // in dataprotocols.org/data-packages/

  // RECOMMENDED: a valid 2-digit ISO country code (ISO 3166-1
  // alpha-2), or, an array of valid ISO codes (if this relates to
  // multiple countries). This field is for listing the country of
  // countries associated to this data.  For example, if this the
  // budget for country then you would put that country's ISO code.
  "countryCode": "au", // or [ "au", "nz" ]

  // RECOMMENDED: the "profile set" for this package. If the
  // `profiles` key is present, it MUST be set to the following
  // hash:
  "profiles": {
    "fiscal": "*",
    "tabular": "*"
  },

  // OPTIONAL: a keyword that represents the type of spend data:
  //   * "transaction": rows have dates and correspond to
  //     individual transactions
  //   * "aggregated": rows are summaries of expenditure across a
  //     fiscal period
  "granularity": "aggregated",

  // OPTIONAL: the fiscal period of the dataset
  "fiscalPeriod": {
    "start": "1982-04-22",
    "end": "1983-04-21"
  },

  // OPTIONAL: ...other properties...

  // REQUIRED: array of CSV files contained in the package. Defined
  // in http://dataprotocols.org/data-packages/ and
  // http://dataprotocols.org/tabular-data-package/ . Note:
  //   * Each data file `MUST` have an entry in the `resources`
  //     array
  //   * That entry in the `resources` array `MUST` have a JSON
  //     table schema describing the data file.
  //     (see http://dataprotocols.org/json-table-schema/)
  //    * Each entry must have a `name` attribute in order to be referenced
  //      in the `model` section.

  "resources": [ /* ... */ ],

  // REQUIRED, see "Model"
  "model": {

    // REQUIRED: the measures object in logical model
    "measures": {
      /* ... */ // REQUIRED at least 1: see "Measures"
    },

    // REQUIRED: the dimensions object in logical model
    "dimensions": {
      /* ... */ // REQUIRED at least 1: see "Dimensions"
    }
  }

}
```


## Resources

All the requirements of [Tabular Data Package][tdp] apply.

## Model

The `model` hash is central to Fiscal Data Package and serves two purposes. It defines a "logical model" for the data and it maps columns in the CSV files ("physical model") to columns in the "logical model".

<img src="https://docs.google.com/drawings/d/1krRsqOdV_r9VEjzDSliLgmTGcbLhnvd6IH-YDE8BEAY/pub?w=710&h=357" alt="" />

*Diagram illustrating how the model connects the "physical" model (raw CSV files) to the "logical", conceptual, model. The conceptual model is heavily oriented around OLAP.  ([Source on Gdocs](https://docs.google.com/drawings/d/1krRsqOdV_r9VEjzDSliLgmTGcbLhnvd6IH-YDE8BEAY/edit))*
{: style="text-align: center"}

A logical model is a description of the underlying structure and concepts in the data. Concepts like dates, amounts, classifications, administrative hierarchies and geographic locations. Our approach to describing the logical model is based heavily on the terminology and approach of [OLAP (Online Analytical Processing)][olap].[^why-olap] In particular, we heavily use the OLAP concepts of:

* Measures: these will be the monetary amounts in the fiscal data
* Dimensions: dimensions cover all items other than the measure and contain all the descriptive information such as dates, locations, entities receiving and spending money etc etc.

As we will see, `measures` and `dimensions` are the two main properties of the `model` hash.

[^why-olap]: We have chosen OLAP because OLAP is specfically designed for situations where there is one (or more) central numerical values and then various classifications of that data. Fiscal data has at its heart a single numeric concept: money. Hence the fit with OLAP.

### Measures

Measures are numerical and define the columns in the source data which contain financial amounts. Each measure is represented by a key in the `measures` object. The object has the following structure:

```javascript
"measures": {
  "measure-name": {
    // REQUIRED: Name of source field
    "source": "amount",

    // REQUIRED: Any valid ISO 4217 currency code.
    "currency": "USD",

    // OPTIONAL: A factor by which to multiple the raw monetary
    // values to get the real monetary amount, eg `1000`. Defaults
    // to `1`.
    "factor": 1,

    // OPTIONAL: Resource (referenced by `name` attribute) containing the source field. Defaults to
    // the first resource in the `resources` array.
    "resource": "budget-2014-au",

    // OPTIONAL: A keyword that represents the *direction* of the
    // spend, being one of "expenditure" or "revenue".
    "direction": "expenditure",

    // OPTIONAL: The phase of the budget that the values in this
    // measure relate to. It `MUST` be one of the following strings:
    // proposed, approved, adjusted, executed.
    "phase": "proposed",

    // OPTIONAL: Other properties allowed.
  }
  //...
}
```

### Dimensions

Each dimension is represented by a key in the `dimensions` object. The object has the following structure:

```javascript
"dimensions": {
  "project-class": {
    // REQUIRED: An attributes object listing the one or more columns that make up
    // the dimension. Each attribute MUST have `source` information -
    // i.e. where the data comes from for that property
    "attributes": {
      "project": {
        // REQUIRED:
        // EITHER: the field name where the value comes from for
        // this property (see "Describing Sources" above);
        "source": "proj",
        // OR: a single value that applies for all rows of the
        // dataset.
        "constant": "Some Project",

        // OPTIONAL: the resource (referenced by `name` attribute) in which the field is located.
        // Defaults to the first resource in the `resources` array.
        "resource": "budget-2014-au"

        // OPTIONAL: the key referencing an attribute within this
        // dimension (if it exists) for which this attribute
        // provides a label.  For instance, given two dimension
        // attributes named "project_code" and "project_label",
        // the attribute "project_label" will provide a "labelfor"
        // pointing to "project_code"
        "labelfor": "..."
      },

      // Other attributes may be required, depending on the dimensionType. See the "Dimension types" section.
      "code": {
        "source": "class_code"
      }
    },

    // REQUIRED: Either an array of strings corresponding to the
    // attribute keys in the `attributes` object or a single string
    // corresponding to one of these. The value of `primaryKey`
    // indicates the primary key or primary keys for the dimension.

    "primaryKey": ["project", "code"],

    // OPTIONAL: Describes what kind of a dimension it is.
    // `dimensionType` is a string that `MUST` be one of the
    // following:
    //
    // * "datetime": the date of a transaction
    // * "entity": names the organisation doing the spending or
    //   receiving
    // * "classification": one or more fields that create a
    //   categorical hierarchy of the type of spending (eg:
    //   Health > Hospital services > Nursing). Combine with
    //   `classificationType` for greater expressiveness.
    // * "activity": names a specific programme or project under
    //   which the money is spent
    // * "fact": an attribute such as an ID or reference number
    //   attached to a transaction
    // * "location": the geographical location where money is spent
    // * "other": not one of the above
    "dimensionType": "classification"

    // OPTIONAL: Other properties allowed.

  }
  //...
}
```


# Dimension types

This section provides guidance, and certain requirements, on the naming of dimension attributes. For example, if you have a column representing the name of an organisation, it should be modelled as a `title` attribute on an dimension with `dimensionType` of `entity`.

## Classification

```javascript
"spending-classification": {
  "dimensionType": "classification",

  // RECOMMENDED: The basis on which transactions are being classified, one of these values:
  //
  // * "administrative": an organisational structure, such as
  //   Portfolio > Department > Branch
  // * "functional": the purpose of the spending, such as
  //   Health > Hospital services > Nursing
  // * "economic": focused on the nature of the accounting, such
  //   as Compensation > Wages and salaries > Wages and salaries in cash
  "classificationType": "administrative",

  "attributes": {
    // REQUIRED: a "code" attribute, referencing a column whose values are unique identifiers from the relevant codesheet (see "Known classification schemes").
    "code": {
      "source": "PROJECT_CODE",
      // To define a hierarchical classification, the "parent" attribute refers to the attribute "above" it in the hierarchy.
      // Set it on the `code` field, not a title field. See the ["Labels and Hierarchies" example][/examples/labels-and-hierarchies/].
      "parent": "PROGRAMME_NAME"
      // Optional: If classifications are subject to change, a `version` attribute `SHOULD` be used.
      // "version": "1.3"
    },
    "program": {
      "source": "PROGRAMME_NAME"
    },
    "project": {
      "source": "PROJECT_NAME"
    }
  }
  // (primary key and other properties are omitted in this section)
}
```

### Known classification schemes

Dimensions of type `classification` with these names are significant:

* `"cofog"`: the United Nations [Classification of the Functions of Government][cofog]
* `"gfsm"`: the [IMF Government Finance Statistics Manual (2014)][gfsm2014]. For expenditure classification, use Table 6.1. For revenue, use Table 5.1.

[gfsm2014]: http://www.imf.org/external/np/sta/gfsm/

### Chart of Accounts

To describe an "economic" classification for an item using the publisher's chart of accounts, use these attributes:

* `code`:  The internal code identifier for the economic classification.
* `title`:  Human-readable name of the economic classification of the budget item (i.e. the type of expenditure, e.g. purchases of goods, personnel expenses, etc.), drawn from the publisher's chart of accounts.

## Activity

A `dimensionType` of `activity` defines the program or project associated with expenditure or revenue. When these terms are not used interchangably, the distinction is generally that "programs" (a sets of goal-oriented activities) contain "projects" (specific sets of tasks with a defined budget and schedule).

```javascript
"program-or-project-name": {
  "dimensionType": "activity",
  "attributes": {
    // Attributes SHOULD be named as follows, if available:
    "id": { ... },    // The internal code identifier for the government program or project
    "title": { ... } // Name of the government program or project underwriting the budget item.
  }
}
```

## Entity

A `dimensionType` of `entity` is describes a distinct organization, government department, or individual that is spending or receiving a given amount.

```javascript
"program-or-project-name": {
  "dimensionType": "entity",

  "attributes": {
    // Attributes SHOULD be named as follows, if available:
    "title": { ... },        // The title or name of the government entity legally responsible for spending the budgeted amount.
    "id": { ... },           // The internal code for the administrative entity.
    "location": { ... }      // Reference to a dimension of type `location` providing the geographical region where the administrative entity is located.
  }
}
```

### Accounts as entities

Although an "account" through which money is spent or received is not strictly an "entity", it can be treated as one for analysis as follows:

* `title`: The fund into which the revenue item will be deposited. (This refers to a named revenue stream.)
* `id`: The internal code identifier for the fund.

## Location

A `dimensionType` of `location` defines the geographic region associated with an item of expenditure or revenue, enabling spatial analysis.

```javascript
"projectlocation": {
  "dimensionType": "location",
  "attributes": {
    // Attributes SHOULD be named as follows, if available:
    "code": { ... },    // A code uniquely identifying the geographic region.
    "title": { ... },   // The title of the geographic region.
    "codeList": { ... } // The name of the standard or list which the codes belong to. No standard way to refer to them is given.
  }
}
```

(An alternative option is to add `geoCode`, `geoTitle` and/or `geoCodeList` attributes directly to another dimension.)

----
# Examples

{% assign sorted_pages = site.pages | sort:"order" %}
{% for page in sorted_pages %}
  {% if page.category == 'example' %}
  * [{{ page.title }}]({{ page.url | remove: 'index.html' }})
  {% endif %}
{% endfor %}


----

## Which dimension type?

This section lists the suggested sets of dimensions that can usefully describe different types of spending data.

### Aggregated expenditure data

Aggregated expenditure data (direction `expenditure`, granularity `aggregated`) describes planned or executed government expenditures. These planned expenditures are disaggregated to at least the *functional category* level, and they can optionally be disaggregated up to the level of individual projects.

Aggregated data is in many cases the proposed, approved or adjusted budget (but can also be an aggregated version of actual expenditure). For this reason there are attributes in aggregated data which are not applicable to transactional data, and vice versa.

| Dimension | Type |  Description|
| ----- | -------- |  ---------- |
| cofog | `classification` |  The COFOG functional classification for the budget item. |
| gfsm  | `classification` |  The GFSM 2014 economic classification for the budget item. |
| chart-of-accounts | `classification` |  Human-readable name of the (non-COFOG) functional classification of the budget item (i.e. the socioeconomic objective or policy goal of the spending; e.g. "secondary education"), drawn from the publisher's chart of account. |
| administrator | `entity` |  The name of the government entity legally responsible for spending the budgeted amount. |
| account | `entity` |  The fund from which the budget item will be drawn. (This refers to a named revenue stream.) |
| program | `activity` |   Name of the government program underwriting the budget item. |
| procurer | `entity` |  The government entity acting as the procurer for the transaction, if different from the institution controlling the project. |

### Aggregated revenue data

Aggregated revenue data (direction `revenue`, granularity `aggregated`) describes projected or actual government revenues, disaggregated to the *economic category* level.

Aggregated data is in many cases the proposed, approved or adjusted budget (but can also be an aggregated version of actual revenue). For this reason there are attributes in aggregated data which are not applicable to transactional data, and vice versa.

| Dimension | Type |  Description|
| --------- | ---- | ------------|
| chart-of-accounts | `classification` |  Name of the economic classification of the revenue item, drawn from the publisher's chart of account. |
| gfsm | `classification` |  The GFSM 2014 economic classification for the revenue item. |
| account | `entity` |  The fund into which the revenue item will be deposited. (This refers to a named revenue stream.) |
| recipient | `entity` |  The recipient (if any) targetted by the revenue item. |
| source | `location` |  Geographical region from which the revenue item originates. |

### Transactional expenditure data

Transactional expenditure data (direction `expenditure`, granularity `transactional`) describes government expenditures at the level of individual transactions, exchanges of funds taking place at a specific time between two entities.

| Dimension | Type |  Description|
| --------- | ---- |  ---------- |
| administrator | `entity` |  The government entity responsible for spending the amount. |
| date | `datetime` |  The date on which the transaction took place. |
| supplier | `entity` |  The recipient of the expenditure. |
| contract | `activity` |  The contract associated with the transaction. |
| budgetLineItem | `other` |  The unique ID of budget line item (value of id column for budget line) authorizing the expenditure. The budget line can either come from an approved or adjusted budget, depending on if the transaction takes place after the related budget item has been adjusted or not. |
| invoiceID | `other` |  The invoice number given by the vendor or supplier. |
| procurer | `entity` |  The government entity acting as procurer for the transaction, if different from the institution controlling the project. |

# Acknowledgements

Thanks to the following people for being involved in discussion around the specification, or piloting with the specification:

- Vitor Baptista
- Sarah Bird
- Anders Pedersen
- Samidh Chakrabarti
- Pierre Chrzanowski
- Andrew Clarke
- Velichka Dimitrova
- Friedrich Lindenberg
- James McKinney
- Paolo de Renzio
- Martin Tisne

----

# Appendix

## Budget Data

A budget is over a year-long process of planning, execution, and oversight of a government's expenditures and revenues. At multiple stages in the process, *quantitative data* is generated, data which specifies the sums of money spent or collected by the government. This data can represent either plans/projections or actual transactions.

In a typical budget process, a government authority, e.g. the executive arm, will put together a **proposed** budget and submit that for approval, e.g. by the country's legislative arm. The approval process might involve making changes to the proposal before the **approved** version is accepted. As time goes by there is a possibility that some projects, institutions etc. will require more money to fulfill their task so adjustments need to be made to the approved budget. The **adjustment** is then approved by the original budget entity, e.g. the legislative arm. This usually requires reasoning for why the original budget was not sufficient. The **executed** budget is the actual money spent or collected which can then be compared to the approved and adjusted plan.

By recognizing the following distinctions between data types, Fiscal Data Package is expressive enough to cover the data generated at every stage:

* Data can represent either *expenditures* or *revenues*.
* Data can be either *aggregated* or *transactional*. An item of aggregated data represents a whole category of spending (e.g. spending on primary education). An item of transactional data represents a single transaction at some specific point in time.
* Data can come from any phase in the budget cycle (proposal, approval, adjustment, execution). This includes three different types of planned / projected budget items (proposal, approval, adjustment) and one representing actual completed transactions (execution).

### Budget Hierarchy and Categorizations

Budget data has various degrees of hierarchy, depending on the perspective. From a functional perspective it can use a functional classification. The functional classification can be set up as a few levels (a hierarchy). An economical classification is not compatible with the functional hierarchy and has a different hierarchy. Another possible hierarchy would be a program/project hierarchy where many projects are a part of a program.

All of these hierarchies give a picture of how the budget line fits into the bigger picture, but none of them can give the whole picture. Budget data usually only includes general classification categories or the top few hierarchies. For example, a project can usually be broken down into tasks, but budget data usually would not go into so much detail. It might not even be divided into projects.

Categorizing and organizing the data is more about describing it from the bigger perspective than breaking it down into detailed components and the Fiscal Data Package specification tries to take that into account by including top level hierarchies and generalised classification systems but there is still a possibility to go into details by supplying a good description of every row in the budget data.



[dp]: http://dataprotocols.org/data-packages/
[tdp]: http://dataprotocols.org/tabular-data-package/
[bdp]: https://github.com/openspending/budget-data-package
[bdp-resources]: https://github.com/openspending/budget-data-package/blob/master/specification.md#budget-specific-metadata
[dp-profiles]: https://github.com/dataprotocols/dataprotocols/issues/87
[dp-resources]: http://dataprotocols.org/data-packages/#resource-information
[fd]: http://data.okfn.org
[mapping]: http://docs.openspending.org/en/latest/model/design.html#views-and-pre-defined-visualizations
[views]: http://docs.openspending.org/en/latest/model/design.html#views-and-pre-defined-visualizations
[jts]: http://dataprotocols.org/json-table-schema/
[current-model]: http://docs.openspending.org/en/latest/model/design.html
[cofog]: http://unstats.un.org/unsd/cr/registry/regcst.asp?Cl=4
[imf-budget]: http://www.imf.org/external/pubs/ft/tnm/2009/tnm0906.pdf
[olap]: https://en.wikipedia.org/wiki/Online_analytical_processing
