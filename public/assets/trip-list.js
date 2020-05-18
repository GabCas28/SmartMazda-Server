$(document).ready(function() {
	$('.table-row div').on('click', function() {
		var item = $(this);
		var trip_id = item.parent().attr('trip-id');
		window.location.assign('/trip/?_id=' + trip_id);
		return false;
	});

	$('.table-row .delete').on('click', function() {
		var item = $(this);
		console.log(item.parent());
		$.ajax({
			type: 'DELETE',
			url: '/trip/' + item,
			success: function(data) {
				//do something with the data via front-end framework
				item.parent().remove();
				window.location.assign('/trips');
			}
		});
	});
});

function secondsToHHMMSS(sec) {
	const days = Math.floor(sec / 86400);
	const hours = Math.floor((sec - days * 86400) / 3600);
	const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
	const seconds = Math.floor(sec - days * 86400 - hours * 3600 - minutes * 60);
	let result = '';
	if (days > 0) result += days.toString() + ' days ';
	if (hours > 0) result += hours.toString() + ' hours ';
	if (minutes > 0) result += minutes.toString() + "' ";
	result += seconds.toString() + '" ';

	return result;
}
function tableFilter() {
	// Declare variables
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('search');
	filter = input.value.toUpperCase();
	table = document.getElementById('trip-table');
	tr = table.getElementsByClassName('table-row');
	console.log('filter');
	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('div')[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

function sortTable(n) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById('trips');
	switching = true;
	// Set the sorting direction to ascending:
	dir = 'asc';
	/* Make a loop that will continue until
  no switching has been done: */
	while (switching) {
		// Start by saying: no switching is done:
		switching = false;
		rows = table.children;
		/* Loop through all table rows (except the
    first, which contains table headers): */
		for (i = 1; i < rows.length - 1; i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
      one from current row and one from the next: */
			x = rows[i].getElementsByTagName('div')[n];
			y = rows[i + 1].getElementsByTagName('div')[n];

			/* Check if the two rows should switch place,
        based on the direction, asc or desc: */
			if (dir == 'asc') {
				if (Number(x.attributes.value.value) > Number(y.attributes.value.value)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == 'desc') {
				if (Number(x.attributes.value.value) < Number(y.attributes.value.value)) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/* If a switch has been marked, make the switch
      and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == 'asc') {
				dir = 'desc';
				switching = true;
			}
		}
	}
}
function secondsToHHMMSS(sec) {
	const days = Math.floor(sec / 86400);
	const hours = Math.floor((sec - days * 86400) / 3600);
	const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
	const seconds = Math.floor(sec - days * 86400 - hours * 3600 - minutes * 60);
	let result = '';
	if (days > 0) result += days.toString() + ' days ';
	if (hours > 0) result += hours.toString() + ' hours ';
	if (minutes > 0) result += minutes.toString() + "' ";
	result += seconds.toString() + '" ';

	return result;
}