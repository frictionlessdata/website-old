---
title: Joining Data
---

Joining multiple datasets on a common value or set of values is a
common data wrangling task.  For instance, one might have a dataset
listing Gross Domestic Product (GDP) per country and a separate
dataset containing geographic outlines of country borders.  If these
independent datasets have a shared property (for instance, the
three-letter country code as
[defined in ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)),
we should be able to create one consolidated dataset to generate a map
of GDP per country.  This guide will walk through this simple use
case.

## Example Data

For this example, we are going to use two example Data Packages from
our
[example data packages repository](https://github.com/frictionlessdata/example-data-packages/)
with the properties described above.  The first is an example of Data
Package containing a GeoJSON file.  [GeoJSON](http://geojson.org/) is
a format for representing geographical features in
[JSON](http://json.org/).  This particular GeoJSON file lists
countries on its `features` array and specifies the country code as a
property on each "feature".  In this case, the country code is stored
on the key "ISO_A3" of the feature's `properties` object.

{% highlight json %}
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "ADMIN": "Ukraine",
        "ISO_A3": "UKR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
        ...
        ]
      }
    }
  ]
}
{% endhighlight %}

The second Data Package is a typical
[Tabular Data Package](/guides/tabular-data-package/) containing a GDP
measure for each country in the world for the year 2014.  Country
codes are stored, naturally, on the "Country Code" column.

|  Country Name                                   | Country Code | Year | Value             |
|-------------------------------------------------+--------------+------+-------------------|
|  Ukraine                                        | UKR          | 2014 | 131805126738.287  |
|  United Arab Emirates                           | ARE          | 2014 | 401646583173.427  |
|  United Kingdom                                 | GBR          | 2014 | 2941885537461.48  |
|  United States                                  | USA          | 2014 | 17419000000000    |
|  Uruguay                                        | URY          | 2014 | 57471277325.1312  |

## Reading and Joining Data 

As in our
[Using Data Packages in Python guide](/guides/using-data-packages-in-python),
the first step before joining is to read the data for each Data
Package onto our computer.  We do this by importing the `datapackage`
library and passing the Data Package url to its `DataPackage` method.
We are also importing the standard Python `json` library to read and
write our GeoJSON file.

{% highlight python %}
import json
import datapackage

countries_url = 'https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/geo-countries/datapackage.json'
gdp_url = 'https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/gross-domestic-product-2014/datapackage.json'

countries_dp = datapackage.DataPackage(countries_url)
gdp_dp = datapackage.DataPackage(gdp_url)
{% endhighlight %}

Our GeoJSON data is stored as a `bytes` object in the `data` attribute
of the first (and only) element of the Data Package `resources` array.
To create our `world` GeoJSON dict, we first need to decode this
`bytes` object to a UTF-8 string and pass it to `json.loads`.

{% highlight python %}
world = json.loads(countries_dp.resources[0].data.decode('utf-8'))
{% endhighlight %}

At this point, joining the data can be accomplished by iterating
through each country in the `world['features']` array and adding a
property "GDP (2014)" if "Country Code" on the `gdp_dp` Data Package
object matches "ISO_A3" on the given GeoJSON feature.  The value of
"GDP (2014)" is derived from the "Value" column on the `gdp_dp` Data
Package object.

{% highlight python %}
for feature in world['features']:
    matches = [gdp['Value'] for gdp in gdp_dp.resources[0].data if gdp['Country Code'] == feature['properties']['ISO_A3']]
    if matches:
        feature['properties']['GDP (2014)'] = float(matches[0])
    else:
        feature['properties']['GDP (2014)'] = 0
{% endhighlight %}

Finally, we can output our consolidated GeoJSON dataset into a new
file called "world_gdp_2014.geojson" using `json.dump` and create a
new Data Package container for it.  For a more thorough walkthrough on
creating a Data Package, please consult the
[Creating Data Packages in Python](/guides/creating-tabular-data-packages-in-python/)
guide.

{% highlight python %}
with open('world_gdp_2014.geojson', 'w') as f:
    json.dump(world, f)
    
new_dp = datapackage.DataPackage()
new_dp.metadata['name'] = 'consolidated-dataset'
new_dp.metadata['resources'] = [
  {
    'name': 'data',
    'path': 'world_gdp_2014.geojson'
  }
]

with open('datapackage.json','w') as f:
    f.write(new_dp.to_json())
{% endhighlight %}

