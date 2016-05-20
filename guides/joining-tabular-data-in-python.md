---
title: Joining Tabular Data
---

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
