(function (){
	"use strict";

	angular
	  .module('MyKnow')
	  .controller('MyKnowCtrl', function($scope, $http){
	  	$scope.title = 'MyKnow App';
  		$scope.msg = "stamo a un livello esagerato";

  		$http.get('assets/data/movielist.json').then(function (movies){
  			$scope.movies = movies.data;
  			$scope.genres = getGenres($scope.movies);
  		})


  		function getGenres(movies) {
  			var genres = [];

  			angular.forEach(movies, function(item){
  				angular.forEach(item.genres, function(genre) {
  					genres.push(genre);
  				})
  			});

			return _.uniq(genres);
  		};

	  });
})();
