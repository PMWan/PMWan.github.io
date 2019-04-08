function setChartSize(chartDivId) {
    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        if (chartDiv.classList.contains('ct-minor-sixth')) {
            chartDiv.classList.remove('ct-minor-sixth');
            chartDiv.classList.add('ct-double-octave');
        }
        if (chartDiv.classList.contains('ct-square')) {
            chartDiv.classList.remove('ct-square');
            chartDiv.classList.add('ct-major-twelfth');
        }
    }
}

function jsonToLineChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,xSpacing,yKey,yOffset,yDivisor,startStep,endStep,chartDivId,smoothed,showArea,showPoint) {

    setChartSize(chartDivId);

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values = [];
        var count = 0;
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey])/yDivisor 
                    };
                } else {
                    values[count] = {
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey] 
                    };
                }

                count = count + 1;

            }
        } else {
            for (var step = startStep; step <= endStep; step++) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey])/yDivisor 
                    };
                } else {
                    values[count] = {
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey] 
                    };
                }

                count = count + 1;

            }
        }
        
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values]
        };

        var options = {
            axisY: {
                offset: yOffset
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        options['showPoint'] = true;

        if (smoothed == false) {
            options['lineSmooth'] = false            
        }

        if (showArea == true) {
            options['showArea'] = true
        }

        if (showPoint == false) {
            options['showPoint'] = false
        }

        if (xKeyPrefix) {
            options['axisX'] = {
                offset: 35
            }
        }

        if (xSpacing) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    labelInterpolationFnc: function(value, index) {
                        return index % (xSpacing/2) === 0 ? value : null;
                    }
                }
            } else {
                options['axisX'] = {
                    labelInterpolationFnc: function(value, index) {
                        return index % xSpacing === 0 ? value : null;
                    }
                }
            }
        }

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);
    }
}

function jsonToComparisonLineChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,xSpacing,yKey1,yKey2,yOffset,yDivisor,startStep,endStep,chartDivId,smoothed,showArea) {

    setChartSize(chartDivId);

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values1 = [];
        var values2 = [];
        var count = 0;
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values1[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey1])/yDivisor 
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey2])/yDivisor 
                    };
                } else {
                    values1[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey1]
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey2] 
                    };
                }

                count = count + 1;

            }
        } else {
            for (var step = startStep; step <= endStep; step++) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values1[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey1])/yDivisor 
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey2])/yDivisor 
                    };
                } else {
                    values1[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey1]
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey2] 
                    };
                }

                count = count + 1;

            }
        }

        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values1, values2]
        };

        var options = {
            showPoint: true,
            axisY: {
                offset: yOffset
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        if (smoothed == false) {
            options['lineSmooth'] = false            
        }

        if (showArea == true) {
            options['showArea'] = true
        }

        if (xKeyPrefix) {
            options['axisX'] = {
                offset: 35
            }
        }

        if (xSpacing) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    labelInterpolationFnc: function(value, index) {
                        return index % (xSpacing/2) === 0 ? value : null;
                    }
                }
            } else {
                options['axisX'] = {
                    labelInterpolationFnc: function(value, index) {
                        return index % xSpacing === 0 ? value : null;
                    }
                }
            }
        }

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);
    }
}

function jsonToBarChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,xPositionTop,xSpacing,horizontalBars,yKey,yOffset,yDivisor,startStep,endStep,chartDivId) {

    setChartSize(chartDivId);
    
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values = [];
        var count = 0;
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    if (horizontalBars) {
                        years.push(jsonObj[dataKey][step][xKey]);
                    } else {
                        years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                    }
                }

                if (yDivisor) {
                    values[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey])/yDivisor 
                    };
                } else {
                    values[count] = {
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey] 
                    };
                }

                count = count + 1;

            }
        } else {
            for (var step = startStep; step <= endStep; step++) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    if (horizontalBars) {
                        years.push(jsonObj[dataKey][step][xKey]);
                    } else {
                        years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                    }
                }

                if (yDivisor) {
                    values[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey])/yDivisor 
                    };
                } else {
                    values[count] = {
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey] 
                    };
                }

                count = count + 1;

            }
        }
        
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values]
        };
        
        var options = {
            axisY: {
                offset: yOffset
            },
            axisX: {},
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        if (xKeyPrefix) {
            options['axisX'] = {
                offset: 35
            }
        }

        if (xSpacing) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    labelInterpolationFnc: function(value, index) {
                        return index % (xSpacing/2) === 0 ? value : null;
                    }
                }
            } else {
                options['axisX'] = {
                    labelInterpolationFnc: function(value, index) {
                        return index % xSpacing === 0 ? value : null;
                    }
                }
            }
        }

        if (xPositionTop == true) {
            options['axisX']['position'] = 'start';
        }

        if (horizontalBars == true) {
            options['horizontalBars'] = true;
        }
        
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Bar("#" + chartDivId, data, options);
    }
}

function jsonToComparisonBarChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,xSpacing,yKey1,yKey2,yOffset,yDivisor,startStep,endStep,chartDivId) {

    setChartSize(chartDivId);

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values1 = [];
        var values2 = [];
        var count = 0;
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {
                
                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values1[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey1])/yDivisor 
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey2])/yDivisor 
                    };
                } else {
                    values1[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey1]
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey2] 
                    };
                }

                count = count + 1;

            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                
                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(-2)
                        );
                } else {
                    years.push("'" + (jsonObj[dataKey][step][xKey]).toString().slice(-2));
                }

                if (yDivisor) {
                    values1[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey1])/yDivisor 
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: (jsonObj[dataKey][step][yKey2])/yDivisor 
                    };
                } else {
                    values1[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey1]
                    };
                    values2[count] = { 
                        meta: years[count],
                        value: jsonObj[dataKey][step][yKey2] 
                    };
                }

                count = count + 1;

            }
        }

        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values1, values2]
        };

        var options = {
            axisY: {
                offset: yOffset
            },
            plugins: [
                Chartist.plugins.tooltip()
            ]
        };

        if (xKeyPrefix) {
            options['axisX'] = {
                offset: 35
            }
        }

        if (xSpacing) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    labelInterpolationFnc: function(value, index) {
                        return index % (xSpacing/2) === 0 ? value : null;
                    }
                }
            } else {
                options['axisX'] = {
                    labelInterpolationFnc: function(value, index) {
                        return index % xSpacing === 0 ? value : null;
                    }
                }
            }
        }

        if (document.querySelector('.chartlist')) {
            options['seriesBarDistance'] = 8
        }

        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 6
            }]
        ];
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Bar("#" + chartDivId, data, options, responsiveOptions);
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