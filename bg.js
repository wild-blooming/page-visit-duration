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
		arr.push(Object.create({"hostname":hostname,"timestamp":getCurrentTime()}));
		callback();
	});
}


chrome.tabs.onActivated.addListener(function() {
			getActiveTabUrl(function() { 
	//			arr1 = arr.map(function(e,i,a) {
	//				if(a.length !== 1 && i !== a.length - 1) { //the last element or only one element is left undefined,
	//					return ({"hostname":e.hostname,"lapsed":a[i+1]["timestamp"] - a[i]["timestamp"]}); 
	//				}
	//			});
//Todo:e//xclude "extensions","newtab"
	//			arr1.pop();//remove last undefined element.

				console.log(arr);
				var arr2 = arr1.map(function(e) {
					return e.hostname;
				});
				arr2.forEach(function(e,i) {

					console.log(i,e);
				});
				//find duplicated element,mark the index,delete the element,till no duplicated exist
				var arrNew = [];

				let flag;

				for(var i = 0; i < arr2.length; i++) {
					if(!arr2[i]) continue; 
					var idx = arr2.indexOf(arr2[i],i+1);
					while(idx >= 0) {
						if(flag !== i) {
							flag = i;
							arrNew.push(i);
							arrNew.push(idx);
							delete arr2[idx];
						} else {
							arrNew.push(idx);
							delete arr2[idx];
						}
						idx = arr2.indexOf(arr2[i],idx+1);
					}
					console.log("array New:" + arrNew);
					
					if(arrNew.length > 0) {
						var sumUp = arr1.map(function(e) {
							return e.lapsed;
						}).filter(function(e,i) {
							if(arrNew.indexOf(i) > -1) return true;
						}).reduce(function(x,y) { //sum up
							return x+y;
						});
					}
					console.log("sum up:" + sumUp);

					arrNew.length = 0;
				}
	});
});
//Todo:popup tabs addListener
//has a popup,will not fire
chrome.browserAction.onClicked.addListener(function() {
//timestamp the last element
				
		arr.push(Object.create({"hostname":"iconClicked","timestamp":getCurrentTime()}));
});

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
//chrome.runtime.onInstalled.addListener(function() {
//			getActiveTabUrl();
//	}
//);
