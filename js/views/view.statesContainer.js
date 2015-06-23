/* Author: 

*/
myapp.view.StatesContainer = Backbone.View.extend({
	events: {
		"keyup #searchState" : "search",
		"change #statesorting":"sorts"
	},
	render: function(data) {
		$(this.el).html(this.template);
		return this;
	},
	renderList : function(states){
		$("#matchingStates").html("");

		states.each(function(state){
			var view = new myapp.view.StatesItem({
				model: state,
				collection: this.collection
			});
			$("#matchingStates").append(view.render().el);
		});
		return this;
	},
	initialize : function(){
		this.template = _.template($("#list_container_tpl").html());
		this.collection.bind("reset", this.render, this);
	}
});


myapp.view.SearchAndSort = {
	search: function(e){
		var letters = $("#searchState").val();
		if( letters.length > 0 ){
			var results = this.collection.searchFull(letters);
		}else{
			var results = {};
		}
		
		this.renderList(results);
	},	
	sorts: function(e){
		var status = $("#statesorting").find("option:selected").val();
		if(status == "") status = 0;
		this.renderList(this.collection.currentStatus(status));
	}
}

//use of mixin
_.extend(myapp.view.StatesContainer.prototype, myapp.view.SearchAndSort);
