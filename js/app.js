"use strict";
/**
 * Wordpress REST API & Google Charts
 * 2015, by Cesar Anton Dorantes @reicek
 * for https://platzi.com/blog
 * demo https://googledrive.com/host/0B_RClkFMLkcpYWFHOGYxd09yUW8/
 * This work is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/4.0/.
 **/

// *************************
//		Global Variables
// *************************
var siteName		= "www.example.com"; // URL of the site to analyse

var dummyData		= {
    "date": "2015-01-06",
    "stats": {
        "visitors_today": 4756,
        "visitors_yesterday": 9143,
        "views_today": 7360,
        "views_yesterday": 15296,
        "views_best_day": "2011-10-18",
        "views_best_day_total": 109071,
        "views": 43189491,
        "comments": 119467,
        "posts": 1198,
        "followers_blog": 17838541,
        "followers_comments": 7034,
        "comments_per_month": 572,
        "comments_most_active_recent_day": "2015-01-02 23:14:21",
        "comments_most_active_time": "N/A",
        "comments_spam": 15063,
        "categories": 70,
        "tags": 1224,
        "shares": 102790,
        "shares_facebook": 25045,
        "shares_twitter": 20845,
        "shares_press-this": 11402,
        "shares_linkedin": 8266,
        "shares_pinterest": 6661,
        "shares_stumbleupon": 5848,
        "shares_reddit": 5493,
        "shares_tumblr": 5184,
        "shares_pocket": 4628,
        "shares_email": 2683,
        "shares_google-plus-1": 1280,
        "shares_print": 0
    },
    "visits": {
        "unit": "day",
        "fields": [
            "period",
            "views",
            "visitors"
        ],
        "data": [
            [
                "2014-12-08",
                11772,
                8513
            ],
            [
                "2014-12-09",
                16590,
                10737
            ],
            [
                "2014-12-10",
                17346,
                10131
            ],
            [
                "2014-12-11",
                18174,
                11277
            ],
            [
                "2014-12-12",
                16269,
                9144
            ],
            [
                "2014-12-13",
                11669,
                6666
            ],
            [
                "2014-12-14",
                10651,
                5776
            ],
            [
                "2014-12-15",
                11188,
                6564
            ],
            [
                "2014-12-16",
                14469,
                8835
            ],
            [
                "2014-12-17",
                13615,
                8101
            ],
            [
                "2014-12-18",
                13690,
                8091
            ],
            [
                "2014-12-19",
                12627,
                7560
            ],
            [
                "2014-12-20",
                9839,
                5571
            ],
            [
                "2014-12-21",
                8155,
                5245
            ],
            [
                "2014-12-22",
                8828,
                6002
            ],
            [
                "2014-12-23",
                8330,
                5735
            ],
            [
                "2014-12-24",
                7088,
                4740
            ],
            [
                "2014-12-25",
                5648,
                3867
            ],
            [
                "2014-12-26",
                7603,
                5059
            ],
            [
                "2014-12-27",
                7592,
                5121
            ],
            [
                "2014-12-28",
                7898,
                5398
            ],
            [
                "2014-12-29",
                12222,
                7885
            ],
            [
                "2014-12-30",
                12064,
                7809
            ],
            [
                "2014-12-31",
                11040,
                6525
            ],
            [
                "2015-01-01",
                10090,
                6021
            ],
            [
                "2015-01-02",
                15726,
                9353
            ],
            [
                "2015-01-03",
                14218,
                8425
            ],
            [
                "2015-01-04",
                13569,
                8333
            ],
            [
                "2015-01-05",
                15296,
                9143
            ],
            [
                "2015-01-06",
                7362,
                4756
            ]
        ]
    }
};
// *************************

/**
* @param {json} Google Visualization Data Table 0|| 1|| 2||
**/
var drawColumnChart	= function (dataTable) {
	var options	= {
		title		: "Shares por plataforma",
		width		: $(window).width() * .3,
		height		: $(window).height() * .75,
		chartArea	: {left:50,bottom:0,width:'60%',height:'90%'},
        isStacked	: true,
        bar			: {groupWidth: '100%'},
		hAxis		: {title: null}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));

	chart.draw(dataTable, options);
};

/**
* @param {json} Google Visualization Data Table 0|| 1|| 2||
**/
var drawLineChart	= function (dataTable) {
	var options = {
		title		: "Vistas y Visitantes",
		width		: $(window).width() * .6,
		height		: $(window).height() * .75,
		chartArea	: {left:60,bottom:0,width:'75%',height:'90%'}
	};

	var chart = new google.visualization.LineChart(document.getElementById('lineChart'));

	chart.draw(dataTable, options);
};

/**
* Parses JSON into a Google Visualization Data Table
* @param {string}
* @return {json} Google Visualization Data Table 0|| 1|| 2||
**/
var parseData		= function(data) {
	// Parse JSON for Table Chart
	var columnChart_rawData = [];
	columnChart_rawData.push(["Facebook","twitter","press-this","Linkedin","Pinterest","Stumbleupon","reddit","tumblr","pocket","email","g+"]);
	columnChart_rawData.push([dummyData.stats["shares_facebook"],dummyData.stats["shares_twitter"],dummyData.stats["shares_press-this"],dummyData.stats["shares_linkedin"],dummyData.stats["shares_pinterest"],dummyData.stats["shares_stumbleupon"],dummyData.stats["shares_reddit"],dummyData.stats["shares_tumblr"],dummyData.stats["shares_pocket"],dummyData.stats["shares_email"],dummyData.stats["shares_google-plus-1"]]);
	
	// Parse JSON for Line Chart
	var lineChart_rawData = [];
	lineChart_rawData.push(["Fecha","Vistas","Visitantes"]);
	for (var i=0; i<dummyData.visits.data.length; i++) {
		lineChart_rawData.push([new Date(dummyData.visits.data[i][0]),dummyData.visits.data[i][1],dummyData.visits.data[i][2]]);
	};
	
	// Create Google Visualization Data Tables
	var columnChart_dataTable = google.visualization.arrayToDataTable(columnChart_rawData);
	var lineChart_dataTable = google.visualization.arrayToDataTable(lineChart_rawData);
	
	// Draw Google Charts
	drawColumnChart(columnChart_dataTable);
	drawLineChart(lineChart_dataTable);
	
	// Hide loading and show reports
	$("#loading").addClass('hidden');
	$("#columnChartContainer").removeClass('hidden');
	$("#lineChartContainer").removeClass('hidden');
};

/**
* Gets payments from the servlet and passes it to Google Charts
**/
var getData			= function() {
	var endpoint = "https://public-api.wordpress.com/rest/v1.1/sites/"+siteName+"/stats";
	$.get(endpoint)
	.done(function(data){
		parseData(data);
	})
	.error(function(error){
		console.log("_________________________");
		console.log("Error:");
		console.log(error);
		console.log("_________________________");
	})
};

// 	*************************
//		  Initialize App
//	*************************
(function(){
	google.load("visualization", "1", {packages:["corechart"]});
//	google.setOnLoadCallback(getData);
	google.setOnLoadCallback(parseData);
})()