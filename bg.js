//create object with properties "page" and "time on page"
//push the object into map when page changing event is triggered(time stay on the page)
//for element in the map,draw chart  

//wrap in set get methods later
var currentPage = {
	"Hostname":undefined,
	"Timestayed":undefined
};
//push {hostname,duration} into map
var map = new Map();

var getCurrentTime = (function() {
	var startTimer;
	return function() {return startTimer = new Date();}
})();

function getActiveTabUrl() {
	chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
		var tab = tabs[0];
		var url = new URL(tab.url);
		var hostname = url.hostname;
		currentPage.Hostname = hostname;
		currentPage.Timestayed = getCurrentTime();
		if(currentPage.Hostname !== "newtab") {
			console.log(currentPage.Hostname);
			console.log(currentPage.Timestayed);

		}
	});
}

//chrome.runtime.onInstalled.addListener(function() {
//			getActiveTabUrl();
//	}
//);

chrome.tabs.onActivated.addListener(function() {
			getActiveTabUrl(function() { 
				let duration = getCurrentTime() - currentPage.Timestayed;
				console.log(duration);
			});
		//	var elapsed = (new Date()) - startTime;
		//	console.log(elapsed);
			
	}
);

//duplicate on event fire

//chrome.tabs.onCreated.addListener(
//		function() {
//			getActiveTabUrl();
//		}
//);

//chrome.tabs.onUpdated.addListener(function(tabId,changeInfo) {
//		if(changeInfo.status === "complete") {
//			getActiveTabUrl();
//		}
//	}
//);
