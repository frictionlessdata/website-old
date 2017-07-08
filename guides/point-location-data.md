---
title: Point location data in CSV files
---

## Introduction

This guide explores the options available to represent point location data in a CSV file within a Data Package.

First, some key concepts:

* A [Table Schema](http://specs.frictionlessdata.io/table-schema/) describes tabular data.
* Tabular data is often provided in a [CSV - Comma Separated Values][csv] file.
* Tabular data may include data about locations.
* Locations can be represented by points, lines, polygons and more complex geometry.
* Points are often represented by a longitude, latitude coordinate pair. There is much debate on [which value should go first](https://macwright.org/2015/03/23/geojson-second-bite.html#position) and [tools have their own preferences](https://macwright.org/lonlat/). Explicitly stating the [axis-order](https://www.w3.org/TR/sdw-bp/#bp-crs) of coordinates is important so when the data is used, it represents the correct location.
* To keep things simple, you should use [digital degrees](https://en.wikipedia.org/wiki/Decimal_degrees) `-27.1944, 151.32660`, not [degrees, minutes, seconds](https://en.wikipedia.org/wiki/Latitude#Preliminaries) or Northing and Eastings `27.1944° S, 151.2660° E`.
* Representing locations other than points in a CSV can be complicated as the shape is represented by many coordinate pairs that combine to make the shape (think joining the dots).
* A coordinate pair is inadequate to accurately show a location on a map. You also need a [coordinate reference system](https://en.wikipedia.org/wiki/Spatial_reference_system) and sometimes a date.
* A coordinate reference system describes the [datum](https://en.wikipedia.org/wiki/Datum_(geodesy)), [geoid](https://en.wikipedia.org/wiki/Geoid), [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system), and [map projection](https://en.wikipedia.org/wiki/Map_projection) of the location data.
* Dates detailing when the location was recorded are also important because things change over time, e.g. the shape of an [electoral boundary](http://boundaries.ecq.qld.gov.au/have-your-say/the-final-determination), or the [location of a continent](http://www.icsm.gov.au/gda2020/index.html).

The key information to describe a point location is a:

* coordinate pair and their axis order
* coordinate reference system
* date

Assumptions are often made about coordinate reference systems and dates, e.g.

* The coordinate reference system may be assumed to be the World Geodetic System 1984 ([WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System)), which is currently used for the Global Positioning System (GPS) satellite navigation system. This coordinate reference system used by the majority of interactive maps on the web.
* The date is often assumed to be today.

## Point data
How can point location data be:

1. represented in a CSV file?
2. described as part of a Data Package?

The options for representing point locations in a CSV file are to define a field(s) of type:

1. [geopoint, format: default](#1-geopoint-default)
2. [geopoint, format: array](#2-geopoint-array)
3. [geopoint, format: object](#3-geopoint-object)
4. [number with constraints](#4-numbers-with-constraints)
5. [string, format: default](#5-string-and-foreign-key-reference-to-well-known-place-name) and a foreign key reference
6. [string, format: uri](#6-use-a-uniform-resource-identifier-to-reference-a-location) reference to an external resource with the geometry
7. [geojson, format: default](#7-geojson)

Each option is described below with a sample CSV file, Data Package fragment and some thoughts on pros and cons.

Each option should, in a human and machine-readable way, specify:

* the coordinate reference system
* the axis order of the coordinates (if not specified by the coordinate reference system)
* the date associated with the location data

(Out of scope for the moment - geocoding using address but similar techniques will apply.)

### 1. Geopoint, default

The type [Geopoint](http://specs.frictionlessdata.io/table-schema/#geopoint), format: default is a string of the pattern `"lon, lat"`, where lon is the longitude and lat is the latitude (note the space is optional after the ,). E.g. `"90, 45"`.

#### CSV

| Office | Location (Lon, Lat) |
|--------|---------------------|
| Dalby  | "151.2660, -27.1944"|

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Office",
      "type": "string"
    },
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint"
    }
  ]
}
```

#### Thoughts

* Does the [geopoint type validation](https://github.com/frictionlessdata/specs/issues/486) enforce:
    * Longitude ± 180
    * Latitude ± 90
* [Currently](https://github.com/frictionlessdata/specs/issues/345) you cannot use the `minimum` or `maximum` constraint to limit longitude or latitude values to a to a minimum bounding rectangle
* The order of Lon, Lat is defined in the standard but:
    * may not be obvious to the person looking at the file
    * may not be machine-readable without referring to resources outside the Data Package

### 2. Geopoint, array

An array of exactly two items, where each item is a number, and the first item is longitude and the second item is latitude e.g. `[90, 45]`

#### CSV

| Office | Location (Lon, Lat)  |
|--------|----------------------|
| Dalby  | [151.2660, -27.1944] |

#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Office)",
      "type": "string"
    },
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint",
      "format": "array"
    }
  ]
}
```

#### Thoughts

* Does the [geopoint type validation](https://github.com/frictionlessdata/specs/issues/486) enforce:
    * Longitude ± 180
    * Latitude ± 90
* [Currently](https://github.com/frictionlessdata/specs/issues/345) you cannot use the `minimum` or `maximum` constraint to limit longitude or latitude values to a to a minimum bounding rectangle
* The order of Lon, Lat is defined in the standard but:
    * may not be obvious to the person looking at the file
    * may not be machine-readable without referring to resources outside the Data Package

### 3. Geopoint, object

A JSON object with exactly two keys, lat and lon and each value is a number e.g. `{"lon": 90, "lat": 45}`

#### CSV

| Office | Location (Lon, Lat)             |
|--------|---------------------------------|
| Dalby  |{"lon":151.2660, "lat": -27.1944}|


#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Office)",
      "type": "string"
    },
    {
      "name": "Location (Lon, Lat)",
      "type": "geopoint",
      "format": "object"
    }
  ]
}
```

#### Thoughts

* Does the [geopoint type validation](https://github.com/frictionlessdata/specs/issues/486) enforce:
    * Longitude ± 180
    * Latitude ± 90
* [Currently](https://github.com/frictionlessdata/specs/issues/345) you cannot use the `minimum` or `maximum` constraint to limit longitude or latitude values to a to a minimum bounding rectangle
* The axis order is explicit. [Stating how coordinate values are encoded](https://www.w3.org/TR/sdw-bp/#bp-crs) is a W3C spatial data on the web best practice.


### 4. Numbers with constraints
Two columns of type [number](http://specs.frictionlessdata.io/table-schema/#number) with [constraints](http://specs.frictionlessdata.io/table-schema/#constraints) to limit latitude and longitude values

#### CSV

| Office |  Lat   |  Lon   |
|--------|--------|--------|
| Dalby  |-27.1944|151.2660|


#### Data Package fragment

```
{
  "fields": [
    {
      "name": "Office",
      "type": "string"
    },
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

* You can constrain latitude and longitude values to a minimum bounding rectangle
* Constraints not required so invalid values possible
* Not obvious to software that the columns are location data unless specific names are used X,Y; Lat,Lon; Latitude,Longitude; and [many other combinations](http://doc.arcgis.com/en/arcgis-online/reference/csv-gpx.htm)
* Lat, Lon or Lon, Lat - you choose the order
* No way to force a pair of coordinates and support missing values.
    * If you add a required constraint to both, you can’t have a missing location.
    * If you don’t add required constraint, you could have lat without lon or vice versa.

### 5. String and Foreign key reference to well-known place-name

All the previous examples assume you know the coordinates of the location. What if you only know the name? You can use a name, of type: [string](http://specs.frictionlessdata.io/table-schema/#string), to refer to an another data resource and use the name to determine the coordinates. This data resource is often called a [Gazetteer](https://en.wikipedia.org/wiki/Gazetteer). [Often](https://en.wikipedia.org/wiki/Gazetteer#List_of_gazetteers) a [website](http://www.icsm.gov.au/cgna/websites.html) or API is placed in front of the data so you can provide a name and the location data is returned

A date may be an additional field included in the foreign key relationship.

#### CSV

Offices.csv

| office-name          | town  |
|----------------------|-------|
| Dalby Drop In Centre | Dalby |



Gazetteer.csv

| city-or-town | location                        |
|--------------|---------------------------------|
| Dalby        |{"lon":151.2660, "lat": -27.1944}|


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

### 6. Use a Uniform Resource Identifier to reference a location

Use a type: [string](http://specs.frictionlessdata.io/table-schema/#string), format: uri, to provide a link to a resource that includes the geometry.

#### CSV

| office-name | Location uri                                                   |
|-------------|----------------------------------------------------------------|
| Dalby       | http://nominatim.openstreetmap.org/details.php?place_id=114278 |

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

* [Link to Spatial Things from popular repositories](https://www.w3.org/TR/sdw-bp/#bp-linking-2) is a W3C spatial data on the web best practice.
* Things can move over time, consider [data versioning](https://www.w3.org/TR/sdw-bp/#bp-dataversioning), another W3C spatial data on the web best practice.
* Is there a way to define the bulk of the uri outside of the column and reduce the column entry to the id? Is this wise or desirable?


### 7. GeoJSON

Use a field of type [GeoJSON](http://specs.frictionlessdata.io/table-schema/#geojson) to represent location

#### CSV

| Office | Location                          |
|--------|-----------------------------------|
| Dalby  | {"lon":151.2660, "lat": -27.1944} |
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

* Geometry isn't constrained to a point; it could be a line or polygon.
* [GeoJSON](https://tools.ietf.org/html/rfc7946#page-12) only supports the WGS84 coordinate reference system.
* The axis order is explicit. [Stating how coordinate values are encoded](https://www.w3.org/TR/sdw-bp/#bp-crs) is a W3C spatial data on the web best practice. GeoJSON only supports lon, lat axis order.

## Related Work

### Frictionless data

* [Table Schema](http://specs.frictionlessdata.io/table-schema/)
* [Publishing Geospatial Data as a Data Package](http://frictionlessdata.io/guides/publish/geo/)

### World Wide Web Consortium (W3C)

* [Data on the Web Best Practices](https://www.w3.org/TR/dwbp/)
* [Spatial Data on the Web Best Practices](http://www.w3.org/TR/sdw-bp)

These documents advise on best practices related to the publication of data and spatial data on the web.

### Australian Government - CSV GEO AU

[csv-geo-au](https://github.com/TerriaJS/nationalmap/wiki/csv-geo-au) is a specification for publishing point or region-mapped Australian geospatial data in CSV format to data.gov.au and other open data portals.

### IETF - GeoJSON

[GeoJSON](https://tools.ietf.org/html/rfc7946) is a geospatial data interchange format based on JavaScript Object Notation (JSON).

### OGC - Simple Feature Access

The Open Geospatial Consortium - [OpenGIS Simple Feature Access](http://www.opengeospatial.org/standards/sfa) is also called ISO 19125. It provides a model for geometric objects associated with a Spatial Reference System.

{%include markdown-link-refs.html %}
