//create object with properties "page" and "time on page"
//push the object into map when page changing event is triggered(time stay on the page)
//for element in the map,draw chart  

//wrap in set get methods later
//var currentPage = {
//	"Hostname":undefined,
//	"Timestayed":undefined
//};
//push obj currentPage into arr,[{name1,time1},{name2,time2}…],should be in order
//arr like obj???,can't have duplicated name
//map???duplicated key?ordered list,reverse key value to [time,name]
//map.set("name","time"),
var arr = [];
var arr1 = [];
var getCurrentTime = (function() {
	var startTimer;
	//milliseconds representation since the epoch
	return function() {return startTimer =  Date.now();}
})();

function getActiveTabUrl(callback) {
	chrome.tabs.query({currentWindow: true,active: true}, function(tabs) {
		var tab = tabs[0];
		var url = new URL(tab.url);
		var hostname = url.hostname;
//		currentPage.Hostname = hostname;
//		currentPage.Timestayed = getCurrentTime();
		//currentPage obj is changed each time event fire
//		if(currentPage.Hostname !== "newtab") {
//			console.log("page visited:" + currentPage.Hostname);
//			console.log("timestamp:" + currentPage.Timestayed);
//
//		}
		//async
		arr.push(Object.create({"hostname":hostname,"timestamp":getCurrentTime()}));
		callback();
	});
}

//chrome.runtime.onInstalled.addListener(function() {
//			getActiveTabUrl();
//	}
//);

chrome.tabs.onActivated.addListener(function() {
			getActiveTabUrl(function() { 
				//stayed time = current time - previous time
				//remove duplicated hostname,as data to draw pie chart
				//format milliseconds to HH:MM:SS
				arr1 = arr.map(function(e,i,a) {
					if(a.length !== 1 && i !== a.length - 1) { //the last element or only one element is left undefined,
						return ({"hostname":e.hostname,"lapsed":a[i+1]["timestamp"] - a[i]["timestamp"]}); 
					}
				});

//				arr.forEach(function(e,i,a) {
				//	while(a.length !== 0) {
				//		arr1.pop();
				//	}
						//pop all in arr1 first??? or arr.map(),return a new arr
						//arr1.clear();
//					arr1.push(Object.create({"hostname":e.hostname,"lapsed":a[i+1]["timestamp"] - a[i]["timestamp"]}));
//					console.log(a[i]["timestamp"]+ "\n",a[i+1]["timestamp"]);
//					a[i]["timestamp"] = a[i+1]["timestamp"] - a[i]["timestamp"];
//					}
			//		console.log(i,e["timestamp"]);
//				});

				arr1.forEach(function(e,i) {

					console.log(i,e);
				});
				//should execute after getActiveTabUrl is done
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
