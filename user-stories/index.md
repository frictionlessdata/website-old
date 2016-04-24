---
title: User Stories
---

*Below is a compilation of potential User Stories for Data Packages.*

## Detailed User Stories

- [Denormalize](./denormalize/)

## General User Stories

{% for user-story in site.data.user-stories %}
**As a** {{ user-story.as-a }}, **I want** {{ user-story.want }} **so that** {{ user-story.so-that }}
{% endfor %}
