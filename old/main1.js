
var margin = {top: 20, right: 10, bottom: 20, left: 10};
    
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var innerRadius = 100,
    outerRadius = Math.min(width, height) / 2 - 6;

var parseTime = d3.timeParse("%H:%M:%S");

var formatHour = d3.timeFormat("%H");

var fullCircle = 2 * Math.PI;

var x = d3.scaleTime()
    .range([0, fullCircle]);

var y = d3.scaleRadial()
        .range([innerRadius, outerRadius]);

var line = d3.lineRadial()
        .angle(function(d) { return x(d.time); })
        .radius(function(d) { return y(d.value); });

d3.csv("fitbit-heart-2018-07-13.csv" ,function(d) {
  d.time = parseTime(d.time);
  d.value = +d.value;
  return d;
}, function(error, data) {
  if (error) throw error;
  
  x.domain(d3.extent(data, function(d) { console.log(d.time); return d.time; }));
      y.domain(d3.extent(data, function(d) { return d.value; }));
  
  var linePlot = g.append("path")
      .datum(data)
    .attr("fill", "none")
    // .attr("stroke", "#4099ff")
    .attr("stroke", "#e6550d")
    .attr("d", line);
  
  var yAxis = g.append("g")
      .attr("text-anchor", "middle");

  var yTick = yAxis
    .selectAll("g")
    .data(y.ticks(1))
    .enter().append("g");
  
  yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "black")
  		.attr("opacity", 0.05)
      .attr("r", y);
  
  yAxis.append("circle")
  		.attr("fill", "none")
      .attr("stroke", "black")
  		.attr("opacity", 0.05)
      .attr("r", function() { return y(y.domain()[0])});
  
  var labels = yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .text(function(d) { return d; });

  yTick.append("text")
    .attr("y", function(d) { return -y(d); })
    .attr("dy", "0.35em")
    .text(function(d) { console.log(d); return d; });
  
  var xAxis = g.append("g");

  var xTick = xAxis
    .selectAll("g")
    .data(x.ticks(12))
    .enter().append("g")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
      });
  
  xTick.append("line")
    .attr("x2", -5)
    .attr("stroke", "#000");

  xTick.append("text")
    .attr("transform", function(d) { 
    var angle = x(d);
    return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
    .text(function(d) { 
        console.log(formatHour(d));
      return formatHour(d);
    })
  	.style("font-size", 10)
  	.attr("opacity", 0.6)
  
  var title = g.append("g")
  		.attr("class", "title")
  		.append("text")
  		.attr("dy", "-0.2em")
  		.attr("text-anchor", "middle")
  		.text("heart beat")
  
  var subtitle = g.append("text")
  		.attr("dy", "1em")
      .attr("text-anchor", "middle")
  		.attr("opacity", 0.6)
  		.text("july 13");  
     
  var lineLength = linePlot.node().getTotalLength();

      linePlot
    .attr("stroke-dasharray", lineLength + " " + lineLength)
    .attr("stroke-dashoffset", +lineLength)
    .transition()
      .duration(30000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

  
});