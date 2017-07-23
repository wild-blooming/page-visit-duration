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
				//stayed time = current time - previous time
				//remove duplicated hostname,as data to draw pie chart
				//format milliseconds to HH:MM:SS
				arr1 = arr.map(function(e,i,a) {
					if(a.length !== 1 && i !== a.length - 1) { //the last element or only one element is left undefined,
						return ({"hostname":e.hostname,"lapsed":a[i+1]["timestamp"] - a[i]["timestamp"]}); 
					}
				});

				arr1.pop();//remove last undefined element.

				console.log(arr1);
				var arr2 = arr1.map(function(e) {
					return e.hostname;
				});
				arr2.forEach(function(e,i) {

					console.log(i,e);
				});
				//arr part1
				let set = new Set(arr2);
				arrHost = [...set];

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
					console.log(arrNew);
					arrNew.length = 0;
				}
	});
});
//CONSIDING USING PLAIN LOOP FOR REMOVING ELEMENT REQ AND BREAK LOOP;no way to break forEach.using plain loop instead if need
//				arr2.forEach(function(e,i,a) {
//					let idx = a.indexOf(e,i+1);
//					//find duplicated ele and push idx into arrNew
//					while(idx >= 0) {	//a.indexOf(e) > 0 infinite loop caused crash
//						if(flag !== i) {//a.indexOf(e) is always the lowest index of same ele,changed to i
//							flag = i;
//							this.push(i);
//							this.push(idx);
//						}else {
//							this.push(idx);
//						}
//						idx = a.indexOf(e,idx+1);
//					}
//					console.log(this);
//					console.log(...(new Set(this)));//if duplicated ele > 3,arrNew would be like [3,4,5],[3,4,5,4,5]
//					console.log("bef filter:" + a);
////would non duplicated ele be removed cause arrNew's repeat?????
//					//filter out duplicated ele from arr2 based on index array:arrNew
//					a = a.filter(function(e,i) {
//						return this.indexOf(i) < 0;
//					},arrNew);
//					console.log("aft filter:" + a);
//					//clear arrNew if it's not empty
//					this.length = 0;//arrNew would be like [3,4,5],[4,5]
//				},arrNew);
						//	var folded = arr1.map(function(e) {
						//			return e.lapsed;
						//	}).filter(function(e,i,a) {
						//		console.log(a);
						//		if(arrNew.indexOf(e) > -1) return true;
						//	}).reduce(function(x,y) {
						//		return x+y;
						//	});
						//	//arr part2
						//	arrFoldedLapsed.push(folded);
					//pull out while block from forEach loop
//				a.filter.forEach

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
//chrome.runtime.onInstalled.addListener(function() {
//			getActiveTabUrl();
//	}
//);