We can now quickly render this GeoJSON file into a
[chloropleth map](https://en.wikipedia.org/wiki/Choropleth_map) using
[QGIS](http://qgis.org/en/site/):

![GDP Map Example](/img/gdp_map_example.png)

Or we can rely on GitHub to render our GeoJSON for us.  When you click
a country, it's property list will show up featuring "ADMIN",
"ISO_A3", and the newly added "GDP (2014)" property.

<script src="https://embed.github.com/view/geojson/frictionlessdata/example-data-packages/master/_other_example_files/world_gdp_2014.geojson"></script>

## Joining Two Tabular Datasets

Here's an example of joining two tabular datasets.  In this case, we
can use a similar GDP dataset (this time with all years) and combine
it with the Consumer Price Index, a measure of inflation, to yield
[Real GDP](https://en.wikipedia.org/wiki/Real_gross_domestic_product)
per country per year, a measure of economic output adjusted for price
changes.

| Country Name | Country Code | Year | CPI |
|---|---|---|---|
| Afghanistan | AFG | 2004 | 63.1318927309 |
| Afghanistan | AFG | 2005 | 71.1409742918 |
| Afghanistan | AFG | 2006 | 76.3021776777 |
| Afghanistan | AFG | 2007 | 82.7748069188 |
| Afghanistan | AFG | 2008 | 108.0666000101 |

The first step is to load the Data Packages as usual.  We also need to
import `DictWriter` to write the merged rows to our new CSV.

{% highlight python %}
import datapackage
from csv import DictWriter

cpi_dp = datapackage.DataPackage('https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/cpi/datapackage.json')
gdp_dp = datapackage.DataPackage('https://raw.githubusercontent.com/frictionlessdata/example-data-packages/master/gross-domestic-product-2014/datapackage.json')
{% endhighlight %}

Given that our data is already in
[Tabular Data Package](/guides/tabular-data-package/) format, we know
that we have a [*schema*](/guides/json-table-schema/) which specifies
information for each column.  Let's merge and preserve that schema
information now as we'll need it for our new Data Package.  Note that
we're also adding a new column named 'Real GDP' and giving it a type
of 'number'.

{% highlight python %}
field_info = [f for f in cpi_dp.resources[0].metadata['schema']['fields']]
field_info_ext = [f for f in gdp_dp.resources[0].metadata['schema']['fields']]
field_info.extend(field_info_ext)
field_info.append({'name': 'Real GDP', 'type': 'number'})
{% endhighlight %}

Now that we have this information, we can generate a `fieldnames`
array containing only the names of the columns to eventually pass to
`DictWriter` when we're ready write out our new CSV.

{% highlight python %}
fieldnames = [f['name'] for f in field_info]
{% endhighlight %}

What follows is an example of iterating through each row of each CSV
and creating a new `merged_row` when 'Year' and 'Country Code' match
each other on the two datasets.  We are also calculating our 'Real
GDP' column based in the information found in the original columns.

{% highlight python %}
with open('real_gdp.csv', 'w') as csvfile:
    writer = DictWriter(csvfile,fieldnames=fieldnames)
    writer.writeheader()
    for gdp_row in gdp_dp.resources[0].data:
        for cpi_row in cpi_dp.resources[0].data:
            if gdp_row['Year'] == cpi_row['Year'] and gdp_row['Country Code'] == cpi_row['Country Code']:
                merged_row = gdp_row.copy()
                merged_row.update(cpi_row)
                merged_row.update({'Real GDP': 100*(float(gdp_row['Value'])/float(cpi_row['CPI']))})
                writer.writerow(merged_row)
    
{% endhighlight %}

Now that we've created our new CSV, we can easily package it up.  Note
that we are passing the merged `field_info` array into our `schema`
definition.  Given that we are generating this Data Package "by hand",
we need to run the `validate` method on the new Data Package object to
make sure that we are, indeed, creating a valid Data Package.

{% highlight python %}
dp = datapackage.DataPackage()
dp.metadata['name'] = 'real-gdp'
dp.metadata['resources'] = [
    {
     'name': 'data',
     'path': 'real_gdp.csv',
     'schema': {
        'fields': field_info
      }
    }
]

resource = dp.resources[0]
resource.metadata['path'] = 'real_gdp.csv'

dp.validate()
    
with open('datapackage.json', 'w') as f:
    f.write(dp.to_json())
{% endhighlight %}
