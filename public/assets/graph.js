var line_chart = function(data, objective, title, units, average, time) {
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
	var dots = svg
		.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle') // Uses the enter().append() method
		.attr('class', 'dot'); // Assign a class for styling

	var label = svg.append('text').attr('class', 'label');

	dots
		.attr('cx', function(d, i) {
			return xScale(i);
		})
		.attr('cy', function(d) {
			return yScale(d);
		})
		.attr('r', 5)
		.on('mouseover', function(elem, index, data) {
			var coordinates = d3.mouse(this);
			var x = coordinates[0];
			var y = coordinates[1];
			var dateObj = new Date(time[index] * 1000);
			hours = dateObj.getHours();
			minutes = dateObj.getMinutes();
			seconds = dateObj.getSeconds();
			timeString =
				hours.toString().padStart(2, '0') +
				':' +
				minutes.toString().padStart(2, '0') +
				':' +
				seconds.toString().padStart(2, '0');
			label
				.attr('id', title + '-label-' + index)
				.attr('x', x - 20)
				.attr('y', y - 20)
				.attr('text-anchor', 'middle')
				.text(elem + ' ' + units + ' ' + timeString);
			$(this).toggleClass('focus');
		})
		.on('mouseout', function() {
			label.text('');
			$(this).removeClass('focus');
		});

	svg.append('text').attr('x', width / 2).attr('y', 0 + margin.top).attr('text-anchor', 'middle').text(title);

	let minimum = Math.min(...data);
	let maximum = Math.max(...data);
	let minReference = svg.append('g').attr('class', 'reference');

	minReference
		.append('path')
		.datum([ minimum, minimum ])
		.attr('class', 'minimum')
		.attr('d', d3.line().x((_, i) => i * width).y((d) => yScale(d)));

	minReference
		.append('text')
		.attr('x', width)
		.attr('y', yScale(minimum) - 10)
		.attr('text-anchor', 'end')
		.text(minimum + ' ' + units);

	let maxReference = svg.append('g').attr('class', 'reference');
	maxReference
		.append('path')
		.datum([ maximum, maximum ])
		.attr('class', 'maximum')
		.attr('d', d3.line().x((_, i) => i * width).y((d) => yScale(d)));
	maxReference
		.append('text')
		.attr('x', width)
		.attr('y', yScale(maximum) - 10)
		.attr('text-anchor', 'end')
		.text(maximum + ' ' + units);

	let avgReference = svg.append('g').attr('class', 'reference');
	avgReference
		.append('path')
		.datum([ average, average ])
		.attr('class', 'average')
		.attr('d', d3.line().x((_, i) => i * width).y((d) => yScale(d)));
	avgReference
		.append('text')
		.attr('x', width)
		.attr('y', yScale(average) - 10)
		.attr('text-anchor', 'end')
		.text(average);
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
decomposeTrip = (trip) => {
	let speed = [];
	let rpm = [];
	let engineLoad = [];
	let coolantTemp = [];
	let throttlePos = [];
	let time = [];
	trip.snaps.map((e) => {
		speed.push(e.speed);
		rpm.push(e.rpm);
		engineLoad.push(e.engineLoad);
		coolantTemp.push(e.coolantTemp);
		throttlePos.push(e.throttlePos);
		time.push(e.startTime);
	});
	return {
		...trip,
		speed: speed,
		rpm: rpm,
		engineLoad: engineLoad,
		coolantTemp: coolantTemp,
		throttlePos: throttlePos,
		time: time
	};
};

trip = decomposeTrip(trip);

line_chart(trip.speed, '#speed-graph', 'Speed', 'km/h', trip.avSpeed, trip.time);
line_chart(trip.rpm, '#rpm-graph', 'Revolutions Per Minute', 'rpm', trip.avRPM, trip.time);
line_chart(trip.engineLoad, '#engineLoad-graph', 'Engine Load', '%', trip.avEngineLoad, trip.time);
line_chart(trip.coolantTemp, '#coolantTemp-graph', 'Coolant Temp', 'ºC', trip.avCoolantTemp, trip.time);
line_chart(trip.throttlePos, '#throttlePos-graph', 'Throttle Position', '%', trip.avThrottlePos, trip.time);
$(window).resize(function() {
	d3.selectAll('svg').remove();
	line_chart(trip.speed, '#speed-graph', 'Speed', 'km/h', trip.avSpeed, trip.time);
	line_chart(trip.rpm, '#rpm-graph', 'Revolutions Per Minute', 'rpm', trip.avRPM, trip.time);
	line_chart(trip.engineLoad, '#engineLoad-graph', 'Engine Load', '%', trip.avEngineLoad, trip.time);
	line_chart(trip.coolantTemp, '#coolantTemp-graph', 'Coolant Temp', 'ºC', trip.avCoolantTemp, trip.time);
	line_chart(trip.throttlePos, '#throttlePos-graph', 'Throttle Position', '%', trip.avThrottlePos, trip.time);
});

function secondsToHHMMSS(sec) {
	const days = Math.floor(sec / 86400);
	const hours = Math.floor((sec - days * 86400) / 3600);
	const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
	const seconds = Math.floor(sec - days * 86400 - hours * 3600 - minutes * 60);
	let result = '';
	days > 0 ? (result += days.toString() + ' days ') : '';
	hours > 0 ? (result += hours.toString() + ' hours ') : '';
	minutes > 0 ? (result += minutes.toString() + "' ") : '';
	result += seconds.toString() + '" ';

	return result;
}

