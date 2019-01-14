function jsonToLineChart(requestURL,dataKey,xKey,xReverse,yKey,yDivisor,startStep,endStep,chartDivId,chartLinkId) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var jsonObj = request.response;
        var years = [];
        var values = [];
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {
                years.push((jsonObj[dataKey][step][xKey]).slice(2,4));
                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }
            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                years.push((jsonObj[dataKey][step][xKey]).slice(2,4));
                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }
            }
        }
        
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values]
        };
        var options = {
            showPoint: false,
            lineSmooth: false,
            axisY: {
                offset: 30,
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                  return "'" + value;
                }
            }
        };
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);

        var source = jsonObj['source'];
        var sourceUrl = jsonObj['source_url'];
        var a = document.getElementById(chartLinkId)
        a.innerText = source;
        a.href = sourceUrl;
    }
}

function jsonToComparisonLineChart(requestURL,dataKey,xKey,yKey1,yKey2,chartDivId,chartLinkId) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var jsonObj = request.response;
        var years = [];
        var values1 = [];
        var values2 = [];
        for (var step = 10; step >= 0; step--) {
            years.push((jsonObj[dataKey][step][xKey]).slice(2,4));
            values1.push(jsonObj[dataKey][step][yKey1]);
            values2.push(jsonObj[dataKey][step][yKey2]);
        }
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values1, values2]
        };
        var options = {
            showPoint: false,
            lineSmooth: false,
            axisY: {
                offset: 30,
            },
            axisX: {
                labelInterpolationFnc: function (value) {
                  return "'" + value;
                }
            }
        };
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);

        var source = jsonObj['source'];
        var sourceUrl = jsonObj['source_url'];
        var a = document.getElementById(chartLinkId)
        a.innerText = source;
        a.href = sourceUrl;
    }
}