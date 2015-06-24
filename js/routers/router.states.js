
myapp.router.States = Backbone.Router.extend({

	routes: {
		"":  	"list",  
	 },
	list: function(){
		this.listContainerView = new myapp.view.StatesContainer({
			collection:myapp.collection.states
		});
		$("#contentContainer").append(this.listContainerView.render().el);	
	 }
});

myapp.router.states = new myapp.router.States;