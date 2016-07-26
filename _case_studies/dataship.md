---
name: DataShip
site: http://dataship.io/
authors: Waylon Flinn
logo: dataship-logo.png
---

## What is DataShip?

DataShip is a way to share data and analysis, from simple charts to
complex machine learning, with anyone in the world easily and for
free. It allows you to create notebooks that hold and deliver your
data, as well as text, images and inline scripts for doing analysis
and visualization. The people you share it with can read, execute and
even edit a copy of your notebook and publish the remixed version as a
fork

## What are the challenges you face working with data?

It’s hard to share it with others. Tools like Jupyter (iPython
notebook)[^1] make it much easier and more affordable to do analysis
(with the help of open source projects like numpy and pandas). What
they don’t do is allow you to *cheaply and easily share that with the
world*. If it were as easy to share data and analysis as it is to
share pictures of your breakfast, the world would be a more
enlightened place. DataShip is helping to build that world.

## How are you working with the specs?

Every notebook on DataShip is also a Data Package. Like other Data
Packages it can be downloaded, along with its data, just by giving its
URL to a tool like dpm. Additionally, working with existing Data
Packages is easy. Just as you can fork other notebooks, you can also
fork existing Data Packages, even when they’re located somewhere else,
like GitHub.

![DataShip GIF](/img/case-studies/dataship.gif)

*DataShip in action*

Every cell in a notebook is represented by a resource entry[^2] in an
underlying Data Package. This also allows for interesting
possibilities. One of these is executable Data Packages. Since the
code is included inline and its dependencies are explicit and bounded,
a very simple tool could be written to execute a Data Package based
notebook from the command line, printing the results to the console
and writing images to the current directory.

## What else would you like to see developed?

A JavaScript version of some of the functionality in goodtables would
be most useful to me right now, specifically header detection in
parsed csv contents (output of PapaParse). I’d also like the option in
dpm to not put things in a ‘datapackages’ folder. That turns out to
almost never be what I want when downloading a dataset.

## What are the next things you are going to be working on yourself?

My next task will be building and integrating the machine learning and
neural network components into DataShip. After that I’ll be focusing
on features that allow organizations to store private encrypted data,
in addition to the default public storage. The focus of the platform
will always be open data, but hosting closed data sources will allow
us to nudge people towards sharing, when it makes sense.

## What do you think are some other potential use cases?

The volume of personal data is growing exponentially: medical data,
internet activity, media consumption. These are just a few existing
examples. The rise of the Internet of Things will only accelerate
this. People are also beginning to see the value in controlling their
data themselves. Providing mechanisms for doing this will likely
become important over the next ten years.

[^1]: <http://jupyter.org/>
[^2]: <http://specs.frictionlessdata.io/data-packages/#resource-information>
