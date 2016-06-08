var MovieCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("movie-storage"), // Unique name within your app.
  model: MovieModel
});
