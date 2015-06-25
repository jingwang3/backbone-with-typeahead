myapp.view.StatesContainer = Backbone.View.extend({
	render: function(data) {
		$(this.el).html(this.template);
		return this;
	},
	initialize : function(){
		this.template = _.template($("#list_container_tpl").html());
		this.collection.bind("reset", this.render, this);
	}
});


myapp.view.SearchAndSort = {
	events: {
		"keyup #searchState": "search",
		"click .stateItem": "populate"
	},
	renderList : function(states, letters){
		$("#matchingStates").html("");
		if(states !==  null){
			states.each(function(state){
				var view = new myapp.view.StatesItem({
					model: state,
					collection: this.collection
				});
				var hintedState = view.model.get('name');//use the backbone way of getting property out of the model
				hintedState = hintedState.toLowerCase().replace(letters.toLowerCase(), "<strong>" + letters.toLowerCase() + "</strong>");
				view.model.set({'displayName': hintedState});
				$("#matchingStates").append(view.render().el);
			});
		}
		return this;
	},
	search: function(e){
		var letters = $("#searchState").val();
		if( letters.length > 0 ){
			var results = this.collection.search(letters);
		}else{
			var results = null;
		}
		this.renderList(results, letters);
	},
	populate: function(e){
		var letters = $(e.target)[0].innerText;
		$('#searchState').val(letters);
		this.renderList(null, letters);//empty out the typeahead list
	}
}

//use of mixin
_.extend(myapp.view.StatesContainer.prototype, myapp.view.SearchAndSort);
