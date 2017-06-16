---
title: Grantee Profiles
layout: page
lead: true
---

This grantee profile is one in our series of Frictionless Data Tool Fund posts, written to shine a light on Frictionless Data’s Tool Fund grantees, their work and to let our technical community know how they can get involved. Frictionless Data Tool Fund grantees are individuals and organizations that Open Knowledge International has commissioned to extend implementation of Frictionless Data libraries in additional programming languages.

{% for grantee_profile in site.grantee_profiles %}
* [{{ grantee_profile.authors }}: {{grantee_profile.title}}]({{ grantee_profile.url }})

  *{{ grantee_profile.short_description }}*
{% endfor %}
