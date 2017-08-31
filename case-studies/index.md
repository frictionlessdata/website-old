---
title: Pilots and Case Studies
layout: page
lead: true
---

We're curious to learn about some of the common issues users face when
working with data.

Through our **Pilots**, we are working directly with organizations to
solve real problems managing data.  In our **Case Study series**, we
are highlighting projects and organisations who are working with the
Frictionless Data specifications and tooling in interesting and
innovative ways.

## Pilots

{% for pilot in site.pilots %}
* [{{pilot.title}}]({{ pilot.url }})

  *{{ pilot.short_description }}*
{% endfor %}

## Case Studies

{% for case_study in site.case_studies %}
* [{{ case_study.authors }}: {{case_study.title}}]({{ case_study.url }})

  *{{ case_study.short_description }}*
{% endfor %}

* [David Newbury and Dan Fowler: Collections as Data Facets - Carnegie Museum of Art Collection Data](https://collectionsasdata.github.io/facet2/)

  *In this 'Always Already Computational - Collections as Data' facet, Open Knowledge International’s Dan Fowler and Carnegie Museum of Arts’ (CMOA) David Newbury document the release of CMOA data on Github for public access and creative use, and use of Frictionless Data’s set of specifications in the process.*
