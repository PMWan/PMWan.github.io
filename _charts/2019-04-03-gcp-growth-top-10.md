---
layout: chart
author: Paul
unit: (%)
categories: [counties, economy]
description: "Kenya's top 10 counties by average Gross County Product (GCP) growth rate between 2014 and 2017."
title: "GCP Growth Rate - Top 10 Counties"
excerpt_separator: <!--more-->
chart_function: jsonToBarChart
data_file: gcp-growth
data_key: gcp_growth_data
x_key: county
x_prefix: null
x_reverse: true
x_position_top: false
horizontal_bars: true
y_key: avg_growth_rate_14_17
y_offset: 70
y_divisor: null
start_step: 9
end_step: 0
chart_id: gcp-growth-chart
table_col_1: County
table_col_2: Average GCP Growth Rate between 2014 and 2017
---

<div class="ct-chart ct-square" id="{{ page.chart_id }}"></div>

{% include {{ page.chart_function }}.html %}

{% include chart-description.html %}

<!--more-->

{% assign sources = site.data[page.data_file]['sources'] %}
{% include source.html %}

<div class="data-table table-responsive">
    {% assign data = site.data[page.data_file][page.data_key] %}
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Rank</th>
                <th scope="col">{{ page.table_col_1 }}</th>
                <th scope="col">{{ page.table_col_2 }} {% if page.unit %}{{ page.unit }}{% endif %}</th>
            </tr>
        </thead>
        <tbody>
            {% for i in (page.end_step..46) %}
                <tr>
                    <td>{{ i | plus: 1 }}</td>
                    <td>{{ data[i][page.x_key] }} </td>
                    <td>{{ data[i][page.y_key] }}</td>
                </tr>
            {% endfor %}
        </tbody>
    </table>
</div>

###### Notes:
* The average Gross County Product (GCP) growth rate across all 47 counties between 2014 and 2017 was **5.6%**.