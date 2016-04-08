---
title: JSON Table Schema
section: guides
---

JSON Table Schema is a standard that provides a “schema” (similar to a [database schema](https://en.wikipedia.org/wiki/Database_schema)) for each packaged CSV file.  This information includes the expected type of each value in a column *(“string”, “number”, “date”, etc.)*, constraints on the value *(“this string can only be at most 10 characters long”)*, and the expected format of the data *(“this field should only contain strings that look like email addresses)*.  JSON Table Schema can also specify relations between tables.

Given the following table of user information:

| Name | Email        | Age |
|------|--------------|-----|
| Jill | jill@foo.com |  25 |
| Jack | jack@bar.com |  33 |

An example schema would look like the following.  Note that a minimum age of 18 is specified and a string that looks like an email address must be present in the `Email` column:


    [{
      "name": "Name",
      "type": "string",
      "description": "User’s name"
     },
     {
      "name": "Email",
      "type": "string",
      "format": "email",
      "description": "User’s email",
     },
     {
      "name": "Age",
      "type": "integer",
      "description": "User’s age",
      "constraints": {
        "minimum": 18
      }
     }]
   
[Tooling]({{ site.baseurl }}/tools/) that supports JSON Table Schema can ensure that CSVs adhere to their stated schemas, and flag validation errors based on the format and constraints specified in the schema.  For an example, see [GoodTables]({{ site.baseurl }}/tools/goodtables/).

Read the [full standard]({{ site.baseurl }}/standards/json-table-schema/).