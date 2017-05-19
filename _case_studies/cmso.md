---
title: Cell Migration Standardization Organization
site: https://cmso.science/
authors: Paola Masuzzo
logo: cmso-logo.png
forum_topic: "https://discuss.okfn.org/t/new-frictionless-data-case-study-published-cell-migration-standardization-organization/5353"
short_description: "Building standards for cell migration data in order to enable data sharing in the field"

---

## What is the project?

Researchers worldwide try to understand how cells move, a process
extremely important for many physiological and pathological
conditions. [Cell migration](https://en.wikipedia.org/wiki/Cell_migration)
is in fact involved in many processes, like wound healing, neuronal
development, and cancer invasion. The [CMSO](https://cmso.science/) is
a community trying to build standards for cell migration data, in
order to enable data sharing in the field. The organization has 3
working groups:

- Minimal reporting requirement
  ([MIACME](https://github.com/CellMigStandOrg/MIACME) = Minimum
  Information About a Cell Migration Experiment)
- Controlled Vocabularies
  ([CMEO](https://github.com/CellMigStandOrg/CMEO) = Cell Migration
  Experiment-driven Ontology)
- Data Formats and APIs

The last working group is the one where Data Package[^datapackages]
could be used/expanded for the definition of a standard format and
corresponding libraries to interact with these standards.  In
particular, we have started to address the standardization of cell
tracking data: data produced when tracking software takes a series of
cell images from a microscope and reconstructs their movement in time.

![Diagram](/img/case-studies/cmso-1.png)
*How everything fits together*
{: .caption}

## What are the challenges you face working with data?

CMSO deals specifically with cell migration data (a discipline of cell
biology). The main challenge lies in the heterogeneity of the
data. This diversity has its origin in two factors:

- **Experimentally**: cell migration data can be produced using many
  diverse techniques (imaging, non-imaging, dynamic, static,
  high-throughput/screening, etc.)
- **Analytically**: these data are produced using many diverse software
  packages, each of these writing data to specific (sometimes
  proprietary) file formats. This diversity hampers, or at least makes
  very difficult, things like meta-analysis, data integration across
  diverse sources, data mining, data reproducibility.

## How do you use the specs?

CMSO has developed and is about to release the first specification of
a
[Cell Tracking format](https://cellmigstandorg.github.io/Tracks/). This
specification is based on a tabular format, i.e. data are stored in
tables.  Current v0.1 of this specification can be seen at
[here](https://cellmigstandorg.github.io/Tracks/v0.1/).

CMSO is using the *Tabular* Data Package[^tdp] specification to
represent cell migration-derived tracking data, as illustrated
[here](https://github.com/CellMigStandOrg/biotracks). The
specification is meant to accomplish two goals:

- **Create a Data Package representation** where the data (in our case
  objects like detected cells, links, and optionally tracks) are
  stored in CSV files, while metadata and schema[^tableschema]
  information are stored in a JSON file.
- **Write** this Data Package to a pandas[^pandas] DataFrame, to aid
  quick inspection and visualization.

You can see some examples
[on our examples page](https://github.com/CellMigStandOrg/biotracks/tree/master/examples).

## How were you made aware of Frictionless Data?

I am an Open Science fan and advocate, so I try to keep up to date
with the initiatives of the
[Open Knowledge International](https://okfn.org/) teams. I guess I saw
a tweet and I checked the specs out. Also, I really wanted to keep
this light and simple. So I googled for 'CSV and JSON' formats or
something like that, and Frictionless Data popped out :).

## What else would you like to see developed?

That is a nice question. I have opened a couple of issues on the
[GitHub page of the spec](https://github.com/frictionlessdata/specs). The
CMSO is not sure yet if the Data Package representation will be the
one we’ll go for in the very end, because we would first like to know
how sustainable/sustained this spec will be in the future.

## What are the next things you are going to be working on yourself?

I want to get a series of images, and run different cell tracking
algorithms/software packages on them. Then I want to put the results
into a common, light and easy-to-interpret CSV and JSON format, and
show people how data containerization[^philosophy] can be the way to
go to enable research data exchange and knowledge discovery.

## How do these specs compare to others?

Cell tracking data are mostly stored in tabular format, but metadata
are never kept together with the data, which makes data interpretation
and sharing very difficult. The Frictionless Data spec takes care of
this. Some other formats are based on XML[^xml] annotation, which
certainly does the job, but are heavier (though perhaps more
sustainable in the long term). I hate Excel formats, and unfortunately
I need to parse those too. I love the integration with Python[^python]
and the Pandas system. Highly valuable when doing Data Science.

## What do you think are some other potential use cases.

As a researcher, I mostly deal with research data. I am pretty sure if
this could work for cell migration data, it could work for many cell
biology disciplines as well.

## Who else do you think we should speak to.

To more researchers! Perhaps to more data producers!

[^pandas]: Pandas: Python package for data analysis: <http://pandas.pydata.org/>
[^datapackages]: Data Package: <http://specs.frictionlessdata.io/data-package/>
[^xml]: Extensible Markup Language: <https://en.wikipedia.org/wiki/XML>
[^tdp]: Tabular Data Package: <http://specs.frictionlessdata.io/tabular-data-package/>
[^tableschema]: Table Schema: <http://specs.frictionlessdata.io/table-schema/>
[^philosophy]: Design Philosophy: <http://specs.frictionlessdata.io/#design-philosophy>
[^python]: Data Package-aware libraries in Python: <https://github.com/frictionlessdata/datapackage-py>, <https://github.com/frictionlessdata/tableschema-py>, <https://github.com/frictionlessdata/goodtables-py>
