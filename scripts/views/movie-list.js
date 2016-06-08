var MovieListView = Backbone.View.extend({

  el: '#app',

  events: {
    'submit form': 'addMovie',
  },

  addMovie: function(event) {
    // Kill submit event
    event.preventDefault();

    var $form = $(event.currentTarget);
    var movieTitle = $form.find('.movie-title').val();
    var moviePoster = $form.find('.movie-poster').val();
    var movieType = $form.find('.movie-type').val();
    var movieNotation = $form.find('.movie-notation').val();

    var newMovieModel = new MovieModel({
      title: movieTitle,
      poster: moviePoster,
      type: movieType,
      notation: parseInt(movieNotation)
    });

    this.myMovieCollection.add(newMovieModel);

    this.render();
  },

  initialize: function() {
    // Set movie instance
    this.myMovieCollection = new MovieCollection();

    this.render();
  },

  render: function() {
  }
});
