//Width and height
var margin = {left: 20,right:20,top:20,bottom:20}
var w = 600-margin.left-margin.right;
var h = 250-margin.top-margin.bottom;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
				11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset)])
				.range([0, h]);

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr('width',w+margin.left+margin.right)
			.attr('height',h+margin.top+margin.bottom)
		.append('g')
         .attr('class','bars')
			.attr('transform', 
				'translate('+margin.left+','+margin.top+')'
				);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale(i);
   })
   .attr("y", function(d) {
   		return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
   		return yScale(d);
   })
   .attr("fill", function(d) {
		return "rgb(0, 0, " + (d * 10) + ")";
   })
   .on('mouseover',function(){
      d3.select(this).attr('fill','orange');
   })
   .on('mouseout',function(d){
      d3.select(this)
         .transition()
         .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 10) + ")";
         })
   });

//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
   		return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
   		return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
   		return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white")
   .style('pointer-events','none');




d3.select("p")
    .on("click", function() {
         //Do something  on click
         d1 = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
            5, 10, 13, 19, 21, 25, 22, 18, 15, 13,1,50,
            1,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6 ];
         diff = Math.abs(d1.length-dataset.length);
         dataset = d1;

         xScale.domain(d3.range(dataset.length));
         yScale.domain([0, d3.max(dataset)]);

         bars = svg.selectAll('rect').data(dataset);

         bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                  return h - yScale(d);
            })
            .attr("width", xScale.rangeBand())
            .attr("height", function(d) {
                  return yScale(d);
            })
            .attr("fill", function(d) {
               return "rgb(0, 0, " + (d * 10) + ")";
            });
         bars.transition()
            .duration(1000)
            .attr("x", function(d,i){
               return xScale(i);
            })
            .attr("y", function(d) {
                  return h - yScale(d);
            })
            .attr("width", xScale.rangeBand())
            .attr("height", function(d) {
                  return yScale(d);
            })


         txts = svg.selectAll('text').data(dataset);
            
 txts.enter()
            .append("text")
            .text(function(d) {
               return d;
            })
            .attr("x", w)
            .attr("y", function(d) {
               return h - yScale(d) + 14;
            })
            .attr("text-anchor", "middle")
            .attr("font-size", Math.round(xScale.rangeBand()*0.6)+"px")
            .attr("font-family", "sans-serif")
            .attr("fill", "white");

         txts.transition()
            .duration(1000)
            .attr("x", function(d,i){
               return xScale(i)+xScale.rangeBand()/2;
            })
            .attr("y", function(d) {
               return h - yScale(d) + 14;
            })
            .attr("font-size", Math.round(xScale.rangeBand()*0.6)+"px")
   });