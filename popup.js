var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
	google.charts.setOnLoadCallback(drawChart);
});
google.charts.load('current', {packages: ['corechart']});

function drawChart() {
	// Define the chart to be drawn.
	var arr1 = bg.arr.map(function(e,i,a) {
		if(a.length !== 1 && i !== a.length - 1) { //the last element or only one element is left undefined,
			return ({"hostname":e.hostname,"lapsed":a[i+1]["timestamp"] - a[i]["timestamp"]}); 
		} else {
			return ({"hostname":e.hostname,"lapsed":bg.getCurrentTime() - a[i]["timestamp"]});
		}
	});

	console.log(bg.arr);
	console.log(arr1);
	var dt = new google.visualization.DataTable();
	dt.addColumn('string','Hostname');
	dt.addColumn('number','LapsedTime');

	for(var i = 0;i <  arr1.length;i++) {
		dt.addRow([arr1[i].hostname,arr1[i].lapsed]);
	}
			
	var sum = google.visualization.data.group(
			dt,
			[0],
			[{'column':1,'aggregation':google.visualization.data.sum,'type':'number'}]
			);

	 var options = {'width':400,
		 'height':300};
	 // Instantiate and draw the chart.
	 var chart = new google.visualization.PieChart(document.getElementById('status'));
	 chart.draw(sum, options);
}
