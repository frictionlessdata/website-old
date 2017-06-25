---
title: Point location data in CSV files
---

## Introduction

* A [Table Schema](http://specs.frictionlessdata.io/table-schema/) describes tabular data.
* Tabular data is often provided in <a href="#csv">CSV (comma separated values)</a> file.
* Tabular data may include data about locations.
* Locations can be represented by points, lines, polygons and more complex geometry.
* Points are often represented by a longitude, latitude coordinate pair. There is much debate on [which value should go first](https://macwright.org/2015/03/23/geojson-second-bite.html#position) and [tools have their own preferences](https://macwright.org/lonlat/).
* To keep things simple, you should use [Digital degrees](https://en.wikipedia.org/wiki/Decimal_degrees), not [degrees, minutes, seconds](https://en.wikipedia.org/wiki/Latitude#Preliminaries) or 27.1944° S, 151.2660° E
* Representing locations other than points in a CSV can be complicated as the shape is represented by many coordinate pairs that combine to make the shape (think joining the dots).
* A coordinate pair may be inadequate to accurately show a location on a map. You may also need a [spatial reference system](https://en.wikipedia.org/wiki/Spatial_reference_system) and a date.
* A spatial reference system describes the [datum](https://en.wikipedia.org/wiki/Datum_(geodesy)), [geoid](https://en.wikipedia.org/wiki/Geoid), [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system), and [map projection](https://en.wikipedia.org/wiki/Map_projection) of the location data.
* Dates detailing when the location was recorded are also important because things change over time, e.g. the shape of an [electoral boundary](http://boundaries.ecq.qld.gov.au/have-your-say/the-final-determination), or the [location of a continent](http://www.icsm.gov.au/gda2020/index.html).

The key information that must be provided to describe a location is:

* geometry
* spatial reference system
* date

Assumptions are often made about [spatial reference systems](http://doc.arcgis.com/en/arcgis-online/create-maps/choose-global-local-scene.htm) and [dates](http://doc.arcgis.com/en/arcgis-online/reference/csv-gpx.htm), e.g.

* The spatial reference system may be assumed to be the World Geodetic System 1984 ([WGS84](http://www.ga.gov.au/scientific-topics/positioning-navigation/geodesy/geodetic-datums/other/wgs84)), which is currently used for the Global Positioning System (GPS) satellite navigation system. This spatial reference system used by the majority of interactive maps on the web.
* The date is often assumed to be today.

## Point data
How can point location data be:

1. represented in a CSV file?
2. described as part of a Data Package?

Each method should, in a human and machine-readable way, specify:

* the spatial reference system and the date associated with the location data or use defined default values.
* the order of coordinates.


The options for representing a point locations in a CSV file are to define a field(s) of type:

1. **[geopoint](http://specs.frictionlessdata.io/table-schema/#geopoint), format: default**
2. **geopoint, format: array**
3. **geopoint, format: object**
4. **[number](http://specs.frictionlessdata.io/table-schema/#number)** with constraints to represent longitude and latitude coordinate values
5. **[string](http://specs.frictionlessdata.io/table-schema/#string)**, format: default** containing a well-known place-name with a foreign key reference to another CSV file containing the place-name and geometry. Date may be an additional field included in the foreign key relationship.
6. **string, format: uri**, providing a reference to a resource that includes the geometry
7. **[geojson](http://specs.frictionlessdata.io/table-schema/#geojson), format: default**

Each option is described below with a sample CSV file, Data Package fragment and some thoughts on pros and cons.

Out of scope for the moment - geocoding using address but similar techniques will apply.

### 1. Geopoint, default

A string of the pattern `"lon, lat"`, where lon is the longitude and lat is the latitude (note the space is optional after the ,). E.g. `"90, 45"`.

#### CSV

<table>
  <tr>
    <td>Office</td>
    <td>Location (Lon, Lat)</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>"151.2660, -27.1944"</td>
  </tr>
</table>

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint"
    }
  ]
}
```

#### Thoughts

* Does type validation enforce:
    * Longitude ± 180
    * Latitude ± 90
* How do you [constrain values](https://discuss.okfn.org/t/how-to-constrain-geopoint-values/5574) to a minimum bounding rectangle?
* The order of Lon, Lat is defined in the standard but:
    * may not be obvious to the person looking at the file
    * may not be machine-readable without referring to resources outside the data package

### 2. Geopoint, array

An array of exactly two items, where each item is a number, and the first item is lon and the second item is lat e.g. `[90, 45]`

#### CSV

<table>
  <tr>
    <td>Office</td>
    <td>Location (Lon, Lat)</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>[151.2660, -27.1944]</td>
  </tr>
</table>


#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint",
      "format": "array"
    }
  ]
}
```

#### Thoughts

* Does type validation enforce:
    * Longitude ± 180
    * Latitude ± 90
* How do you [constrain values](https://discuss.okfn.org/t/how-to-constrain-geopoint-values/5574) to a minimum bounding rectangle?
* The order of Lon, Lat is defined in the standard but:
    * may not be obvious to the person looking at the file
    * may not be machine-readable without referring to resources outside the data package

### 3. Geopoint, object

A JSON object with exactly two keys, lat and lon and each value is a number e.g. `{"lon": 90, "lat": 45}`

#### CSV

<table>
  <tr>
    <td>Office</td>
    <td>Location (Lon, Lat)</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>{"lon":151.2660, "lat": -27.1944}</td>
  </tr>
</table>

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint",
      "format": "object"
    }
  ]
}
```

#### Thoughts

* Does type validation enforce:
    * Longitude ± 180
    * Latitude ± 90
* How do you [constrain values](https://discuss.okfn.org/t/how-to-constrain-geopoint-values/5574) to a minimum bounding rectangle?
* The format makes explicit which are lon and lat values

### 4. Longitude and Latitude columns

Two columns of type number with constraints to limit latitude and longitude values

#### CSV

<table>
  <tr>
    <td>Office</td>
    <td>Lat</td>
    <td>Lon</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>-27.1944</td>
    <td>151.2660</td>
  </tr>
</table>

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Lat",
      "type": "number",
      "contraints": {
        "minimum": -90,
        "maximum": 90
      }
    },
    {
      "name": "Lon",
      "type": "number",
      "contraints": {
        "minimum": -180,
        "maximum": 180
      }
    }
  ]
}
```

#### Thoughts

* You can [constrain values](https://discuss.okfn.org/t/how-to-constrain-geopoint-values/5574) to a minimum bounding rectangle
* Constraints not required so invalid values possible
* Not obvious to software that the columns are location data unless specific names are used X,Y; Lat,Lon; Latitude,Longitude; and [many other combinations](http://doc.arcgis.com/en/arcgis-online/reference/csv-gpx.htm)
* Lat, Lon or Lon, Lat - you choose the order
* No way to force a pair of coordinates and support missing values.
    * If you add a required constraint to both, you can’t have a missing location.
    * If you don’t add required constraint, you could have lat without lon or vise versa.

### 5. Foreign key reference to well-known place-name

All the previous examples assume you know the coordinates of the location. What if you only know the name? You could refer to an another data resource and use the name to determine the coordinates. This data resource is often called a [Gazetteer](https://en.wikipedia.org/wiki/Gazetteer). [Often](https://en.wikipedia.org/wiki/Gazetteer#List_of_gazetteers) a [website](http://www.icsm.gov.au/cgna/websites.html) or API is placed in front of the data so you can provide a name and the location data is returned

#### CSV

Offices.csv

<table>
  <tr>
    <td>office-name</td>
    <td>town</td>
  </tr>
  <tr>
    <td>Dalby Drop In Centre </td>
    <td>Dalby</td>
  </tr>
</table>


Gazetteer.csv

<table>
  <tr>
    <td>city-or-town</td>
    <td>location</td>
  </tr>
  <tr>
    <td>Dalby</td>
    <td>{"lon":151.2660, "lat": -27.1944}</td>
  </tr>
</table>

#### Data Package fragment

```
{
  "resources": [
    {
      "name": "office-locations",
      "path": "offices.csv",
      "schema": {
        "fields": [
          {
            "name": "office-name",
            "title": "Office Name",
            "type": "string"
          },
          {
            "name": "town",
            "title": "Town",
            "description": "Town name in gazetteer",
            "type": "string"
          }
        ]
      },
      "foreignKeys": [
        {
          "fields": "town",
          "reference": {
            "resource": "gazetteer",
            "fields": "city-or-town"
          }
        }
      ]
    },
    {
      "name": "gazetteer",
      "description": "External Gazetteer",
      "url": "https://example.com/gazetteer.csv",
      "schema": {
        "fields": [
          {
            "name": "city-or-town",
            "type": "string",
            "constraints": {
              "unique": true,
              "required": true
            }
          },
          {
            "name": "location",
            "type": "geopoint",
            "format": "object"
          }
        ]
      },
      "primaryKey": [
        "city-or-town"
      ]
    }
  ]
}
```

#### Thoughts

* Haven't come across many Gazetteers in CSV format
* Should the Gazetteer have a Data Package Identifier?

### 6. Use a Uniform Resource Identifier reference a location

Use a type: string, format: uri, to provide a link to a resource that includes the geometry

#### CSV

<table>
  <tr>
    <td>office-name</td>
    <td>Location uriuid</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>http://nominatim.openstreetmap.org/details.php?place_id=114278</td>
  </tr>
</table>

#### Data Package fragment

```
"schema": {
	"fields": [
        {
        "name": "office-name",
        "type": "string"
        },
        {
        "name": "Location uri",
        "type": "string",
        "format": "uri"
        }
   ]
 }
 ```

#### Thoughts

* Is there a way to define the bulk of the uri outside of the column and reduce the column entry to the id? Is this wise or desirable?
* How do you the format of the location data found at the uri?
* How can you be confident the uri is permanent?

### 7. GeoJSON

Use a field of type GeoJSON to represent location

#### CSV

<table>
  <tr>
    <td>Office</td>
    <td>Location</td>
  </tr>
  <tr>
    <td>Dalby </td>
    <td>{"lon":151.2660, "lat": -27.1944}</td>
  </tr>
</table>

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Office",
       "type": "string"
    },
    {
      "name": "Location",
      "type": "geojson",
      "format": "default"
    }
  ]
}
```

## Thoughts

* geometry isn't constrained to a point



## Related Work

### Frictionless data

See [http://frictionlessdata.io](http://frictionlessdata.io)

### Publishing Geospatial Data as a Data Package

See [http://frictionlessdata.io/guides/publish/geo/](http://frictionlessdata.io/guides/publish/geo/)

### CSV GEO AU

See [https://github.com/TerriaJS/nationalmap/wiki/csv-geo-au](https://github.com/TerriaJS/nationalmap/wiki/csv-geo-au)

csv-geo-au is a specification for publishing point or region-mapped Australian geospatial data in CSV format to data.gov.au and other open data portals.

### Spatial Data on the Web Best Practices

See [http://www.w3.org/TR/sdw-bp](http://www.w3.org/TR/sdw-bp)

This document advises on best practices related to the publication of spatial data on the Web.

### The GeoJSON Format

See [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)

GeoJSON is a geospatial data interchange format based on JavaScript Object Notation (JSON).

### OpenGIS Implementation Specification for Geographic information - Simple feature access - Part 1: Common architecture

See [http://www.opengeospatial.org/standards/sfa](http://www.opengeospatial.org/standards/sfa)

Spatial reference systems are defined by the [OGC](https://en.wikipedia.org/wiki/Open_Geospatial_Consortium)'s [Simple feature access](https://en.wikipedia.org/wiki/Simple_feature_access) using [well-known text](https://en.wikipedia.org/wiki/Well-known_text), and support has been implemented by several [standards-based](https://en.wikipedia.org/wiki/Technical_standard) [geographic information systems](https://en.wikipedia.org/wiki/Geographic_information_system). Spatial reference systems can be referred to using a [SRID](https://en.wikipedia.org/wiki/SRID) [integer](https://en.wikipedia.org/wiki/Integer), including EPSG codes defined by the [International Association of Oil and Gas Producers](https://en.wikipedia.org/wiki/International_Association_of_Oil_and_Gas_Producers). It is specified in ISO 19111:2007 Geographic information—Spatial referencing by coordinates, also published as [OGC](https://en.wikipedia.org/wiki/Open_Geospatial_Consortium) Abstract Specification, Topic 2: Spatial referencing by coordinate. From [wikipedia](https://en.wikipedia.org/wiki/Spatial_reference_system#cite_note-1)


{%include markdown-link-refs.html %}
