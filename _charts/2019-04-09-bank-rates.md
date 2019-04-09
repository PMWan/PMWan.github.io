---
layout: chart
author: Paul
unit: (%)
categories: [economy]
description: "Kenya's commercial banks weighted average rates from November 2008 to November 2018."
title: "Commercial Bank Rates"
excerpt_separator: <!--more-->
series-a: Lending
series-b: Deposit
series-c: Savings
chart_function: jsonToChart
chart_type: line
data_file: bank-rates
data_key: bank_rates_data
label_key: Year
label_values_prefix: Month
label_values_reversed: true
x_axis_label_spacing: 24
series_key: Lending
series_key_2: Deposit
series_key_3: Savings
y_axis_offset: 5
series_divisor: null
start_step: 120
end_step: 0
chart_id: bank-rates-chart
smooth_line: false
show_point: true
table_col_1: Year
table_col_2: Month
table_col_3: Lending Rate
table_col_4: Deposit Rate
table_col_5: Savings Rate
image: /assets/images/bank-rates.png
---

{% include key.html %}

<div class="ct-chart ct-perfect-fifth dense-datapoints" id="{{ page.chart_id }}"></div>

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
                <th scope="col">{{ page.table_col_1 }}</th>
                <th scope="col">{{ page.table_col_2 }}</th>
                <th scope="col">{{ page.table_col_3 }} {% if page.unit %}{{ page.unit }}{% endif %}</th>
                <th scope="col">{{ page.table_col_4 }} {% if page.unit %}{{ page.unit }}{% endif %}</th>
                <th scope="col">{{ page.table_col_5 }} {% if page.unit %}{{ page.unit }}{% endif %}</th>
            </tr>
        </thead>
        <tbody>
            {% for i in (page.end_step..page.start_step) %}
                <tr>
                    <td>{{ data[i][page.label_key] }} </td>
                    <td>{{ data[i][page.label_values_prefix] | slice: 0, 3 }} </td>
                    <td>{{ data[i][page.series_key] }}</td>
                    <td>{{ data[i][page.series_key_2] }}</td>
                    <td>{{ data[i][page.series_key_3] }}</td>
                </tr>
            {% endfor %}
        </tbody>
    </table>
</div>