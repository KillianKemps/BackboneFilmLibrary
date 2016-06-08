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
    console.log('Rendering after add');
  },

  templateHandlebars: Handlebars.compile(
    $('#movie-template-handlebars').html()
  ),

  initialize: function() {
    // Set movie instance
    this.myMovieCollection = new MovieCollection();

    this.render();
  },

  render: function() {
    var $renderTarget = this.$('.movie-list');

    // Get movies to be displayed
    var allMyMovies = this.myMovieCollection.toJSON();

    $renderTarget.html(
      this.templateHandlebars(allMyMovies)
    );
  }
});
