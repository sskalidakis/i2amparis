const units = {
  Celcius: "°C",
  Fahrenheit: "°F" };


const config = {
  minTemp: -20,
  maxTemp: 50,
  unit: "Celcius" };


// Change min and max temperature values

const tempValueInputs = document.querySelectorAll("input[type='text']");

tempValueInputs.forEach(input => {
  input.addEventListener("change", event => {
    const newValue = event.target.value;

    if (isNaN(newValue)) {
      return input.value = config[input.id];
    } else {
      config[input.id] = input.value;
      range[input.id.slice(0, 3)] = config[input.id]; // Update range
      return setTemperature(); // Update temperature
    }
  });
});

// Switch unit of temperature

const unitP = document.getElementById("unit");

unitP.addEventListener("click", () => {
  config.unit = config.unit === "Celcius" ? "Fahrenheit" : "Celcius";
  unitP.innerHTML = config.unit + ' ' + units[config.unit];
  return setTemperature();
});

// Change temperature

const range = document.querySelector("input[type='range']");
const temperature = document.getElementById("temperature");

function setTemperature() {
  temperature.style.height = (range.value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
  temperature.dataset.value = range.value + units[config.unit];
}


// function lineChart(t) {
var t= 1;
  am4core.ready(function() {

// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
    chart.data = myData(1);

// Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

// Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

// Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

// Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

// Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

// Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

// Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;




// }


document.getElementById("termometer").addEventListener("wheel", myFunction);
var temp = 0;
function myFunction(e) {
  if (e.deltaY < 0) {
    if (config.maxTemp > temp) {
      temp += 1;}
  } else {
    if (config.minTemp < temp) {
      temp -= 1;
    }

  }

  chart.data= myData(temp);
  temperature.style.height = (temp - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
  temperature.dataset.value = temp + units[config.unit];
}
// var flag= true;
// if (flag) {
//   lineChart(1);
//   flag = false;
// }
  }); // end am4core.ready()
function myData(t) {
  return [{
    "date": "2012-07-27",
    "value": 13*t
  }, {
    "date": "2012-07-28",
    "value": 11*t
  }, {
    "date": "2012-07-29",
    "value": 15*t
  }, {
    "date": "2012-07-30",
    "value": 16*t
  }, {
    "date": "2012-07-31",
    "value": 18*t
  }, {
    "date": "2012-08-01",
    "value": 13*t
  }, {
    "date": "2012-08-02",
    "value": 22*t
  }, {
    "date": "2012-08-03",
    "value": 23*t
  }, {
    "date": "2012-08-04",
    "value": 20*t
  }, {
    "date": "2012-08-05",
    "value": 17*t
  }, {
    "date": "2012-08-06",
    "value": 16*t
  }, {
    "date": "2012-08-07",
    "value": 18*t
  }, {
    "date": "2012-08-08",
    "value": 21*t
  }, {
    "date": "2012-08-09",
    "value": 26*t
  }, {
    "date": "2012-08-10",
    "value": 24*t
  }, {
    "date": "2012-08-11",
    "value": 29*t
  }, {
    "date": "2012-08-12",
    "value": 32*t
  }, {
    "date": "2012-08-13",
    "value": 18*t
  }, {
    "date": "2012-08-14",
    "value": 24*t
  }, {
    "date": "2012-08-15",
    "value": 22*t
  }, {
    "date": "2012-08-16",
    "value": 18*t
  }, {
    "date": "2012-08-17",
    "value": 19*t
  }, {
    "date": "2012-08-18",
    "value": 14*t
  }, {
    "date": "2012-08-19",
    "value": 15*t
  }, {
    "date": "2012-08-20",
    "value": 12*t
  }, {
    "date": "2012-08-21",
    "value": 8*t
  }, {
    "date": "2012-08-22",
    "value": 9*t
  }, {
    "date": "2012-08-23",
    "value": 8*t
  }, {
    "date": "2012-08-24",
    "value": 7*t
  }, {
    "date": "2012-08-25",
    "value": 5*t
  }, {
    "date": "2012-08-26",
    "value": 11*t
  }, {
    "date": "2012-08-27",
    "value": 13*t
  }, {
    "date": "2012-08-28",
    "value": 18*t
  }, {
    "date": "2012-08-29",
    "value": 20*t
  }, {
    "date": "2012-08-30",
    "value": 29*t
  }, {
    "date": "2012-08-31",
    "value": 33*t
  }, {
    "date": "2012-09-01",
    "value": 42*t
  }, {
    "date": "2012-09-02",
    "value": 35*t
  }, {
    "date": "2012-09-03",
    "value": 31*t
  }, {
    "date": "2012-09-04",
    "value": 47*t
  }, {
    "date": "2012-09-05",
    "value": 52*t
  }, {
    "date": "2012-09-06",
    "value": 46*t
  }, {
    "date": "2012-09-07",
    "value": 41*t
  }, {
    "date": "2012-09-08",
    "value": 43*t
  }, {
    "date": "2012-09-09",
    "value": 40*t
  }, {
    "date": "2012-09-10",
    "value": 39*t
  }, {
    "date": "2012-09-11",
    "value": 34*t
  }, {
    "date": "2012-09-12",
    "value": 29*t
  }, {
    "date": "2012-09-13",
    "value": 34*t
  }, {
    "date": "2012-09-14",
    "value": 37*t
  }, {
    "date": "2012-09-15",
    "value": 42*t
  }, {
    "date": "2012-09-16",
    "value": 49*t
  }, {
    "date": "2012-09-17",
    "value": 46*t
  }, {
    "date": "2012-09-18",
    "value": 47*t
  }, {
    "date": "2012-09-19",
    "value": 55*t
  }, {
    "date": "2012-09-20",
    "value": 59*t
  }, {
    "date": "2012-09-21",
    "value": 58*t
  }, {
    "date": "2012-09-22",
    "value": 57*t
  }, {
    "date": "2012-09-23",
    "value": 61*t
  }, {
    "date": "2012-09-24",
    "value": 59*t
  }, {
    "date": "2012-09-25",
    "value": 67*t
  }, {
    "date": "2012-09-26",
    "value": 65*t
  }, {
    "date": "2012-09-27",
    "value": 61*t
  }, {
    "date": "2012-09-28",
    "value": 66*t
  }, {
    "date": "2012-09-29",
    "value": 69*t
  }, {
    "date": "2012-09-30",
    "value": 71*t
  }, {
    "date": "2012-10-01",
    "value": 67*t
  }, {
    "date": "2012-10-02",
    "value": 63*t
  }, {
    "date": "2012-10-03",
    "value": 46*t
  }, {
    "date": "2012-10-04",
    "value": 32*t
  }, {
    "date": "2012-10-05",
    "value": 21*t
  }, {
    "date": "2012-10-06",
    "value": 18*t
  }, {
    "date": "2012-10-07",
    "value": 21*t
  }, {
    "date": "2012-10-08",
    "value": 28*t
  }, {
    "date": "2012-10-09",
    "value": 27*t
  }, {
    "date": "2012-10-10",
    "value": 36*t
  }, {
    "date": "2012-10-11",
    "value": 33*t
  }, {
    "date": "2012-10-12",
    "value": 31*t
  }, {
    "date": "2012-10-13",
    "value": 30*t
  }, {
    "date": "2012-10-14",
    "value": 34*t
  }, {
    "date": "2012-10-15",
    "value": 38*t
  }, {
    "date": "2012-10-16",
    "value": 37*t
  }, {
    "date": "2012-10-17",
    "value": 44*t
  }, {
    "date": "2012-10-18",
    "value": 49*t
  }, {
    "date": "2012-10-19",
    "value": 53*t
  }, {
    "date": "2012-10-20",
    "value": 57*t
  }, {
    "date": "2012-10-21",
    "value": 60*t
  }, {
    "date": "2012-10-22",
    "value": 61*t
  }, {
    "date": "2012-10-23",
    "value": 69*t
  }, {
    "date": "2012-10-24",
    "value": 67*t
  }, {
    "date": "2012-10-25",
    "value": 72*t
  }, {
    "date": "2012-10-26",
    "value": 77*t
  }, {
    "date": "2012-10-27",
    "value": 75*t
  }, {
    "date": "2012-10-28",
    "value": 70*t
  }, {
    "date": "2012-10-29",
    "value": 72*t
  }, {
    "date": "2012-10-30",
    "value": 70*t
  }, {
    "date": "2012-10-31",
    "value": 72*t
  }, {
    "date": "2012-11-01",
    "value": 73*t
  }, {
    "date": "2012-11-02",
    "value": 67*t
  }, {
    "date": "2012-11-03",
    "value": 68*t
  }, {
    "date": "2012-11-04",
    "value": 65*t
  }, {
    "date": "2012-11-05",
    "value": 71*t
  }, {
    "date": "2012-11-06",
    "value": 75*t
  }, {
    "date": "2012-11-07",
    "value": 74*t
  }, {
    "date": "2012-11-08",
    "value": 71*t
  }, {
    "date": "2012-11-09",
    "value": 76*t
  }, {
    "date": "2012-11-10",
    "value": 77*t
  }, {
    "date": "2012-11-11",
    "value": 81*t
  }, {
    "date": "2012-11-12",
    "value": 83*t
  }, {
    "date": "2012-11-13",
    "value": 80*t
  }, {
    "date": "2012-11-14",
    "value": 81*t
  }, {
    "date": "2012-11-15",
    "value": 87*t
  }, {
    "date": "2012-11-16",
    "value": 82*t
  }, {
    "date": "2012-11-17",
    "value": 86*t
  }, {
    "date": "2012-11-18",
    "value": 80*t
  }, {
    "date": "2012-11-19",
    "value": 87*t
  }, {
    "date": "2012-11-20",
    "value": 83*t
  }, {
    "date": "2012-11-21",
    "value": 85*t
  }, {
    "date": "2012-11-22",
    "value": 84*t
  }, {
    "date": "2012-11-23",
    "value": 82*t
  }, {
    "date": "2012-11-24",
    "value": 73*t
  }, {
    "date": "2012-11-25",
    "value": 71*t
  }, {
    "date": "2012-11-26",
    "value": 75*t
  }, {
    "date": "2012-11-27",
    "value": 79*t
  }, {
    "date": "2012-11-28",
    "value": 70*t
  }, {
    "date": "2012-11-29",
    "value": 73*t
  }, {
    "date": "2012-11-30",
    "value": 61*t
  }, {
    "date": "2012-12-01",
    "value": 62*t
  }, {
    "date": "2012-12-02",
    "value": 66*t
  }, {
    "date": "2012-12-03",
    "value": 65*t
  }, {
    "date": "2012-12-04",
    "value": 73*t
  }, {
    "date": "2012-12-05",
    "value": 79*t
  }, {
    "date": "2012-12-06",
    "value": 78*t
  }, {
    "date": "2012-12-07",
    "value": 78*t
  }, {
    "date": "2012-12-08",
    "value": 78*t
  }, {
    "date": "2012-12-09",
    "value": 74*t
  }, {
    "date": "2012-12-10",
    "value": 73*t
  }, {
    "date": "2012-12-11",
    "value": 75*t
  }, {
    "date": "2012-12-12",
    "value": 70*t
  }, {
    "date": "2012-12-13",
    "value": 77*t
  }, {
    "date": "2012-12-14",
    "value": 67*t
  }, {
    "date": "2012-12-15",
    "value": 62*t
  }, {
    "date": "2012-12-16",
    "value": 64*t
  }, {
    "date": "2012-12-17",
    "value": 61*t
  }, {
    "date": "2012-12-18",
    "value": 59*t
  }, {
    "date": "2012-12-19",
    "value": 53*t
  }, {
    "date": "2012-12-20",
    "value": 54*t
  }, {
    "date": "2012-12-21",
    "value": 56*t
  }, {
    "date": "2012-12-22",
    "value": 59*t
  }, {
    "date": "2012-12-23",
    "value": 58*t
  }, {
    "date": "2012-12-24",
    "value": 55*t
  }, {
    "date": "2012-12-25",
    "value": 52*t
  }, {
    "date": "2012-12-26",
    "value": 54*t
  }, {
    "date": "2012-12-27",
    "value": 50*t
  }, {
    "date": "2012-12-28",
    "value": 50*t
  }, {
    "date": "2012-12-29",
    "value": 51*t
  }, {
    "date": "2012-12-30",
    "value": 52*t
  }, {
    "date": "2012-12-31",
    "value": 58*t
  }, {
    "date": "2013-01-01",
    "value": 60*t
  }, {
    "date": "2013-01-02",
    "value": 67*t
  }, {
    "date": "2013-01-03",
    "value": 64*t
  }, {
    "date": "2013-01-04",
    "value": 66*t
  }, {
    "date": "2013-01-05",
    "value": 60*t
  }, {
    "date": "2013-01-06",
    "value": 63*t
  }, {
    "date": "2013-01-07",
    "value": 61*t
  }, {
    "date": "2013-01-08",
    "value": 60*t
  }, {
    "date": "2013-01-09",
    "value": 65*t
  }, {
    "date": "2013-01-10",
    "value": 75*t
  }, {
    "date": "2013-01-11",
    "value": 77*t
  }, {
    "date": "2013-01-12",
    "value": 78*t
  }, {
    "date": "2013-01-13",
    "value": 70*t
  }, {
    "date": "2013-01-14",
    "value": 70*t
  }, {
    "date": "2013-01-15",
    "value": 73*t
  }, {
    "date": "2013-01-16",
    "value": 71*t
  }, {
    "date": "2013-01-17",
    "value": 74*t
  }, {
    "date": "2013-01-18",
    "value": 78*t
  }, {
    "date": "2013-01-19",
    "value": 85*t
  }, {
    "date": "2013-01-20",
    "value": 82*t
  }, {
    "date": "2013-01-21",
    "value": 83*t
  }, {
    "date": "2013-01-22",
    "value": 88*t
  }, {
    "date": "2013-01-23",
    "value": 85*t
  }, {
    "date": "2013-01-24",
    "value": 85*t
  }, {
    "date": "2013-01-25",
    "value": 80*t
  }, {
    "date": "2013-01-26",
    "value": 87*t
  }, {
    "date": "2013-01-27",
    "value": 84*t
  }, {
    "date": "2013-01-28",
    "value": 83*t
  }, {
    "date": "2013-01-29",
    "value": 84*t
  }, {
    "date": "2013-01-30",
    "value": 81*t
  }];

}