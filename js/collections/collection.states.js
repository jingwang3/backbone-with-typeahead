myapp.collection.States = Backbone.Collection.extend({
	model: myapp.model.States,
    url: 'data/states.json',
	search : function(letters){
		if(letters == "") return this;
		
		var pattern = new RegExp(letters,"i");
		//search for all results matching either abbreviation or name
		var results =  _(this.filter(function(data) {
			//console.log(data);
			var ptn = false;
			if(pattern.test(data.get("abbreviation")) || pattern.test(data.get("name"))){
				ptn = true;
			}
		  	return ptn;
		}));
		//sort list to make sure a direct match on abbreviation shows on top and others show alphabetically
		results = _(results.sortBy(function(data){ 
			var diff = 1;
			if(data.get("abbreviation").toLowerCase() === letters.toLowerCase()){
				diff = 0;
			}
			return diff; 
		}));
		//results = _(results.sortBy(function(num){ return Math.sin(num); });
		//console.log(results);
		return results;
	}
});


myapp.collection.states = new myapp.collection.States();
myapp.collection.states.fetch(); //load JSON from path through XHR











