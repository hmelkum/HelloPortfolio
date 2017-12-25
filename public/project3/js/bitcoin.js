$.getJSON("data/bitcoin.11-17.json", function(allJSON){
	console.log(allJSON)

	xDateArray = ["x"], lowArray = ["low"], highArray = ["high"] , volArray = ["Volume (Currency)"];
	
	// TODO
	// populate xDateArray, lowArray, highArray

	for(var i=0; i<allJSON.dataset.data.length;i+=7){
		if(allJSON.dataset.data[i][0]>="2015-12-31"){
			xDateArray.push(allJSON.dataset.data[i][0]);
			lowArray.push(allJSON.dataset.data[i][3]);
			highArray.push(allJSON.dataset.data[i][2]);
			volArray.push(allJSON.dataset.data[i][6]);
		}
		else{
			break;
		}
	}

	var chart = c3.generate({
		bindto: "#bitcoin-chart",
		data: {
			x: 'x',
			xFormat: '%Y-%m-%d',
			columns: [
				xDateArray,
				highArray,
				lowArray,
				volArray
			]
		},
		axis: {
			x: {
				type: 'timeseries',
				tick: {
					format: '%Y-%m-%d'
				}
			}
		}
	});
});