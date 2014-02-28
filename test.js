// #1

// Given structure in attrStructure:
//  {
//    tag: "",
//    value: "",
//    attr: [
//      {"tag": "", value:""},{"tag":"", "value":""}
//    ]
//  }

// convert into structure that looks like: 
//  {
//    "tag": "value",
//    "attr": {
//      "tag": "value"
//    }
//  }
//  eg. 
//  {
//    "(0008,002A)": "20130318124132"
//  }

Q1 = (function () {

var attrStructure = {"tag":"(0008,0018)","value":"1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980","attr":[{"tag":"(0008,002A)","value":"20130318124132"},{"tag":"(0008,0020)","value":"20130318"},{"tag":"(0008,0030)","value":"123650"},{"tag":"(0008,0018)","value":"1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980"},{"tag":"(0008,0060)","value":"CR"},{"tag":"(0008,103E)","value":"SUNRISE VIEW"},{"tag":"(0018,0015)","value":"KNEE"},{"tag":"(0018,1164)","value":"0.1\\0.1"},{"tag":"(0018,5101)","value":"AP"},{"tag":"(0020,0013)","value":"2"},{"tag":"(0020,0020)","value":"L\\F"},{"tag":"(0028,0030)","value":"0.10000000149011\\0.10000000149011"},{"tag":"(0028,1052)","value":"0"},{"tag":"(0028,1053)","value":"1"},{"tag":"(0028,1054)","value":"LOG_E REL"},{"tag":"(0028,0101)","value":"12"},{"tag":"(0028,0010)","value":"2328"},{"tag":"(0028,0011)","value":"2928"},{"tag":"(0008,1030)","value":"Femur Knee Leg"},{"tag":"(0010,0010)","value":"BEAN^ELENA"},{"tag":"(0010,0020)","value":"690100"},{"tag":"(0010,0030)","value":"19400826"},{"tag":"(0010,0040)","value":"F"},{"tag":"(0010,4000)","value":"L KNEE"}]};

var test = {
	"(0008,0018)": "1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980",
	"attr": {
		"(0008,002A)": "20130318124132",
		"(0008,0020)": "20130318",
		"(0008,0030)": "123650",
		"(0008,0018)": "1.3.51.0.7.1193286233.9961.33088.48048.47436.15671.21980",
		"(0008,0060)": "CR",
		"(0008,103E)": "SUNRISE VIEW",
		"(0018,0015)": "KNEE",
		"(0018,1164)": "0.1\\0.1",
		"(0018,5101)": "AP",
		"(0020,0013)": "2",
		"(0020,0020)": "L\\F",
		"(0028,0030)": "0.10000000149011\\0.10000000149011",
		"(0028,1052)": "0",
		"(0028,1053)": "1", 
		"(0028,1054)": "LOG_E REL", 
		"(0028,0101)": "12", 
		"(0028,0010)": "2328",
		"(0028,0011)": "2928",
		"(0008,1030)": "Femur Knee Leg",
		"(0010,0010)": "BEAN^ELENA",
		"(0010,0020)": "690100",
		"(0010,0030)": "19400826",
		"(0010,0040)": "F",
		"(0010,4000)": "L KNEE"
	}
};

	/* restructuring functions */
	function norm(obj) { var rv = {}; rv[obj.tag] = obj.value; return rv; }
	function tagValListToObj(list) { var rv = {}; list.forEach(function (o) { rv[o.tag] = o.value; }); return rv; }
	function restructure(obj) {
		var rv = norm(obj);
		if(obj.attr && obj.attr.forEach) 
			rv.attr = tagValListToObj(obj.attr);
		return rv;
	}

	/* DOM visualization of Structure Functions */
	function isObj(o) { return (o instanceof Object) && !o.slice; }

	function $propdom(k,v) { 
		var $pFrame = $('<div>',{'class':'prop'}),
			$pName = $('<div>',{'class':'name'}).text(k),
			$pVal = $('<div>',{'class':'val'}).html(isObj(v) ? $obj2domviz(v) : v);
		$pFrame.append($pName,$pVal);
		return $pFrame;
	}

	function toggleOpenClosed(e) {
		e.stopPropagation();
		var $ths = $(this);
		if($ths.hasClass('open'))
			$ths.removeClass('open').addClass('closed');
		else
			$ths.removeClass('closed').addClass('open');
	}

	function $obj2domviz(obj,startState) {
		startState = startState ? 'open' : 'closed'
		var $frame = $('<div>',{'class':'objtree '+startState});
		for(var p in obj) 
			if(obj.hasOwnProperty(p)) $frame.append($propdom(p,obj[p]));
		$frame.click(toggleOpenClosed);
		return $frame;
	}

	function testResultDiv(result) { 
		return '<div class="testresult '+result+'"><span>' + result + '</span></div>';
	}

	// test that your structure is correct - use qUnit or any other test framework in an external file
	var transformedStructure = restructure(attrStructure),
		$q1 = $('#q1'),
		testResult = (JSON.stringify(test) == JSON.stringify(transformedStructure)) ? 'pass' : 'fail';
	$q1.append(testResultDiv(testResult));


	// loop through the above data structure and create a tree-like output on the screen. 
	$q1.append($obj2domviz(transformedStructure,'open'));


	return testResult;

})();


// You can use jQuery to attach event handlers for hiding/showing nodes in the tree.


