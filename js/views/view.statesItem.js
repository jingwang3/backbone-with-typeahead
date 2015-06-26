/* Author: 

*/
myapp.view.StatesItem = Backbone.View.extend({
	tagName: 'li',
	className: 'state',
	events: {},
	render: function(data) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},
	initialize : function(){
		this.template = _.template($("#task_item_tpl").html());
	}
});