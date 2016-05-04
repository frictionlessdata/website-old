---
title: Creating Data Packages in JavaScript
---

# Creating data packages in JavaScript

This tutorial will show you how to install the JavaScript libraries for working with Data Packages and JSON Table Schema, load a CSV file, infer its schema, and write a Tabular Data Package.

## Setup

For this tutorial we will need [dpm](https://github.com/okfn/dpm) which is a library and command line manager for Data Packages.

Using Node Package Manager (`npm`), install `dpm` by entering the following into your command line:
```npm install datapackage -g```

## Creating a package
Now that a package has been created, create a directory for your project and use `dpm init` to get started with a new package. This creates a `datapackage.json` file in this directory.