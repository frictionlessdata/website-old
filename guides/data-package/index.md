---
title: Data Package
section: guides
---

Data Package is an open, [RFC](http://www.ietf.org/rfc.html)-style standard building heavily on prior work on packaging across various software ecosystems (e.g. [npm](https://www.npmjs.com/) for [Node.js](https://nodejs.org/) and [Apt](https://wiki.debian.org/Apt) for [Debian](https://www.debian.org/)).  Data Package was designed with modern web-friendly standards for data exchange (e.g. [JSON](http://json.org/) and [DSPL](https://developers.google.com/public-data/)) in mind.  Simplicity and practicality are key design criteria.

Conceptually, a Data Package provides a minimal "[container](/about/#data-containerization)" for transporting any kind of data.  It is designed for extension to allow publishers to add additional constraints on the format and type of data and metadata.  

Concretely, you can create a Data Package by placing a specially formatted file, `datapackage.json`, in the directory containing the files that comprise your dataset.  Given a dataset called `dataset.csv`, a very simple example of a `datapackage.json` can look like this:

    {
      "name": "my-first-dataset",
      "title": "My First Dataset",
      "resources": [{
        "path": "dataset.csv",
        "format": "csv"
      }]
    }

The simple format is flexibile enough to support a variety of use cases.  Imagine you have a collection of data files in a directory and you want to provide basic information like author, license, as well as a record of the files that actually comprise this dataset.

While you can record this information in an associated `README` for the collection, this approach can be difficult to manage over the long term.  Anyone who uses the data later will have to subjectively interpret this information, and there is no potential for automation.   The Data Package approach provides a simple, standardized way for you to share such metadata so that it goes wherever your data goes.  

Read the [full standard](/standards/data-package/).
