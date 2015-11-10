
// data
var dataA = [
    { x: 0, y: 100, },
    { x: 100, y: 150, },
    { x: 200, y: 350, },
    { x: 300, y: 200, },
];

var dataB = [
    { x: 0, y: 200, },
    { x: 100, y: 100, },
    { x: 200, y: 250, },
    { x: 300, y: 150, },
];

var height = 400,
    width = 300;


// conatainers
var area = d3.svg.area()
    .x(function(d) { return d.x; })
    .y0(height)
    .y1(function(d) { return d.y; });

var svg = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6');


// Graph shapes
    var graphA = svg.append("path")
    .datum(dataA)
    .attr("class", "area")
    .attr("d", area)
    .style({fill: '#bbbb00', opacity: 0.8});

    var graphB = svg.append("path")
    .datum(dataB)
    .attr("class", "area")
    .attr("d", area)
    .style({fill: '#666666', opacity: 0.8});


// Clipping attempts
    var graphBClip = svg.append("clipPath")
        .attr('id','graphBClip')
        
    graphBClip.append(graphB);

    graphA.attr("clip-path","url(#graphBClip)");