(function() {
	var Rectangle = Backbone.Model.extend({});

	var RectangleView = Backbone.View.extend({
		tagName: 'div',

		className: 'rectangle',

		events: {
			'click': 'move'
		},

		render: function() {
			this.setDimensions();
			this.setPosition();
			this.setColor();
			return this;
		},

		setDimensions: function() {
			this.$el.css({
				height: this.model.get('height') + 'px',
				width: this.model.get('width') + 'px'
			});
		},

		setPosition: function() {
			var position = this.model.get('position');
			this.$el.css({
				left: position.x,
				top: position.y
			});
		},

		setColor: function() {
			this.$el.css({
				'background-color': this.model.get('color')
			})
		},

		move: function() {
			this.$el.css('left', this.$el.position().left + 10);
		}
	});

	var rectangle1 = new Rectangle({
		height: 60,
		width: 120,
		color: 'red',
		position: {
			x: 300,
			y: 100
		}
	});

	var rectangle2 = new Rectangle({
		height: 160,
		width: 20,
		color: 'blue',
		position: {
			x: 500,
			y: 150
		}
	});

	var models = [
		new RectangleView({model: rectangle1}),
		new RectangleView({model: rectangle2})
	];

	models.forEach(function(model) {
		$('div#rectangles-container').append(model.render().el);
	});
	
})();