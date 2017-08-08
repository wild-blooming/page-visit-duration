// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
	google.charts.setOnLoadCallback(drawChart);
});
google.charts.load('current', {packages: ['corechart']});

function drawChart() {
	// Define the chart to be drawn.
	var data = new google.visualization.DataTable();
	data.addColumn('string','Hostname');
	data.addColumn('number','LapsedTime');

	for(var i = 0;i <  bg.arr1.length;i++) {
		data.addRow([bg.arr1[i].hostname,bg.arr1[i].lapsed]);
	}
			
	 var options = {'width':400,
		 'height':300};
	 // Instantiate and draw the chart.
	 var chart = new google.visualization.PieChart(document.getElementById('status'));
	 chart.draw(data, options);
}
