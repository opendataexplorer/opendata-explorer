# About the Open Data Explorer

The Open Data Explorer is a friendly and intuitive 
interface for discovering and visualizing open data.

## Mission

Governments around the world publish open data:
structured, machine-readable, freely shared data
without restrictions on usage. This is really
great news, as open data can have
tremendous benefits for society at large.

The trouble is, even the most common ways of
accessing open data typically require a high
degree of a mixture of data skills.

At the minimum, a user of open data is expected to know:

1. What data set would answer their question
2. Where to find the data set amongst many disparate sources
3. Searching through hundreds of tables in a repository
4. Downloading the data set onto a computer
5. Importing it into a program of choice (e.g. excel, R, Python, etc.)
6. Understanding the structure of the data
7. Transforming the data to fit the requirements of a graph
8. Finding useful insights in the data

Even seasoned data wranglers need to develop
workflows if they  want to use open data at scale.

The mission of the Open Data Explorer is to
minimize the barrier needed to get to the final
step: finding useful insights in open data.

## Current State of Open Data

Most governments use the data management system
[CKAN](https://ckan.org/) to publish
and organize data and metadata. This is beneficial
to the power user, but out of reach for the
casual user of open data.

Although open data around the world is generally more or
less managed by CKAN, there are lots of
exceptions and modifications. In other words,
there are no clear standards as to
the structure, content and publishing schedule
of open data. This makes creating a unified
system of discovery and visual insights
particularly difficult.

This is why we chose to start with
open data from [Statistics Canada](https://www150.statcan.gc.ca/n1/en/type/data?MM=1): a data source
that is consistently structured, well-documented
and comes with an API for machine interaction.
This makes it easy as a starting point.
All the data sources in the Alpha come from
Statistics Canada Open Data.