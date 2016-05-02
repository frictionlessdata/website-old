---
title: User Stories
---

*Below is a compilation of potential User Stories for Data Packages.*

## Detailed User Stories

- [Automated Denormalization](./denormalize/)
- [Continuous Data Integration](./continuous-data-integration/)
- Data Editor (for Tabular Data Packages)
- Tableau-Lite for Data Packages
- "Give Me an API"
- Join-It

## General User Stories

{% for user-story in site.data.user-stories %}
**As a** {{ user-story.as-a }}, **I want** {{ user-story.want }} **so that** {{ user-story.so-that }}
{% endfor %}
