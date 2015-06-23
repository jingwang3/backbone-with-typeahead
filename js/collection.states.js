myapp.collection.States = Backbone.Collection.extend({
	model: myapp.model.States,
    url: 'data/states.json',
	currentStatus : function(status){
		return _(this.filter(function(data) {
		  	return data.get("completed") == status;
		}));
	},
	searchAbb : function(letters){
		if(letters == "") return this;
		
		var pattern = new RegExp(letters,"gi");
		return _(this.filter(function(data) {
		  	return pattern.test(data.get("abbreviation"));
		}));
	},
	searchFull : function(letters){
		if(letters == "") return this;
		
		var pattern = new RegExp(letters,"gi");
		return _(this.filter(function(data) {
		  	return pattern.test(data.get("name"));
		}));
	}
});


myapp.collection.states = new myapp.collection.States();
myapp.collection.states.fetch();











