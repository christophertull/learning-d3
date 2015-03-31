

// Your beautiful D3 code will go here
// var dataset;
        
// d3.csv('sample_311.csv', function(error,data) {

// if (error) {
//     d3.select('body').append('p').text('Error: '+error.statusText);
//     console.log(error);
// } 
// else {
//     console.log(data);
//     dataset = data;

//     d3.select('body').selectAll('div')
//         .data(dataset)
//         .enter()
//         .append('div')
//         .attr('class','bar');
// }
// })

// var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
//                 14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
//                 24, 18, 25, 9, 3 ];


var margin = {top: 20, right: 20, bottom: 20, left: 40};
var w = 500 - margin.left - margin.right;
var h = 400 - margin.top - margin.bottom;

var dataset = []
for (var i = 0; i < 25; i++) {
    dataset.push([Math.random(), Math.random()]);
}
    
console.log(dataset);

x = d3.scale.linear()
		.domain([0,
			d3.max(dataset, function(d){
				return d[0];
			})
		])
		.range([0,w])

y = d3.scale.linear()
		.domain([0,
			d3.max(dataset, function(d){
				return d[1];
			})
		])
		.range([h, 0])

r = d3.scale.linear()
		.domain([
			d3.min(dataset, function(d){
				return d[1];
			}),
			d3.max(dataset, function(d){
				return d[1];
			})
		])
		.range([4, 12])

format = d3.format('.1%');

xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom')
			.tickFormat(format);

yAxis = d3.svg.axis()
			.scale(y)
			.orient('left')
			.tickFormat(format);



var svg = d3.select('body')
		.append('svg')
		.attr('width',w+margin.left+margin.right)
		.attr('height',h+margin.top+margin.bottom)
	.append('g')
		.attr('transform', 'translate('+margin.left+','+margin.top+')');

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr({
    	cx: function(d){ return x(d[0]); },
   		cy: function(d) { return y(d[1]); },
   		r: function(d) { return r(d[1]) },
    	fill: function(d){ 
    		console.log(Math.round(255*d[1]));
    		return 'rgb(0,0,'+Math.round(255*d[1])+')'; }
    });

svg.append('g')
	.attr('class','axis')
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis);

svg.append('g')
	.attr('class','axis')
	.call(yAxis);

// svg.selectAll('text')
// 	.data(dataset)
// 	.enter()
// 	.append('text')
// 	.text( function(d){ return d } )
// 	.attr({
//     	x: function(d,i){ 
//     		return i*(w/dataset.length) + (w/dataset.length -barPadding)/2; 
//     	},
//    		y: function(d) { return h-(d*5) +13; },
//    		'font-family': 'sans-serif',
//    		'font-size': '11px',
//    		'text-anchor': 'middle',
//    		fill: 'white'
//     });


console.log('hello')