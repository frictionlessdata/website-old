---
name: Tesera
site: http://tesera.com/
authors: Spencer Cox
logo: tesera-logo.png
---

## What is Tesera?

We are an employee-owned company, founded in 1997.  Our focus is
helping our clients create data-driven applications in the cloud.  We
also maintain two core product lines, in addition to our consulting
practice.  [MRAT.ca](http://www.mrat.ca/) helps municipalities
identify risk of basement flooding, while
[forestinventory.ca](http://www.forestinventory.ca/) enables forest
and natural resource companies to access a new level of accuracy and
precision in resource inventories and carbon measurement.

## What are the challenges you face working with data?

We deal with data from a variety of sources ranging from sample plots
to in situ sensors. We grab samples and measurements to remotely
sensed information from LiDAR, colour infrared and others.  Many
proprietary specifications exist across those data sources, and to
work around this we’ve adopted CSV as our universal format.  We use
Data Packages, CSV files, and JSON Table Schemas to create database
tables, validate data schema and domain, import data from S3 to
PostGreSQL, DynamoDB, and Elastic.  In some cases we also use these
standards to move between application components, in particular where
multiple technologies (Python, R, Javascript, and other) are utilized
in a workflow.

## How do you use the specs?

We have adopted the Data Package Standard as a simple elegant way to
describe and package our CSV data for interoperability between systems
and components.  We use this in conjunction with the JSON Table Schema
which enables us to define rules and constraints for each field in the
CSV file.  With this in mind we have setup our workflows to
essentially connect S3 buckets with analytical processes.  We have
written some simple Open Source AWS Lambda functions that let us
easily invoke validation and sanitization at the end of each process
on the backend.  We also expose this to the front-end of some of our
applications so users can work through an import / contribution
process where they are shown issues with their data that must be fixed
before they can contribute.  This helps us ensure good interoperable
data at a foundational level, thereby making it easier to use for
analysis, visualization, or modelling without extensive ad-hoc quality
control.

## How were you made aware of Frictionless Data?

We discovered Frictionless Data through GitHub by following Max Ogden
and some of the interesting work he is doing with Dat.  We were
looking for simpler more usable alternatives to the “standards”
web-services craze of the 2000s.  We had implemented a large
interoperability hub for observation data called the Water and
Environmental hub (WEHUB) which supported various OCG and other
standard (WaterML, SOS) which was supposed to make important
information accessible to many stakeholders, but in reality, nobody
was using it.  We were looking for a simpler way to enable data access
and use for developers and downloaders alike.

## What else would you like to see developed?

We are especially keen on tooling that enables faster
interoperability, especially within an AWS environment.  We envision a
framework of loaders, validators, sanitizers, analyzers, and
exporters, fundamentally based around Amazon S3, various databases and
Lambda or Elastic Container Service (for larger processes).  Having
supported a lot of clients with a lot of projects, our goal has been
to remove the common grunt work associated with data workflows to
enable effort to be prioritized towards the use and application of the
data.  For instance, every data portal needs a way to import data into
the system and likely a way to export data from the system.  Depending
on the complexity of the application and the size of the imports and
exports various approaches were utilized which directly leveraged the
database or relied on various libraries.  The friction required to
load data for instance and begin to make use of the data often
consumed a large portion of project budgets.  By moving towards common
methods of import and export (as enabled by Data Package and JSON
Table Schema and deployed to Elastic Container Service and / or Lambda
we’ve been able to standardize that aspect of our data applications
and not have to revisit it.  As Internet of Things threatens to
release yet another round of “standards” for essentially observation
data we hope to keep things simple and use what we have for these
use-cases as well.  Smaller imports and exports can readily be
executed by Lambda and when they are more complex or resource
intensive Lambda can trigger an ECS task to complete the work.  What
are the next things you are going to be working on yourself?  We
developed some basic CSV to DynamoDB and ElasticSearch loaders in
support of a Common Operating Picture toolset for the Fort McMurray
Wildfires.  We’d like to clean those up, along with our existing RDS
loaders and Lambda functions and start moving towards the framework
described.  We are cleaning up and open sourcing a number of utilities
to facilitate these workflows with the goal of being able to describe
data types in CSV files, then automatically map them or input them
into a model.  There may be an opportunity to explicitly identify how
spatial feature information is carried within a Data Package / JSON
Table Schema.  What do you think are some other potential use cases.
We are kind of excited about the method and framework itself to almost
have Zapier / IFTTT like capabilities for CSV data where we can
rapidly accomplish many common use-cases enabling resources to be
prioritized to the business value.  On the application side we’ve been
getting pretty excited about ElasticSearch and Kibana and perhaps
extending them to bring together more seamless exploration of large
dynamic geospatial datasets, especially where the data is
continuous/temporal in nature and existing GIS technology falls pretty
flat.  This will be important as smart cities and IOT-based use cases
advance.

## Provincial Growth and Yield Initiative Plot Sharing App  (http://pgyi.tesera.com/#/ )

### What is the problem you are trying to solve

Enabling the 16 government and industrial members of Forest Growth
Organization of Western Canada (FGrOW) to seamlessly share forest plot
measurement data with each other and know that the data will be
interoperable and meet their specifications.  Specifications were
designed primarily with the data manager in mind and were formatted as
a contribution guidelines document.  From this document the following
Data Theme was created
([https://github.com/tesera/datatheme-afgo-pgyi](https://github.com/tesera/datatheme-afgo-pgyi))
which contains the Data Package details as well as the several JSON
Table Scemas required to assemble a dataset.  Having access to this
large and interoperable dataset with enable their members to improve
their growth and yield models and respond to bioclimatic changes as
they occur.

### What was your solution

We supported FGrOW in creating a set of data standards and then
created the JSON Table Schemas to enable a validation workflow.  The
members upload a set of relational CSV files which are packaged up as
data packages, uploaded to S3, and then validated by the Lambda
Datapackage Validator.  The results of this initial validation are
returned to the user as errors (cannot proceed) or warnings (something
is wrong but it can be accepted).  At this stage the data is
considered imported.  If there are no errors the user is able to stage
their dataset which uses the Lambda RDS Loader to import the data
package into an RDS PostGreSQL instance.  This triggers a number of
more sophisticated validation functions relating to tree growth rates,
measurement impossibilities, and sanity checks at the database level.
Having previously ensured the data meets the JSON Table Schema and was
loaded successfully we have confidence in executing custom database
functions without having to handle endless data anololies and
exceptions.  A simple example check to see if species changes between
measurements can be illustrated below:

{% highlight postgresql %}
CREATE OR REPLACE FUNCTION staging.get_upload_trees_species_violations(in_upload_id text)
RETURNS SETOF staging.violation AS $$

BEGIN
   -- RULE 1: tree species should not change over time
   RETURN QUERY

       SELECT
           '0'::text,
           staged_tree.upload_id,

           staged_tree.source_row_index,
           'trees'::text,
           array_to_string(ARRAY[staged_tree.company, staged_tree.company_plot_number, staged_tree.tree_number::text], '-'),

           'trees.species.change'::text,
           'warning'::text,
           format('Tree species changed from %s to %s', committed_tree.species, staged_tree.species)

       FROM staging.staged_trees staged_tree
       INNER JOIN staging.committed_trees committed_tree
       USING (company, company_plot_number, tree_number)

       WHERE staged_tree.upload_id = in_upload_id
           AND (staged_tree.species NOTNULL AND staged_tree.species <>'No')
           AND staged_tree.species != committed_tree.species;

END;
$$ LANGUAGE plpgsql;
{% endhighlight %}

Again the user is presented with violations as errors or warnings and
can they can choose to commit the plots without errors into the shared
database.  Essentially this three step workflow from imported, to
staged, to committed allows FGroW to ensure quality data that will be
useful for their modeling and analysis purposes.

### How did you solve this

FGroW has built a database that currently has 2400 permanent sample
plots each containing many trees and all together 10s of millions of
measurements across a wide variety of strata including various natural
regions and natural sub-regions.  This database provides the numeric
power to produce and refine better growth models and enable companies
to adopt their planning and management to real conditions.

![](/img/case-studies/fgrow-import-violations.png)
![](/img/case-studies/fgrow-report-committed.png)
![](/img/case-studies/fgrow-staging-violations.png)
![](/img/case-studies/fgrow-upload.png)

### What other uses might this project have.

There are many cases where industries might wish to bring together
measurement data in a consistent way to maximize their productivity.
One of the more obvious examples is in agriculture where precision
information is increasingly collected at the local / farm level but
bringing this information together in aggregate would produce new and
greater insight with regard to productivity, broad scale change, and
perhaps adaption to climate change strategies.

## MacKenzie Datastream (http://www.mackenziedatastream.org/) 

### What is the problem you are trying to solve

Mackenzie DataStream is an open access platform for exploring and
sharing water data in the Mackenzie River Basin.  DataStream's mission
is to promote knowledge sharing and advance collaborative, and
evidence-based decision-making throughout the Basin.  The MacKenzie
basin is extremely large, measuring 1.8 million square kilometers and
as such monitoring is a large challenge.  To overcome this challenge
water quality monitoring is carried out by a variety of partners which
include communities and Aboriginal, territorial and federal
governments.  With multiple parties collecting and sharing information
MacKenzie DataStream had to overcome challenges of trust and
interoperability.

### What was your solution

Tesera leveraged the Datapackage standard as an easy way for
Government and community partners alike to import data into the
system.  We used JSON Table Schemas to define the structure and
constraints of the Data Themes which we represented in a simple
visible way.  The backed on this system also relies on the Data
Package Validator and the Relational Database Loader.  The observation
data is then exposed to the client via a simple express.js API as
JSON.  The Frictionlessdata.io standards help us ensure clean
consistant data and make visualization a breeze.  We push the data to
plot.ly to build the charts as it provides lots of options for
scientific plotting, has a good api and has a minimal cost.

### How did you solve this

The MacKenzie Datastream is gaining momentum and partners.  The Fort
Nelson First Nation has joined on as a contributing partner and the
Government of Northwest Territories is looking to apply datastream to
a few other datatypes and bringing on some addition partners in water
permitting and cumulative effects monitoring.  We this as a simple and
effective way to make environmental monitoring data more accessible.

### What other uses might this project have.

There are many ways to monitor the environment but bringing the data
together according to standards, ensuring that it is loaded correctly,
and making it accessible via a simple API seems pretty universal.  We
are working through a UX / UI overhaul and then hope to Open Source
the entire datastream application for other organizations that are
collecting environmental observation data and looking to increase its
utility to citizens, scientists, and consultants alike.


