// Circle plot US
function buildPlot1() {

  /* data route */
  const url = "/api/data1";

  d3.json(url).then(function (response) {

    // Create a contains function
    Array.prototype.contains = function (v) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
      }
      return false;
    };

    // Use contains function to find desired unique values  
    Array.prototype.uniqueState = function () {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i][0])) {
          arr.push(this[i][0]);
        }
      }
      return arr;
    }


    var state_list_unique = response.uniqueState();

    function getStateData(chosenState) {
      currentValues = [];
      currentState = "";
      nuclear = "";
      coal = "";
      naturalGas = "";
      petroleum ="";
      hydro = "";
      geothermal = "";
      solar = "";
      wind = "";
      biomassOther = "";

      for (var i = 0; i < response.length; i++) {
        if (response[i][0] === chosenState) {
          currentState = response[i][0];
          nuclear = response[i][1];
          coal = response[i][2];
          naturalGas = response[i][3];
          petroleum = response[i][4];
          hydro = response[i][5];
          geothermal = response[i][6];
          solar = response[i][7];
          wind = response[i][8];
          biomassOther = response[i][9];
          currentValues.push(nuclear, coal, naturalGas, petroleum, hydro, geothermal, solar, wind, biomassOther);
        }
      }
    };
  
    
    // Default State Data
    setBubblePlot('Alabama');
    
    function setBubblePlot(chosenState) {
      getStateData(chosenState);

      // Set data to be plotted
      trace1 = {
        type: "pie",
        textinfo: "text+percent",
        textposition: "inside",
        values: currentValues,
        text: ["Nuclear", "Coal", "Natural Gas", "Petroleum", "Hydro", "Geothermal", "Solar-PV", "Wind", "Biomass/ Other"],
        hoverinfo: "skip",
        autopct: '%1.1f%%',
        marker: {
          colors: ["#347C17", "#6960EC", "#43C6DB", "#3EA055", "#FFFF00", "#FF7F50", "#4B0082", "#C48189", "#B93B8F"],
          labels: ["Nuclear", "Coal", "Natural Gas", "Petroleum", "Hydro", "Geothermal", "Solar-PV", "Wind", "Biomass/ Other"],
          hoverinfo: "skip"
        },
        title: {
          text: `<b>Percentage Energy Usage</b> <br> ${currentState}`,
          font: { "size": 20 }
        },
        showlegend: true,
        labels: ["Nuclear", "Coal", "Natural Gas", "Petroleum", "Hydro", "Geothermal", "Solar-PV", "Wind", "Biomass/ Other"]

      };
     
      var data = [trace1];
      
      const layout = {
        // width: 400,
        height: 500,
        // autosize: true,
        margin: { t: 10, r: 10, l: 10, b: 10 }
      };

      Plotly.newPlot("circlePlot", data, layout);
    }
    

    // var innerContainer = document.querySelector('[data-num="0"');
    var stateSelector = document.querySelector('.statedata1');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length; i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(state_list_unique, stateSelector);

    function updateState() {
        setBubblePlot(stateSelector.value);
    }

    stateSelector.addEventListener('change', updateState, false);
  });
}



//  Line chart US
function buildPlot2() {
  /* data route */
  // Static chart so can import data directly through python in the app.py
  const url = "/api/data2";
  d3.json(url).then(function (response) {

    const data = response;

    const layout = {
      title: '<b>US Power Generation</b>',
      xaxis: {
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      yaxis: {
        title: 'Billion kilowatthours',
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      legend: {
        x: 0,
        y: 1.0,
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
      },
    };

    Plotly.newPlot("linePlotUS", data, layout);
  });
}

function buildTable() {
  /* data route */
  // Static chart so can import data directly through python in the app.py
  const url = "/api/data3";
  d3.json(url).then(function (response) {

    var rowEvenColor = "lightgrey";
    var rowOddColor = "#506784";
    var rowOdd = "white";
    var rowEven = "black";

    const data = [{
      title: '<b>US Percent Energy Usage Per Source</b>',
      type: 'table',
      //columnorder: [1,2],
      columnwidth: [75,60,50,50,50,50,50,50,50,50],
      header: {
        values: [["<b>State</b>"], ["<b>Nuclear</b>"], ["<b>Coal</b>"], ["<b>Nat.<br>Gas</b>"], 
                ["<b>Petrol</b>"], ["<b>Hydro</b>"], ["<b>Geo<br>Ther</b>"], ["<b>Solar</b>"], 
                ["<b>Wind</b>"], ["<b>Bio<br>mass</b>"]],
        align: ["center"],
        height: 40,
        line: {width: 1, color: 'black'},
        rotation: 90,
        fill: {color: "grey"},
        font: {family: "Arial", size: 12, color: "white"}
      },
      cells: {
        values: response,
        align: ["left", "center"],
        height: 25,
        line: {color: "black", width: 1},
        fill: {color: [[rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor, rowEvenColor,
                        rowOddColor,rowEvenColor,rowOddColor ]]},

        font: {family: "Arial", size: 11, color: [[rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven,
                                                  rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, 
                                                  rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven,
                                                  rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven,
                                                  rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven, rowOdd, rowEven,
                                                  rowOdd]]}
      }
    }]

    // const layout = {
    //   title: 'US Power Generation',
    //   xaxis: {
    //     tickfont: {
    //       size: 14,
    //       color: 'rgb(107, 107, 107)'
    //     }
    //   },
    //   yaxis: {
    //     title: 'Billion kilowatthours',
    //     titlefont: {
    //       size: 16,
    //       color: 'rgb(107, 107, 107)'
    //     },
    //     tickfont: {
    //       size: 14,
    //       color: 'rgb(107, 107, 107)'
    //     }
    //   },
    //   legend: {
    //     x: 0,
    //     y: 1.0,
    //     bgcolor: 'rgba(255, 255, 255, 0)',
    //     bordercolor: 'rgba(255, 255, 255, 0)'
    //   },
    // };

    Plotly.newPlot("TablePlotUS", data);
  });
}

// Function call  
buildPlot1();
buildPlot2();
buildTable();