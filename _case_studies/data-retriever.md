---
title: Data Retriever
site: http://www.data-retriever.org/
authors: Ethan White
logo: data-retriever-logo.png
forum_topic: "https://discuss.okfn.org/t/new-frictionless-data-case-study-published-cell-migration-standardization-organization/5353"
short_description: "Building standards for cell migration data in order to enable data sharing in the field"

---

## What is the project?

The Data Retriever automates the tasks of finding, downloading, and
cleaning up publicly available data, and then stores them in a variety
of databases and file formats. This lets data analysts spend less time
cleaning up and managing data, and more time analyzing it.

We originally built the Data Retriever starting in 2010 with a focus
on ecological data. Over time we realized that the common challenges
with finding, downloading, and cleaning up ecological applied to data
in most other fields as well, so we rebranded and starting integrating
data from other fields as well.

The Data Retriever is primarily focused on tabular data, but we’re
starting work on supporting spatial data as well.

![Diagram](/img/case-studies/data-retriever-install.gif) *The Data
Retriever automatically installing the BBS (USGS North American
Breeding Bird Survey) dataset* {: .caption}

## What are the challenges you face working with data?

Data is often messy and needs cleaning and restructuring before it can
be effectively used. It is often not feasible to modify and
redistribute the data due to licensing and other limitations.

We need to make it as easy as possible for contributors to add new
datasets. For relatively clean datasets this means having a simple
easy to work with metadata standard to describe existing data. The
description for each dataset is written in a single file which gets
read by our plugin infrastructure.

## How do you use the specs?

To describe the structure of simple data, we originally created a
YAML-like metadata structure.

When the Data Package specs were created by OKFN we decided to switch
over to using this standard so that others could benefit from the
metadata we were creating and so that we could benefit from the
standards-based infrastructure being created around the specs.

The transition to the Data Package specs was fairly smooth as most of
the fields we needed were already included in the specs. The only
thing that we needed to add were fields for restructuring poorly
formatted data since the spec assumes the data is well structured to
begin with. For example, we use custom fields for describing how to
convert wide data to long data.

## How were you made aware of Frictionless Data?

We first learned about Frictionless Data through the announcement of
their funding by the Sloan Foundation.

## What else would you like to see developed?

We would love to see the standard expanded to include information
about “imperfections” in data. Currently the standard assumes that the
person creating the metadata can modify the raw data files to comply
the standard rules of data structure. However this doesn’t work if
someone else is distributing the data, which is a very common use
case. The expansion of the standard would include things like a way to
indicate wide versus long data with enough information to uniquely
describe how to translate from one to the other and information on
single tables that are composed from the data in many separate
files. We have already been adding new fields to the json to
accomplish some of these things and would be happy to be part of a
large dialog about implementing them more widely. For the wide data to
long data example mentioned above we use `ct_column` and `ct_names`
fields and a `ct-type` type to indicate how to transform the data into
a properly normalized form.

The other thing we’ve come across is the need to develop a clear
specification for semantic versioning of Data Packages. The spec
includes an optional `version` field for keeping track to changes to
the package. This version has a standard structure from semantic
versioning in software that includes major, minor, and patch level
changes. Unlike in software there is no clearly established standard
for what changes in different version numbers indicated. Since we work
with a lot of different datasets we’ve been changing a lot of version
numbers over the last year and this has lead us to
[open a discussion with the OKFN team](https://github.com/frictionlessdata/specs/issues/421)
about developing a standard to apply to these changes.

## What are the next things you are going to be working on yourself?

Our next big step is working on the challenge of simple data
integration. One of the major challenges data analysts have after they
have cleaned up and prepared individual data sources is combining
them. General solutions to the data integration problem (e.g. linked
data approaches) have proven to difficult, but we are approaching the
problem by tackling a small number of common use cases and involving
humans in the metadata development describing the linkages between
datasets.

## How do these specs compare to others?

The major specification that’s available for ecological data is the
[Ecological Metadata Language (EML)](https://knb.ecoinformatics.org/#external//emlparser/docs/index.html). It
is an XML based spec that includes a lot of information specific to
ecological datasets. The nice thing about EML, which is also it’s
challenge, is that it is very comprehensive. This gives it a lot of
strength in a linked data context, but also means that it is difficult
to drive adoption by users.

The Frictionless Data specifications line up better with our approach
to data, which is to complement lightweight computational methods with
human contributions to make data easier to work with quickly.

## Are you looking for more contributors?  If so, how can they start?

Definitely. We work hard to make all of our development efforts open
and inclusive (see our
[Code of Conduct](https://github.com/weecology/retriever/blob/master/docs/code_of_conduct.rst))
and love it when new developers, data scientists, and domain
specialists contribute. A contribution can be as easy as adding a new
dataset by following a set of prompts to create a new JSON file and
submitting a PR on GitHUB, or even just opening an issue to tell us
about a dataset that would be useful to you. So,
[open an issue](http://github.com/weecology/retriever/issues/new),
submit a PR, or stop by our
[Gitter chat channel](https://gitter.im/weecology/retriever) and say
Hi. We also participate in Google Summer of Code, which is a great
opportunity for students interested in being directly supported to
work on the project to get involved.

[^pandas]: Pandas: Python package for data analysis: <http://pandas.pydata.org/>
[^datapackages]: Data Package: <http://specs.frictionlessdata.io/data-package/>
[^xml]: Extensible Markup Language: <https://en.wikipedia.org/wiki/XML>
[^tdp]: Tabular Data Package: <http://specs.frictionlessdata.io/tabular-data-package/>
[^tableschema]: Table Schema: <http://specs.frictionlessdata.io/table-schema/>
[^philosophy]: Design Philosophy: <http://specs.frictionlessdata.io/#design-philosophy>
[^python]: Data Package-aware libraries in Python: <https://github.com/frictionlessdata/datapackage-py>, <https://github.com/frictionlessdata/tableschema-py>, <https://github.com/frictionlessdata/goodtables-py>
