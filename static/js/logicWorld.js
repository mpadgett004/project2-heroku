// World Power Generation Plot
function buildPlot4() {

    /* data route */
    const url = "/api/data4";

    d3.json(url).then(function (dataImport) {

        // Create a contains function
        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === v) return true;
            }
            return false;
        };

        // Use contains function to find desired unique values  
        Array.prototype.uniqueCountry = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i][0])) {
                    arr.push(this[i][0]);
                }
            }
            return arr;
        }


        var country_list_unique = dataImport.uniqueCountry();


        function getCountryData(chosenCountry) {
            currentYear = [];
            currentSolar = [];
            currentWind = [];
            currentHydro = [];
            currentGeoBiomassOther = [];

            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i][0] === chosenCountry) {
                    currentYear.push(dataImport[i][2]);
                    currentSolar.push(dataImport[i][3]);
                    currentWind.push(dataImport[i][4]);
                    currentHydro.push(dataImport[i][5]);
                    currentGeoBiomassOther.push(dataImport[i][6]);
                }
            }
        };


        // Default Country Data
        setBubblePlot('Africa');

        function setBubblePlot(chosenCountry) {
            getCountryData(chosenCountry);


            // Set data to be plotted
            trace1 = {
                "x": currentYear,
                "y": currentSolar,
                "name": 'Solar',
                "marker": { "color": "#EDCA1C" },
                "type": "lines+markers"
            };
            trace2 = {
                "x": currentYear,
                "y": currentWind,
                "name": 'Wind',
                "marker": { "color": "#ED1CD1" },
                "type": "lines+markers"
            };
            trace3 = {
                "x": currentYear,
                "y": currentHydro,
                "name": 'Hyrdo',
                "marker": { "color": "#1C6CED" },
                "type": "lines+markers"
            };
            trace4 = {
                "x": currentYear,
                "y": currentGeoBiomassOther,
                "name": 'Geo Biomass and Other',
                "marker": { "color": "#1CED41" },
                "type": "lines+markers"
            };

            var data = [trace1, trace2, trace3, trace4];

            const layout = {
                // width: 1200,
                // height: 400,
                title: '<b>Power Generation on a Global Scale</b>',
                xaxis: {
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                yaxis: {
                    title: 'Terawatt-hour',
                    titlefont: {
                        size: 16,
                        color: 'rgb(107, 107, 107)'
                    },
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                //margin: { t: 50, r: 500, l: 500, b: 50 }
            };

            Plotly.newPlot("linePlotWorld1", data, layout);
        }

        // var innerContainer = document.querySelector('[data-num="0"');
        var countrySelector = document.querySelector('.countrydata1');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        }

        assignOptions(country_list_unique, countrySelector);

        function updateCountry() {
            setBubblePlot(countrySelector.value);
        }

        countrySelector.addEventListener('change', updateCountry, false);
    });
}



// World Power Consumption Plot
function buildPlot5() {

    /* data route */
    const url = "/api/data5";

    d3.json(url).then(function (dataImport) {

        // Create a contains function
        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === v) return true;
            }
            return false;
        };

        // Use contains function to find desired unique values  
        Array.prototype.uniqueCountry = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i][0])) {
                    arr.push(this[i][0]);
                }
            }
            return arr;
        }


        var country_list_unique = dataImport.uniqueCountry();


        function getCountryData(chosenCountry) {
            currentYear = [];
            currentTraditionalBiomass = [];
            currentHydro = [];
            currentSolar = [];
            currentWind = [];
            currentGeoBiomassOther = [];

            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i][0] === chosenCountry) {
                    currentYear.push(dataImport[i][2]);
                    currentTraditionalBiomass.push(dataImport[i][3]);
                    currentHydro.push(dataImport[i][4]);
                    currentSolar.push(dataImport[i][5]);
                    currentWind.push(dataImport[i][6]);
                    currentGeoBiomassOther.push(dataImport[i][7]);
                }

            }
        };


        // Default Country Data
        setBubblePlot('Africa');

        function setBubblePlot(chosenCountry) {

            getCountryData(chosenCountry);

            // Set data to be plotted
            trace1 = {
                "x": currentYear,
                "y": currentTraditionalBiomass,
                "name": 'Traditional Biomass',
                "marker": { "color": "#FF1100" },
                "type": "lines+markers"
            };
            trace2 = {
                "x": currentYear,
                "y": currentHydro,
                "name": 'Hyrdo',
                "marker": { "color": "#1C6CED" },
                "type": "lines+markers"
            };
            trace3 = {
                "x": currentYear,
                "y": currentSolar,
                "name": 'Solar',
                "marker": { "color": "#EDCA1C" },
                "type": "lines+markers"
            };
            trace4 = {
                "x": currentYear,
                "y": currentWind,
                "name": 'Wind',
                "marker": { "color": "#ED1CD1" },
                "type": "lines+markers"
            };
            trace5 = {
                "x": currentYear,
                "y": currentGeoBiomassOther,
                "name": 'Geo Biomass and Other',
                "marker": { "color": "#1CED41" },
                "type": "lines+markers"
            };

            var data = [trace1, trace2, trace3, trace4, trace5];

            const layout = {
                // width: 1200,
                // height: 400,
                title: '<b>Power Consupltion on a Global Scale</b>',
                xaxis: {
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                yaxis: {
                    title: 'Terawatt-hour',
                    titlefont: {
                        size: 16,
                        color: 'rgb(107, 107, 107)'
                    },
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                //margin: { t: 50, r: 500, l: 500, b: 50 }
            };

            Plotly.newPlot("linePlotWorld2", data, layout);
        }

        // var innerContainer = document.querySelector('[data-num="0"');
        var countrySelector = document.querySelector('.countrydata2');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        }

        assignOptions(country_list_unique, countrySelector);

        function updateCountry() {
            setBubblePlot(countrySelector.value);
        }

        countrySelector.addEventListener('change', updateCountry, false);
    });
}


