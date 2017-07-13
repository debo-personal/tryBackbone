(function() {
	var documents = [
		new Backbone.Model({
			title: 'Java',
			description: 'It is a server side technology, it is open source and you do oo programming'
		}),
		new Backbone.Model({
			title: 'Javascript',
			description: 'It is a client side technology, it is open source and lot of frameworks are building on this e.g. Angular, Ember'
		})
	];

	var eventAggregator = _.extend({}, Backbone.Events);

	var ContentsView = Backbone.View.extend({
		tagName: 'ul',
		render : function() {
			_(this.collection).each( function( document) {
				this.$el.append(new DocumentListView({model: document}).render().el);
			}, this);
			return this;
		}
	});

	var DocumentListView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click': 'handleClick'
		},
		handleClick: function() {
			eventAggregator.trigger('document:clicked', this.model);
		},
		render: function() {
			this.$el.html(this.model.get('title'));
			return this;
		}
	});

	var DocumentView = Backbone.View.extend({
		render: function() {
			this.$el.append("<h1>" + this.model.get('title') + "</h1>");
			this.$el.append("<div>" + this.model.get('description') + "</div>");
			return this;
		}
	});

	var DocumentRouter = Backbone.Router.extend({
		routes: {
			'contents' : 'contents',
			'view/:title' : 'viewDocument'
		},
		contents: function() {
			$('body').html( new ContentsView({collection: documents}).render().el);
		},
		viewDocument: function( title ) {
			var selectedDocument = _(documents).find( function( document) {
				return document.get('title') === title;
			});

			$('body').empty().append(new DocumentView({model: selectedDocument}).render().el);
		}
	});

	var router = new DocumentRouter();
	Backbone.history.start();
	router.navigate('contents',{trigger: true});

	eventAggregator.on('document:clicked', function( document ) {
		router.navigate('view/' + document.get('title'), {trigger: true});
	});


})();