// #2

// given the text in the variable "corpus", write the following:

// 1. calculate word frequency in the input text collection. Separators include [ ,-.?!]
// 2. show word frequency in descending order and ascending order, based on a radio button in index.html
// 3. show words in alphabetical order and reverse alphabetical order, with word frequency, based on a radio button in index.html
// 4. ensure that browser does not block when calculating these frequencies

Q2 = (function () {
	var corpus = "The ship drew on and had safely passed the strait, which some volcanic shock has made between the Calasareigne and Jaros islands; had doubled Pomegue, and approached the harbor under topsails, jib, and spanker, but so slowly and sedately that the idlers, with that instinct which is the forerunner of evil, asked one another what misfortune could have happened on board. However, those experienced in navigation saw plainly that if any accident had occurred, it was not to the vessel herself, for she bore down with all the evidence of being skilfully handled, the anchor a-cockbill, the jib-boom guys already eased off, and standing by the side of the pilot, who was steering the Pharaon towards the narrow entrance of the inner port, was a young man, who, with activity and vigilant eye, watched every motion of the ship, and repeated each direction of the pilot.";

	/* basic word parsing/collecting */
	function words(str) { return str.split(/\W/); }
	function word_count(str) { 
		var wc = {}; 
		words(str.toLowerCase()).forEach(function (word) { if(word) wc[word] = wc[word]+1 || 1 });
		return wc;
	}

	/* sorts */
	function prop_sort_fn(p) { return function (a,b) { 
		return a[p] > b[p] ? 1 : (a[p] < b[p] ? -1 : 0); 
	} }
	function prop_rsort_fn(p) { return function (a,b) { 
		return a[p] < b[p] ? 1 : (a[p] > b[p] ? -1 : 0); 
	} }
	var alphaSort = prop_sort_fn('word'),
		alphaRSort = prop_rsort_fn('word'),
		countSort = prop_sort_fn('count'),
		countRSort = prop_rsort_fn('count');

	/* wrapper obj */
	function WordCounts(str) { this.init(str); }
	WordCounts.prototype = {
		init: function (str) {
			this.wc = word_count(str);
			this.wcs = [];
			var p, o;
			for(p in this.wc) 
				this.wcs.push({ 'word': p, 'count': this.wc[p] });
		},
		word: function (word) { return this.wc; },
		alpha: function (dir) { 
			this.wcs.sort(dir < 0 ? alphaRSort : alphaSort); 
			return this.wcs; 
		},
		count: function (dir) {
			this.wcs.sort(dir < 0 ? countRSort : countSort); 
			return this.wcs; 
		}
	}

	/* DOM display */
	var $q2 = $('#q2'),
		$table = $q2.find('table'),
		$tbody = $table.find('tbody'),
		wordCounts;

	function word_count_to_tr(o) { return '<tr><td>'+o.word+'</td><td>'+o.count+'</td></tr>'; }
	function fill_tbody(sort,dir) {
		$tbody.html(wordCounts[sort](dir).reduce(function (prev,curr) {
			return prev + word_count_to_tr(curr);
		},''));
	}

	setTimeout(function () {
		wordCounts = new WordCounts(corpus);
		fill_tbody('alpha',1);
		$q2.find('input[type=radio]').click(function () {
			var tmp = this.value.split(',');
			fill_tbody(tmp[0],tmp[1]);
		});
	},10);

})();


// #3
//
// the key here is to allow for async, non-blocking processing while executing the callback only once, only once ALL async calls have completed.
// 
// Execute all of the following using JSONP with Jquery (or whatever you wish)

// 1. do a search on google for "twitter patients" (https://www.google.com/search?q=twitter+patients&safe=off)


// 2. for the first 10 of these, retrieve the twitter profile bio from their public profile page (twitter.com/{{handle}})
// 	a. the element to get is ".bio.profile-field"
// 3. as you get each of these, add them to the page, into a table with the following structure:
// 	<th>twitter handle</th>
// 	<th>twitter link</th>
// 	<th>twitter bio</th>
// 4. after all of these are retrieved and displayed, call a function into which you pass in the following data structure (JSON):
// 	a. make sure that the call contains data for all 10 twitter calls.
// 	[{handle: 'twitter handle', link: 'twitter link', bio: 'twitter bio'}, ...]
// 5. ensure that the last call is only called once, and only once all info has been both retrieved and output to the page.

var twitterData = [];

function withGoogleSearch(data) {
	var twitterGets = [];
	data.responseData.results.forEach(function (result) { 
		twitterGets.push($.get(result.url,onTwitterGet,'html'));
		console.log('getting ',result.url);
	});
	$.when.apply(null,twitterGets).then(onTwitterGetsAllDone);
}

function onTwitterGet(data) {
	console.log('twitterget:',data,$(data).find('.bio.profile-field'));
	//output to page
	//twitterData.push();	
}

function onTwitterGetsAllDone(data) {
	console.log('twitter gets all done');
	// munge
	// receivesTwitterData()
}

function receivesTwitterData(data) {
}

$.ajax({
	type:"GET",
	url: 'https://ajax.googleapis.com/ajax/services/search/web',
	data: {v: '1.0', q: "twitter+patients", callback: 'withGoogleSearch'},
	dataType: 'jsonp',
	jsonp: 'withGoogleSearch'
});