// Number of people without electricity Plot
function buildPlot6() {

    /* data route */
    const url = "/api/data6";

    d3.json(url).then(function (dataImport) {

        // Create a contains function
        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === v) return true;
            }
            return false;
        };

        // Use contains function to find desired unique values  
        Array.prototype.uniqueCountry = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i][0])) {
                    arr.push(this[i][0]);
                }
            }
            return arr;
        }


        var country_list_unique = dataImport.uniqueCountry();


        function getCountryData(chosenCountry) {
            currentYear = [];
            currentWithoutElectricity = [];


            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i][0] === chosenCountry) {
                    currentYear.push(dataImport[i][2]);
                    currentWithoutElectricity.push(dataImport[i][3]);
                }
            }

            changeEachYear = []
            for (var i = 0; i < currentWithoutElectricity.length; i++) {
                if (i - 1 < 0) {
                    changeEachYear.push(currentWithoutElectricity[i]);
                } else {
                    changeEachYear.push(currentWithoutElectricity[i] - currentWithoutElectricity[i - 1]);
                }
            }
        };


        // Default Country Data
        setBubblePlot('Afghanistan');

        function setBubblePlot(chosenCountry) {

            getCountryData(chosenCountry);

            // Set data to be plotted
            trace1 = {
                "type": "waterfall",
                "name": '',
                "marker": { "color": "#FF1100" },
                "orientation": "v",
                "measure": ["absolute", "relative", "relative", "relative", "relative",
                    "relative", "relative", "relative", "relative", "relative",
                    "relative", "relative", "relative", "relative", "relative",
                    "relative", "relative", "relative", "relative", "relative",
                    "relative", "relative", "relative", "relative", "relative",
                    "relative", "relative"],
                //    "absolute", "absolute","absolute", "absolute","absolute",
                //     "total", "total", "total", "total", "total",
                "x": currentYear,
                "y": changeEachYear,
                "textposition": "outside",
                // text: ["+60","+80", "", "-40", "-20", "Total" ],          
                "connector": {
                    "line": {
                        "color": "rgb(63, 63, 63)"
                    }
                },
                "increasing": { "marker": { "color": "#d62728" } },
                "decreasing": { "marker": { "color": "#2ca02c" } }

            };

            var data = [trace1];

            const layout = {
                // width: 1200,
                // height: 400,
                //margin: { t: 50, r: 500, l: 500, b: 50 },
                title: '<b>Number of People Without Electricity</b>',
                xaxis: {
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                yaxis: {
                    title: '',
                    titlefont: {
                        size: 16,
                        color: 'rgb(107, 107, 107)'
                    },
                    tickfont: {
                        size: 14,
                        color: 'rgb(107, 107, 107)'
                    }
                },
                autosize: true,
                showlegend: true

            };

            Plotly.newPlot("waterfallPlotWorld", data, layout);
        }

        // var innerContainer = document.querySelector('[data-num="0"');
        var countrySelector = document.querySelector('.countrydata3');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        }

        assignOptions(country_list_unique, countrySelector);

        function updateCountry() {
            setBubblePlot(countrySelector.value);
        }

        countrySelector.addEventListener('change', updateCountry, false);
    });
}


buildPlot4();
buildPlot5();
buildPlot6();