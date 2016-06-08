var MovieListView = Backbone.View.extend({

  el: '#app',

  events: {
    'submit form': 'addMovie',
    'change input[type="radio"]': 'seeMovie'
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
    newMovieModel.save();

    this.render();
    console.log('Rendering after add');
  },

  seeMovie: function(event) {
    var $input = $(event.currentTarget);
    var inputValue = $input.val();

    // Get movie index
    var movieIndex = $input.parents('li').attr('data-index');

    // Get concerned movie
    var targetModel = this.myMovieCollection.at(movieIndex);

    // Update seen property and save it
    if(targetModel) {
      targetModel.set({
        seen: inputValue === 'seen'
      });
      targetModel.save();
    }

    this.render();
  },

  templateHandlebars: Handlebars.compile(
    $('#movie-template-handlebars').html()
  ),

  initialize: function() {
    // Set movie instance
    this.myMovieCollection = new MovieCollection();
    this.myMovieCollection.fetch();

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
