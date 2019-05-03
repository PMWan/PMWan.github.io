function jsonToChart(requestURL,dataKey,labelKey,labelValuesPrefix,labelValuesReversed,xAxisLabelSpacing,xPositionTop,seriesKey,seriesKey2,seriesKey3,yOffset,seriesDivisor,seriesBarDistance,startStep,endStep,chartDivId,chartType,smoothLine,showArea,showPoint,horizontalBars) {
    
    // set chart's aspect ratio
    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        if (chartDiv.classList.contains('ct-perfect-fifth')) {
            chartDiv.classList.remove('ct-perfect-fifth');
            chartDiv.classList.add('ct-double-octave');
        }
        if (chartDiv.classList.contains('ct-square')) {
            chartDiv.classList.remove('ct-square');
            chartDiv.classList.add('ct-major-twelfth');
        }
    }

    // request chart data from corresponding json data file
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    // once the response is fully loaded, generate the chart
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var labelValues = [];
        var seriesValues1 = [];
        var seriesValues2 = [];
        var seriesValues3 = [];
        var count = 0;

        function pushDataIntoArrays(step) {
            // push data into an array representing x-axis values
            if (horizontalBars) {
                labelValues.push(jsonObj[dataKey][step][labelKey]);
            }else{
                if (labelValuesPrefix) {
                    labelValues.push(
                        (jsonObj[dataKey][step][labelValuesPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][labelKey]).toString().slice(-2)
                        );
                } else {
                    labelValues.push("'" + (jsonObj[dataKey][step][labelKey]).toString().slice(-2));
                }
            }

            // push data into arrays representing y-axis values
            if (seriesDivisor) {
                seriesValues1[count] = { 
                    meta: labelValues[count],
                    value: (jsonObj[dataKey][step][seriesKey])/seriesDivisor 
                };
                if (seriesKey2) {
                    seriesValues2[count] = { 
                        meta: labelValues[count],
                        value: (jsonObj[dataKey][step][seriesKey2])/seriesDivisor 
                    };
                }
                if (seriesKey3) {
                    seriesValues3[count] = { 
                        meta: labelValues[count],
                        value: (jsonObj[dataKey][step][seriesKey3])/seriesDivisor 
                    };
                }     
            } else {
                seriesValues1[count] = { 
                    meta: labelValues[count],
                    value: jsonObj[dataKey][step][seriesKey]
                };
                if (seriesKey2) {
                    seriesValues2[count] = { 
                        meta: labelValues[count],
                        value: jsonObj[dataKey][step][seriesKey2]
                    };
                }
                if (seriesKey3) {
                    seriesValues3[count] = { 
                        meta: labelValues[count],
                        value: jsonObj[dataKey][step][seriesKey3]
                    };
                }
            }

            count = count + 1;
        }

        // execute based on whether or not values are to be charted in reverse of their order in the data file
        if (labelValuesReversed == true) {
            for (var step = startStep; step >= endStep; step--) {
                pushDataIntoArrays(step);
            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                pushDataIntoArrays(step);
            }
        }

        if (seriesKey && seriesKey2 && seriesKey3) {
            var series_array = [seriesValues1, seriesValues2, seriesValues3]
        } else if (seriesKey && seriesKey2) {
            var series_array = [seriesValues1, seriesValues2]
        } else if (seriesKey) {
            var series_array = [seriesValues1]
        }

        var data = {
            // A labels array that can contain any sort of values
            labels: labelValues,
            // Our series array that contains series objects or in this case series data arrays
            series: series_array
        };

        var options = {
            axisY: {
                offset: yOffset
            },
            axisX: {
                offset: 15
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        if (xAxisLabelSpacing) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    labelInterpolationFnc: function(value, index) {
                        return index % (xAxisLabelSpacing/2) === 0 ? value : null;
                    }
                }
            } else {
                options['axisX'] = {
                    labelInterpolationFnc: function(value, index) {
                        return index % xAxisLabelSpacing === 0 ? value : null;
                    }
                }
            }
        }

        if (labelValuesPrefix) {
            options['axisX']['offset'] = 25;
        }

        if (xPositionTop == true) {
            options['axisX']['position'] = 'start';
            options['axisX']['offset'] = 10;
        }

        if (chartType == 'line') {
            
            options['showPoint'] = showPoint;
            options['lineSmooth'] = smoothLine;         
            options['showArea'] = showArea;

            // Create a new line chart object where as first parameter we pass in a selector
            // that is resolving to our chart container element. The Second parameter
            // is the actual data object.
            new Chartist.Line("#" + chartDivId, data, options);

        }

        if (chartType == 'bar') {

            options['horizontalBars'] = horizontalBars;

            if (document.querySelector('.chartlist')) {
                options['seriesBarDistance'] = seriesBarDistance;
            }    

            var responsiveOptions = [
                ['screen and (max-width: 576px)', {
                  seriesBarDistance: seriesBarDistance
                }]
            ];

            // Create a new line chart object where as first parameter we pass in a selector
            // that is resolving to our chart container element. The Second parameter
            // is the actual data object.
            new Chartist.Bar("#" + chartDivId, data, options, responsiveOptions);

        }
    }
}

function goBack() {
    window.history.back();
}

(function () {
    // inserts 'home' and/or 'go back' links if user browsed to chart or contact page from within site
    if (document.getElementById('go-home-or-go-back-links-wrapper')) {
        var ref = document.referrer;
        if (ref.match(/^https?:\/\/([^\/]+\.)?localhost:4000(\/|$)/i) || ref.match(/^https?:\/\/([^\/]+\.)?dashibodi\.com(\/|$)/i)) {
            if (window.history.length > 1) {
                document.getElementById('link-to-go-back').classList.remove('hidden-element');
                document.getElementById('link-to-home').classList.remove('hidden-element');
            } else {
                // runs in case of 'open in new tab' from within dashibodi
                document.getElementById('link-to-home').classList.remove('hidden-element');
            }
        } else {
            document.getElementById('link-to-home').classList.remove('hidden-element');
        }
    }
})();