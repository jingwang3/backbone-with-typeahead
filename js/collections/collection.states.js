myapp.collection.States = Backbone.Collection.extend({
	model: myapp.model.States,
    url: 'data/states.json',
	search : function(letters){
		if(letters == "") return this;
		var pattern = new RegExp(letters,"i");
		//search for all results matching either abbreviation or name
		var displayOrder = 0; //set this display data on model to help with sorting
		var results =  _(this.filter(function(data) {
			if(pattern.test(data.get("abbreviation")) || pattern.test(data.get("name"))){
				if(letters.toUpperCase().localeCompare(data.get("abbreviation")) === 0){
					data.set({'displayOrder': 0});//promote the exact match on top of the list by giving it highest display order, 0
				}else{
					displayOrder++;
					data.set({'displayOrder': displayOrder});
				}
				return true
			}
		  	return false;
		}));
		//sort list to make sure a direct match on abbreviation shows on top and others show alphabetically
		results = _(results.sortBy(function(data){ 
			return data.get('displayOrder'); 
		}));

		//show only top 5 suggestions
		results = new myapp.collection.States(results.first(5));
		//console.log(_.first(results, 5));
		// console.log(_(results.first(this, 5)));
		return results;
	}
});


myapp.collection.states = new myapp.collection.States();
myapp.collection.states.fetch(); //load JSON from path through XHR











