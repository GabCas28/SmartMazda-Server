var line_chart = function(data, objective) {
	var n = data.length;
	var maxValue = Math.max(...data);
	// set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 30, left: 30 },
		width = $(objective).width() - margin.left - margin.right,
		height = $(objective).height() - margin.top - margin.bottom;

	// X scale will use the index of our data
	var xScale = d3
		.scaleLinear()
		.domain([ 0, n - 1 ]) // input
		.range([ 0, width ]); // output

	// Y scale will use the randomly generate number
	var yScale = d3
		.scaleLinear()
		.domain([ 0, maxValue + maxValue / 4 ]) // input
		.range([ height, 0 ]); // output

	// append the svg object to the body of the page
	var svg = d3
		.select(objective)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// Add the line
	svg.append('path').datum(data).attr(
		'd',
		d3
			.line()
			.x(function(d, i) {
				return xScale(i);
			})
			.y(function(d) {
				return yScale(d);
			})
	);

	// Appends a circle for each datapoint
	svg
		.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle') // Uses the enter().append() method
		.attr('class', 'dot') // Assign a class for styling
		.attr('cx', function(d, i) {
			return xScale(i);
		})
		.attr('cy', function(d) {
			return yScale(d);
		})
		.attr('r', 5)
		.on('mouseover', function(a, b, c) {
			console.log(this);
			$(this).toggleClass('focus');
		})
		.on('mouseout', function() {
			console.log(this);
            $(this).removeClass('focus');
        });

    svg.append("text")
        .attr("x", width/2)
        .attr("y", 0+(margin.top/8))
        .attr("text-anchor","middle")
        .text(objective)
        // var focus = svg.append("g")
        //       .attr("class", "focus")
        //       .style("display", "none");
        
        //   focus.append("circle")
        //       .attr("r", 4.5);
        
        //   focus.append("text")
        //       .attr("x", 9)
        //       .attr("dy", ".35em");
        
        //   svg.append("rect")
        //       .attr("class", "overlay")
        //       .attr("width", width)
        //       .attr("height", height)
        //       .on("mouseover", function() { focus.style("display", null); })
        //       .on("mouseout", function() { focus.style("display", "none"); })
        //     //   .on("mousemove", mousemove);
          
        //   function mousemove() {
        //     var x0 = x.invert(d3.mouse(this)[0]),
        //         i = bisectDate(data, x0, 1),
        //         d0 = data[i - 1],
        //         d1 = data[i],
        //         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        //     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
        //     focus.select("text").text(d);
        //   }
};
console.log(trip.speed);
line_chart(trip.speed, '#speed-graph');
line_chart(trip.rpm, '#rpm-graph');
line_chart(trip.engineLoad, '#engine-load-graph');
$( window ).resize(function() {
    d3.selectAll("svg").remove()
    line_chart(trip.speed, '#speed-graph');
    line_chart(trip.rpm, '#rpm-graph');
    line_chart(trip.engineLoad, '#engine-load-graph');
});