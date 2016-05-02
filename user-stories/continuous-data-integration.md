---
title: Continuous Data Integration
---

![Data Valid](/img/data_ci.png)

As a **Publisher or a Recipient of data** I want to make sure the data has
a good structure and conforms to its schema **so that** i am producing and
using high quality data and I don’t waste my time or that of users
fixing up errors

As a **Developer** I want an online service that is connected to my data
repository (e.g. git repo) that validates data on update **so that** I can
delegate data validation to a third party.

Continuous integration is a useful feature for software development
projects.  When you have multiple contributors writing code and
pushing to a central repository, it is important to understand which
commits break the build and to have an output of what went wrong.
When working on datasets, ensuring sustained data quality can be just
as important.

When adding continuous integration to a coding project using Travis
CI, one needs to add a configuration file `.travis.yml` to specify how
the build must be run.

`# .travis.yml`

```
language: ruby
rvm:
  - 2.0.0
script: "bundle exec jekyll build"
```

In theory, the `datapackage.json` should have all the necessary
information to run a validation of its data.
